<template>
  <v-app dark>
    <v-toolbar color="blue-grey darken-3">
      <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
      <v-avatar color="blue-grey lighten-1">
        <v-icon dark>account_circle</v-icon>
      </v-avatar>
      <v-toolbar-title textcolor="blue-grey lighten-1">Welcome {{msg}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat>Profile</v-btn>
        <v-btn flat>STATS</v-btn>
        <v-btn @click="logout()" flat>Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <div class="rowC">
      <v-layout align-center justify-space-around fill-height>
        <v-flex xs sm3 ma-2>
          <v-card>
            <v-img
              class="white--text"
              height="200px"
              src="https://nofrag.com/wp-content/uploads/2018/02/R6S.jpeg"
            >
              <v-container fill-height fluid>
                <v-layout fill-height>
                  <v-flex xs12 align-end flexbox>
                    <span class="headline">R6</span>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-img>
            <v-card-title>
              <div>
                <span class="grey--text">Basic call for R6</span>
                <br>
                <span>Learn the classic calls use in ranked</span>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn :to="{ name: 'game' }" flat color="orange">Jouer</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>

        <span>Choose your game Bro</span>

        <v-flex xs6 sm3 ma-2>
          <v-card>
            <v-img
              class="white--text"
              height="200px"
              src="http://lesplayersdudimanche.com/wp-content/uploads/2017/02/Dust-2-810x400.jpg"
            >
              <v-container fill-height fluid>
                <v-layout fill-height>
                  <v-flex xs12 align-end flexbox>
                    <span class="headline">CSGO</span>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-img>
            <v-card-title>
              <div>
                <span class="grey--text">Basic call for CS:GO</span>
                <br>
                <span>Learn the classic calls</span>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn flat color="orange">Jouer</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
    <footer-l-t-c></footer-l-t-c>
  </v-app>
</template>

<script>
import store from "@/store/store.js";
import axios from "axios";
import FooterLTC from "./components/Footer";
export default {
  name: "profile",
  components: { FooterLTC },
  data() {
    return {
      msg: store.state.user
    };
  },
  mounted() {
    const auth = {
      headers: { Authorization: "bearer " + store.state.token }
    };
    axios
      .get("http://54.38.184.10:5000/api/allUsers", auth)
      .then(response => {
        if (response.data.message == "Error") this.info = "Error";
        console.log(response.data.message);
      })
      .catch(err => {});
  },
  methods: {
    getProfile() {
      this.$store.dispatch("logout");
      this.$router.replace({ name: "login" });
    },
    logout() {
      this.$store.dispatch("logout");
      this.$router.replace({ name: "login" });
    }
  }
};
</script>

<style scoped>
#secure {
  background-color: #ffffff;
  border: 1px solid #cccccc;
  padding: 20px;
  margin-top: 10px;
}
.rowC {
  padding-top: 10%;
}
</style>