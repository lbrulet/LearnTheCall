<template>
  <v-app dark>
    <toolbar-l-t-c></toolbar-l-t-c>
    <v-layout justify-space-around fill-height>
      <v-flex ma-2>
          <v-avatar color="blue-grey lighten-1">
            <v-icon dark>account_circle</v-icon>
          </v-avatar>
          <div class="title font-weight-bold">{{msg}} </div>
      </v-flex>
      <v-flex xs sm3 ma-2>
        <v-card>
          <v-card-title>
            <div class="title font-weight-bold">Number of games: </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="orange">{{totalGames}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>

      <v-flex xs sm3 ma-2>
        <v-card>
          <v-card-title>
            <div class="title font-weight-bold">Good Answer: </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="orange">{{totalScore}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs sm3 ma-2>
        <v-card>
          <v-card-title>
           <div class="title font-weight-bold">Ratio: (Good/ False)</div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="orange">{{totalRatio}} %</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <footer-l-t-c></footer-l-t-c>
  </v-app>
</template>

<script>
import store from "@/store/store.js";
import axios from "axios";
import FooterLTC from "@/views/components/Footer";
import ToolbarLTC from "@/views/components/Toolbar";

export default {
  name: "profile",
  components: { FooterLTC, ToolbarLTC },
  data() {
    return {
      msg: store.state.user,
      userData: null,
      gameUser: null,
      totalGames: 0,
      totalScore: 0,
      totalAnswer: 0,
      totalRatio: 0
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
        this.userData = response.data.message;
        console.log("allUsers = ", response.data.message);
        this.getUserData();
      })
      .catch(err => {});
  },
  methods: {
    getUserData() {
      for (let i = 0; i < this.userData.length; i++) {
        if (this.userData[i].username == this.msg) {
          console.log("USER", this.userData[i].game);
          this.gameUser = this.userData[i].game;
        }
      }
      for (let j = 0; j < this.gameUser.length; j++) {
        let tmp = this.gameUser[j];
        if (tmp[tmp.length - 1].total != null) {
          this.totalGames += 1;
          console.log("inch = ", tmp[tmp.length - 1].total);
          this.totalScore += tmp[tmp.length - 1].point;
          this.totalAnswer = this.totalGames * 6;
          console.log("ANSWER:", this.totalAnswer);
          this.totalRatio = this.totalAnswer - this.totalScore;
          console.log("ANSWER - SCORE:", this.totalRatio);
          this.totalRatio = Math.trunc(
            (this.totalScore / this.totalRatio) * 100
          );
          console.log("Total Answer:", this.totalRatio);
          console.log("Total score = ", this.totalScore);
        }
      }
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