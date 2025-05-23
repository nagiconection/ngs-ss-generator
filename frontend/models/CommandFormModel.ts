import { fa } from 'vuetify/locale'

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
  generatedCommand: '',
})

/**
 * フォームの活性状態管理モデルを生成する関数
 */
export const createDisabledFormModel = (): DisabledFormModel => ({
  uiOffGroup: false,
  ceallGroup: false,
})
