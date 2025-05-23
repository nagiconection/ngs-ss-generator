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

export const CAM_COMMAND = [
  {
    name: '解除するまで顔の向きの変更を継続',
    chatCommand: 'on',
    category: '1',
    updateDate: '2025-05-23 00:00:00',
  },
  {
    name: '顔の向きの変更を解除',
    chatCommand: 'off',
    category: '1',
    updateDate: '2025-05-23 00:00:00',
  },
  {
    name: '周囲のキャラクターも変更',
    chatCommand: 'all',
    category: '2',
    updateDate: '2025-05-23 00:00:00',
  },
  {
    name: '他のプレイヤーの画面にも反映',
    chatCommand: 'sync',
    category: '3',
    updateDate: '2025-05-23 00:00:00',
  },
  {
    name: '顔の向きを現在のカメラ方向に固定',
    chatCommand: 'stop',
    category: '4',
    updateDate: '2025-05-23 00:00:00',
  },
  {
    name: '顔の左右方向を指定した数字の角度に固定',
    chatCommand: 'h',
    category: '5',
    hasNumber: true,
    minNumber: -90,
    maxNumber: 90,
    updateDate: '2025-05-23 00:00:00',
  },
  {
    name: '顔の上下方向を指定した数字の角度に固定',
    chatCommand: 'v',
    category: '6',
    hasNumber: true,
    minNumber: -90,
    maxNumber: 90,
    updateDate: '2025-05-23 00:00:00',
  },
  {
    name: '顔の傾きを指定した数字の角度に固定',
    chatCommand: 'd',
    category: '7',
    hasNumber: true,
    minNumber: -90,
    maxNumber: 90,
    updateDate: '2025-05-23 00:00:00',
  },
  {
    name: '顔の向きをカメラと反対方向にする',
    chatCommand: 'rev',
    category: '8',
    updateDate: '2025-05-23 00:00:00',
  },
]

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

export const WEATHERS = [
  {
    name: 'エアリオ 曇り',
    chatCommand: '/pr Cloudy',
    updateDate: '2025-05-23 00:00:00',
  },
  {
    name: 'エアリオ 晴れ',
    chatCommand: '/pr Fine',
    updateDate: '2025-05-23 00:00:00',
  },
  {
    name: 'エアリオ 雨',
    chatCommand: '/pr Rain',
    updateDate: '2025-05-23 00:00:00',
  },
  {
    name: 'エアリオ 雷雨',
    chatCommand: '/pr Storm',
    updateDate: '2025-05-23 00:00:00',
  },
  {
    name: 'リテム 砂嵐',
    chatCommand: '/pr Dust',
    updateDate: '2025-05-23 00:00:00',
  },
  {
    name: 'リテム 晴れ',
    chatCommand: '/pr Fine',
    updateDate: '2025-05-23 00:00:00',
  },
  {
    name: 'リテム 熱波',
    chatCommand: '/pr Heat',
    updateDate: '2025-05-23 00:00:00',
  },
  {
    name: 'リテム 流星雨',
    chatCommand: '/pr Meteorshower',
    updateDate: '2025-05-23 00:00:00',
  },
  {
    name: 'リテム 砂塵嵐',
    chatCommand: '/pr Sandstorm',
    updateDate: '2025-05-23 00:00:00',
  },
  {
    name: 'クヴァリス オーロラ',
    chatCommand: '/pr Aurora',
    updateDate: '2025-05-23 00:00:00',
  },
  {
    name: 'クヴァリス 薄曇り',
    chatCommand: '/pr CloudSea',
    updateDate: '2025-05-23 00:00:00',
  },
  {
    name: 'クヴァリス 晴れ',
    chatCommand: '/pr Fine',
    updateDate: '2025-05-23 00:00:00',
  },
  {
    name: 'クヴァリス 雪',
    chatCommand: '/pr Snow',
    updateDate: '2025-05-23 00:00:00',
  },
  {
    name: 'クヴァリス 吹雪',
    chatCommand: '/pr Snowstorm',
    updateDate: '2025-05-23 00:00:00',
  },
  {
    name: 'スティア 降灰',
    chatCommand: '/pr Ash',
    updateDate: '2025-05-23 00:00:00',
  },
  {
    name: 'スティア 晴れ',
    chatCommand: '/pr Fine',
    updateDate: '2025-05-23 00:00:00',
  },
  {
    name: 'スティア 熱暑',
    chatCommand: '/pr Hot_blast',
    updateDate: '2025-05-23 00:00:00',
  },
  {
    name: 'スティア 炎獄',
    chatCommand: '/pr Magma',
    updateDate: '2025-05-23 00:00:00',
  },
  {
    name: 'スティア 火焔鳥',
    chatCommand: '/pr Phoenix',
    updateDate: '2025-05-23 00:00:00',
  },
]
