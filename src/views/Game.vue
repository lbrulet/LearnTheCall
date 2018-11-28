<template>
<v-app>

    <h1>ldfldfdfldflfddlfdfl</h1>
<div>
    <img src="@/assets/ImageR6/chalet00.jpg" style="width: 500px; height: 500px;">
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
</style>