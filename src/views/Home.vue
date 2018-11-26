<template>
<v-app>
    <div id="secure">
        <h1>Bonjour {{ msg }}</h1>
        <p>
          Le bouton logout vous redirigera au login en enlevant le token, le username dans src/store/store.js
        </p>
        <v-btn @click="logout()" color="error">Logout</v-btn>

        <router-link :to="{ name: 'game' }">Game</router-link>

    </div>
</v-app>
</template>

<script>
import store from "@/store/store.js";
import axios from "axios";
export default {
  name: "Secure",
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
</style>