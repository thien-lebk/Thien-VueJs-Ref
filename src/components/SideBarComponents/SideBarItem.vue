<template>
    <li class="menu-item" v-on:click="redirectHandle">
        <div class="padding-left"><i v-bind:class="icon"></i>&nbsp;{{message}}</div>
    </li>
</template>

<script>
export default {
  name: "SideBarItem",
  props: {
    message: String,
    link: String,
    icon: String
  },
  methods: {
    redirectHandle: function(event) {
      this.$router.push(this.link);
    }
  }
};
</script>

<style scoped>
li {
  cursor:pointer;
  font-size: 18px;
  color: #fff;
}

.menu-item:hover {
  background-color: #BB3F30
}

.padding-left {
  padding-left: 25px;
}
</style>