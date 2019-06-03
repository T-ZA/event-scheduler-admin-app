<template>
  <v-app :dark="isDarkThemeEnabled">
    <!-- Navigation Drawer -->
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <!-- List of side navigation items -->
      <!-- Signed Out -->
      <v-list v-if="!isSignedIn">
        <v-list-tile
          v-for="(item, i) in signedOutItems"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title" />
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <!-- Signed In -->
      <v-list v-else>
        <v-list-tile
          v-for="(item, i) in signedInItems"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title" />
          </v-list-tile-content>
        </v-list-tile>

        <!-- Sign Out menu item -->
        <v-list-tile
          to="/login/login"
          @click="signOutUser"
        >
          <v-list-tile-action>
            <v-icon>person</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Sign Out</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <!-- Top-level Toolbar -->
    <v-toolbar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-toolbar-side-icon @click="drawer = !drawer" />

      <!-- <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>{{ `chevron_${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn> -->

      <!-- <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>web</v-icon>
      </v-btn> -->

      <!-- <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>remove</v-icon>
      </v-btn> -->

      <v-toolbar-title v-text="title" />
    </v-toolbar>

    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <v-footer
      :fixed="fixed"
      app
    >
      <v-switch v-model="isDarkThemeEnabled" prepend-icon="settings_brightness" color="primary" />
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      signedOutItems: [
        {
          icon: 'person',
          title: 'Sign In',
          to: '/login/login'
        }
      ],
      signedInItems: [
        {
          icon: 'add_circle',
          title: 'Add Event',
          to: '/event/add'
        }
      ],
      miniVariant: false,
      title: 'Event Scheduler Admin',
      isDarkThemeEnabled: true
      // isSignedIn: false
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'user/currentUser'
    }),
    isSignedIn() {
      if (this.currentUser === null || this.currentUser === undefined) {
        return false
      }
      return true
    }
  },
  methods: {
    ...mapActions({
      signOutUser: 'user/signOutUser'
    })
  }
}
</script>
