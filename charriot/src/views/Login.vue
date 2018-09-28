<template>
 <div>
   <form class="login" @submit.prevent="login">
     <h1>Sign in</h1>
     <label>User name</label>
     <input required v-model="usernameLogin" type="text" placeholder="Snoopy"/>
     <label>Password</label>
     <input required v-model="password" type="password" placeholder="Password"/>
     <hr/>
     <button type="submit">Login</button>
   </form>
 </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      usernameLogin: "",
      password: ""
    };
  },
  methods: {
    login() {
      if (this.usernameLogin == "" || this.password == "") {
        console.log("The username and / or password is incorrect");
      } else {
        axios
          .post(
            "http://54.38.184.10:5000/api/login",
            {
              usernameLogin: this.usernameLogin,
              password: this.password
            },
            {
              headers: { "Access-Control-Allow-Origin": "*" }
            }
          )
          .then(response => {
            this.$router.replace({ name: "secure" });
          })
          .catch(err => {
            alert(err);
          });
      }
    }
  }
};
</script>