import { openDB, type DBSchema, type IDBPDatabase } from 'idb'
import type { CommandFormModel } from '~/models/CommandFormModel'

// DB スキーマ定義
interface MyDB extends DBSchema {
  favorites: {
    key: number
    // id は保存前には不要、取得後には付与される
    value: CommandFormModel & {
      addedAt: string
      tab: string
      id?: number
    }
  }
}

let dbPromise: Promise<IDBPDatabase<MyDB>>

/**
 * DB 接続取得
 */
export function getDb() {
  if (!dbPromise) {
    dbPromise = openDB<MyDB>('ngs-ss-generator', 1, {
      upgrade(db) {
        db.createObjectStore('favorites', {
          keyPath: 'id',
          autoIncrement: true,
        })
      },
    })
  }
  return dbPromise
}

/**
 * フォームデータとタブ情報を保存
 * @param form CommandFormModel
 * @param tab 保存元のタブ名
 * @returns autoIncrement されたキー(ID)
 */
export async function saveFavorite(form: CommandFormModel, tab: string): Promise<number> {
  const db = await getDb()
  const item = {
    ...form,
    addedAt: new Date().toISOString(),
    tab,
  }
  return db.add('favorites', item)
}

/**
 * 全レコード取得
 */
export async function getAllFavorites(): Promise<MyDB['favorites']['value'][]> {
  const db = await getDb()
  return db.getAll('favorites')
}

/**
 * 単一レコード取得
 * @param id IndexedDB の主キー
 */
export async function getFavorite(id: number): Promise<MyDB['favorites']['value'] | undefined> {
  const db = await getDb()
  return db.get('favorites', id)
}

/**
 * 指定したIDのレコードを削除する
 * @param id IndexedDB の主キー
 */
export async function deleteFavorite(id: number): Promise<void> {
  const db = await getDb()
  await db.delete('favorites', id)
}
