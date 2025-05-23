<template>
  <v-container class="pa-4 pt-12">
    <h2 class="text-h5 mb-6">このアプリについて</h2>

    <v-card class="mb-6">
      <v-card-title>クレジット</v-card-title>
      <v-card-text>
        このアプリは、nagiによって開発されました。 フロントエンドには Nuxt 3 +
        Vuetifyを使用しています。
      </v-card-text>
    </v-card>

    <v-card class="mb-6">
      <v-card-title>ご意見・お問い合わせ</v-card-title>
      <v-card-text class="d-flex align-center gap-2">
        <v-icon size="20">mdi-github</v-icon>
        <a
          href="https://github.com/nagiconection/ngs-ss-generator"
          target="_blank"
          class="text-decoration-none"
        >
          your-repo
        </a>
      </v-card-text>
    </v-card>

    <v-card>
      <v-card-title>権利表記</v-card-title>
      <v-card-text>（C）SEGA 『PHANTASY STAR ONLINE 2』公式サイト https://pso2.jp/</v-card-text>
    </v-card>
  </v-container>
</template>
