<template>
<v-app>

    <h1>ldfldfdfldflfddlfdfl</h1>
<div>
    <img src="@/assets/ImageR6/chalet00.jpg" style="width: 500px; height: 500px;">
    <button v-on:click="pickOneImage()">click me</button>
</div>
</v-app>        
</template>


<script>
import store from "@/store/store.js";
import axios from "axios";

export default {
  name: "game",
  data() {
    return {
      allImages: []
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
        }
      })
      .catch(err => {});
  },
  methods: {
    pickOneImage() {
      const path = "@/assets/ImageR6/";
      let i = this.randomNumber(this.allImages.length);
      console.log("random number = ", i);
      let stock = this.allImages[i];
      console.log(stock);
      this.getThisImage(stock);
    },
    randomNumber(max) {
      return Math.floor(Math.random() * (max - 1 + 1));
    },
    getThisImage(ImageName) {
      axios
        .post("http://54.38.184.10:5000/api/getThisImage", {
          //headers: { Authorization: "bearer " + store.state.token },
          body: {ImageName}
        })
        .then(response => {
          if (response.data.message == "Error") {
            console.log("Error to get this Image !");
          } else {
            console.log(response.data.message);
          }
        })
        .catch(err => {});
    }
  }
};
</script>

<style>
</style>