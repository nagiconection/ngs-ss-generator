<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon v-if="isMobile" @click="drawer = !drawer" />
      <v-toolbar-title>NGS撮影コマンドジェネレータ</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      :temporary="isMobile"
      :permanent="!isMobile"
      width="200"
    >
      <v-list dense nav>
        <v-list-item to="/" link prepend-icon="mdi-home">
          <v-list-item-title>トップ</v-list-item-title>
        </v-list-item>
        <v-list-item to="/favorites" link prepend-icon="mdi-heart">
          <v-list-item-title>お気に入り</v-list-item-title>
        </v-list-item>
        <v-list-item to="/news" link prepend-icon="mdi-bell">
          <v-list-item-title>お知らせ</v-list-item-title>
        </v-list-item>
        <v-list-item to="/info" link prepend-icon="mdi-information">
          <v-list-item-title>情報</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container class="pa-4 pt-4">
        <NuxtPage />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDisplay } from 'vuetify'

/** レスポンシブ判定（モバイル判定） */
const { mobile } = useDisplay()
/** モバイルであるかどうか */
const isMobile = mobile

/** ドロワー開閉状態 */
const drawer = ref(!isMobile.value)
/** ウィンドウ幅を監視 */
watch(isMobile, val => {
  drawer.value = !val
})
</script>
