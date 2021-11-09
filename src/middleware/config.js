/**
 * Spafinder
 * tenant environment variables for Spafinder General Admin
 *
 */

 const app = {
    color: "#00838f",
    icon: "mdi-currency-usd",
    title: "Meetups",
    subtitle: "register meetup",
    description: "To create and register to meetups",
  }
  
  const firebase = {
    apiKey: "AIzaSyAwHp5glBHkE24mk2RRoxrW6bo-pcoCpb8",
  authDomain: "aravind-demo.firebaseapp.com",
  projectId: "aravind-demo",
  storageBucket: "aravind-demo.appspot.com",
  messagingSenderId: "28539537807",
  appId: "1:28539537807:web:a758fc3c15b5e9e0eae3fa",
  measurementId: "G-6CXKW723G1"
  }
  
  const environments = {
    local: {
      app,
      firebase,
      functions: {
        endpoint: "http://localhost:5001",
      },
    },
  
    production: {
      app,
      firebase,
      functions: {
        endpoint: "https://us-central1-card-bi.cloudfunctions.net",
      },
    },
  }
  
module.exports = environments[process.env.VUE_APP_ENVIRONMENT || "local"]
  