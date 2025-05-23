// composables/useFavorites.ts
import { ref } from 'vue'

export function useFavorites() {
  const FAVORITE_KEY = 'favorites'

  const saveFavorite = (item: any) => {
    const list = JSON.parse(localStorage.getItem(FAVORITE_KEY) || '[]')
    list.push(item)
    localStorage.setItem(FAVORITE_KEY, JSON.stringify(list))
  }

  const getFavorites = () => {
    return JSON.parse(localStorage.getItem(FAVORITE_KEY) || '[]')
  }

  return { saveFavorite, getFavorites }
}
