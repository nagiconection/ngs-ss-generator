import { openDB, type DBSchema, type IDBPDatabase } from 'idb'
import type { CommandFormModel } from '~/models/CommandFormModel'
import type { Timestamp } from 'firebase/firestore'

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
  versions: {
    key: string
    // Firestore の version ドキュメントの内容
    value: {
      key: string
      version: number
      publish: number
    }
  }
  masterData: {
    key: string
    value: { key: string; value: any[] }
  }
  masterDataHa: {
    key: string
    value: { key: string; value: any[] }
  }
  masterDataExOp: {
    key: string
    value: { key: string; value: any[] }
  }
  cardsState: {
    key: string
    value: { key: string; value: any[] }
  }
}

let dbPromise: Promise<IDBPDatabase<MyDB>>

/**
 * DB 接続取得
 */
export function getDb() {
  if (!dbPromise) {
    dbPromise = openDB<MyDB>('ngs-ss-generator', 3, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('favorites')) {
          db.createObjectStore('favorites', {
            keyPath: 'id',
            autoIncrement: true,
          })
        }
        if (!db.objectStoreNames.contains('versions')) {
          db.createObjectStore('versions', { keyPath: 'key' })
        }
        if (!db.objectStoreNames.contains('masterData')) {
          db.createObjectStore('masterData', { keyPath: 'key' })
        }
        if (!db.objectStoreNames.contains('masterDataHa')) {
          db.createObjectStore('masterDataHa', { keyPath: 'key' })
        }
        if (!db.objectStoreNames.contains('masterDataExOp')) {
          db.createObjectStore('masterDataExOp', { keyPath: 'key' })
        }
        if (!db.objectStoreNames.contains('cardsState')) {
          db.createObjectStore('cardsState', { keyPath: 'key' })
        }
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

/**
 * version 情報を保存
 * @param key ストア内のキー（例: 'version'）
 * @param version Firestore から取得した version レコード
 */
export async function saveVersion(
  key: string,
  version: { version: number; publish: number }
): Promise<void> {
  const db = await getDb()
  await db.put('versions', { key, version: version.version, publish: version.publish })
}

/**
 * version 情報を取得
 * @param key ストア内のキー（例: 'version'）
 */
export async function getVersion(
  key: string
): Promise<{ version: number; publish: number } | undefined> {
  const db = await getDb()
  return db.get('versions', key)
}

/**
 * ロビーアクションデータを保存（JSON 配列を指定のキーで保持）
 */
export async function saveMasterData(key: string, data: any[]): Promise<void> {
  const db = await getDb()
  await db.put('masterData', { key, value: data })
}

/**
 *  ロビーアクションマスターデータを取得
 */
export async function getMasterData(key: string): Promise<any[] | undefined> {
  const db = await getDb()
  const rec = await db.get('masterData', key)
  return rec?.value
}

/**
 * ハンドサインマスターデータを保存（JSON 配列を指定のキーで保持）
 */
export async function saveHaMasterData(key: string, data: any[]): Promise<void> {
  const db = await getDb()
  await db.put('masterDataHa', { key, value: data })
}

/**
 * ハンドサインマスターデータを取得
 */
export async function getHaMasterData(key: string): Promise<any[] | undefined> {
  const db = await getDb()
  const rec = await db.get('masterDataHa', key)
  return rec?.value
}

/**
 * EXオプションマスターデータを保存（JSON 配列を指定のキーで保持）
 */
export async function saveExOpMasterData(key: string, data: any[]): Promise<void> {
  const db = await getDb()
  await db.put('masterDataExOp', { key, value: data })
}

/**
 * ハンドサインマスターデータを取得
 */
export async function getExOpMasterData(key: string): Promise<any[] | undefined> {
  const db = await getDb()
  const rec = await db.get('masterDataExOp', key)
  return rec?.value
}
