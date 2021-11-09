import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store/store';
import vuetify from './plugins/vuetify'


import DateFilter from './filters/date'
import AlertCmp from './components/Shared/Alert.vue'
import EditMeetupDetailsDialog from './components/Meetup/Edit/EditMeetupDetailsDialog.vue'
import EditMeetupDateDialog from './components/Meetup/Edit/EditMeetupDateDialog.vue'
import EditMeetupTimeDialog from './components/Meetup/Edit/EditMeetupTimeDialog.vue'
import RegisterDialog from './components/Meetup/Registration/RegisterDialog.vue'

Vue.config.productionTip = false

Vue.filter('date', DateFilter)

Vue.component('app-alert', AlertCmp)
Vue.component('app-edit-meetup-details-dialog', EditMeetupDetailsDialog)
Vue.component('app-edit-meetup-date-dialog', EditMeetupDateDialog)
Vue.component('app-edit-meetup-time-dialog', EditMeetupTimeDialog)
Vue.component('app-meetup-register-dialog', RegisterDialog)



import app from "@/middleware/firebase"
import firebase from "@/middleware/firebase"
import { config } from "@/middleware"
import { getAuth, onAuthStateChanged } from "firebase/auth"

import { db } from "@/middleware/bindings"
import { doc, onSnapshot } from "firebase/firestore";

import AuthGuard from "@nerd305/firebase-vuetify-auth"


const authGuardSettings = {
  debug: true, // enable debug messages in console log'
  store,
  router, // routes
  firebase, // pass on firebase middleware app init
  verification: false, // require user email to be verified before granting access
  registration: true, // allow new user registrations
  phone: false, // allow authentication with phone
  google: true, // allow authentication with gmail account
  facebook: false, // allow authentication with facebook account
  title: config.app.title,
  subtitle: config.app.subTitle,
  icon: "mdi-spa", // authentication prompt icon
  iconColor: "#1c828d", // authentication prompt icon color
}

Vue.use(AuthGuard, authGuardSettings)




// this will reload app on user auth state change
onAuthStateChanged(getAuth(app), (user) => {
  new Vue({
    store,
    router,
    vuetify,
    render: (h) => h(App),
    created () {

      if (user) {
        console.log("from main.js file - ", user.uid)
        // this.$store.dispatch('AUTO_SIGN_IN', user)
        // this.$store.dispatch('FETCH_USER_DATA')

        onSnapshot(doc(db, "users", user.uid), (snapshot) => {

          console.log("from snapshot - ", snapshot.data())

          this.$store.state.user = snapshot.data()
        
        });
      }

    }
  }).$mount("#app")
})


// v9 compat packages are API compatible with v8 code
// import firebase from 'firebase/app';
// import { getAuth, connectAuthEmulator } from "firebase/auth";
// import { getApp } from "firebase/app";
// import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

// new Vue({
//   router,
//   store,
//   vuetify,
//   render: h => h(App),
//   created () {
//     firebase.initializeApp({
//       apiKey: "AIzaSyAwHp5glBHkE24mk2RRoxrW6bo-pcoCpb8",
//       authDomain: "aravind-demo.firebaseapp.com",
//       projectId: "aravind-demo",
//       storageBucket: "aravind-demo.appspot.com",
//       messagingSenderId: "28539537807",
//       appId: "1:28539537807:web:a758fc3c15b5e9e0eae3fa",
//       measurementId: "G-6CXKW723G1"
//     })

//     console.log(window.location.hostname)

//     if (window.location.hostname == 'localhost') {

//       const auth = getAuth();
//       connectAuthEmulator(auth, "http://localhost:9099");

//       firebase.firestore().settings({
//           host: "localhost:8080",
//           ssl: false,
//       })
//       const functions = getFunctions(getApp());
//       console.log(functions)
//       connectFunctionsEmulator(functions, "localhost", 5001);
      
//     }

//     firebase.auth().onAuthStateChanged((user) => {
//       if (user) {
//         console.log(user)
//         this.$store.dispatch('AUTO_SIGN_IN', user)
//         this.$store.dispatch('FETCH_USER_DATA')
//       }
//     })

//     this.$store.dispatch('LOAD_MEETUPS')

//   }
// }).$mount('#app')
