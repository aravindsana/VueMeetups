<template>
<v-container>

  <v-layout row wrap v-if="loading">
      <v-flex xs12 class="text-center" pa-4>

        <v-progress-circular
          :size="50"
          color="primary"
          indeterminate
        ></v-progress-circular>

      </v-flex>
      
    </v-layout>


     <v-layout row wrap v-else class="mt-4">
      <v-flex xs12>

   <v-card
    class="mx-2 mb-2"
    max-width="1344"
    v-for="meetup in meetups" :key="meetup.id"
  >
    <v-img
      :src="meetup.imageUrl"
      height="200px"
    ></v-img>

    <v-card-title>
      {{meetup.title}}
    </v-card-title>

    <v-card-subtitle>
      {{meetup.date | date}}
    </v-card-subtitle>

    <v-card-actions>

      <v-btn
        color="dark"
        text
        :to="'/meetups/' + meetup.id"
      >
      <v-icon left>mdi-arrow-right</v-icon>
        View Meetup
      </v-btn>

    </v-card-actions>
    
  </v-card>

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