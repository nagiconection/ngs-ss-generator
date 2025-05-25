export const CF_RESET = '/cf off'

/**
 * UIオフ用定数
 */
export const SPECIAL_CAM_COMMAND = [
  {
    name: 'UIをオフ',
    chatCommand: '/uioff',
    category: '1',
    hasNumber: true,
    minNumber: 1,
    maxNumber: 600,
    updateDate: '2025-05-23 00:00:00',
  },
]

/**
 * cf設定ファイル
 */
export const CAM_COMMAND = {
  cf: {
    name: '解除するまで顔の向きの変更を継続',
    chatCommand: 'on',
    category: '1',
    updateDate: '2025-05-23 00:00:00',
  },
  off: {
    name: '顔の向きの変更を解除',
    chatCommand: 'off',
    category: '1',
    updateDate: '2025-05-23 00:00:00',
  },
  all: {
    name: '周囲のキャラクターも変更',
    chatCommand: 'all',
    category: '2',
    updateDate: '2025-05-23 00:00:00',
  },
  sync: {
    name: '他のプレイヤーの画面にも反映',
    chatCommand: 'sync',
    category: '3',
    updateDate: '2025-05-23 00:00:00',
  },
  stop: {
    name: '顔の向きを現在のカメラ方向に固定',
    chatCommand: 'stop',
    category: '4',
    updateDate: '2025-05-23 00:00:00',
  },
  h: {
    name: '左右方向を指定(正面から見て)',
    chatCommand: 'h',
    category: '5',
    hasNumber: true,
    minNumber: -90,
    maxNumber: 90,
    updateDate: '2025-05-23 00:00:00',
  },
  v: {
    name: '上下方向を指定',
    chatCommand: 'v',
    category: '6',
    hasNumber: true,
    minNumber: -45,
    maxNumber: 45,
    updateDate: '2025-05-23 00:00:00',
  },
  d: {
    name: '傾きを指定(正面から見て)',
    chatCommand: 'd',
    category: '7',
    hasNumber: true,
    minNumber: -45,
    maxNumber: 45,
    updateDate: '2025-05-23 00:00:00',
  },
  rev: {
    name: '顔の向きをカメラと反対方向にする',
    chatCommand: 'rev',
    category: '8',
    updateDate: '2025-05-23 00:00:00',
  },
  s: {
    name: '指定した秒数後の向きで固定する',
    chatCommand: 's',
    category: '9',
    hasNumber: true,
    minNumber: 1,
    maxNumber: 30,
    updateDate: '2025-05-23 00:00:00',
  },
}

/**
 * カメラ目線設定ファイル
 */
export const EASY_COM_COMMAND = [
  {
    name: '自分と周囲のキャラクターを10秒間カメラ目線にする',
    chatCommand: '/ceall',
    category: '1',
    updateDate: '2025-05-23 00:00:00',
  },
  {
    name: '解除するまでカメラ目線を継続',
    chatCommand: '/ceall on',
    category: '1',
    updateDate: '2025-05-23 00:00:00',
  },
  {
    name: 'カメラ目線を解除',
    chatCommand: '/ceall off',
    category: '1',
    updateDate: '2025-05-23 00:00:00',
  },
]

/**
 * チャットのターゲット設定定数
 */
export const CHAT_TARGET = [
  {
    name: '周囲',
    chatCommand: '/a',
    updateDate: '2025-05-23 00:00:00',
  },
  {
    name: 'パーティー',
    chatCommand: '/p',
    updateDate: '2025-05-23 00:00:00',
  },
  {
    name: 'チーム',
    chatCommand: '/t',
    updateDate: '2025-05-23 00:00:00',
  },
]

/**
 * 天気設定定数
 */
