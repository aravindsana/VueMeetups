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

          <v-card class="mx-2"
                  max-width="1344">
            <v-card-title>
                <h6 class="dark--text">{{meetup.title}}</h6>
                <template v-if="userIsCreator" >
                    <v-spacer></v-spacer>
                    <app-edit-meetup-details-dialog :meetup="meetup"></app-edit-meetup-details-dialog>
                  </template>
            </v-card-title>
        
            <v-img
              :src="meetup.imageUrl"
              height="200px"
            ></v-img>

            <v-card-text>
              <v-row class="info--text pa-4">{{ meetup.date | date }} - {{ meetup.location }}</v-row>
              <!-- <div class="info--text"></div> -->
              <!-- <div> -->
                <v-row v-if="userIsCreator">

                  <v-col md="2">

                     <app-edit-meetup-date-dialog
                      :meetup="meetup">
                    </app-edit-meetup-date-dialog>

                  </v-col>

                  <v-col md="1">

                     <app-edit-meetup-time-dialog
                      :meetup="meetup">
                    </app-edit-meetup-time-dialog>
                    
                  </v-col>

                </v-row>

                <v-row class="pa-4">{{ meetup.description }}</v-row>
             
             
            <!-- </div> -->
              <!-- <div></div> -->
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
             <app-meetup-register-dialog
              :meetupId="meetup.id" v-if="userIsAuthenticated && !userIsCreator"></app-meetup-register-dialog>
            </v-card-actions>
        </v-card>

  </v-flex>
      
    </v-layout>

</v-container>
  
</template>


<script>
import { db } from "@/middleware/bindings"
import { doc, onSnapshot } from "firebase/firestore";
  export default {
    props: ['id'],
    data() {
      return {
        meetup: {
        }
      }
    },
    computed: {
      userIsAuthenticated () {
        return this.$store.getters.getUser !== null && this.$store.getters.getUser !== undefined
      },
      userIsCreator () {
        if (!this.userIsAuthenticated) {
          return false
        }
        return this.$store.getters.getUser.id === this.meetup.creatorId
      },
      loading () {
        return this.$store.getters.getloading
      }
    },
    mounted() {

      onSnapshot(doc(db, "meetups", this.id), (snapshot) => {
          this.meetup = snapshot.data()
          this.$set(this.meetup, 'id', snapshot.id)
      });


    }
  }
</script>