<template>
    <v-toolbar color="blue-grey darken-3">
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-avatar color="blue-grey lighten-1">
        <v-icon dark>account_circle</v-icon>
      </v-avatar>
      <v-toolbar-title textcolor="blue-grey lighten-1">Menu {{msg}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat>Profile</v-btn>
        <v-btn flat>STATS</v-btn>
        <v-btn @click="logout()" flat>Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>
</template>

<script>
import store from "@/store/store.js";
import axios from "axios";
import Router from "vue-router";

export default {
  name: "ToolbarLTC",
  data() {
    return {};
  },
  mounted() {},
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.replace({ name: "login" });
    }
  }
};
</script>
