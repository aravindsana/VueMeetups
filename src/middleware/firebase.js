import { initializeApp } from "firebase/app"
import { firebase } from "@/middleware/config"
import { getAuth, connectAuthEmulator } from "firebase/auth"
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore"
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { getStorage, connectStorageEmulator } from "firebase/storage";


const app = initializeApp(firebase)

const auth = getAuth(app)
const db = getFirestore(app)
const functions = getFunctions(app)
const storage = getStorage(app);

console.log(process.env.NODE_ENV)

console.log(firebase)

if (process.env.NODE_ENV === "development") {
  connectFirestoreEmulator(db, "localhost", 8080)
  connectAuthEmulator(auth, "http://localhost:9099")
  connectFunctionsEmulator(functions, "localhost", 5001);
  connectStorageEmulator(storage, "localhost", 9199);
}

export default app
