<template>
  <div id="app">
    <navigationBar v-bind:user = "this.user" v-on:logout="logout()"></navigationBar>
    <router-view v-bind:user = "this.user" v-bind:userData = "this.userData" v-bind:guest="this.userTypeGuest" v-on:login="login" v-on:reload="loadUserData" class="content"></router-view>
  </div>
</template>

<style>
#app {
  position: fixed;
  top: 0px;
  bottom:0px;
  left:0px;
  right: 0px;
  width: 100%;
  height: 100%;
  font-family: Verdana, Arial, sans-serif;
  background-color: #fff;
  
  overflow: auto;
}

.content{
  margin-left: 200px;
  padding: 5px 40px;
}
</style>

<script>
import navigationBar from "./components/reusable/navigationBar";
import axios from 'axios'

export default {
  name: 'App',
  components: {
    navigationBar
  },
  async mounted(){
    await this.loadUserData()
  },
  data () {
    return {
      // node: {
      //   Login: "Login",
      //   MainMenu: "MainMenu",
      //   Game: "Game",
      //   Shop: "Shop",
      //   LeaderBoard: "LeaderBoard",
      //   Account: "Account",
      //   Friends: "Friends"
      // },
      // visibility: {
      //   "Login": true,
      //   "MainMenu": false,
      //   "Game": false,
      //   "Shop": false,
      //   "LeaderBoard": false,
      //   "Account": false,
      //   "Friends": false
      // },
      userTypeGuest: true,
      user: {
        // userID: "ChanTaiMan",
        // password: "123",
        // lastActiveTime: "2022-01-01-00-00",
        // highestScore: 0,
        // accumulatedScore: 0,
        // coins: 0,
        // avatar: "avatar_default.png",
        // skin: "skin_default.png",
        // friendsID: [
        //   "HiHi123",
        //   "ABC1999"
        // ]
      },
      userData: [
        {
          userID: "ABC1999",
          password: "SecretPW",
          lastActiveTime: "2021-03-19-20-30",
          highestScore: 50,
          accumulatedScore: 1000,
          coins: 25,
          avatar: "avatar_default.png",
          skin: "skin_default.svg",
          friendsID: []
        },
        {
          userID: "HiHi123",
          password: "GoodMorning",
          lastActiveTime: "2021-03-15-21-19",
          highestScore: 250,
          accumulatedScore: 9000,
          coins: 550,
          avatar: "avatar_default.png",
          skin: "skin_default.svg",
          friendsID: []
        },
        {
          userID: "Killer55",
          password: "IAmSleepy",
          lastActiveTime: "2020-12-24-15-46",
          highestScore: 5,
          accumulatedScore: 10000,
          coins: 10,
          avatar: "avatar_default.png",
          skin: "skin_default.svg",
          friendsID: []
        },
        {
          userID: "ChanTaiMan",
          password: "123",
          lastActiveTime: "2022-01-01-00-00",
          highestScore: 0,
          accumulatedScore: 0,
          coins: 0,
          avatar: "avatar_default.png",
          skin: "skin_default.svg",
          friendsID: [
            "HiHi123",
            "ABC1999"
          ]
        }
      ],
      itemData:[
        {
          itemId: 1001,
          itemType: 'Avatar',
          itemName: 'Cat',
          itemImage: 'cat.png',
          cost: 150
        },
        {
          itemId: 1002,
          itemType: 'Avatar',
          itemName: 'Dog',
          itemImage: 'dog.png',
          cost: 100
        },
        {
          itemId: 1003,
          itemType: 'Avatar',
          itemName: 'Mouse',
          itemImage: 'mouse.png',
          cost: 50
        },
        {
          itemId: 2001,
          itemType: 'Skin',
          itemName: 'Knight',
          itemImage: 'logo.png',
          cost: 50
        },
        {
          itemId: 2002,
          itemType: 'Skin',
          itemName: 'Magician',
          itemImage: 'logo.png',
          cost: 100
        },
        {
          itemId: 2003,
          itemType: 'Skin',
          itemName: 'Warrior',
          itemImage: 'logo.png',
          cost: 150
        }
      ],
      ownershipData: []
    }
  },
  methods: {
    login(inputID){
      //Finding user data from database
      let found = this.userData.find(
          function (element) {
            return element.userID.localeCompare(inputID) === 0
          }
      )
      this.userTypeGuest = found === undefined
      if (this.userTypeGuest === false) {
        this.user = found
        console.log("Account: " + this.user.userID + " Password: " + this.user.password)
      }
    },
    logout(){
      this.user = {}
      this.userTypeGuest = true
      console.log("User logout")
    },
    updateUser(input){
      // Check if input object is empty
      if (Object.keys(input).length > 0) {
        this.user = input
        console.log("Updated User information.")
        console.log(this.user)
      }
    },
    async loadUserData(){
      const url = 'http://localhost:4040/userdata/'
      const response = await axios.get(url)
      this.userData = response.data
      console.log(response)
    }
  }
}
</script>