/**
 * コマンドを保存するフォームモデルです
 */
export interface CommandFormModel {
  /** UIをオフにするかどうか */
  isUiOff: boolean
  /** UIオフの秒数を指定するかどうか */
  isUiOffSeconds: boolean
  /** UIオフの秒数 */
  uiOffSeconds: number
  /** 生成されたUI非表示のコマンド */
  generatedUiOffCommand: string
  /** 生成された目線設定のコマンド */
  generatedEasyCommand: string
  /** 選択中のエリア */
  selectedArea: string
  /** 選択中の天気 */
  sellectedWeather: string
  /** エリアの時刻 */
  areaTime: number
  /** 生成された天気コマンド */
  generatedWeatherCommand: string
  /** CF:顔向きを解除するまで有効 */
  cfOn: boolean
  /** CF: 周囲のキャラクターも変更*/
  cfAll: boolean
  /** CF: 他のプレイヤーの画面にも反映*/
  cfSync: boolean
  /** CF: カメラの向きを固定 */
  cfStop: boolean
  /** CF: カメラと反対方向にする */
  cfRev: boolean
  /** CF:カメラを指定秒数後に固定 */
  cfSec: boolean
  /** CF:指定固定秒数 */
  cfSecNum: number
  /** CF:左右 */
  cfHnum: number
  /** CF:左右有効 */
  hasCfHnum: boolean
  /** CF:上下 */
  cfVnum: number
  /**上下有効 */
  hasCfVnum: boolean
  /** CF:角度 */
  cfDnum: number
  /** CF:角度有効 */
  hasCfDnum: boolean
  /** ロビーアクションを使うかどうか  */
  useLobyAction: boolean
  /** 選択しているロビーアクション */
  selectedLobyAction: string
  /** 異性モーションを使用する */
  isUseGenderMotion: boolean
  /** 指定後に10秒間停止する */
  isStopActionAfterSeconds: boolean
  /** 指定後に無限に停止する */
  isStopActionAfterAlways: boolean
  /** 指定する秒数 */
  stopActionAfterSeconds: number
  /** CF:顔向き設定の生成コマンド */
  generatedCfCommand: string
  /** 生成されたコマンド */
  generatedCommand: string
}

/**
 * フォームの活性管理状態です
 */
export interface DisabledFormModel {
  /** UI非表示の活性状態 */
  uiOffGroup: boolean
  /** カメラ目線の活性状態 */
  ceallGroup: boolean
  /** hの値の活性状態 */
  cfHNumGroup: boolean
  /** vの値の活性状態 */
  cfVNumGroup: boolean
  /** dの値の活性状態 */
  cfDNumGroup: boolean
}

/**
 * デフォルトのコマンドフォームモデルを生成する関数
 */
export const createDefaultCommandFormModel = (): CommandFormModel => ({
  isUiOff: true,
  isUiOffSeconds: false,
  uiOffSeconds: 1,
  generatedUiOffCommand: '/uioff',
  generatedEasyCommand: '/ceall',
  selectedArea: 'aelio',
  sellectedWeather: '/pr Cloudy',
  areaTime: 1,
  generatedWeatherCommand: '/pr Cloudy 1',
  cfOn: false,
  cfAll: false,
  cfSync: false,
  cfStop: false,
  cfRev: false,
  cfSec: false,
  cfSecNum: 0,
  cfHnum: 0,
  hasCfHnum: false,
  cfVnum: 0,
  hasCfVnum: false,
  cfDnum: 0,
  hasCfDnum: false,
  useLobyAction: false,
  isUseGenderMotion: false,
  isStopActionAfterSeconds: false,
  isStopActionAfterAlways: false,
  stopActionAfterSeconds: 0.0,
  selectedLobyAction: '',
  generatedCfCommand: '/cf',
  generatedCommand: '',
})

/**
 * フォームの活性状態管理モデルを生成する関数
 */
export const createDisabledFormModel = (): DisabledFormModel => ({
  uiOffGroup: false,
  ceallGroup: false,
  cfHNumGroup: false,
  cfVNumGroup: false,
  cfDNumGroup: false,
})
