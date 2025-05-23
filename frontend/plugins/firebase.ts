import { initializeApp, getApps } from 'firebase/app'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'

export default defineNuxtPlugin(() => {
  const firebaseApp =
    getApps().length === 0 ? initializeApp({ projectId: 'ngs-ss-generator-fb' }) : getApps()[0]

  const db = getFirestore(firebaseApp)

  if (process.env.NODE_ENV === 'development') {
    // TODO:Dockerで起動したらうまくいかないから助けてくれーいｗｗｗｗ
    // connectFirestoreEmulator(db, 'host.docker.internal', 8080)
    connectFirestoreEmulator(db, 'localhost', 8080)
  }

  return {
    provide: {
      db,
    },
  }
})
