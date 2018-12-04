<template>
  <main>
    <v-app dark>
      <h1>RAINBOW SIX SIEGE</h1>
      <div id='GameContainer' v-if="!gameFinish">
        <div class="GameItem" style="height: auto; min-width: 0;">
            <img v-bind:src="require(`@/assets/ImageR6/${activeImage}`)" style="width: 900px; max-width: 100%; max-height: 500px; margin: 10px;">
        </div>
        <div class="GameItem" style="margin-top: 12px; height: auto; min-width: 0;">
            <div class="hoverOnResponse" @click="clickOnAnswer(allAnswer[0], 0)" :class="{badResponse: correct[0] == 1, goodResponse: correct[0] == 2}" style="width: 300px; height: 120px; line-height: 120px; border: 1px solid white; margin-bottom: 5px; margin-right: 30px; max-width: 100%; max-height: 120px;">
              <p style="text-align: center;">{{allAnswer[0]}}</p>
            </div>
            <div class="hoverOnResponse" @click="clickOnAnswer(allAnswer[1], 1)" :class="{badResponse: correct[1] == 1, goodResponse: correct[1] == 2}" style="width: 300px; height: 120px; line-height: 120px; border: 1px solid white; margin-bottom: 5px; margin-right: 30px; max-width: 100%; max-height: 120px;">
              <p style="text-align: center;">{{allAnswer[1]}}</p>
            </div>
            <div class="hoverOnResponse" @click="clickOnAnswer(allAnswer[2], 2)" :class="{badResponse: correct[2] == 1, goodResponse: correct[2] == 2}" style="width: 300px; height: 120px; line-height: 120px; border: 1px solid white; margin-bottom: 5px; margin-right: 30px; max-width: 100%; max-height: 120px;">
              <p style="text-align: center;">{{allAnswer[2]}}</p>
            </div>
            <div class="hoverOnResponse" @click="clickOnAnswer(allAnswer[3], 3)" :class="{badResponse: correct[3] == 1, goodResponse: correct[3] == 2}" style="width: 300px; height: 120px; line-height: 120px; border: 1px solid white; margin-bottom: 5px; margin-right: 30px; max-width: 100%; max-height: 120px;">
              <p style="text-align: center;">{{allAnswer[3]}}</p>
            </div>
        </div>
      </div>
      <div v-else>
        <p>c'est fini xd</p>
        <h1>tu as fait {{userPoint}} bonne réponse !</h1>
        <v-btn :to="{ name: 'menu' }" flat color="orange">Retour</v-btn>
      </div>
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

export default {
  name: "game",
  data() {
    return {
      allImages: [],
      allAnswer: [],
      correct: [],      
      responseImg: "",
      activeImage: "chalet00.jpg",
      gameFinish: false,
      userPoint: 0
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
        console.log("gamefinish =", this.gameFinish);
      }
    },
    clickOnAnswer(response, index) {
      console.log("la reponse cliqué est =", response);
      if (response == this.responseImg)
        this.userPoint += 1;
      var pos;
      for (pos = 0; pos < this.allAnswer.length; pos++) {
        if (this.responseImg == this.allAnswer[pos]) break;
      }
      for (var i = 0; i < 4; i++) {
        if (pos == i) this.correct.push("2");
        else this.correct.push("1");
      }
      console.log("correct == ", this.correct);
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
.card {
  height: 100px;
}

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

.hoverOnResponse:hover {
  background-color: black;
  opacity: 0.4;
}

/* FlexBox */
#GameContainer {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
}

.GameItem {
  flex: 0 1 auto;
}
/* FlexBox */
</style>