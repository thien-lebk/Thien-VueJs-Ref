<template>
  <v-container fluid class="content-customer">
      <v-layout align-start justify-start row style="align-items: center;justify-content: center;">
        <v-flex xs3>
          <h2>Hồ Sơ Khách Hàng</h2>
        </v-flex>
        <v-flex xs9>
          <v-layout align-start justify-end row class="box-filter">
            <div class="button-hard-size">
              <v-btn fab dark small class="mx-2 btn-filter">
                <img src="../../assets/icon-filter-24.png">
              </v-btn>
              <v-btn fab dark small class="mx-2 btn-folder">
                <i class="material-icons">folder_open</i>
              </v-btn>
            </div>
            <div class="search-field">
              <v-text-field
                v-model="txtFilter"
                placeholder="Họ tên, CMND/HC, số điện thoại,..."
                outline
                round
                single-line
                filled
                prepend-inner-icon="search"
                v-on:keyup.enter="onSearch"
              ></v-text-field>
            </div>
          </v-layout>
        </v-flex>
      </v-layout>
      <customer-page :condition="this.txtFilter" ref="customerPage"/>
  </v-container>
</template>
<script>
import CustomerPageVue from './CustomerPage.vue';
import { isNullOrUndefined } from 'util';
  export default {
  name: "customer-management",
  components: {
    'customer-page': CustomerPageVue
  },
  data: () => ({
    txtFilter: "",
  }),
  watch: {
    '$route': {
      handler: 'getTextSearch',
      immediate: true
    }
  },
  methods: {
    onSearch() {
      if(isNullOrUndefined(this.$refs.customerPage)===false) {
        this.$refs.customerPage.getListCustomers();
      }
    },
    getTextSearch: async function() {
      let textSearch = this.$route.params.textSearch;
      if(isNullOrUndefined(textSearch)===true) {
        textSearch="";
      }
      this.txtFilter = String(textSearch);
      await this.txtFilter;
      this.onSearch();
    }
  }
}
</script>
<style>
.content-customer {
  margin: 0px !important;
  padding: 0px !important;
}

.search-field {
  width: 260px;
}

.search-field .v-text-field:hover,
.search-field .v-input__slot:hover {
  box-shadow: 0px 3px 3px 0px #898585;
}

.search-field .v-text-field,
.search-field .v-input__slot {
  padding: 0 !important;
  margin: 0 !important;
  border-radius: 50px !important;
  width: 100%!important;
  min-height: 40px!important;
  background-color: #ffffff!important;
}

.search-field .v-text-field--box .v-input__slot, 
.search-field .v-text-field--outline .v-input__slot{
  border-width: 1px!important;
  border-color: #D0D6DC!important;
}

.search-field .v-text-field--box .v-input__slot:hover, 
.search-field .v-text-field--outline .v-input__slot:hover{
  border-color: #1C78D3!important;
}

.search-field .v-text-field__slot {
  height: 30px!important;
}

.search-field .v-input__prepend-inner {
  margin: 8px 8px 0px 2px!important;
}

.search-field .v-input {
  font-size: 13px !important;
}

.search-field .v-text-field__details {
  display: none;
}

.content-customer .button-hard-size button {
  margin-right: 5px;
  font-size: 0.9vw !important;
  color: #DD1E26 !important;
  background-color: #ffffff !important;
}

.content-customer .box-filter {
  align-items: center;
  vertical-align: middle;
}
</style>