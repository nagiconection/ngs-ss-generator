<template>
  <v-container>
    <v-row>
      <v-col v-for="(card, cardIndex) in cards" :key="cardIndex" cols="12" md="6" lg="4">
        <v-card class="pa-4" elevation="3">
          <v-card-title class="d-flex justify-space-between align-center">
            <v-btn icon color="error" @click="removeCard(cardIndex)" :disabled="cards.length === 1">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-card-title>

          <v-card-text>
            <v-row
              v-for="index in 3"
              :key="`card-${cardIndex}-autocomplete-${index}`"
              class="mb-3"
              align="center"
            >
              <v-col cols="10">
                <v-autocomplete
                  v-model="cards[cardIndex][index - 1]"
                  :items="exOptions"
                  item-title="name"
                  item-value="name"
                  label="EXオプション"
                  clearable
                  density="compact"
                />
              </v-col>
              <v-col cols="2" class="d-flex justify-center">
                <v-btn
                  icon
                  @click="copyToClipboard(cards[cardIndex][index - 1])"
                  :disabled="!cards[cardIndex][index - 1]"
                >
                  <v-icon>mdi-content-copy</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- 固定フッター -->
    <div class="fixed-footer">
      <v-container>
        <v-row justify="center" class="py-2">
          <v-btn color="primary" @click="addCard" class="mr-2">
            <v-icon left>mdi-plus</v-icon>
            カード追加
          </v-btn>
          <v-btn color="success" @click="dialogVisible = true" class="mr-2">
            <v-icon left>mdi-content-paste</v-icon>
            テンプレートを呼び出す
          </v-btn>
          <v-btn color="info" @click="save" class="mr-2">
            <v-icon left>mdi-content-save</v-icon>
            保存
          </v-btn>
        </v-row>
      </v-container>
    </div>
  </v-container>
  <v-dialog v-model="dialogVisible" max-width="400">
    <v-card>
      <v-card-title class="text-h6">確認</v-card-title>
      <v-card-text>現在の選択が上書きされますが、よろしいですか？</v-card-text>
      <v-card-actions class="justify-end">
        <v-btn text @click="dialogVisible = false">キャンセル</v-btn>
        <v-btn color="primary" @click="confirmLoadTemplate">はい</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <!-- スナックバー -->
  <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="2000">
    {{ snackbar.message }}
  </v-snackbar>
</template>

<style scoped>
.fixed-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: white;
  border-top: 1px solid #ccc;
  z-index: 1000;
  box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.08);
}
</style>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { TEMPLATE_EX_OP } from '@/constants/const'

// EXオプションの候補データ（IndexedDBから取得）
const exOptions = ref<{ name: string; text: string }[]>([])

// カードごとの選択状態（3項目ずつ）
const cards = ref<string[][]>([['', '', '']])

// テンプレート読み込みダイアログ表示状態
const dialogVisible = ref(false)

// スナックバーの状態
const snackbar = ref({
  show: false,
  message: '',
  color: 'info',
})

/**
 * スナックバーを表示する
 * @param message 表示するメッセージ
 * @param color Vuetifyのカラーパレット名（例: 'success', 'info'）
 */
function showSnackbar(message: string, color: string = 'info'): void {
  snackbar.value.message = message
  snackbar.value.color = color
  snackbar.value.show = true
}

/**
 * テンプレート定数を読み込み、現在のカードを上書きする
 */
function confirmLoadTemplate(): void {
  cards.value = TEMPLATE_EX_OP.map(row => [...row])
  dialogVisible.value = false
}

/**
 * IndexedDBからマスターデータを取得する
 * @param key データキー（例: 'ex_options'）
 * @returns マスターデータ配列
 */
async function getMasterData(key: string): Promise<any[]> {
  const db = await getDb()
  const rec = await db.get('masterDataHa', key)
  return rec?.value ?? []
}

/**
 * コンポーネントマウント時の初期処理：
 * - EXオプションの読み込み
 * - 保存されたカードデータの復元
 */
onMounted(async () => {
  const data = await getMasterData('ex_options')
  if (data) {
    exOptions.value = data.map((exoption: any) => ({
      name: exoption.name,
      text: exoption.text,
    }))
  }

  const db = await getDb()
  const stored = await db.get('cardsState', 'cardsData')
  if (stored?.value && Array.isArray(stored.value)) {
    cards.value = stored.value
  }
})

/**
 * 新しいカードを追加する
 */
function addCard(): void {
  cards.value.push(['', '', ''])
}

/**
 * 指定したインデックスのカードを削除する（最低1枚は残す）
 * @param index 削除対象カードのインデックス
 */
function removeCard(index: number): void {
  if (cards.value.length > 1) {
    cards.value.splice(index, 1)
  }
}

/**
 * 値をクリップボードにコピーし、スナックバーを表示する
 * @param value コピーする文字列
 */
function copyToClipboard(value: string): void {
  if (!value) return
  navigator.clipboard.writeText(value).then(() => {
    showSnackbar('コピーしました', 'info')
  })
}

/**
 * 現在のカード情報を IndexedDB に保存する
 */
async function save(): Promise<void> {
  const db = await getDb()
  const plain = JSON.parse(JSON.stringify(cards.value))
  await db.put('cardsState', {
    key: 'cardsData',
    value: plain,
  })
  showSnackbar('保存しました', 'success')
}
</script>
