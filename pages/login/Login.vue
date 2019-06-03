<template>
  <v-layout justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title class="headline">Login</v-card-title>
        <v-card-text>
          <form>
            <v-text-field
              v-model="credentials.email"
              v-validate="'required|email'"
              :error-messages="errors.collect('email')"
              label="Email"
              data-vv-name="email"
              required
            />
            <v-text-field
              v-model="credentials.password"
              v-validate="'required'"
              :error-messages="errors.collect('password')"
              label="Password"
              type="password"
              data-vv-name="password"
              required
            />
            <v-btn v-model="isFormValid" @click="submit">Submit</v-btn>
          </form>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { SIGN_IN } from "@/graphql/queries/UserQueries";
import { mapActions, mapMutations } from "vuex";

export default {
  name: "Login",
  data: () => {
    return {
      credentials: {
        email: "",
        password: ""
      },
      isFormValid: false
    };
  },
  methods: {
    ...mapActions({
      setCurrentUser: "user/setCurrentUser",
      signOutUser: "user/signOutUser"
    }),
    ...mapMutations({
      setUser: "user/setUser"
    }),
    async submit() {
      this.$validator.validateAll().then(result => {
        if (!result) {
        }
      });

      try {
        await this.signOutUser();

        const credentials = this.credentials;

        const res = await this.$apollo
          .mutate({
            mutation: SIGN_IN,
            variables: credentials
          })
          .then(({ data }) => {
            // eslint-disable-next-line
            console.log(data);

            if (data && data.signInUser) {
              if (window.localStorage !== "undefined") {
                localStorage.setItem("apollo-token", data.signInUser.token);
              }
              return data.signInUser;
            }
          });

        await this.$apolloHelpers.onLogin(res.token);

        const user = {
          _id: res._id,
          email: res.email
        };

        // eslint-disable-next-line
        console.log(`User ID: ${user._id}\nUser Email: ${user.email}`);

        await this.setCurrentUser(user);
        // this.setUser(user)

        this.$router.push("/");
      } catch (e) {
        // eslint-disable-next-line
        console.error(e);
      } finally {
        this.credentials.email = null;
        this.credentials.password = null;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
