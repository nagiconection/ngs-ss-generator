<template>
  <v-row class="p-space">
    <v-col cols="12" class="pt-5">
      <div class="text-h5 font-weight-bold text-primary mb-2">顔の向きの設定(/cf)</div>
      <div class="text-primary mb-2">※組み合わせによってはコマンドが機能しない場合があります</div>
      <v-row class="mb-2">
        <v-col cols="12" md="6">
          <div class="text-primary mb-2">顔の向きはこのコマンドでリセットできます。</div>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="resetCommand"
            readonly
            append-inner-icon="mdi-content-copy"
            @click:append-inner="$emit('copy', resetCommand)"
          ></v-text-field>
        </v-col>
      </v-row>
      <hr />
    </v-col>
    <v-col cols="12">
      <div class="text-h6 font-weight-bold text-primary mb-2">顔の向きの継続設定</div>
      <v-checkbox
        v-model="props.form.cfOn"
        :label="CAM_COMMAND.cf.name"
        density="compact"
        @change="onChangeCfOn"
      ></v-checkbox>
      <hr />
    </v-col>
    <v-col cols="12">
      <v-row class="mb-2">
        <v-col cols="12" md="6">
          <div class="text-h6 font-weight-bold text-primary mb-2">適応範囲と追従設定</div>
          <v-row>
            <v-col>
              <div class="d-flex flex-column ga-0">
                <!--適応設定-->
                <v-checkbox
                  v-model="props.form.cfAll"
                  :label="CAM_COMMAND.all.name"
                  density="compact"
                  hide-details
                  class="checkbox-no-gap"
                  @change="onCfAllChange"
                ></v-checkbox>
                <v-checkbox
                  v-model="props.form.cfSync"
                  :label="CAM_COMMAND.sync.name"
                  density="compact"
                  hide-details
                  class="checkbox-no-gap"
                  @change="onCfSyncChange"
                ></v-checkbox>
                <!--マウス追従に関するもの-->
                <v-checkbox
                  v-model="props.form.cfStop"
                  :label="CAM_COMMAND.stop.name"
                  density="compact"
                  hide-details
                  class="checkbox-no-gap"
                  @change="onCfStopChange"
                ></v-checkbox>
                <v-checkbox
                  v-model="props.form.cfRev"
                  :label="CAM_COMMAND.rev.name"
                  density="compact"
                  hide-details
                  class="checkbox-no-gap"
                  @change="onCfRevChange"
                ></v-checkbox>
                <v-checkbox
                  v-model="props.form.cfSec"
                  :label="CAM_COMMAND.s.name"
                  density="compact"
                  hide-details
                  class="checkbox-no-gap"
                  @change="onCfSChange"
                ></v-checkbox>
                <v-number-input
                  v-if="props.form.cfSec"
                  v-model="props.form.cfSecNum"
                  type="number"
                  density="compact"
                  hide-details
                  class="my-0 py-0"
                  @blur="normalizeSecNumber"
                  :min="CAM_COMMAND.s.minNumber"
                  :max="CAM_COMMAND.s.maxNumber"
                ></v-number-input>
              </div>
              <hr />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <div class="text-primary">
                ※周囲のキャラクターも変更をすると左右上下の手動変更が効きません
              </div>
              <div class="text-primary">※カメラと反対方向にすると向きの手動設定が効きません</div>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="6">
          <div class="text-h6 font-weight-bold text-primary mb-2">顔の向きの手動設定</div>
          <v-row>
            <v-col cols="12" md="8">
              <v-checkbox
                v-model="props.form.hasCfHnum"
                :label="CAM_COMMAND.h.name"
                density="compact"
                hide-details
                class="checkbox-no-gap"
                @change="onCfHasCfHChange"
                :disabled="props.formState.cfHNumGroup"
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-number-input
                v-model="props.form.cfHnum"
                type="number"
                density="compact"
                hide-details
                class="my-0 py-0"
                @blur="normalizeHVDnumber"
                :min="CAM_COMMAND.h.minNumber"
                :max="CAM_COMMAND.h.maxNumber"
                :disabled="props.formState.cfHNumGroup"
                @update:modelValue="onCfHasCfHChange"
              ></v-number-input>
            </v-col>
          </v-row>
          <v-col>
            <v-slider
              v-model="props.form.cfHnum"
              :min="CAM_COMMAND.h.minNumber"
              :max="CAM_COMMAND.h.maxNumber"
              step="1"
              prepend-icon="mdi-arrow-left-bold"
              append-icon="mdi-arrow-right-bold"
              :disabled="props.formState.cfHNumGroup"
              @update:modelValue="onCfHasCfHChange"
            ></v-slider>
          </v-col>
          <v-row>
            <v-col cols="12" md="8">
              <v-checkbox
                v-model="props.form.hasCfVnum"
                :label="CAM_COMMAND.v.name"
                density="compact"
                hide-details
                class="checkbox-no-gap"
                @change="onCfHasCfVChange"
                :disabled="props.formState.cfVNumGroup"
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-number-input
                v-model="props.form.cfVnum"
                type="number"
                density="compact"
                hide-details
                class="my-0 py-0"
                @blur="normalizeHVDnumber"
                @update:modelValue="onCfHasCfVChange"
                :min="CAM_COMMAND.v.minNumber"
                :max="CAM_COMMAND.v.maxNumber"
                :disabled="props.formState.cfVNumGroup"
              ></v-number-input>
            </v-col>
          </v-row>
          <v-col>
            <v-slider
              v-model="props.form.cfVnum"
              :min="CAM_COMMAND.v.minNumber"
              :max="CAM_COMMAND.v.maxNumber"
              step="1"
              prepend-icon="mdi-arrow-up-bold"
              append-icon="mdi-arrow-down-bold"
              :disabled="props.formState.cfVNumGroup"
              @update:modelValue="onCfHasCfVChange"
            ></v-slider>
          </v-col>
          <v-row>
            <v-col cols="12" md="8">
              <v-checkbox
                v-model="props.form.hasCfDnum"
                :label="CAM_COMMAND.d.name"
                density="compact"
                hide-details
                class="checkbox-no-gap"
                @change="onCfHasCfDChange"
                :disabled="props.formState.cfDNumGroup"
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-number-input
                v-model="props.form.cfDnum"
                type="number"
                density="compact"
                hide-details
                class="my-0 py-0"
                @blur="normalizeHVDnumber"
                @update:modelValue="onCfHasCfDChange"
                :min="CAM_COMMAND.d.minNumber"
                :max="CAM_COMMAND.d.maxNumber"
                :disabled="props.formState.cfDNumGroup"
              ></v-number-input>
            </v-col>
          </v-row>
          <v-col>
            <v-slider
              v-model="props.form.cfDnum"
              :min="CAM_COMMAND.d.minNumber"
              :max="CAM_COMMAND.d.maxNumber"
              step="1"
              prepend-icon="mdi-arrow-top-right-thick"
              append-icon="mdi-arrow-top-left-thick"
              :disabled="props.formState.cfDNumGroup"
              @update:modelValue="onCfHasCfDChange"
            ></v-slider>
          </v-col>
        </v-col>
      </v-row>
      <hr />
    </v-col>
    <v-col cols="12">
      <div class="text-h6 font-weight-bold text-primary mb-2">ロビーアクション設定</div>
      <v-checkbox
        v-model="props.form.useLobyAction"
        label="ロビーアクションを使用する"
        density="compact"
        hide-details
        class="checkbox-no-gap"
        @update:modelValue="onUseLobyActionChange"
      />
      <v-row v-if="props.form.useLobyAction">
        <v-col cols="12" md="6">
          <v-autocomplete
            v-model="props.form.selectedLobyAction"
            :items="lobyActions ?? []"
            item-title="name"
            item-value="chatCommand"
            label="ロビーアクション"
            chips
            clearable
            density="compact"
            @update:modelValue="onUseLobyActionChange"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-checkbox
            v-model="props.form.isUseGenderMotion"
            :label="LOBY_ACTION_OPTION.useGenderMotion.name"
            density="compact"
            hide-details
            @update:modelValue="onUseLobyActionChange"
          ></v-checkbox>
          <v-checkbox
            v-model="props.form.isStopActionAfterSeconds"
            :label="LOBY_ACTION_OPTION.stopActionAfterSeconds.name"
            density="compact"
            hide-details
            @update:modelValue="onUseLobyActionStopChange"
          ></v-checkbox>
          <v-checkbox
            v-model="props.form.isStopActionAfterAlways"
            :label="LOBY_ACTION_OPTION.stopActionAfterAlways.name"
            density="compact"
            hide-details
            @update:modelValue="onUseLobyActionStopChange"
          ></v-checkbox>
          <v-number-input
            v-model="props.form.stopActionAfterSeconds"
            type="number"
            density="compact"
            hide-details
            class="my-0 py-0"
            :precision="2"
            :step="0.01"
            @blur="normalizeSecondsNumber"
            @update:modelValue="onUseLobyActionStopChange"
            :min="LOBY_ACTION_OPTION.stopActionAfterSeconds.minNumber"
            :max="LOBY_ACTION_OPTION.stopActionAfterSeconds.maxNumber"
          ></v-number-input>
        </v-col>
        <hr />
      </v-row>
    </v-col>
  </v-row>
  <div class="fixed-copy-bar">
    <v-container class="py-2">
      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-text-field
            v-model="props.form.generatedCfCommand"
            readonly
            label="生成されたコマンド"
            append-inner-icon="mdi-content-copy"
            @click:append-inner="$emit('copy', props.form.generatedCfCommand)"
          />
        </v-col>
        <v-col cols="12" md="3" class="d-flex align-center justify-center">
          <v-btn color="primary" :disabled="!canSave" @click="onSaveFavorite">
            お気に入りに保存
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
.p-space {
  padding-bottom: 120px;
}

