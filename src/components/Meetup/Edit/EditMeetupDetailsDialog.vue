<template>
  <v-row justify="end" class="px-6">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          fab
          accent
          small
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Edit Meetup</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Title*"
                  required
                  v-model="editedTitle"

                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                color="blue darken-2"
                required
                v-model="editedDescription"

                >
                <template v-slot:label>
                    <div>
                    Description*
                    </div>
                </template>
                </v-textarea>
              </v-col>
            
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
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
        editedTitle: this.meetup.title,
        editedDescription: this.meetup.description
      }
    },
    methods: {
      onSaveChanges () {
        if (this.editedTitle.trim() === '' || this.editedDescription.trim() === '') {
          return
        }
        this.dialog = false
        this.$store.dispatch('UPDATE_MEETUP_DATA', {
          id: this.meetup.id,
          title: this.editedTitle,
          description: this.editedDescription
        })
      }
    }
  }
</script>