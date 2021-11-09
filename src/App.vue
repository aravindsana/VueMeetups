<template>
<v-app>

  <Toolbar />

  <v-main >
    <router-view></router-view>
  </v-main>
</v-app>
</template>

<script>

import Toolbar from "@/components/ToolBar"

export default {
  name: 'App',
  components: {
    Toolbar
  }
};
</script>


<style>

  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }

#nav a.router-link-exact-active {
  color: #42b983;
  }
</style>
