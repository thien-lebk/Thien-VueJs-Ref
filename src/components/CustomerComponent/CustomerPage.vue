<template>
  <div class="text-center">
    <v-layout wrap class="customer-items">
        <v-flex xs12 sm12 md6 lg6 xl6 v-for="(item, index) in this.customerListResult" :key="item.id">
          <v-card class="customer-item" :class="index%2===0?'margin-right':''">
            <v-layout align-start justify-start column>
              <div class="button">
                <v-btn class="btn-edit" @click="detail(item.id)">
                  <i class="material-icons">mode_edit</i>
                </v-btn>
              </div>
              <v-layout align-start justify-start row fill-height style="width:100%;">
                <v-flex xs2 class="avatar-box">
                  <img src="../../assets/default-avatar.png" alt="logo" class="avatar-img">
                </v-flex>
                <v-flex xs10>
                  <table style="width:100%">
                    <tbody>
                      <tr>
                        <td colspan="2">
                          <div class="customer-title-name">
                            <i class="material-icons" :class="getClassStatus(item.status)">fiber_manual_record</i>
                            <strong style="margin-right:2px;">{{item.customerName}}</strong>
                            <span>(#{{item.customerId}})</span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style="width:35%"><span>CMND/HC:{{item.nationalId}}</span></td>
                        <td style="width:65%"><span>Chi nhánh:{{item.branchName}}</span></td>
                      </tr>
                      <tr>
                        <td style="width:35%"><span>Liên hệ:{{item.primaryPhone}}</span></td>
                        <td style="width:65%"><span>Người tạo:{{item.createdName}}</span></td>
                      </tr>
                    </tbody>
                  </table>
                </v-flex>
              </v-layout>
              <div class="class-border"></div>
              <v-layout align-center justify-center row class="button">
                  <v-btn class="btn-call" @click="callHandle(item.primaryPhone, item.customerName)">
                    <i class="material-icons">call</i>
                  </v-btn>
                  <v-btn class="btn-mail">
                    <i class="material-icons">mail_outline</i>
                  </v-btn>
                  <v-btn class="btn-zalo">
                    <img src="../../assets/icon-zalo-24.png">
                  </v-btn>
                  <v-btn class="btn-facebook">
                    <img src="../../assets/icon-fb-24.png">
                  </v-btn>
              </v-layout>
            </v-layout>
          </v-card>
        </v-flex>
    </v-layout>
    <v-layout align-end justify-end row class="paging">
      <v-pagination v-model="curentPage"
                    :length="totalPage" 
                    :color="'#DD1E26'"
                    @input="getListCustomersPaging"
                    :total-visible="5"></v-pagination>
    </v-layout>
  </div>
</template>
<script>
import moment from 'moment'
import {isNullOrUndefined} from 'util'
import {mapActions, mapGetters} from 'vuex'
export default {
  name: "customer-page",
  components: {},
  props: {
    condition: String,
  },
  data: function() {
    return {
      curentPage: 1,
      rowOfPage: 6,
      totalPage: 0,
    };
  },
  computed: {
    ...mapGetters({
      customerListResult: 'customer/customerListResult',
      customerCountResult: 'customer/customerCountResult',
      customerListRequest: 'customer/customerListRequest',
      customerListErrorCode: 'customer/customerListErrorCode',
      customerListError: 'customer/customerListError',
    }),
  },
  created() {
    this.getCustomerList();
  },
  methods: {
    ...mapActions({
      getCustomerList: 'customer/getCustomerList',
      call: 'call/call',
    }),
    getTotalPage(totalRows) {
      return Math.ceil(totalRows/this.rowOfPage);
    },
    getClassStatus(status){
      if (isNullOrUndefined(status)){
        return '';
      } else if (status.toUpperCase()==='ACTIVE') {
        return 'active-status';
      } else if (status.toUpperCase()==='INACTIVE') {
        return 'close-status';
      }
    },
    getListCustomers:async function(page) {
      if(isNullOrUndefined(page)===true){
        this.curentPage=1;
      }
      await this.getCustomerList({page: this.curentPage, condition: this.condition});
      this.totalPage = this.getTotalPage(this.customerCountResult);
    },
    getListCustomersPaging(){
      this.getListCustomers(this.curentPage);
    },
    detail: function (id) {
      if (isNullOrUndefined(id) === false) {
        this.$router.push({name: 'customer-detail', params: {id: id}})
      }
    },
    callHandle(phone, name) {
      this.call({phone: phone, name: name, orderID: null})
    },
  }
};
</script>
<style>
.customer-items .customer-item {
  margin-top: 15px;
  padding: 0px 10px 10px 10px;
}

@media (max-width: 970px) { 
  .customer-items .margin-right,
  .customer-items .margin-right {
    margin-right: 0px;
  } 
}

@media (min-width: 970px) { 
  .customer-items .margin-right,
  .customer-items .margin-right {
    margin-right: 15px;
  }
}

.customer-item .button {
  margin-top: 5px;
  text-align: right;
  width: 100%;
}

.customer-item .button button {
  background-color: transparent !important;
  padding: 0px !important;
  margin: 0px !important;
  min-width: auto !important;
  border: none !important;
  box-shadow: none !important;
}

.customer-item .button .btn-edit {
  color: #A4AFB7 !important;
  height: auto !important;
}

.customer-item .button .btn-edit i {
  font-size: 1.2vw !important;
  font-weight: bold !important;
}

.customer-item .button .btn-call, 
.customer-item .button .btn-mail,
.customer-item .button .btn-zalo,
.customer-item .button .btn-facebook {
  color: #A4AFB7 !important;
  height: auto !important;
  margin-right: 3vw !important;
}

.customer-item .customer-title-name {
  display: inline-flex;
  text-align: center;
  align-items: center;
  vertical-align: middle;
}

.customer-item .customer-title-name i {
  font-size: 1.5vw !important;
}

.customer-item .avatar-box {
  vertical-align: middle;
  align-items: center;
  min-width: 6vw !important;
  min-height: 6vw !important;
}
.customer-item .avatar-img {
  border-radius: 50%;
  width: 5vw;
  height: 5vw;
  min-width: 60px;
  min-height: 60px;
}

.paging {
  margin-top: 15px;
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

.customer-item .class-border {
  border: 1px solid #F1F1F3 !important;
  width: 100%;
  margin-left: 0px;
}
</style>