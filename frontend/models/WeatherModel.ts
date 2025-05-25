/**
 * 天気の情報を表すインターフェース
 */
export interface Weather {
  area: string
  areaName: string
  weathers: WeatherDetail[]
}

/**
 * 天気の詳細情報を表すインターフェース
 */
export interface WeatherDetail {
  name: string
  chatCommand: string
  hasNumber: boolean
  minNumber: number
  maxNumber: number
  updateDate: string
}

/**
 * デフォルトの天気モデルを生成する関数
 */
export const createDefaultWeatherModel = (): Weather => ({
  area: 'aelio',
  areaName: 'エリアを選択してください',
  weathers: [
    {
      name: 'エリアを選択してください',
      chatCommand: 'エリアを選択してください',
      hasNumber: false,
      minNumber: 0,
      maxNumber: 0,
      updateDate: '',
    },
  ],
})
