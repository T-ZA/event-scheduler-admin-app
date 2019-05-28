<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title class="headline">
          Login
        </v-card-title>
        <v-card-text>
          <form>
            <v-text-field
              v-model="email"
              v-validate="'required|email'"
              :error-messages="errors.collect('email')"
              label="Email"
              data-vv-name="email"
              required
            />
            <v-text-field
              v-model="password"
              v-validate="'required'"
              :error-messages="errors.collect('password')"
              label="Password"
              type="password"
              data-vv-name="password"
              required
            />
            <v-btn @click="submit">
              Submit
            </v-btn>
          </form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'Login',
  data: () => {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    submit() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          // eslint-disable-next-line
          alert('Form Submitted!');

          // Do stuff on successful form validation
          return
        }

        alert('Correct them errors!')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
