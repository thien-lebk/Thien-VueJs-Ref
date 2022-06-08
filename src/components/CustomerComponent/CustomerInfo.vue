<template>
  <v-card fluid class="content-customer-info">
    <v-layout align-center justify-center column class="customer-info">
          <img src="../../assets/default-avatar.png" alt="logo" class="avatar-img">
          <div class="box-customer-name">
            <h2 class="customer-name">{{this.customerDetail.fullName}}</h2>
            <customer-info-edit-dialog 
              @callBackFunction="updateData($event)"
              v-bind:customerIdS="customerId"/>
          </div>
          <span>Mã KH: #{{this.customerDetail.customerId}}</span>
          <span>Chi Nhánh: {{this.customerDetail.branchName}}</span>
          <span class="word-wrap-span text-center-span">
            Người Tạo: {{this.customerDetail.createdName}}
          </span>
    </v-layout>
    <v-layout align-center justify-center row class="customer-info-bottom">
      <v-flex xs5 class="rating-customer">
        <i class="material-icons">star</i>
        <i class="material-icons">star</i>
        <i class="material-icons">star</i>
        <i class="material-icons">star</i>
        <i class="material-icons">star</i>
      </v-flex>
      <v-flex xs1>
        |
      </v-flex>
      <v-flex xs5>
        <span>
          {{
              this.convertNullUndefined(this.customerTH.totalOrder)
            + ' Order - ' 
            + this.convertNullUndefined(this.customerTH.totalLoan) 
            + ' Khoản vay'
          }}
        </span>
      </v-flex>
    </v-layout>
    <div class="class-border"></div>
    <v-layout align-start justify-center column class="contract-info">
      <div class="titile-info">
        <Strong>Thông Tin Liên Hệ</Strong>
      </div>
      <table>
        <tbody>
          <tr>
            <td>
              <span class="label">Số Điện Thoại 1:</span><br>
              <span>{{this.customerDetail.primaryPhone}}</span>
              <v-btn 
                fab small icon class="ma-0"
                @click="callHandle('primaryPhone')"
                :disabled="disableCall"
              >
                <v-icon color="rgba(1, 151, 246, 1)">call</v-icon>
              </v-btn>
            </td>
            <td>
              <span v-if="disablePhone" class="label">Số Điện Thoại 2:</span><br>
              <span v-if="disablePhone">{{this.customerDetail.alternativePhone}}</span>
              <v-btn
                v-if="disablePhone"
                fab small icon class="ma-0" 
                @click="callHandle('alternativePhone')" 
                :disabled="disableCall"
              >
                <v-icon color="rgba(1, 151, 246, 1)">call</v-icon>
              </v-btn>
            </td>
          </tr>
          <tr style="height:8px;"></tr>
          <tr>
            <td colspan="2">
              <span class="label">Địa Chỉ Nhà:</span><br>
              <span class="word-wrap-span">{{this.customerDetail.fullAddress}}</span>
            </td>
          </tr>
          <tr style="height:8px;"></tr>
          <tr>
            <td>
              <span class="label">CMND/HC:</span><br>
              <span>{{this.customerDetail.nationalId}}</span>
            </td>
            <td>
              <span class="label">Ngày Tạo:</span><br>
              <span>{{this.customerDetail.created}}</span>
            </td>
          </tr>
          <tr style="height:8px;"></tr>
          <tr>
            <td>
              <span class="label">Năm Sinh:</span><br>
              <span>{{this.customerDetail.dateOfBirth}}</span>
            </td>
            <td>
              <span class="label">Giới Tính:</span><br>
              <span>{{this.customerDetail.gender}}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </v-layout>
    <div class="class-border"></div>
    <v-layout align-start justify-center column class="performance-history">
      <div class="titile-info">
        <Strong>Lịch Sử Giao Dịch</Strong>
      </div>
      <table>
        <tbody>
          <tr>
            <td>
              <span>Tổng số HĐ:</span>
              <span>{{this.customerTH.totalContract}}</span>
            </td>
            <td>
              <span class="label">Liên hệ gần nhất:</span>
              <span></span>
            </td>
          </tr>
          <tr>
            <td>
              <span>Tổng HĐ đang mở:</span>
              <span>{{this.customerTH.totalActiveContract}}</span>
            </td>
            <td>
              <span class="label">Lần giải ngân gần nhất:</span>
            </td>
          </tr>
          <tr>
            <td>
              <span>Tổng khoản vay:</span>
              <span>{{this.customerTH.totalLoan}}</span>
            </td>
            <td>
              <span>{{this.customerTH.lastDisburse}}</span>
            </td>
          </tr>
        </tbody>
      </table>
      <v-layout align-center justify-center row class="performance-history-bottom">
        <span class="word-wrap-span text-center-span">
          <img src="../../assets/default-avatar.png" alt="logo" class="avatar-img">
          Cập nhật gần nhât: 
          <strong>{{this.customerDetail.lastUpdatedName}}</strong>
        </span>
      </v-layout>
    </v-layout>
  </v-card>
