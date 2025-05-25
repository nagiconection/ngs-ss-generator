<template>
  <v-row>
    <!-- UIオフ設定 -->
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
            <v-number-input
              v-model="form.uiOffSeconds"
              type="number"
              density="compact"
              hide-details
              class="my-0 py-0"
              style="width: 150px"
              suffix="秒"
              @blur="normalizeUiOffSeconds"
              @update:modelValue="generateUioffCommand"
              :min="SPECIAL_CAM_COMMAND[0].minNumber"
              :max="SPECIAL_CAM_COMMAND[0].maxNumber"
            ></v-number-input>
          </v-col>
        </v-row>
      </div>
      <div class="mt-2">
        <v-text-field
          v-model="form.generatedUiOffCommand"
          readonly
          append-inner-icon="mdi-content-copy"
          @click:append-inner="$emit('copy', form.generatedUiOffCommand)"
        ></v-text-field>
      </div>
      <hr />
    </v-col>

    <!-- カメラ目線設定 -->
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
        <v-text-field
          v-model="form.generatedEasyCommand"
          readonly
          append-inner-icon="mdi-content-copy"
          @click:append-inner="$emit('copy', form.generatedEasyCommand)"
        ></v-text-field>
      </div>
      <hr />
    </v-col>

    <!-- 天候設定 -->
    <v-col cols="12" class="pt-5">
      <div class="text-h6 font-weight-bold text-primary mb-2">天気の設定(/pr)</div>
      <div class="text-primary mb-2">天気コマンドは撮影専用ルーム内でのみ使用可能</div>
      <v-row class="align-center">
        <v-col cols="12" md="6">
          <v-radio-group v-model="props.form.selectedArea" hide-details>
            <v-radio
              v-for="item in WEATHERS"
              :key="item.area"
              :label="item.areaName"
              :value="item.area"
              density="compact"
              @change="props.form.sellectedWeather = item.weathers[0].chatCommand"
            />
          </v-radio-group>
        </v-col>
        <v-col cols="12" md="6">
          <v-row class="align-center">
            <v-col cols="12">
              <v-select
                v-model="props.form.sellectedWeather"
                :items="areaWhethers()"
                item-title="name"
                item-value="chatCommand"
                label="天気の設定"
                hide-details
                :disabled="!props.form.selectedArea"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="props.form.areaTime"
                type="number"
                density="compact"
                hide-details
                class="my-0 py-0"
                style="width: 120px"
                suffix="時"
                @blur="normalizeTimesWeather()"
                :min="getWeatherMinNumber(props.form.selectedArea, props.form.sellectedWeather)"
                :max="getWeatherMaxNumber(props.form.selectedArea, props.form.sellectedWeather)"
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" class="mt-2">
          <v-text-field
            v-model="props.form.generatedWeatherCommand"
            readonly
            append-inner-icon="mdi-content-copy"
            @click:append-inner="$emit('copy', props.form.generatedWeatherCommand)"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<style scoped>
hr {
  margin: 1rem 0;
  border: 0;
  border-top: 2px solid #e0e0e0;
}
</style>

<script setup lang="ts">
import { SPECIAL_CAM_COMMAND, EASY_COM_COMMAND, WEATHERS } from '~/constants/const'
import type { CommandFormModel, DisabledFormModel } from '~/models/CommandFormModel'
import { createDefaultWeatherModel, type WeatherDetail } from '~/models/WeatherModel'

const props = defineProps<{
  form: CommandFormModel
  formState: DisabledFormModel
  currentTab: string
}>()

const emit = defineEmits<{
  (e: 'copy', value: string): void
}>()

watch([toRef(props.form, 'sellectedWeather'), toRef(props.form, 'areaTime')], ([weather, time]) => {
  if (weather && time !== null && time !== undefined) {
    props.form.generatedWeatherCommand = `${weather} ${time}`
  } else {
    props.form.generatedWeatherCommand = ''
  }
})

/**
 * UI非表示の状態が変更されたときの処理
 * @param value UI非表示の状態
 */
function onUiOffSecondsChanged() {
  props.form.uiOffSeconds = 1
  generateUioffCommand()
}

/**
 * UI非表示の秒数指定状態が変更されたときの処理
 * @param value UI非表示の状態
 */
function normalizeUiOffSeconds() {
  const minSeconds = SPECIAL_CAM_COMMAND[0].minNumber
  const maxSeconds = SPECIAL_CAM_COMMAND[0].maxNumber
  if (props.form.uiOffSeconds < minSeconds) {
    props.form.uiOffSeconds = minSeconds
  } else if (props.form.uiOffSeconds > maxSeconds) {
    props.form.uiOffSeconds = maxSeconds
  }
  generateUioffCommand()
}

/**
 * UI非表示コマンドを生成します。
 */
function generateUioffCommand() {
  if (props.form.isUiOff) {
    if (props.form.isUiOffSeconds) {
      props.form.generatedUiOffCommand = `${SPECIAL_CAM_COMMAND[0].chatCommand} ${props.form.uiOffSeconds}`
    } else {
      props.form.generatedUiOffCommand = `${SPECIAL_CAM_COMMAND[0].chatCommand}`
    }
  } else {
    props.form.generatedUiOffCommand = ''
  }
}

/**
 * 選択しているエリアの天気を取得
 */
const areaWhethers = (): WeatherDetail[] => {
  const area = WEATHERS.find(item => item.area === props.form.selectedArea)
  return area ? area.weathers : createDefaultWeatherModel().weathers
}

/**
 * 選択しているエリアの天気の最小値と最大値を取得して、範囲外なら収める
 */
function normalizeTimesWeather(): void {
  // 現在選択中の天気詳細モデルを取得
  const weatherDetail = areaWhethers().find(
    item => item.chatCommand === props.form.sellectedWeather
  )
  if (!weatherDetail) return
  if (props.form.areaTime < weatherDetail?.minNumber) {
    props.form.areaTime = weatherDetail.minNumber
  } else if (props.form.areaTime > weatherDetail.maxNumber) {
    props.form.areaTime = weatherDetail.maxNumber
  }
}

/**
 * エリアの時刻最小値を取得
 *
 * @param area エリア名
 * @param weather 天気コマンド
 * @returns 最小値
 */
function getWeatherMinNumber(area: string, weather: string): number {
  const areaDetail = WEATHERS.find(item => item.area === area)
  if (!areaDetail) {
    return 1
  }
  const weatherDetail = areaDetail.weathers.find(item => item.chatCommand === weather)
  return weatherDetail ? weatherDetail.minNumber : 1
}

/**
 * エリアの時刻最大値を取得
 *
 * @param area エリア名
 * @param weather 天気コマンド
 * @returns 最大値
 */
function getWeatherMaxNumber(area: string, weather: string): number {
  const areaDetail = WEATHERS.find(item => item.area === area)
  if (!areaDetail) {
    return 24
  }
  const weatherDetail = areaDetail.weathers.find(item => item.chatCommand === weather)
  return weatherDetail ? weatherDetail.maxNumber : 24
}
</script>
