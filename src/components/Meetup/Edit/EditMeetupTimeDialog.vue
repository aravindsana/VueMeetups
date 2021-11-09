<template>
  <v-row justify="center" class="px-6">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="400px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          small
          v-bind="attrs"
          v-on="on"
        >
        Edit Time
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Edit Time</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row justify="center">
              <v-time-picker v-model="editableTime" style="width: 100%" actions format="24hr"></v-time-picker>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <!-- <v-spacer></v-spacer> -->
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="onSaveChanges"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    props: ['meetup'],
    data () {
      return {
        dialog: false,
        editableTime: null,
      }
    },
    methods: {
      onSaveChanges () {

       const newDate = new Date(this.meetup.date)
        const hours = this.editableTime.match(/^(\d+)/)[1]
        const minutes = this.editableTime.match(/:(\d+)/)[1]
        newDate.setHours(hours)
        newDate.setMinutes(minutes)
        this.$store.dispatch('UPDATE_MEETUP_DATA', {
          id: this.meetup.id,
          date: newDate.toString()
        })
      }
    },
    created () {
     this.editableTime = new Date(this.meetup.date).toLocaleTimeString()

    //  console.log(this.editableTime)
    }
  }
</script>