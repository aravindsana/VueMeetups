<template>

 <v-container pa-6>

     <v-layout row wrap>
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn large router to="/meetups" class="info ma-2">Explore Meetups</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn large router to="/meetup/new" class="info ma-2">Organize Meetup</v-btn>
      </v-flex>
    </v-layout>

     <v-layout>
      <v-flex xs12 class="text-center" pa-4>

        <v-progress-circular
          :size="50"
          color="primary"
          indeterminate
          v-if="loading"
        ></v-progress-circular>

      </v-flex>
      
    </v-layout>

    <v-layout row wrap class="mt-4" v-if="!loading">
      <v-flex xs12>
        <v-carousel style="cursor: pointer">
          <v-carousel-item
            v-for="meetup in meetups"
            :src="meetup.imageUrl"
            :key="meetup.id"
            @click="onLoadMeetup(meetup.id)">

              <div class="title">
              {{ meetup.title }}
            </div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
    
    <v-layout row wrap  class="mt-4">
      <v-flex xs12 class="text-xs-center" text-center>
       <p>Join our awesome meetups!</p>
      </v-flex>
    </v-layout>
   
  </v-container>
  
</template>

<script>

import { meetupsRef } from "@/middleware/bindings"
import { onSnapshot } from "firebase/firestore";

  export default {

    data() {
      return {
        meetups: []
      }
    },

    computed: {
     
      loading () {
        return this.$store.getters.getloading
      }
    },
    
    methods: {
      onLoadMeetup (id) {
        this.$router.push('/meetups/' + id)
      }
    },
    mounted() {
        onSnapshot(
          meetupsRef, 
          (snapshot) => {
            const meetupsdata = [];
            snapshot.forEach((doc) => {
                meetupsdata.push({...doc.data(), id: doc.id});
            });

            this.meetups = meetupsdata

          // console.log("meetupsdata", meetupsdata) 

          },
          (error) => {
            console.log(error)
        });
      }
  }
</script>

<style scoped>
  .title {
    position: absolute;
    bottom: 50px;
    background-color: rgba(0,0,0,0.5);
    color: white;
    font-size: 2em;
    padding: 20px;
  }
</style>