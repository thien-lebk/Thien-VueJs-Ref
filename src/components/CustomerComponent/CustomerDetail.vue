<template>
  <v-layout align-space-around justify-start column>
    <v-layout align-center justify-end row class="customer-button-top">

      <call-dialog 
            flagCustomer="customer"
            :phoneNumber1="phoneNumber1"
            :phoneNumber2="phoneNumber2"
            :name="name"
      >
        <template slot-scope="scope">
          <v-btn fab dark small class="mx-2" color="#FFFFFF" @click="scope.open">
            <v-icon color="#DD1E26">call</v-icon>
          </v-btn>
        </template>
      </call-dialog>

      <v-btn fab dark small class="mx-2 btn-mail">
        <i class="material-icons">mail</i>
      </v-btn>
      <v-btn round class="btn-back-customer" :to="{ name: 'customers' }">
        <i class="material-icons">close</i>
      </v-btn>
    </v-layout>
    <v-layout align-space-around justify-start row fill-height fluid class="content-customer-detail">
      <v-flex xs4 class="container box-customer-info">
          <customer-info :customerId="customerId"/>
      </v-flex>
      <v-flex xs8 class="container box-customer-tabs">
          <customer-tabs :customerId="customerId"/>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
import CallDialog from '../commonComponent/CallDialog.vue'
import CustomerTabs from "./CustomerTabs.vue";
import CustomerInfo from "./CustomerInfo.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "customer-detail",
  components: { CustomerInfo, CustomerTabs, CallDialog },
  data: () => ({
    phoneNumber1:'',
    phoneNumber2:'',
    name:'',
  }),
  created() {
    this.getCustomerByCustomerId()
  },
  computed: {
    ...mapGetters({
      customerDetail: 'customer/customerDetail',
      customerDetailErrorCode: 'customer/customerDetailErrorCode',
    }),
    customerId() {
      return String(this.$route.params.id)
    }
  },
  methods: {
    ...mapActions({
      getCustomerByCustomerId: 'customer/getCustomerByCustomerId',
    }),
  },
  watch: {
    customerDetailErrorCode() {
      if (this.customerDetailErrorCode === 200) {
        this.phoneNumber1 = this.customerDetail.primaryPhone
        this.phoneNumber2 = this.customerDetail.alternativePhone
        this.name = this.customerDetail.fullName
      }
    },
  }
};
</script>

<style scoped>
.container {
  height: 100% !important;
  padding: 0px !important;
  margin: 0px !important;
  background-color: #FFFFFF !important;
}

.content-customer-detail {
  padding: 0px !important;
  margin: 0px !important;
  height: 100%;
  border: none;
}

.box-customer-info {
  margin-right: 15px !important;
  min-width: 300px !important;
}

.box-customer-tabs {
  min-width: 700px !important;
}

.btn-back-customer {
  background-color: #DD1E26 !important;
  min-width: 2.5vw !important;
  padding: 1px;
  margin: 0px 0px  5px 0px;
  font-size: 1vw !important;
  color: #ffffff !important;
  border-radius: 5% !important;
}

.customer-button-top .btn-mail {
  color: #DD1E26 !important;
  background-color: #FFFFFF!important;
  margin-right: 20px !important;
}
</style>