import app from "@/middleware/firebase"
import { getAuth, signInWithEmailAndPassword , createUserWithEmailAndPassword, signOut} from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";
import { getFirestore, doc, updateDoc } from "firebase/firestore";


const functions = getFunctions(app);

const auth = getAuth(app);

const db = getFirestore(app)



export default {

    CREATE_MEETUP({commit, getters},payload){

      commit('SET_LOADING', true)

        const meetupData = {
          title: payload.title,
          location: payload.location,
          description: payload.description,
          date: payload.date.toString(),
          creatorId: getters.getUser.id,
          image: payload.image
        }

        const addMessage = httpsCallable(functions, 'addRequest');
        addMessage(meetupData)
          .then((result) => {
            commit('SET_LOADING', false)
            // Read result of the Cloud Function.
            const meetup_id = result.data;

            return meetup_id
          })
          .catch((error) => {
            commit('SET_LOADING', false)
            console.log(error)
          });
     
      },

      UPDATE_MEETUP_DATA ({commit}, payload) {
        commit('SET_LOADING', true)
        const updateObj = {}
        if (payload.title) {
          updateObj.title = payload.title
        }
        if (payload.description) {
          updateObj.description = payload.description
        }
        if (payload.date) {
          updateObj.date = payload.date
        }

        const meetupsRef = doc(db, "meetups", payload.id);

        // Set the "capital" field of the city 'DC'
        updateDoc(meetupsRef, updateObj)
          .then(() => {
            // console.log("updated")
            commit('SET_LOADING', false)
          })
          .catch(error => {
            console.log(error)
            commit('SET_LOADING', false)
          });
      },

      REGISTER_USER_FOR_MEETUP({commit, getters}, payload) {
        commit('SET_LOADING', true)

        const user = getters.getUser

        const registerMeetup = httpsCallable(functions, 'registerMeetup');
        registerMeetup({
          userid : user.id,
          meetup_id : payload
        })
          .then(() => {
            commit('SET_LOADING', false)
           
          })
          .catch((error) => {
            commit('SET_LOADING', false)
            console.log(error)
          });
      },

      UNREGISTER_USER_FORM_MEETUP ({commit, getters}, payload) {
        commit('SET_LOADING', true)
        const user = getters.getUser
        if (!user.fbKeys) {
          return
        }
        const fbKey = user.fbKeys[payload]

        console.log(fbKey)

        const UnregisterMeetup = httpsCallable(functions, 'UnregisterMeetup');
        UnregisterMeetup({
          userid : user.id,
          fbKey : fbKey,
          meetupid : payload
        })
          .then(() => {
            commit('SET_LOADING', false)
           
          })
          .catch((error) => {
            commit('SET_LOADING', false)
            console.log(error)
          });
      },
      
      SIGN_USER_UP({commit}, payload) {
        commit('SET_LOADING', true)
        commit('CLEAR_ERROR')

        createUserWithEmailAndPassword(auth, payload.email, payload.password)
        .then(
          () => {
          commit('SET_LOADING', false)
          }
        )
        .catch(
          error => {
          commit('SET_LOADING', false)
          commit('SET_ERROR', error)

            console.log(error)
          }
        )
       
      },

      SIGN_USER_IN ({commit}, payload) {
        commit('SET_LOADING', true)
        commit('CLEAR_ERROR')

        signInWithEmailAndPassword(auth, payload.email, payload.password)
        .then(
          () => {
            // console.log(user)
            commit('SET_LOADING', false)
          }
        )
        .catch(
          error => {
            commit('SET_LOADING', false)
            commit('SET_ERROR', error)
            console.log(error)
          }
        )
      },
      CLEAR_ERROR ({commit}) {
        commit('CLEAR_ERROR')
      },

      LOGOUT ({commit}) {

        signOut(auth).then(() => {

          commit('SET_USER', null)
        }).catch((error) => {

          console.log(error)
        });
        
      }


}