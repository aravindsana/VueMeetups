<template>
  <v-container>
    <v-layout row v-if="error" pt-4>
      <v-flex xs12 sm6 offset-sm3>
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-flex>
    </v-layout>
    <v-layout row wrap>

       <v-flex xs12 class="text-center">


         <v-card class="mx-auto my-12"
    max-width="600">

            <v-card-text>
                <v-form ref="registerForm" v-model="valid" lazy-validation>
                    <v-row>
                      <v-col cols="12">
                            <v-text-field v-model="name"  :rules="[rules.required]" label="Name" required></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Password" hint="At least 6 characters" counter @click:append="show1 = !show1"></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field block v-model="verify" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, passwordMatch]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Confirm Password" counter @click:append="show1 = !show1"></v-text-field>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col class="d-flex ml-auto" cols="12" sm="4" xsm="12">
                          <v-btn
                            class="ma-2"
                            x-large 
                            block
                            :loading="loading"
                            :disabled="loading"
                            color="success"
                            @click="SignUp"
                          >
                            Register
                            <template v-slot:loader>
                              <span class="custom-loader">
                                <v-icon light>mdi-cached</v-icon>
                              </span>
                            </template>
                          </v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>
        </v-card>

        </v-flex>

      

    </v-layout>
         
  </v-container>
</template>

<script>
  export default {

    data: () => ({
      loader: null,
      loading4: false,
        valid: true,
        
        email: "test@test.com",
        password: "",
        verify: "",
        name: "",
        emailRules: [
          v => !!v || "Required",
          v => /.+@.+\..+/.test(v) || "E-mail must be valid"
        ],

        show1: false,
        rules: {
          required: value => !!value || "Required.",
          min: v => (v && v.length >= 6) || "Min 6 characters"
        }
  }),
  computed: {
    passwordMatch() {
      return () => this.password === this.verify || "Password must match";
    },
    user () {
        return this.$store.getters.getUser
    },
    error () {
      return this.$store.getters.geterror
    },
    loading () {
      return this.$store.getters.getloading
    }
  },
  watch: {
      user (value) {
        if (value !== null && value !== undefined) {
          this.$router.push('/')
        }
      },
      loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 3000)

        this.loader = null
      }
  },
  methods: {
    SignUp() {
      if (this.$refs.registerForm.validate()) {
        // submit form to server/API here...
        this.$store.dispatch('SIGN_USER_UP', {email: this.email, password: this.password, name: this.name})
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    onDismissed () {
      this.$store.dispatch('CLEAR_ERROR')
    }
  }
  
  }
</script>

