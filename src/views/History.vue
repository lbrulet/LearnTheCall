<template>
  <main>
    <v-app dark>
      <toolbar-l-t-c></toolbar-l-t-c>
      <p>historique lel</p>
      <footer-l-t-c></footer-l-t-c>
    </v-app>
  </main>
</template>

<script>
import store from "@/store/store.js";
import axios from "axios";
import Router from "vue-router";
import FooterLTC from "@/views/components/Footer";
import ToolbarLTC from "@/views/components/Toolbar";

export default {
  name: "Historic",
  components: {ToolbarLTC, FooterLTC},
  data() {
    return {
      msg: store.state.user,
      currentRoute: this.$router.currentRoute.fullPath
    };
  },
  created () {
      axios
      .post("http://54.38.184.10:5000/api/getGameById", {
        headers: { Authorization: "bearer " + store.state.token },
        user: store.state.user
      })
      .then(response => {
        console.log("Historique === ", response.data.message);
      })
      .catch(err => {
        console.log(err);
      });
  },
  mounted() {
  },
  methods: {}
};
</script>

<style>
</style>