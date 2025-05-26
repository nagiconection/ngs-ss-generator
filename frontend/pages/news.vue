<template>
  <v-container class="pa-4 pt-12">
    <h2 class="text-h5 mb-4">お知らせ一覧</h2>

    <v-timeline align="start" side="end">
      <v-timeline-item
        v-for="(item, index) in newsList"
        :key="index"
        dot-color="primary"
        icon="mdi-bell-outline"
        fill-dot
      >
        <template #opposite>
          {{ formatDate(item.date) }}
        </template>

        <v-card>
          <v-card-title class="text-subtitle-1 font-weight-bold">
            {{ item.title }}
          </v-card-title>
          <v-card-text>{{ item.body }}</v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { collection, getDocs, orderBy, query, Timestamp } from 'firebase/firestore'
import { useNuxtApp } from '#app'

// date は Date 型に変換して保持
interface NewsItem {
  date: Date
  title: string
  body: string
}

const newsList = ref<NewsItem[]>([])
const { $db } = useNuxtApp()

/**
 * 日付を "YYYY年M月D日" 形式にフォーマット
 */
function formatDate(date: Date): string {
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

onMounted(async () => {
  try {
    const noticesCol = collection($db, 'notices')
    const q = query(noticesCol, orderBy('date', 'desc'))
    const snapshot = await getDocs(q)
    newsList.value = snapshot.docs.map(doc => {
      const data = doc.data() as { date: unknown; title: string; body: string }
      let dateObj: Date
      if (data.date instanceof Timestamp) {
        dateObj = data.date.toDate()
      } else if (typeof data.date === 'number' || typeof data.date === 'string') {
        dateObj = new Date(data.date)
      } else {
        dateObj = new Date()
      }
      return {
        date: dateObj,
        title: data.title,
        body: data.body,
      }
    })
  } catch (e) {
    console.error('Firestore からお知らせを取得できませんでした:', e)
  }
})
</script>
