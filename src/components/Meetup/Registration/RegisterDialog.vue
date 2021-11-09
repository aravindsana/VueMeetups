<template>
  <v-row justify="end" class="pa-4">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="290"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="dark"
          dark
          v-bind="attrs"
          v-on="on"
        >
          {{ userIsRegistered ? 'Unregister' : 'Register' }}
        </v-btn>
      </template>
      <v-card>
        <v-card-title v-if="userIsRegistered" class="text-h5">
          Unregister from Meetup?
        </v-card-title>
        <v-card-title v-else class="text-h5">
          Register for Meetup?
        </v-card-title>
        <v-card-text>You can always change your decision later on.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red darken-1"
            text
            @click="dialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="onAgree"
          >
            Confirm
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    props: ['meetupId'],
    data () {
      return {
        dialog: false,
      }
    },
    computed: {
      userIsRegistered () {
        //   console.log(this.$store.getters.getUser)
        return this.$store.getters.getUser.registeredMeetups.findIndex(meetupId => {
          return meetupId === this.meetupId
        }) >= 0
      }
    },
    methods: {
      onAgree () {
        if (this.userIsRegistered) {
          this.$store.dispatch('UNREGISTER_USER_FORM_MEETUP', this.meetupId)
        } else {
          this.$store.dispatch('REGISTER_USER_FOR_MEETUP', this.meetupId)
        }
      }
    }
  }
</script>