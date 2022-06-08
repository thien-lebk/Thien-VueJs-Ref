<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-bottom="44"
    :nudge-left="400"
    :min-width="460"
  >
    <template v-slot:activator="{ on }">
      <div class="button-hard-size">
        <v-btn fab dark small class="mx-2 btn-filter" v-on="on">
          <img src="../../../assets/icon-filter-24.png">
        </v-btn>
      </div>
    </template>
  </v-menu>
</template>

<script>
export default {
  name: 'customer-list-filter',
  data() {
    return {
      menu: false,
    }
  }
}
</script>

<style scoped>
.button-hard-size .btn-filter{
  margin-right: 5px;
  font-size: 0.9vw !important;
  color: #DD1E26 !important;
  background-color: #ffffff !important;
}
</style>