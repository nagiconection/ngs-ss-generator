<template>
  <v-container class="pa-4 pt-12">
    <h2 class="text-h5 mb-4">お知らせ一覧</h2>

    <v-timeline align="start" side="end">
      <v-timeline-item
        v-for="(item, index) in newsList"
        :key="index"
        :dot-color="'primary'"
        :icon="'mdi-bell-outline'"
        :fill-dot="true"
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
import { ref } from 'vue'

interface NewsItem {
  date: string
  title: string
  body: string
}

// 仮のデータ（後でAPIやFirebaseに置換可能）
const newsList = ref<NewsItem[]>([
  {
    date: '2025-05-23',
    title: 'お気に入り機能を追加しました',
    body: '保存されたフォームを復元できるようになりました。',
  },
  {
    date: '2025-05-21',
    title: '初期リリース',
    body: 'フォームでコマンドを生成できるようになりました。',
  },
])

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>
