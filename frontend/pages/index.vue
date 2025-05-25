<template>
  <v-container>
    <v-tabs v-model="tab" bg-color="#78909C" color="white" selected-class="selected-tab">
      <v-tab value="easySetttings">UI表示・目線設定・天気設定</v-tab>
      <v-tab value="deepSetttings">ポージング制御</v-tab>
    </v-tabs>
    <v-tabs-window v-model="tab">
      <v-tabs-window-item value="easySetttings">
        <EasySettingsTab
          :form="form"
          :formState="formState"
          :currentTab="tab"
          @copy="copyCommand"
        />
      </v-tabs-window-item>
      <v-tabs-window-item value="deepSetttings">
        <DeepSettingsTab
          :form="form"
          :formState="formState"
          :currentTab="tab"
          @copy="copyCommand"
          @notify="notify"
        />
      </v-tabs-window-item>
    </v-tabs-window>

    <v-snackbar v-model="snackbar" color="success" timeout="3000">
      {{ snackbarMessage }}
    </v-snackbar>
  </v-container>
</template>

<style scoped>
.selected-tab {
  background-color: white !important;
  color: #546e7a !important;
  font-weight: bold;
  transition: background-color 0.2s ease;
  border-radius: 0 !important;
}
</style>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { createDefaultCommandFormModel, createDisabledFormModel } from '~/models/CommandFormModel'
import { getFavorite } from '~/utils/indexedDb'
import { useRestore, clearRestore } from '~/composables/useRestore'

// タブの v-model
const tab = ref<'easySetttings' | 'deepSetttings'>('easySetttings')

// フォームと state の生成
const form = reactive(createDefaultCommandFormModel())
const formState = reactive(createDisabledFormModel())

// Snackbar
const snackbar = ref(false)
const snackbarMessage = ref('')

/** コピー通知 */
async function copyCommand(value: string) {
  if (!value) return
  try {
    await navigator.clipboard.writeText(value)
    notify('コピーしました！')
  } catch {
    notify('コピーに失敗しました…')
  }
}

/** 汎用通知 */
function notify(message: string) {
  snackbarMessage.value = message
  snackbar.value = true
}

// useRestore から id/tab/pending を取ってくる
const restore = useRestore()

onMounted(async () => {
  if (restore.pending && restore.id != null) {
    // 1) IndexedDB から該当レコードを取得
    const record = await getFavorite(restore.id)
    if (record) {
      // 2) フォームに丸ごとセット
      Object.assign(form, record)
      // 3) タブを復元（record.tab が valid な場合だけ）
      if (record.tab === 'easySetttings' || record.tab === 'deepSetttings') {
        tab.value = record.tab
      }
      // 4) 通知
      notify('お気に入りを復元しました')
    }
    // 5) 一度復元したらフラグクリア
    clearRestore()
  }
})
</script>
