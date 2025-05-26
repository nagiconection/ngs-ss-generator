import { initializeApp, getApps } from 'firebase/app'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getStorage, connectStorageEmulator } from 'firebase/storage'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const firebaseApp =
    getApps().length === 0
      ? initializeApp({
          apiKey: config.public.firebaseApiKey,
          projectId: config.public.firebaseProjectId,
          storageBucket: config.public.firebaseStorageBucket,
        })
      : getApps()[0]

  const db = getFirestore(firebaseApp)
  const storage = getStorage(firebaseApp)

  if (process.env.NODE_ENV === 'development') {
    // TODO:Dockerで起動したらうまくいかないから助けてくれーいｗｗｗｗ
    // connectFirestoreEmulator(db, 'host.docker.internal', 8080)
    connectFirestoreEmulator(db, 'localhost', 8080)
    connectStorageEmulator(storage, 'localhost', 9199)
  }

  return {
    provide: {
      db,
      storage,
    },
  }
})
