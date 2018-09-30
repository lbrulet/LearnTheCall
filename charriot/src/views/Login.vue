<template id="login-form">
 <v-app>
   <div class="all">
     <div class="alert">
    <v-alert
      dismissible
      :value="alert"
      type="error"
      transition="scale-transition"
    >
      Something's wrong
    </v-alert>
     </div>
  <div class="login-wrapper">
    <div class="login-left">
      <img height="400" src="https://d1u5p3l4wpay3k.cloudfront.net/rlesports_gamepedia_en/a/a2/Northern_Gaminglogo_square.png">
    </div>
    <form class="login-right" @submit.prevent>
      <div v-if="isRegister" class="h2">Login</div>
      <div v-if="!isRegister" class="h3">Register</div>
      <div class="form-group">
        <input type="text" id="username" placeholder="Username" v-model="username">
        <label for="username">Username</label>    
      </div>
      <div v-if="!isRegister" class="form-group">
        <input type="text" id="email" placeholder="Email" v-model="email">
        <label for="Email">Email</label>    
      </div>
      <div class="form-group">
        <input type="password" id="Password" placeholder="Password" v-model="password">
        <label for="Password">Password</label>    
      </div>
      <div v-if="!isRegister" class="form-group">  
        <input type="password" id="PasswordConfirm" placeholder="Password confirm" v-model="passwordConfirm">
        <label for="Password">Password confirm</label>    
      </div>
      <div v-if="isRegister" class="checkbox-container">
        <input type="checkbox" v-model="rememberMe">
        <div class="text-checkbox">Remember me</div>
      </div> 
      <div v-if="isRegister" class="button-area">
        <button class="btn btn-primary pull-right" @click="login()" >Login</button>
        <button class="btn btn-primary pull-right" @click="register()" >Register ?</button>
      </div>
      <div v-if="!isRegister" class="button-area-register">
        <button class="btn btn-primary pull-right" @click="signUp()" >Sign Up !</button>
      </div>
      </form>
    </div>
   </div>
  </v-app>
</template>

<script>
import store from "@/store/store.js";
import axios from "axios";
export default {
  name: "LoginForm",
  template: "#login-form",
  data() {
    return {
      rememberMe: false,
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
      isRegister: true,
      alert: false,
      visibility: true
    };
  },
  beforeMount() {
    let init = 700;
    setTimeout(function() {
      document.querySelector(".login-wrapper").classList.toggle("open");
      init = 300;
    }, init);
  },
  methods: {
    isRememberMe() {
      return this.rememberMe === true;
    },
    login() {
      if (this.username == "" || this.password == "") {
        console.log("The username and / or password is incorrect");
      } else {
        axios
          .post(
            "http://54.38.184.10:5000/api/login",
            {
              usernameLogin: this.username,
              password: this.password
            },
            {
              headers: { "Access-Control-Allow-Origin": "*" }
            }
          )
          .then(response => {
            store.dispatch("setToken", response.data.data.token);
            store.dispatch("setUser", response.data.data.username);
            this.$router.replace({ name: "secure" });
          })
          .catch(err => {
            this.alert = true;
          });
      }
    },
    register() {
      if (this.isRegister == true) this.isRegister = false;
      else this.isRegister = true;
    },
    signUp() {
      if (this.alert == true) {
        this.alert = false;
      } else {
        this.alert = true;
      }
      if (this.username == "" || this.email == "")
        console.log("The username and / or email is empty");
      else if (
        this.passwordConfirm == "" ||
        this.passwordConfirm == "" ||
        this.passwordConfirm != this.password
      )
        console.log("The Password and / or password is empty / not the same");
      else {
        axios
          .post(
            "http://54.38.184.10:5000/api/register",
            {
              person: {
                usernameRegister: this.username,
                email: this.email,
                password: this.password,
                passwordConfirm: this.passwordConfirm
              }
            },
            {
              headers: { "Access-Control-Allow-Origin": "*" }
            }
          )
          .then(response => {
            this.$router.replace({ name: "secure" });
          })
          .catch(err => {
            console.log(err.message);
            this.alert = true;
          });
      }
      console.log("");
    }
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}

html,
body {
  height: 100%;
  width: 100%;
}

#app {
  width: 100%;
}