</template>

<script>
import CustomerInfoEditDialog from './CustomerInfoEditDialog.vue'
import { mapActions, mapGetters } from "vuex";
import { isNullOrUndefined } from 'util';

export default {
  name: "customer-info",
  components: { CustomerInfoEditDialog},
  props: {
    customerId: String,
  },
  mounted() {
    this.getCustomerTransactionHistory({id: this.customerId})
  },
  computed: {
    ...mapGetters({
      customerDetail: 'customer/customerDetail',
      customerTH: 'customer/customerTH',
      enabled: 'call/enabled',
      calling: 'call/calling',
      ring: 'call/ring',
    }),
    disableCall() {
      if (this.calling || this.ring || !this.enabled) {
        return true
      } return false
    },
    disablePhone(){
      if (isNullOrUndefined(this.customerDetail.alternativePhone) === true ||
          String(this.customerDetail.alternativePhone).trim() === "") {
            return false;
      }
      return true;
    },
  },
  methods: {
    ...mapActions({
      getCustomerByCustomerId: 'customer/getCustomerByCustomerId',
      getCustomerTransactionHistory: 'customer/getCustomerTransactionHistory',
      call: 'call/call',
    }),
    getCustomerById: async function(){
      this.getCustomerByCustomerId({id: this.customerId});
      this.getCustomerTransactionHistory({id: this.customerId});
    },
    convertNullUndefined(value) {
      if (isNullOrUndefined(value) === true) {
        return '0'
      } else {
        return value;
      }
    },
    updateData: function(id) {
      if(isNullOrUndefined(id)===false) {
        this.getCustomerById();
      }
    },
    callHandle(phone_type) {
      let phone = null

      if (phone_type === 'primaryPhone') {
        phone = this.customerDetail.primaryPhone
      } else {
        phone = this.customerDetail.alternativePhone
      }
      this.call({phone: phone, name: this.customerDetail.fullName, orderId: null})
    },
  },
};
</script>

<style scoped>
.content-customer-info {
  padding: 10px;
  height: 100% !important;
}

.content-customer-info .titile-info {
  margin-bottom: 10px;
  text-align: center;
  width: 100%;
  font-size: 15px;
}

.content-customer-info .avatar-img {
  border-radius: 50%;
  width: 8vw;
  height: 8vw;
  min-width: 60px;
  min-height: 60px;
}

.content-customer-info .customer-name {
  margin-right: 10px;
  text-transform: uppercase;
  font-size: 16px;
}

.content-customer-info .box-customer-name {
  display: inline-flex;
  text-align: center;
  vertical-align: middle;
  align-items: center;
  margin-top: 10px;
  margin-left: 10px;
}

.content-customer-info .customer-info-bottom {
  font-size: 0.9vw;
  text-align: center;
  vertical-align: middle;
  align-items: center;
  margin-top: 5px;
}

.content-customer-info .customer-info-bottom i {
  font-size: 1.5vw;
  color: #DD1E26;
}

.content-customer-info .class-border {
  border: 1px solid #BFBFBF;
  margin: 20px;
}

.content-customer-info .contract-info table,
.content-customer-info .performance-history table{
  width: 100%;
}

.content-customer-info .performance-history-bottom {
  font-size: 0.9vw;
  text-align: center;
  vertical-align: middle;
  align-items: center;
  margin-top: 10px 0px;
  width: 100%;
}

.content-customer-info .performance-history-bottom .avatar-img {
  border-radius: 50%;
  width: 2vw;
  height: 2vw;
  min-width: 40px;
  min-height: 40px;
  margin-right: 5px;
}
.content-customer-info .label {
  color: #A5A5A7;
}

.content-customer-info .word-wrap-span {
  display: block;
  width: 25vw;
  min-width: 280px;
  word-wrap: break-word;
}

.content-customer-info .text-center-span {
  text-align: center;
}
</style>