hr {
  margin: 1rem 0;
  border: 0;
  border-top: 2px solid #e0e0e0;
}
.fixed-copy-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: white;
  border-top: 1px solid #ccc;
  z-index: 1000;
  box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.08);
}

::v-deep(.checkbox-no-gap .v-input) {
  margin: 0 !important;
  padding: 0 !important;
}
::v-deep(.checkbox-no-gap .v-input__control) {
  margin: 0 !important;
  padding: 0 !important;
}
::v-deep(.checkbox-no-gap .v-input__details) {
  margin: 0 !important;
  padding: 0 !important;
}
</style>

<script setup lang="ts">
import { type CommandFormModel, type DisabledFormModel } from '~/models/CommandFormModel'
import { CF_RESET, CAM_COMMAND, LOBY_ACTION_OPTION } from '~/constants/const'

const props = defineProps<{
  form: CommandFormModel
  formState: DisabledFormModel
  currentTab: string
}>()

const emit = defineEmits<{
  (e: 'copy', value: string): void
  (e: 'notify', message: string): void
}>()

// フォームに何らかの入力があるかで有効化
const canSave = computed(() => {
  return props.form.generatedCfCommand.trim().length > 0
})
const lobyActions = ref<any>()

/**
 * 顔の向きリセットコマンド用
 */
