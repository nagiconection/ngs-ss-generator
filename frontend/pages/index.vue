<template>
  <v-container>
    <v-tabs v-model="tab" bg-color="#78909C" color="white" selected-class="selected-tab">
      <v-tab value="easySetttings">UI表示・目線設定</v-tab>
      <v-tab value="deepSetttings">ポージング制御</v-tab>
    </v-tabs>
    <v-tabs-window v-model="tab">
      <v-tabs-window-item value="easySetttings">
        <v-row>
          <v-col cols="12" class="pt-5">
            <div class="text-h6 font-weight-bold text-primary mb-2">UIオフの設定(/uioff)</div>
            <div class="d-flex flex-column ga-0">
              <v-row class="align-center">
                <v-col class="d-flex align-center" cols="auto" v-if="form.isUiOff">
                  <v-checkbox
                    v-model="form.isUiOffSeconds"
                    density="compact"
                    hide-details
                    class="my-0 py-0"
                    @update:modelValue="onUiOffSecondsChanged"
                  />
                  UI非表示秒数を指定する（指定なしは10秒）
                </v-col>
                <v-col cols="auto" v-if="form.isUiOffSeconds">
                  <v-text-field
                    v-model="form.uiOffSeconds"
                    type="number"
                    density="compact"
                    hide-details
                    class="my-0 py-0"
                    style="width: 120px"
                    suffix="秒"
                    @blur="normalizeUiOffSeconds"
                    @update:modelValue="generateUioffCommand"
                    :min="SPECIAL_CAM_COMMAND[0].minNumber"
                    :max="SPECIAL_CAM_COMMAND[0].maxNumber"
                  />
                </v-col>
              </v-row>
            </div>
            <div>
              <v-text-field v-model="form.generatedUiOffCommand" readonly>
                <template #append>
                  <v-btn
                    icon
                    @click="copyCommand(form.generatedUiOffCommand)"
                    :disabled="!form.generatedUiOffCommand"
                  >
                    <v-icon>mdi-content-copy</v-icon>
                  </v-btn>
                </template>
              </v-text-field>
            </div>
          </v-col>
          <v-col cols="12" class="pt-5">
            <div class="text-h6 font-weight-bold text-primary mb-2">カメラ目線設定(/ceall)</div>
            <v-radio-group v-model="form.generatedEasyCommand" hide-details>
              <v-radio
                v-for="item in EASY_COM_COMMAND"
                :key="item.chatCommand"
                :label="item.name"
                :value="item.chatCommand"
                density="compact"
                :disabled="formState.ceallGroup"
              />
            </v-radio-group>
            <div class="mt-5">
              <v-text-field v-model="form.generatedEasyCommand" readonly>
                <template #append>
                  <v-btn
                    icon
                    @click="copyCommand(form.generatedEasyCommand)"
                    :disabled="!form.generatedEasyCommand"
                  >
                    <v-icon>mdi-content-copy</v-icon>
                  </v-btn>
                </template>
              </v-text-field>
            </div>
          </v-col>
        </v-row>
      </v-tabs-window-item>
      <v-tabs-window-item value="deepSetttings"></v-tabs-window-item>
    </v-tabs-window>
    <!-- <v-row>
      <v-col>
        <v-textarea label="生成されたコマンド" v-model="form.generatedCommand" readonly auto-grow>
          <template #append>
            <v-btn icon @click="copyCommand" :disabled="!generatedCommand">
              <v-icon>mdi-content-copy</v-icon>
            </v-btn>
          </template>
        </v-textarea>
      </v-col>
    </v-row> -->

    <!-- <v-row justify="center">
      <v-btn color="primary" @click="saveToFavorites" :disabled="generatedCommand.length === 0">
        お気に入りに保存
      </v-btn>
    </v-row> -->

    <!-- Snackbar -->
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
import { ref, computed, onMounted } from 'vue'
import { useFavorites } from '~/composables/useFavorites'
import { useTempSelection } from '~/composables/useTempSelection'
import { createDefaultCommandFormModel, createDisabledFormModel } from '~/models/CommandFormModel'
import { SPECIAL_CAM_COMMAND, EASY_COM_COMMAND } from '~/constants/const'

const tab = ref('easySetttings')

/** フォーム生成 */
const form = reactive(createDefaultCommandFormModel())
const formState = reactive(createDisabledFormModel())
const commandList = ref<string[]>([])

/**
 * UI非表示の状態が変更されたときの処理
 * @param value UI非表示の状態
 */
function onUiOffChanged(value: boolean | null): void {
  form.isUiOffSeconds = false
  form.uiOffSeconds = 0
  generateUioffCommand()
}

/**
 * UI非表示の秒数指定状態が変更されたときの処理
 * @param value UI非表示の状態
 */
function onUiOffSecondsChanged(value: boolean | null): void {
  form.uiOffSeconds = 1
  generateUioffCommand()
}

/**
 * UI非表示の秒数を正規化します。
 */
function normalizeUiOffSeconds() {
  const minSeconds = SPECIAL_CAM_COMMAND[0].minNumber
  const maxSeconds = SPECIAL_CAM_COMMAND[0].maxNumber
  if (form.uiOffSeconds < minSeconds) {
    form.uiOffSeconds = minSeconds
  } else if (form.uiOffSeconds > maxSeconds) {
    form.uiOffSeconds = maxSeconds
  }
  generateUioffCommand()
}

/**
 * UI非表示コマンドを生成します。
 */
function generateUioffCommand() {
  if (form.isUiOff) {
    if (form.isUiOffSeconds) {
      form.generatedUiOffCommand = `${SPECIAL_CAM_COMMAND[0].chatCommand} ${form.uiOffSeconds}`
    } else {
      form.generatedUiOffCommand = `${SPECIAL_CAM_COMMAND[0].chatCommand}`
    }
  } else {
    form.generatedUiOffCommand = ''
  }
}

/**
 * UI非表示の状態に応じてフォームの状態を変更
 */
function changeFormState() {
  //
}

// // お気に入り保存処理
// const { saveFavorite } = useFavorites()

// Snackbar制御
const snackbar = ref(false)
const snackbarMessage = ref('')

// function saveToFavorites() {
//   if (form.color && form.action) {
//     const command = `/do ${form.color} ${form.action}`

//     saveFavorite({
//       color: form.color,
//       action: form.action,
//       command,
//       savedAt: new Date().toISOString(),
//     })

//     snackbarMessage.value = 'お気に入りに追加しました！'
//     snackbar.value = true
//   }
// }

// IndexedDBから初期状態読み取り
const { loadTempSelection, clearTempSelection } = useTempSelection()

onMounted(async () => {
  const temp = await loadTempSelection()
  if (temp) {
    // selectedColor.value = temp.color
    // selectedAction.value = temp.action
    await clearTempSelection()
  }
})

/**
 * 生成されたコマンドをクリップボードにコピーします。
 */
async function copyCommand(value: string) {
  if (!value) return

  try {
    await navigator.clipboard.writeText(value)
    snackbarMessage.value = 'コピーしました！'
    snackbar.value = true
  } catch (err) {
    snackbarMessage.value = 'コピーに失敗しました…'
    snackbar.value = true
  }
}
</script>
