import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "xxx",
  authDomain: "xxx.firebaseapp.com",
  projectId: "xxx",
};

export default defineNuxtPlugin(() => {
  const app = initializeApp(firebaseConfig);
});
