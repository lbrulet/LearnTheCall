<template>
  <main>
    <v-app dark>
      <h1>RAINBOW SIX SIEGE</h1>
      <v-container grid-list-md text-xs-center>
        <v-layout>
          <v-flex xs8>
            <v-card-media v-bind:src="require('@/assets/ImageR6/chalet00.jpg')"></v-card-media>
          </v-flex>

          <v-flex>
            <v-card class="mb-2" height="156px" dark color="secondary">
              <v-card-text class="pa-5 mb-2">3</v-card-text>
            </v-card>
            <v-card class="mb-2" height="156px" dark color="secondary">
              <v-card-text class="mb-2">
                <p class="text-xs-center">3</p>
              </v-card-text>
            </v-card>
            <v-card class="mb-2" height="156px" dark color="secondary">
              <v-card-text class="pa-5 mb-2">3</v-card-text>
            </v-card>
            <v-card class="mb-2" height="156px" dark color="secondary">
              <v-card-text class="pa-5 mb-2">3</v-card-text>
            </v-card>
          </v-flex>
          
        </v-layout>
      </v-container>
    </v-app>
  </main>
</template>


<script>
import store from "@/store/store.js";
import axios from "axios";

export default {
  name: "game",
  data() {
    return {
      msg: store.state.user
    };
    myImage: [];
  },
  mounted() {
    const auth = {
      headers: { Authorization: "bearer " + store.state.token }
    };
    axios
      .get("http://54.38.184.10:5000/api/getAllImage", auth)
      .then(response => {
        if (response.data.message == "Error") {
          this.myImage = "Error";
          console.log("Error to get Images !");
        } else {
          this.myImage = response.data.message;
          console.log(this.myImage);
        }
      })
      .catch(err => {});
    axios
      .get("http://54.38.184.10:5000/api/getImageInFolder", auth)
      .then(response => {
        if (response.data.message == "Error") {
          console.log("Error to get Images !");
        } else {
          console.log(response.data.message);
        }
      })
      .catch(err => {});
  },
  methods: {}
};
</script>

<style>
.card {
  height: 100px;
}
</style>