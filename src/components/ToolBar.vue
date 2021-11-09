<template>
<div>

      <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
        >
          <v-list-item v-for="item in menuItems" :key="item.title" router :to="item.link"> 
            <v-list-item-icon>
              <v-icon>{{item.icon}}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{item.title}}</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="userIsAuthenticated" @click="onLogout"> 
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
   <v-app-bar
      dark
      app
    >
      <!-- <v-app-bar-nav-icon @click="drawer = true" v-show="$vuetify.breakpoint.smOnly"></v-app-bar-nav-icon> -->
      <v-app-bar-nav-icon @click="drawer = true" class="d-flex d-sm-none"></v-app-bar-nav-icon>
      <v-toolbar-title >
        <router-link to="/" tag="span" style="cursor: pointer">VueMeetup</router-link>
        </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="d-none d-sm-flex">
        <v-btn v-for="item in menuItems" :key="item.title" router :to="item.link">
        <v-icon left>{{item.icon}}</v-icon>
        {{item.title}}
      </v-btn>
      <v-btn v-if="userIsAuthenticated" @click="onLogout">
        <v-icon left>mdi-logout</v-icon>
        Logout
      </v-btn>
      </v-toolbar-items>
    </v-app-bar>

</div>
  
</template>

<script>

export default {
  name: 'ToolBar',

  data: () => ({
    drawer: false
  }),
  computed: {
      menuItems () {
        let menuItems = [
          // {icon: 'mdi-face-man', title: 'Sign up', link: '/signup'},
          // {icon: 'mdi-lock-open', title: 'Sign in', link: '/signin'}
        ]
        if (this.userIsAuthenticated) {
          menuItems = [
            {icon: 'mdi-account-group', title: 'View Meetups', link: '/meetups'},
            {icon: 'mdi-map-marker', title: 'Organize Meetup', link: '/meetup/new'},
            {icon: 'mdi-account', title: 'Profile', link: '/profile'}
          ]
        }
        return menuItems
      },
      userIsAuthenticated () {
        return this.$store.getters.getUser !== null && this.$store.getters.getUser !== undefined
      }
    },
    methods: {
      onLogout () {
        this.$store.dispatch('LOGOUT')
        // this.$router.push('/signin')
      }
    }
};
</script>