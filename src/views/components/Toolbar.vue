<template>
    <v-toolbar color="blue-grey darken-3">
      <v-btn flat icon color="white" v-if='currentRoute != "/menu"' :to="{name:'menu'}" style="margin-right: 10px;">
        <v-icon dark>arrow_back</v-icon>        
      </v-btn>
      <v-avatar color="blue-grey lighten-1">
        <v-icon dark>account_circle</v-icon>
      </v-avatar>
      <v-toolbar-title v-if='currentRoute == "/menu"' textcolor="blue-grey lighten-1">Welcome {{msg}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn :to="{name:'profile'}" flat>Profile</v-btn>
        <v-btn :to="{name:'historic'}" flat>HISTORY</v-btn>
        <v-btn flat>STATS</v-btn>
        <v-btn @click="logout()" flat>Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>
</template>

<script>
import store from "@/store/store.js";
import Router from "vue-router";

export default {
  name: "ToolbarLTC",
  data() {
    return {
       msg: store.state.user,
       currentRoute: this.$router.currentRoute.fullPath
    };
  },
  mounted() {
    console.log(this.currentRoute)
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.replace({ name: "login" });
    }
  }
};
</script>

<style>

.v-toolbar__content {
  padding-left: 10px;
}

</style>

