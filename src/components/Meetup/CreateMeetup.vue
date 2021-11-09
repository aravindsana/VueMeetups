<template>
<v-container>


   <v-card flat>
    <v-form
      ref="form"
      @submit.prevent="submit"
    >
      <v-container fluid>
        <v-row>

          <v-col
            cols="12"
          >
            <h4>Create Meetup</h4>
          </v-col>
          <v-col
            cols="12"
          >
            <v-text-field
              v-model="form.title"
              :rules="rules.text"
              color="blue darken-2"
              label="Title*"
              required
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
          >
            <v-text-field
              v-model="form.location"
              :rules="rules.text"
              color="blue darken-2"
              label="Location*"
              required
            ></v-text-field>
          </v-col>
           <v-col
            cols="12"
          >

              <v-file-input
                accept="image/*"
                label="Upload Image"
                @change="onFilePicked"
              ></v-file-input>
            <!-- <v-text-field
              v-model="form.imageUrl"
              :rules="rules.text"
              color="blue darken-2"
              label="Image URL*"
              required
            ></v-text-field> -->
          </v-col>
           <v-col
            cols="12"
          >
          <v-img
          max-height="208"
          max-width="417"
          :src="form.imageUrl"
        ></v-img>
          </v-col>
          <v-col cols="12">
            <v-textarea
              v-model="form.description"
              color="blue darken-2"
              :rules="rules.text"
              required
            >
              <template v-slot:label>
                <div>
                  Description*
                </div>
              </template>
            </v-textarea>
          </v-col>

          <v-col cols="12" md="12">
            <h4>Select Date and Time *</h4>
          </v-col>

          <v-col cols="12" md="4">
            <v-date-picker v-model="date"></v-date-picker>
         <!-- <p> {{submittableDateTime}}</p> -->
          </v-col>
           <v-col cols="12" md="4">
            <v-time-picker
                format="24hr"
                v-model="time"
              ></v-time-picker>
          </v-col>
         
        </v-row>
      </v-container>
      <v-card-actions>
        <v-btn
          text
          @click="resetForm"
        >
          Cancel
        </v-btn>
        <v-spacer></v-spacer>

            



         <v-btn
            :loading="loading"
            :disabled="!formIsValid"
            class="ma-2"
            color="primary"
            @click="submit"
            
          >
            Register
            <template v-slot:loader>
              <span class="custom-loader">
                <v-icon light>mdi-cached</v-icon>
              </span>
            </template>
          </v-btn>

        <!-- <v-btn
          :disabled="!formIsValid"
          text
          color="primary"
        >
          Register
        </v-btn> -->
      </v-card-actions>
    </v-form>
  </v-card>

</v-container>
 
</template>

<script>
  export default {
    data () {
      const defaultForm = Object.freeze({
        title: '',
        location: '',
        imageUrl: '',
        description: ''
      })

      return {
        date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        time: new Date(),
        form: Object.assign({}, defaultForm),
        rules: {
          text: [val => (val || '').length > 0 || 'This field is required'],
        },
        defaultForm,
        image: null,
      loader: null

      }
    },

    computed: {
      formIsValid () {
        return (
          this.form.title &&
          this.form.location &&
          this.form.imageUrl &&
          this.form.description &&
          this.submittableDateTime
        )
      },
      submittableDateTime () {
        const date = new Date(this.date)
        if (typeof this.time === 'string') {
          let hours = this.time.match(/^(\d+)/)[1]
          const minutes = this.time.match(/:(\d+)/)[1]
          date.setHours(hours)
          date.setMinutes(minutes)
        } else {
          date.setHours(this.time.getHours())
          date.setMinutes(this.time.getMinutes())
        }
        return date
      },
      loading () {
        return this.$store.getters.getloading
      }
    },
    watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 3000)

        this.loader = null
      }
  },

    methods: {
      resetForm () {
        this.form = Object.assign({}, this.defaultForm)
        this.$refs.form.reset()
      },
      submit () {

        if (!this.formIsValid) {
          return
        }
        const meetupData = {
          title: this.form.title,
          location: this.form.location,
          image: this.image,
          description: this.form.description,
          date: this.submittableDateTime
        }

        this.$store.dispatch('CREATE_MEETUP', meetupData)


        if (this.loading) {
          this.$router.push('/meetups')
          this.resetForm()
        }
        
      },
      onFilePicked (e) {
        if (e) {

            this.form.imageUrl= URL.createObjectURL(e)

            const reader = new FileReader();
            reader.readAsDataURL(e);
            reader.onload = e =>{
                this.image = e.target.result;
            };
        }
       
      }
    },
  }
</script>