const resetCommand = ref(CF_RESET)

onMounted(async () => {
  // 'loby_actions' キーで保存してあるマスターデータを取得
  const data = await getMasterData('loby_actions')
  console.log(data)
  if (data) {
    lobyActions.value = data.map((action: any) => {
      return {
        name: action.name,
        chatCommand: action.chatCommand,
      }
    })
  }
})

/**
 * お気に入りに保存する処理
 */
async function onSaveFavorite() {
  try {
    await saveFavorite({ ...props.form }, props.currentTab)
    emit('notify', 'お気に入りを保存しました')
  } catch (err) {
    emit('notify', '保存に失敗しました…')
  }
}

/**
 * 顔の向き数値を正規化する関数
 * 数値が範囲外の場合、最小値または最大値に設定する
 */
function normalizeHVDnumber() {
  const minHNumber = CAM_COMMAND.h.minNumber
  const maxHNumber = CAM_COMMAND.h.maxNumber
  if (props.form.cfHnum < minHNumber) {
    props.form.cfHnum = minHNumber
  } else if (props.form.cfHnum > maxHNumber) {
    props.form.cfHnum = maxHNumber
  }
  const minVNumber = CAM_COMMAND.v.minNumber
  const maxVNumber = CAM_COMMAND.v.maxNumber
  if (props.form.cfVnum < minVNumber) {
    props.form.cfVnum = minVNumber
  } else if (props.form.cfVnum > maxVNumber) {
    props.form.cfVnum = maxVNumber
  }
  const minDNumber = CAM_COMMAND.d.minNumber
  const maxDNumber = CAM_COMMAND.d.maxNumber
  if (props.form.cfDnum < minDNumber) {
    props.form.cfDnum = minDNumber
  } else if (props.form.cfDnum > maxDNumber) {
    props.form.cfDnum = maxDNumber
  }
}

/**
 * ロビーアクションの秒数を正規化する関数
 * 数値が範囲外の場合、最小値または最大値に設定する
 */
function normalizeSecondsNumber() {
  const minSecNumber = LOBY_ACTION_OPTION.stopActionAfterSeconds.minNumber
  const maxSecNumber = LOBY_ACTION_OPTION.stopActionAfterSeconds.maxNumber
  if (props.form.stopActionAfterSeconds < minSecNumber) {
    props.form.stopActionAfterSeconds = minSecNumber
  } else if (props.form.stopActionAfterSeconds > maxSecNumber) {
    props.form.stopActionAfterSeconds = maxSecNumber
  }
}

