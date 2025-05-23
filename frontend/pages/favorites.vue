<template>
  <v-container class="pa-4 pt-12">
    <h2 class="text-h5 mb-4">お気に入り一覧</h2>

    <v-alert v-if="favorites.length === 0" type="info" border="start">
      お気に入りはまだありません。
    </v-alert>

    <v-row v-else>
      <v-col v-for="(item, index) in favorites" :key="index" cols="12" md="6" lg="4">
        <v-card>
          <v-card-title class="text-subtitle-1">
            {{ item.command }}
          </v-card-title>
          <v-card-subtitle>保存日: {{ formatDate(item.savedAt) }}</v-card-subtitle>
          <v-card-actions class="justify-space-between">
            <v-btn color="primary" @click="goToTopWithParams(item)">再現する</v-btn>
            <v-btn icon color="error" @click="deleteFavorite(index)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Snackbar -->
    <v-snackbar v-model="snackbar" color="info" timeout="3000">
      {{ snackbarMessage }}
    </v-snackbar>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useTempSelection } from '~/composables/useTempSelection' // ← 追加

interface FavoriteItem {
  color: string
  action: string
  command: string
  savedAt: string
}

const router = useRouter()
const FAVORITE_KEY = 'favorites'
const favorites = ref<FavoriteItem[]>([])

// Snackbar
const snackbar = ref(false)
const snackbarMessage = ref('')

// IndexedDB 経由の一時保存
const { saveTempSelection } = useTempSelection()

onMounted(() => {
  loadFavorites()
})

function loadFavorites() {
  const data = localStorage.getItem(FAVORITE_KEY)
  favorites.value = data ? JSON.parse(data) : []
}

function saveFavorites() {
  localStorage.setItem(FAVORITE_KEY, JSON.stringify(favorites.value))
}

function deleteFavorite(index: number) {
  favorites.value.splice(index, 1)
  saveFavorites()
  snackbarMessage.value = 'お気に入りを削除しました'
  snackbar.value = true
}

async function goToTopWithParams(item: FavoriteItem) {
  await saveTempSelection({
    color: item.color,
    action: item.action,
  })
  router.push('/')
}

function formatDate(iso: string): string {
  const date = new Date(iso)
  return date.toLocaleString()
}
</script>
