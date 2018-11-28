<template>
  <main>
    <v-app dark>
      <h1>RAINBOW SIX SIEGE</h1>
      <v-container grid-list-md text-xs-center>
        <v-layout>
          <v-flex xs8>
            <v-card-media v-bind:src="require(`@/assets/ImageR6/${activeImage}`)"></v-card-media>
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
            <button v-on:click="pickOneImage()">click me</button>
          </v-flex>
        </v-layout>
      </v-container>
    </v-app>
  </main>
</template>


<script>
var wrongAnswer = [
  "BedRoom",
  "Wine Cellar",
  "Garage",
  "Fireplace HallWay",
  "Office",
  "Gaming Room",
  "Gaming Room Corridor",
  "Storage Room",
  "Cctv",
  "Snowmobile Garage"
];

import store from "@/store/store.js";
import axios from "axios";

export default {
  name: "game",
  data() {
    return {
      allImages: [],
      activeImage: "loading.jpg"
    };
  },
  mounted() {
    const auth = {
      headers: { Authorization: "bearer " + store.state.token }
    };
    axios
      .get("http://54.38.184.10:5000/api/getImageInFolder", auth)
      .then(response => {
        if (response.data.message == "Error") {
          console.log("Error to get Images !");
        } else {
          this.allImages = response.data.message;
          console.log(this.allImages);
          this.pickOneImage();
        }
      })
      .catch(err => {});
  },
  methods: {
    pickOneImage() {
      if (this.allImages.length > 0) {
        let i = this.randomNumber(this.allImages.length);
        let stock = this.allImages[i];
        console.log(this.allImages);
        this.allImages.splice(this.allImages.indexOf(stock), 1);
        console.log(this.allImages);
        this.activeImage = stock;
        console.log(this.activeImage);
      } else {
        console.log("Il n'y a plus d'images a afficher !");
      }
      //this.getThisImage(stock);
    },
    randomNumber(max) {
      return Math.floor(Math.random() * (max - 1 + 1));
    },
    getThisImage(ImageName) {
      axios
        .post("http://54.38.184.10:5000/api/getThisImage", {
          headers: { Authorization: "bearer " + store.state.token },
          body: ImageName
        })
        .then(response => {
          if (response.data.message == "Error") {
            console.log("Error to get this Image !");
          } else {
            console.log(response.data.message);
          }
        })
        .catch(err => {});
    },
    getWrongAnswer() {
      var tab = wrongAnswer.slice();
    }
  }
};
</script>

<style>
.card {
  height: 100px;
}
</style>