/**
 * 顔の向きの固定秒数指定を正規化する関数
 */
function normalizeSecNumber() {
  const minSecNumber = CAM_COMMAND.s.minNumber
  const maxSecNumber = CAM_COMMAND.s.maxNumber
  if (props.form.cfSecNum < minSecNumber) {
    props.form.cfSecNum = minSecNumber
  } else if (props.form.cfSecNum > maxSecNumber) {
    props.form.cfSecNum = maxSecNumber
  }
}

/** 顔の向きの継続化設定 */
function onChangeCfOn() {
  rebuildCfCommand()
}
/** Allのチェックボックスの変更設定 */
function onCfAllChange() {
  rebuildCfCommand()
}
/** Syncのチェックボックスの変更設定 */
function onCfSyncChange() {
  rebuildCfCommand()
}
/** stopのチェックボックスの変更設定 */
function onCfStopChange() {
  changeFormState()
  rebuildCfCommand()
}
/** Revのチェックボックスの変更設定 */
function onCfRevChange() {
  changeFormState()
  rebuildCfCommand()
}

/**
 * Sのチェックボックスの変更設定
 */
function onCfSChange() {
  changeFormState()
  rebuildCfCommand()
}

/**
 * HasCfHのチェックボックスの変更設定
 */
function onCfHasCfHChange() {
  rebuildCfCommand()
}
/**
 * HasCfVのチェックボックスの変更設定
 */
function onCfHasCfVChange() {
  rebuildCfCommand()
}
/**
 * HasCfDのチェックボックスの変更設定
 */
function onCfHasCfDChange() {
  rebuildCfCommand()
}
/**
 * ロビーアクションの使用チェックボックスの変更設定
 */
function onUseLobyActionChange() {
  rebuildCfCommand()
}

/**
 *  ロビーアクションの停止設定の変更
 */
function onUseLobyActionStopChange() {
  rebuildCfCommand()
}

/**
 * form の各フラグを見て generatedCfCommand を再構築する
 */
function rebuildCfCommand() {
  const parts: string[] = ['/cf']

  if (props.form.cfOn) {
    parts.push('on')
  }
  if (props.form.cfAll) {
    parts.push(CAM_COMMAND.all.chatCommand)
  }
  if (props.form.cfSync) {
    parts.push(CAM_COMMAND.sync.chatCommand)
  }
  if (props.form.cfStop) {
    parts.push(CAM_COMMAND.stop.chatCommand)
  }
  if (props.form.cfRev) {
    parts.push(CAM_COMMAND.rev.chatCommand)
  }
  if (props.form.cfSec) {
    parts.push(`${CAM_COMMAND.s.chatCommand}${props.form.cfSecNum}`)
  }
  if (props.form.hasCfHnum) {
    if (!props.formState.cfHNumGroup) {
      parts.push(`${CAM_COMMAND.h.chatCommand}${props.form.cfHnum}`)
    }
  }
  if (props.form.hasCfVnum) {
    if (!props.formState.cfVNumGroup) {
      parts.push(`${CAM_COMMAND.v.chatCommand}${props.form.cfVnum}`)
    }
  }
  if (props.form.hasCfDnum) {
    if (!props.formState.cfDNumGroup) {
      parts.push(`${CAM_COMMAND.d.chatCommand}${props.form.cfDnum}`)
    }
  }

  if (props.form.useLobyAction) {
    if (props.form.isUseGenderMotion) {
      parts.push('/' + LOBY_ACTION_OPTION.useGenderMotion.chatCommand)
    } else {
      parts.push('/la')
    }
    parts.push(props.form.selectedLobyAction)
    if (props.form.isStopActionAfterSeconds) {
      parts.push(
        `${LOBY_ACTION_OPTION.stopActionAfterSeconds.chatCommand}${props.form.stopActionAfterSeconds}`
      )
    }
    if (props.form.isStopActionAfterAlways) {
      parts.push(
        `${LOBY_ACTION_OPTION.stopActionAfterAlways.chatCommand}${props.form.stopActionAfterSeconds}`
      )
    }
  }

  props.form.generatedCfCommand = parts.join(' ')
}

/**
 * フォームの状態に応じて、H/V/Dの数値入力グループを有効/無効にする
 */
function changeFormState() {
  const shouldDisableHV = props.form.cfStop || props.form.cfRev || props.form.cfSec
  props.formState.cfHNumGroup = shouldDisableHV
  props.formState.cfVNumGroup = shouldDisableHV
  props.formState.cfDNumGroup = props.form.cfRev
}
</script>
