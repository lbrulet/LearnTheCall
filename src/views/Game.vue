<template>
  <main>
    <v-app dark>
      <toolbar-l-t-c></toolbar-l-t-c>
      <h1>RAINBOW SIX SIEGE</h1>
      <div id="GameContainer" v-if="!gameFinish">
        <div class="GameItem">
            <img v-bind:src="require(`@/assets/ImageR6/${activeImage}`)" style="max-width: 100%; width: 900px;">
        </div>
        <div class="GameItem">
          <div class="ResponseItem" @click="clickOnAnswer(allAnswer[0], 0)" :class="{badResponse: correct[0] == 1, goodResponse: correct[0] == 2}">
            <p style="text-align: center;">{{allAnswer[0]}}</p>
          </div>
          <div class="ResponseItem" @click="clickOnAnswer(allAnswer[1], 1)" :class="{badResponse: correct[1] == 1, goodResponse: correct[1] == 2}" >
            <p style="text-align: center;">{{allAnswer[1]}}</p>
          </div>
          <div class="ResponseItem" @click="clickOnAnswer(allAnswer[2], 2)" :class="{badResponse: correct[2] == 1, goodResponse: correct[2] == 2}">
            <p style="text-align: center;">{{allAnswer[2]}}</p>
          </div>
          <div class="ResponseItem" @click="clickOnAnswer(allAnswer[3], 3)" :class="{badResponse: correct[3] == 1, goodResponse: correct[3] == 2}">
            <p style="text-align: center;">{{allAnswer[3]}}</p>
          </div>
        </div>
      </div>
      <div v-else>
        <p>c'est fini xd</p>
        <h1>tu as fait {{userPoint}} bonne réponse !</h1>
        <v-btn :to="{ name: 'menu' }" flat color="orange">Retour</v-btn>
      </div>
      <footer-l-t-c></footer-l-t-c>
    </v-app>
  </main>
</template>

<script>
var allWrongAnswer = [
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
import Router from "vue-router";
import FooterLTC from "@/views/components/Footer";
import ToolbarLTC from "@/views/components/Toolbar";

export default {
  name: "game",
  components: { ToolbarLTC, FooterLTC },
  data() {
    return {
      allImages: [],
      allAnswer: [],
      correct: [],
      responseImg: "",
      activeImage: "chalet00.jpg",
      gameFinish: false,
      userPoint: 0,
      obj: {},
      party: []
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
          this.gameFinish = false;
        }
      })
      .catch(err => {});
    this.pickOneImage();
    console.log(this.$router.currentRoute);
  },
  methods: {
    pickOneImage() {
      for (var i = 0; i < 4; i++) this.correct.pop();
      if (this.allImages.length > 0) {
        let i = this.randomNumber(this.allImages.length);
        let stock = this.allImages[i];
        this.allImages.splice(this.allImages.indexOf(stock), 1);
        this.activeImage = stock;
        console.log("stock = " + stock);
        this.getThisImage(stock);
      } else {
        console.log("Il n'y a plus d'images a afficher !");
        this.gameFinish = true;
        this.postGame(this.party);
      }
    },
    clickOnAnswer(response, index) {
      var correct = false;
      console.log("la reponse cliqué est =", response);
      if (response == this.responseImg) {
        this.userPoint += 1;
        correct = true;
      }
      var pos;
      for (pos = 0; pos < this.allAnswer.length; pos++) {
        if (this.responseImg == this.allAnswer[pos]) break;
      }
      for (var i = 0; i < 4; i++) {
        if (pos == i) this.correct.push("2");
        else this.correct.push("1");
      }
      console.log("correct == ", this.correct);
      this.obj = {
        userResponse: response,
        goodResponse: this.responseImg,
        answer: this.allAnswer,
        correct: correct,
        imageName: this.activeImage
      };
      this.party.push(this.obj);
      var self = this;
      setTimeout(function() {
        self.pickOneImage();
      }, 500);
    },
    randomNumber(max) {
      return Math.floor(Math.random() * (max - 1 + 1));
    },
    mixArray(a) {
      var j, x, i;
      for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
      }
      return a;
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
            this.responseImg = "Nothing";
          } else {
            this.responseImg = response.data.message.goodAnswer;
            this.allAnswer = this.getWrongAnswer();
            this.allAnswer.push(this.responseImg);
            this.allAnswer = this.mixArray(this.allAnswer);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    postGame(game) {
      axios
        .post("http://54.38.184.10:5000/api/addGame", {
          headers: { Authorization: "bearer " + store.state.token },
          user: store.state.user,
          game: game
        })
        .then(response => {
          console.log("addGame === ", response.data)
        })
        .catch(err => {
          console.log(err);
        })
    },
    getWrongAnswer() {
      var tab = allWrongAnswer.slice();
      console.log(tab);
      var res = [];
      for (var i = 0; i < 3; i++) {
        var rdm = this.randomNumber(tab.length);
        res[i] = tab[rdm];
        tab.splice(tab.indexOf(res[i]), 1);
      }
      return res;
    }
  }
};
</script>

<style>
/* Pour cacher la scrollbar de droite ... */
::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #ff0000;
}
/* fin */

.goodResponse {
  background-color: green !important;
}

.badResponse {
  background-color: red !important;
}

.ResponseItem:hover {
  background-color: black;
  opacity: 0.4;
}

/* FlexBox */
#GameContainer {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}

.gameItem {
  display: flex;
  flex-direction: column;
}

.ResponseItem {
  border: 1px solid white;
  font-size: 20px;
  height: 100px;
}
/* FlexBox */
</style>