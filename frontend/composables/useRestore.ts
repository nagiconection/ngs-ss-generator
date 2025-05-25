import { reactive } from 'vue'

/**
 * お気に入りの復元状態を管理するためのComposable
 */
interface RestoreState {
  pending: boolean
  id?: number
  tab?: string
}

const state = reactive<RestoreState>({
  pending: false,
  id: undefined,
  tab: undefined,
})

/**
 * 復元状態を設定する関数
 * @param id - 復元するお気に入りのID
 * @param tab - 復元元のタブ名
 */
export function setRestore(id: number, tab: string) {
  state.id = id
  state.tab = tab
  state.pending = true
}

/**
 * 復元状態を取得する関数
 * @returns 復元状態
 */
export function useRestore() {
  return state
}

/**
 * 復元状態をクリアする関数
 */
export function clearRestore() {
  state.pending = false
  state.id = undefined
  state.tab = undefined
}
