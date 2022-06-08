<!-- eslint-disable-next-line -->
<template>
    <v-container fluid fill-height class="pa-0">
        <v-layout>
            <v-flex md2 :style="{'background-color': '#de1e25'}">
              <v-layout align-center justify-center column fill-height>
                <img src="../../assets/rabbit.png" alt="icon">
              </v-layout>
            </v-flex>
            <v-flex md10 id="landing-page">
              <v-layout align-center justify-center column fill-height>
                <div class="signin-form">
                    <v-layout align-center justify-center column fill-height>
                        <div class="title">
                            <h1>CAMDO<strong>NHANH</strong></h1>
                        </div>
                        <h1>Đăng Nhập</h1>
                        <form @submit.prevent="loginHandle">
                          <v-layout align-center column fill-height>
                          <input id="username" type="text" placeholder="username" v-model="username"/>
                          <input id="password" type="password" placeholder="password" v-model="password"/>
                          <br style="margin-bottom:20px;"/>
                          <button type="submit" :disabled="authenticating" class="button">
                              Login
                          </button>
                          </v-layout>
                        </form>
                        <br style="margin-bottom:20px;"/>
                        <div class="copy-right">
                            <p><i>Copyright © 2018-2019 ICADO Co.Ltd <br/> All rights reserved.</i></p>
                        </div>
                    </v-layout>
                </div>
              </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: "login",
  props : ["nextUrl"],
  computed: {
    ...mapGetters({
      authenticating:'auth/authenticating',
      authenticationErrorCode:'auth/authenticationErrorCode',
      authenticationError:'auth/authenticationError'
    })
  },
  data() {
    return {
      username: null,
      password: null,
    }
  },
  methods: {
      ...mapActions({
        login: 'auth/login'
      }),
      loginHandle: function() {
        this.login({username: this.username, password: this.password})
      }
  },
  watch: {
    authenticationErrorCode() {
      //Login Successfully
      if (this.authenticationErrorCode == 200) {
        this.dialog = true
        if(this.$route.params.nextUrl != null){
          this.$router.push(this.$route.params.nextUrl)
        }
        else{
          this.$router.push('/')
        }
      } else if (this.authenticationErrorCode != 0) {
        this.$notify({
          group: 'foo',
          type: 'error',
          title: "Error: "+this.authenticationErrorCode,
          text: this.authenticationError
        });
      }
    }
  }
};
</script>

<style scoped>

input {
  font-size: 20px;
  border: 0;
  outline: 0;
  background: transparent;
  border-bottom: 1px solid black;
}

.button { 
  background: #0099CC;
  border-radius: 6px;
  border: none;
  color: white;
  padding: 9px 22px;
  text-align: center;
  display: inline-block;
  font-size: 16px;
  margin-top: 4px;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
}

.button:hover {
  background-color: #008CBA;
  color: white;
 }

#landing-page {
  background-image: url('../../assets/bitexco.jpg');
    /* background-color: #8f2c2c; */
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}

.signin-form {
  background-color: white;
  width: 410px;
  height: 370px;
  border-radius: 28px;
  top: 45%;
  left: 50%;
}

.title h1 {
  color: #DD1E26;
}

/* Shared */
.loginBtn {
  box-sizing: border-box;
  position: relative;
  margin: 0.2em;
  padding: 0 15px 0 46px;
  border: none;
  text-align: left;
  line-height: 40px;
  white-space: nowrap;
  border-radius: 0.2em;
  font-size: 16px;
  color: #FFF;
}
.loginBtn:before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 34px;
  height: 100%;
}
.loginBtn:focus {
  outline: none;
}
.loginBtn:active {
  box-shadow: inset 0 0 0 32px rgba(0,0,0,0.1);
}

h1 {
  color: #43425D;
}

.copy-right {
  color: #43425D;
}

</style>