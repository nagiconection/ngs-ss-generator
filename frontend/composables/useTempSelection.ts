// composables/useTempSelection.ts
import { get, set, del } from 'idb-keyval'

const KEY = 'temp_selection'

export interface TempSelection {
  color: string
  action: string
}

export function useTempSelection() {
  const saveTempSelection = async (data: TempSelection) => {
    await set(KEY, data)
  }

  const loadTempSelection = async (): Promise<TempSelection | null> => {
    const result = await get<TempSelection>(KEY)
    return result ?? null
  }

  const clearTempSelection = async () => {
    await del(KEY)
  }

  return {
    saveTempSelection,
    loadTempSelection,
    clearTempSelection,
  }
}
