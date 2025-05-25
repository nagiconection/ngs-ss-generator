<template>
  <v-container class="pa-4 pt-12">
    <h2 class="text-h5 mb-4">お気に入り一覧</h2>

    <v-alert v-if="favorites.length === 0" type="info" border="start">
      お気に入りはまだありません。
    </v-alert>

    <v-row v-else>
      <v-col v-for="item in favorites" :key="item.id" cols="12" md="6" lg="4">
        <v-card>
          <v-card-title class="text-subtitle-1">
            {{ item.generatedCfCommand }}
          </v-card-title>
          <v-card-subtitle>保存日: {{ formatDate(item.addedAt) }}</v-card-subtitle>
          <v-card-actions class="justify-space-between">
            <v-btn color="primary" @click="goToTopWithParams(item)">再現する</v-btn>
            <v-btn icon color="error" @click="deleteFavorite(item.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-snackbar v-model="snackbar" color="info" timeout="3000">
      {{ snackbarMessage }}
    </v-snackbar>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { CommandFormModel } from '~/models/CommandFormModel'
import { getAllFavorites, deleteFavorite as dbDeleteFavorite } from '~/utils/indexedDb'
import { setRestore } from '~/composables/useRestore'

// IndexedDB に保存している形に合わせて型定義
interface FavoriteItem extends CommandFormModel {
  id: number // autoIncrement された ID
  addedAt: string // ISO 日時文字列
  tab: string
}

const router = useRouter()
const favorites = ref<FavoriteItem[]>([])

// Snackbar 用
const snackbar = ref(false)
const snackbarMessage = ref('')

onMounted(async () => {
  await loadFavorites()
})

/** IndexedDB から一覧を読み込む */
async function loadFavorites() {
  const items = await getAllFavorites()
  favorites.value = items.map((item: any) => ({
    id: item.id,
    addedAt: item.addedAt,
    ...item,
  }))
}

/** 削除ボタン押下時に ID を渡して削除 + 再読込 */
async function deleteFavorite(id: number) {
  await dbDeleteFavorite(id)
  await loadFavorites()
  snackbarMessage.value = 'お気に入りを削除しました'
  snackbar.value = true
}

/** ISO 文字列を日本ロケールで整形 */
function formatDate(iso: string): string {
  return new Date(iso).toLocaleString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const currentTab = ref<'easySetttings' | 'deepSetttings'>()

function goToTopWithParams(item: FavoriteItem) {
  setRestore(item.id, item.tab)
  router.push({ path: '/' })
}
</script>
