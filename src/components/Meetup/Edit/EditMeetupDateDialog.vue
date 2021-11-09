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
        Edit Date
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Edit Date</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row justify="center">
                <v-date-picker v-model="editableDate" style="width: 100%"></v-date-picker>
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
        editableDate: null,
      }
    },
    methods: {
      onSaveChanges () {

        // console.log(new Date(this.editableDate))


        const newDate = new Date(this.meetup.date)
        const newDay = new Date(this.editableDate).getUTCDate()
        const newMonth = new Date(this.editableDate).getUTCMonth()
        const newYear = new Date(this.editableDate).getUTCFullYear()
        newDate.setUTCDate(newDay)
        newDate.setUTCMonth(newMonth)
        newDate.setUTCFullYear(newYear)
        // console.log(newDate)
        this.$store.dispatch('UPDATE_MEETUP_DATA', {
          id: this.meetup.id,
          date: newDate.toString()
        })
      }
    },
    created () {

      const date = new Date(this.meetup.date)
    //   console.log(date.toLocaleString(['en-US'], {year: 'numeric',month: '2-digit', day: '2-digit' }))
      const split_date = date.toLocaleString(['en-US'], {month: '2-digit', day: '2-digit', year: 'numeric'}).split('/')
      this.editableDate = [split_date[2],split_date[0],split_date[1]].join('-')
    }
  }
</script>