#sandbox {
  font-family: "Lato", sans-serif;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-direction: row-reverse;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  background: linear-gradient(243.87deg, #22bf64 30.6%, #371933 130.6%);
  overflow: hidden;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

input {
  font-family: inherit;
  -webkit-appearance: none;
  -moz-appearance: none;
  border: 0;
  font-size: 16px;
  color: #000;
  border-radius: 0;
  border-botton: 0;
}

.all {
  margin-top: 2%;
}

.alert {
  position: absolute;
  text-align: center;
  margin-left: 45%;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #aaaaaa;
}

button,
input:focus {
  outline: 0;
}

::-webkit-input-placeholder {
  font-size: 16px;
  font-weight: 300;
  letter-spacing: -0.00933333em;
}

.form-group {
  position: relative;
  padding-top: 15px;
  margin-top: 5px;
}

label {
  position: absolute;
  top: 0;
  opacity: 1;
  -webkit-transform: translateY(5px);
  transform: translateY(5px);
  color: #aaa;
  font-weight: 300;
  font-size: 13px;
  letter-spacing: -0.00933333em;
  transition: all 0.2s ease-out;
}

input:placeholder-shown + label {
  opacity: 0;
  -webkit-transform: translateY(15px);
  transform: translateY(15px);
}

.h1 {
  color: #fff;
  opacity: 0.8;
  font-size: 20px;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.2405em;
  transition: all 770ms cubic-bezier(0.51, 0.04, 0.12, 0.99);
  text-align: center;
  cursor: pointer;
  position: absolute;
  transform: translateY(-10px);
}

.open .h1 {
  -webkit-transform: translateX(200px) translateZ(0) translateY(-10px);
  transform: translateX(200px) translateZ(0) translateY(-10px);
}

@font-face {
  font-family: Lemon;
  src: url("../assets/LemonMilk.otf") format("opentype");
}

.h2 {
  color: rgb(20, 158, 66);
  font-size: 30px;
  letter-spacing: -0.00933333em;
  font-weight: 600;
  padding-bottom: 15px;
  margin-left: 35%;
  font-family: "Lemon";
}

.h3 {
  color: rgb(20, 158, 66);
  font-size: 30px;
  letter-spacing: -0.00933333em;
  font-weight: 600;
  padding-bottom: 15px;
  margin-left: 30%;
  font-family: "Lemon";
}

.login-wrapper {
  width: 800px;
  height: 440px;
  background-color: #fff;
  box-shadow: 0px 2px 50px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  margin-top: 5%;
  margin-left: 29.5%;
  overflow: hidden;
  position: relative;
}

.login-left {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 770ms cubic-bezier(0.51, 0.04, 0.12, 0.99);
  overflow: hidden;
}

.login-left img {
  display: block;
  transition: all 770ms cubic-bezier(0.51, 0.04, 0.12, 0.99);
  object-position: left;
}

.open .login-left img {
  -webkit-transform: translateX(210px) translateZ(0);
  transform: translateX(210px) translateZ(0);
}

.open .login-left {
  -webkit-transform: translateX(-400px) translateZ(0);
  transform: translateX(-400px) translateZ(0);
}

.login-right {
  padding: 40px;
  position: absolute;
  top: 0;
  right: 0;
  width: 400px;
  -webkit-transform: translateX(400px) translateZ(0);
  transform: translateX(400px) translateZ(0);
  transition: all 770ms cubic-bezier(0.51, 0.04, 0.12, 0.99);
}

.open .login-right {
  -webkit-transform: translateX(0px) translateZ(0);
  transform: translateX(0px) translateZ(0);
}

.checkbox-container {
  display: flex;
  margin-top: 35px;
}

.text-checkbox {
  color: #aaa;
  font-size: 16px;
  letter-spacing: -0.00933333em;
  font-weight: 300;
  margin-left: 15px;
}

input[type="checkbox"] {
  cursor: pointer;
  margin: 0;
  height: 22px;
  position: relative;
  width: 22px;
  -webkit-appearance: none;
  transition: all 180ms linear;
}

input[type="checkbox"]:before {
  border: 1px solid #aaa;
  background-color: #fff;
  content: "";
  width: 20px;
  height: 20px;
  display: block;
  border-radius: 2px;
  transition: all 180ms linear;
}

input[type="checkbox"]:checked:before {
  background: linear-gradient(198.08deg, #22bf64 45.34%, #e281e7 224.21%);
  border: 1px solid #22bf64;
}

input[type="checkbox"]:after {
  content: "";
  border: 2px solid #fff;
  border-right: 0;
  border-top: 0;
  display: block;
  height: 4px;
  left: 4px;
  opacity: 0;
  position: absolute;
  top: 6px;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
  width: 12px;
  transition: all 180ms linear;
}

input[type="checkbox"]:checked:after {
  opacity: 1;
}

.button-area {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}

.button-area-register {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-left: 30%;
  text-align: center;
}

.btn {
  font-family: inherit;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: transparent;
  border: none;
  border-radius: 2px;
  height: 40px;
  display: flex;
  padding: 0 35px;
  cursor: pointer;
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: -0.00933333em;
}

.btn-primary {
  color: #fff;
  background: linear-gradient(198.08deg, #22bf64 45.34%, #e281e7 224.21%);
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  text-align: right;
}

.btn-primary:hover,
.btn-primary:focus {
  color: #fff;
  background: linear-gradient(198.08deg, #1b984f 45.34%, #e281e7 224.21%);
}

.btn-secondary {
  color: #22bf64;
}
.btn-secondary:focus,
.btn-secondary:hover {
  color: #1b984f;
}
</style>
