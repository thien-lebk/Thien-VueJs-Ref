<template>
  <v-card fluid class="content-contract-info">
    <v-layout align-center justify-center column class="contract-detail">
      <div class="titile-contract-info">
        <i class="material-icons" 
           :class="getClassStatus(status)">
          fiber_manual_record
        </i>
        <strong>#{{loanId}}</strong>
      </div>
      <span class="word-wrap-span text-center-span width-span-agen-name">{{productDesc}}</span>
      <span>Ngày Giờ Mở HĐ: {{createdDate}}</span> 
      <span class="word-wrap-span text-center-span width-span-agen-name">
        Làm hợp Đồng: {{agentName}}
      </span>
      <span>Chi nhánh: {{branchName}} &nbsp;|&nbsp; Lưu Kho: {{storageId}}</span>
    </v-layout>
    <div class="class-border"></div>
    <v-layout align-start justify-center column class="customer-info">
      <div class="titile-customer-info">
        <Strong>Thông Tin Khách Hàng</Strong>
      </div>
      <span class="label-customer">Họ tên:</span>
      <router-link :to="'/customers/'+this.customerDetail.id+'/customer-detail'">
        {{this.customerDetail.fullName}}
      </router-link>
      <span class="label-customer">Số Điện Thoại 1:</span>
      <span>
        {{this.customerDetail.primaryPhone}}
        <v-btn 
          fab small icon class="ma-0"
          @click="callHandle('primaryPhone')"
          :disabled="disableCall"
        >
          <v-icon color="rgba(1, 151, 246, 1)">call</v-icon>
        </v-btn>
      </span>
      <span v-show="disablePhone" class="label-customer">Số Điện Thoại 2:</span>
      <span v-show="disablePhone">
        {{this.customerDetail.alternativePhone}}
        <v-btn
          v-if="disablePhone"
          fab small icon class="ma-0" 
          @click="callHandle('alternativePhone')" 
          :disabled="disableCall"
        >
          <v-icon color="rgba(1, 151, 246, 1)">call</v-icon>
        </v-btn>
      </span>
      <span class="label-customer">Địa chỉ:</span>
      <span class="word-wrap-span width-span-address">{{this.customerDetail.fullAddress}}</span>
    </v-layout>
    <div class="class-border"></div>
    <action-button
      :disabled="summaryDetailErrorCode !== 200"
      :contractId="contractId"
    />
  </v-card>
</template>

<script>
import FullWordsActionButton from './FullWordsActionButton.vue'
import { mapActions, mapGetters } from "vuex";
import moment from 'moment'
import { isNullOrUndefined } from 'util';

export default {
  name: "contract-info",
  components: {
    'action-button': FullWordsActionButton
  },
  props: {
    contractId: String,
  },
  data() {
    return {
      loanId: null,
      orderId: null,
      status: null,
      createdDate: null,
      agentName: null,
      branchName: null,
      storageId: null,
      productDesc: null,
    }
  },
  computed: {
     ...mapGetters({
      contractDetail: 'contract/contractDetail',
      contractDetailErrorCode: 'contract/contractDetailErrorCode',
      summaryDetailErrorCode: 'contract/summaryDetailErrorCode',
      customerDetail: 'customer/customerDetail',
      enabled: 'call/enabled',
      calling: 'call/calling',
      ring: 'call/ring',
    }),
    disablePhone(){
      if (isNullOrUndefined(this.customerDetail.alternativePhone) === true ||
          String(this.customerDetail.alternativePhone).trim() === "") {
            return false;
      }
      return true;
    },
    disableCall() {
      if (this.calling || this.ring || !this.enabled) {
        return true
      } return false
    },
  },
  methods: {
    ...mapActions({
      getCustomerByCustomerId: 'customer/getCustomerByCustomerId',
      getContractByContractId: 'contract/getContractByContractId',
      call: 'call/call',
    }),
    getClassStatus(status){
      if (isNullOrUndefined(status)){
        return '';
      } else if (status.toUpperCase()==='ACTIVE') {
        return 'active-status';
      } else if (status.toUpperCase()==='OVERDUE') {
          return 'overdue-status';
      }else if (status.toUpperCase()==='WAITING') {
        return 'waiting-status';
      } else if (status.toUpperCase()==='CLOSED') {
        return 'close-status';
      }
    },
    detail(id) {
      if (isNullOrUndefined(id) === false) {
        this.$router.push({name: 'customer-detail', params: {id: id}})
      }
    },
    callHandle(phone_type) {
      let phone = null

      if (phone_type === 'primaryPhone') {
        phone = this.customerDetail.primaryPhone
      } else {
        phone = this.customerDetail.alternativePhone
      }
      this.call({phone: phone, name: this.customerDetail.fullName, orderId: this.orderId})
    },
  },
  watch: {
    contractDetailErrorCode() {
      if (this.contractDetailErrorCode === 200) {
        this.loanId = this.contractDetail.loanId
        this.status = this.contractDetail.status
        this.orderId = String(this.contractDetail.orderId)
        this.createdDate = this.contractDetail.maturesDate
        this.agentName = this.contractDetail.agentName
        this.branchName = this.contractDetail.branchName
        this.storageId = this.contractDetail.storageId
        this.getCustomerByCustomerId({id: this.contractDetail.clientId})
        this.productDesc = this.contractDetail.productDesc
      }
    }
  }
};
</script>

<style scoped>
.content-contract-info {
  padding: 0px;
  height: 100% !important;
}

/* css contract */
.titile-contract-info {
  display: inline-flex;
  margin-top: 35px;
  margin-bottom: 15px;
  text-align: center;
  align-items: center;
  vertical-align: middle;
}

.contract-detail span{
  margin: 5px;
  font-size: 1vw;
}

.contract-detail strong{
  font-size: 1.5vw;
}

.active-status {
  color: #00FF5F;
}

.waiting-status {
  color: #F6AC3B;
}

.close-status {
  color: #CECFD0;
}

.overdue-status {
  color: #DD1E26;
}

/* css customer info */
.customer-info {
  padding-left: 35px;
}

.customer-info strong {
  font-size: 1.1vw;
}

.customer-info span {
  font-size: 1vw;
}

.customer-info a {
  text-decoration: underline !important;
}

.titile-customer-info {
  text-align: center;
  width: 100%;
  margin: 2px 0px 5px -30px;
}

.customer-info .label-customer {
  color: #A5A5A7;
  margin-top: 5px;
}

.content-contract-info .class-border {
  border: 1px solid #BFBFBF;
  margin: 10px 20px;
}

.content-contract-info .word-wrap-span {
  display: block;
  width: 15vw;
  min-width: 230px;
  word-wrap: break-word;
}

.content-contract-info .width-span-agen-name {
  width: 15vw;
  min-width: 230px;
}

.content-contract-info .width-span-address {
  width: 15vw;
  min-width: 207px;
}

.content-contract-info .text-center-span {
  text-align: center;
}
</style>
