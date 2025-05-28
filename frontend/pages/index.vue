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
import { getFavorite, saveExOpMasterData } from '~/utils/indexedDb'
import { useRestore, clearRestore } from '~/composables/useRestore'

import { doc, getDoc, Timestamp } from 'firebase/firestore'
import { useNuxtApp } from '#app'
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage'
import { saveMasterData } from '~/utils/indexedDb'

interface VersionRecord {
  version: number
  publish: number
}

// タブの v-model
const tab = ref<'easySetttings' | 'deepSetttings'>('easySetttings')

/** firestoreStorage */
const { $db } = useNuxtApp()

// フォームと state の生成
const form = reactive(createDefaultCommandFormModel())
const formState = reactive(createDisabledFormModel())

// Snackbar
const snackbar = ref(false)
const snackbarMessage = ref('')

// ローカルに保存されているバージョン情報
const localVersion = ref<VersionRecord | null>(null)
// Firestore からフェッチしたバージョン情報
const remoteVersion = ref<VersionRecord | null>(null)

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

const restore = useRestore()

onMounted(async () => {
  // お気に入り再現
  if (restore.pending && restore.id != null) {
    const record = await getFavorite(restore.id)
    if (record) {
      Object.assign(form, record)
      if (record.tab === 'easySetttings' || record.tab === 'deepSetttings') {
        tab.value = record.tab
      }
      notify('お気に入りを復元しました')
    }
    clearRestore()
  }

  try {
    // Firestore からフェッチ
    const snap = await getDoc(doc($db, 'version', 'version'))
    if (!snap.exists()) {
      console.warn('version情報が取得できませんでした')
      return
    }
    const data = snap.data() as { version: number; publish: Timestamp }
    remoteVersion.value = {
      version: data.version,
      publish: data.publish.toMillis(),
    }

    // IndexedDB からフェッチ
    const stored = await getVersion('version')
    localVersion.value = stored ? { version: stored.version, publish: stored.publish } : null

    // アップデートの必要を確認
    const needUpdate =
      !localVersion.value ||
      remoteVersion.value.version > localVersion.value.version ||
      remoteVersion.value.publish > localVersion.value.publish

    if (needUpdate) {
      // ハンドサインデータは一括取得一括更新
      // 今日の日付のyyyymmdd形式で取得
      const today = new Date()
      const todayStr = today.toISOString().split('T')[0].replace(/-/g, '')
      const handSignFileName = `ha_lobby_actions1.json?${todayStr}`
      // GitHubのrowから直接取得
      let url = `https://raw.githubusercontent.com/nagiconection/ngs-ss-generator/refs/heads/main/datas/${handSignFileName}`
      const jsonDataHand: any[] = await fetch(url).then(res => res.json())
      await saveHaMasterData('hand_sign', jsonDataHand)

      // GitHubのrowから直接取得
      const exoptionsFileName = `ex_options.json?${todayStr}`
      url = `https://raw.githubusercontent.com/nagiconection/ngs-ss-generator/refs/heads/main/datas/${exoptionsFileName}`
      const jsonDataExOptions: any[] = await fetch(url).then(res => res.json())
      await saveExOpMasterData('ex_options', jsonDataExOptions)

      const LobyActionfileName = `loby_actions_1.json?${todayStr}`
      // GitHubのrowから直接取得
      url = `https://raw.githubusercontent.com/nagiconection/ngs-ss-generator/refs/heads/main/datas/${LobyActionfileName}`
      const jsonDataLobyAction: any[] = await fetch(url).then(res => res.json())
      await saveMasterData('loby_actions', jsonDataLobyAction)

      // IndexedDB に最新情報を保存
      await saveVersion('version', {
        version: remoteVersion.value.version,
        publish: remoteVersion.value.publish,
      })
      notify('データを更新しました。')
    } else {
      notify('データは最新です')
    }
  } catch (e) {
    notify('version チェック中にエラーが発生しました:')
    console.error(e)
  }
})
</script>
