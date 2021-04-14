<template>
  <div v-if="visible" id="account" class="outer-container">
<!--    <NavBar></NavBar>-->
    <div class="main-content">
      <h1>Account</h1>
      <div>
          <img :src="imagePath(user.avatar)">
          <p> UserID: {{ user.userID }} </p>
          <p> Last Active Time: {{ user.lastActiveTime }} </p>
          <p> Highest Score: {{ user.accumulatedScore }} </p>
          <p> Coins: {{ user.coins }} </p>
<form action="user.avatar">
  <label for="avatar">Choose an avatar:</label>
  <select name="avatar" id="avatar">
    <option value="cat.png">cat</option>
    <option value="dog.png">dog</option>
    <option value="mouse.png">mouse</option>
  </select>
  <br><br>
  <input type="submit" value="Submit">
</form>
  <form action="user.skin">
    <label for="skin">Choose an skin:</label>
    <select name="skin" id="skin">
      <option value="knight.png">knight</option>
      <option value="magician.png">magician</option>
      <option value="warrior.png">warrior</option>
    </select>
    <br><br>
    <input type="submit" value="Submit">
</form>
      </div>
    </div>
  </div>
</template>

<script>
// import NavBar from '../components/reusable/navigationBar.vue'
import axios from "axios";
// import '../../assets/style.css'
export default {
  // components: { NavBar },
  name: "Account",
  props:{
    visible: {
      type: Boolean,
      default: true
    },
    user:{
      default: {
        userID: "",
        password: "",
        lastActiveTime: "",
        highestScore: 0,
        accumulatedScore: 0,
        coins: 0,
        avatar: "avatar_default.png",
        skin: "skin_default.png",
        friendsID: []
      }
    },
    userData : {
      type: Array
    },
  },
  data(){
    return{
      ownedItemData: []
    }
  },
  async mounted() {
    //Load ownership data from database
    const url = 'http://localhost:4040/ownership/'
    const response = await axios.get(url)

    //Get relations that are related to current user only
    const currentUserID = this.user.userID
    this.ownedItemData = response.data.filter(
        function (element) {
          return element.userID.localeCompare(currentUserID) === 0
        }
    )
    console.log(response)
  },
  methods: {
    exit() {
      console.log("Exited: " + this.$options.name)
      this.$emit("exit", this.$options.name, "MainMenu")
    },
    imagePath(path) {
      if (!path) {
        path = "avatar_default.png";
      }
      return require('../assets/' + path);
    },
  }
}
</script>

<style scoped>
</style>
