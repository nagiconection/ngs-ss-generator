<template>
  <v-app>
    <v-main>
      <v-container>
        <h1 class="text-2xl font-bold">Hello from Nuxt + Vuetify + Tailwind</h1>
        <v-btn color="primary" @click="addData">Vuetify Button</v-btn>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { collection, addDoc } from 'firebase/firestore'

const { $db } = useNuxtApp()

const addData = async () => {
  await addDoc(collection($db, 'sampleData'), {
    message: 'Hello again Firestore Emulator',
    createdAt: new Date(),
  })
}
</script>