export const WEATHERS = [
  {
    area: 'aelio',
    areaName: 'エアリオ',
    weathers: [
      {
        name: '曇り',
        chatCommand: '/pr Cloudy',
        hasNumber: true,
        minNumber: 1,
        maxNumber: 24,
        updateDate: '2025-05-23 00:00:00',
      },
      {
        name: '晴れ',
        chatCommand: '/pr Fine',
        hasNumber: true,
        minNumber: 1,
        maxNumber: 24,
        updateDate: '2025-05-23 00:00:00',
      },
      {
        name: '雨',
        chatCommand: '/pr Rain',
        hasNumber: true,
        minNumber: 1,
        maxNumber: 24,
        updateDate: '2025-05-23 00:00:00',
      },
      {
        name: '雷雨',
        chatCommand: '/pr Storm',
        hasNumber: true,
        minNumber: 1,
        maxNumber: 24,
        updateDate: '2025-05-23 00:00:00',
      },
    ],
  },
  {
    area: 'retem',
    areaName: 'リテム',
    weathers: [
      {
        name: '砂嵐',
        chatCommand: '/pr Dust',
        hasNumber: true,
        minNumber: 1,
        maxNumber: 24,
        updateDate: '2025-05-23 00:00:00',
      },
      {
        name: '晴れ',
        chatCommand: '/pr Fine',
        hasNumber: true,
        minNumber: 1,
        maxNumber: 24,
        updateDate: '2025-05-23 00:00:00',
      },
      {
        name: '熱波',
        chatCommand: '/pr Heat',
        hasNumber: true,
        minNumber: 1,
        maxNumber: 24,
        updateDate: '2025-05-23 00:00:00',
      },
      {
        name: '流星雨',
        chatCommand: '/pr Meteorshower',
        hasNumber: true,
        minNumber: 1,
        maxNumber: 24,
        updateDate: '2025-05-23 00:00:00',
      },
      {
        name: '砂塵嵐',
        chatCommand: '/pr Sandstorm',
        hasNumber: true,
        minNumber: 1,
        maxNumber: 24,
        updateDate: '2025-05-23 00:00:00',
      },
    ],
  },
  {
    area: 'kvaris',
    areaName: 'クヴァリス',
    weathers: [
      {
        name: 'オーロラ',
        chatCommand: '/pr Aurora',
        hasNumber: true,
        minNumber: 1,
        maxNumber: 24,
        updateDate: '2025-05-23 00:00:00',
      },
      {
        name: '薄曇り',
        chatCommand: '/pr CloudSea',
        hasNumber: true,
        minNumber: 1,
        maxNumber: 24,
        updateDate: '2025-05-23 00:00:00',
      },
      {
        name: '晴れ',
        chatCommand: '/pr Fine',
        hasNumber: true,
        minNumber: 1,
        maxNumber: 24,
        updateDate: '2025-05-23 00:00:00',
      },
      {
        name: '雪',
        chatCommand: '/pr Snow',
        hasNumber: true,
        minNumber: 1,
        maxNumber: 24,
        updateDate: '2025-05-23 00:00:00',
      },
      {
        name: '吹雪',
        chatCommand: '/pr Snowstorm',
        hasNumber: true,
        minNumber: 1,
        maxNumber: 24,
        updateDate: '2025-05-23 00:00:00',
      },
    ],
  },
  {
    area: 'stia',
    areaName: 'スティア',
    weathers: [
      {
        name: '降灰',
        chatCommand: '/pr Ash',
        hasNumber: true,
        minNumber: 1,
        maxNumber: 24,
        updateDate: '2025-05-23 00:00:00',
      },
      {
        name: '晴れ',
        chatCommand: '/pr Fine',
        hasNumber: true,
        minNumber: 1,
        maxNumber: 24,
        updateDate: '2025-05-23 00:00:00',
      },
      {
        name: '熱暑',
        chatCommand: '/pr Hot_blast',
        hasNumber: true,
        minNumber: 1,
        maxNumber: 24,
        updateDate: '2025-05-23 00:00:00',
      },
      {
        name: '炎獄',
        chatCommand: '/pr Magma',
        hasNumber: true,
        minNumber: 1,
        maxNumber: 24,
        updateDate: '2025-05-23 00:00:00',
      },
      {
        name: '火焔鳥',
        chatCommand: '/pr Phoenix',
        hasNumber: true,
        minNumber: 1,
        maxNumber: 24,
        updateDate: '2025-05-23 00:00:00',
      },
    ],
  },
]
