import Vue from 'vue'
import VueRouter from 'vue-router'


import Home from '../components/Home.vue'

import Meetups from '../components/Meetup/Meetups.vue'
import CreateMeetup from '../components/Meetup/CreateMeetup.vue'
import Profile from '../components/User/Profile.vue'
// import Signup from '../components/User/Signup.vue'
// import Signin from '../components/User/Signin.vue'
import Meetup from '../components/Meetup/Meetup.vue'

// import AuthGuard from './auth-guard'

import { AuthMiddleware } from "@nerd305/firebase-vuetify-auth"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    // beforeEnter: AuthMiddleware
  },
  {
    path: '/meetups',
    name: 'Meetups',
    component: Meetups,
    beforeEnter: AuthMiddleware
  },
  {
    path: '/meetup/new',
    name: 'CreateMeetup',
    component: CreateMeetup,
    beforeEnter: AuthMiddleware
  },
  {
    path: '/meetups/:id',
    name: 'Meetup',
    props: true,
    component: Meetup,
    beforeEnter: AuthMiddleware
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    beforeEnter: AuthMiddleware
  },
  // {
  //   path: '/signup',
  //   name: 'Signup',
  //   component: Signup,
  //   beforeEnter: AuthMiddleware
  // },
  // {
  //   path: '/signin',
  //   name: 'Signin',
  //   component: Signin,
  //   beforeEnter: AuthMiddleware
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
