import app from "@/middleware/firebase"
import { getAuth } from "firebase/auth"
import { getFirestore, doc , collection} from "firebase/firestore"

export const db = getFirestore(app)
export const getCurrentUser = () => getAuth(app).currentUser
export const getCurrentUserId = () => {
  const currentUser = getCurrentUser()
  return currentUser?.uid || null
}

export const userDoc = () => {
  const uid = getCurrentUserId()
  return uid ? doc(db, "users", uid) : null
}

export const meetupsRef = collection(db, "meetups")
export const usersRef = collection(db, "users")


export default {
  db,
  getCurrentUser,
  getCurrentUserId,
  userDoc,
  meetupsRef,
  usersRef
}
