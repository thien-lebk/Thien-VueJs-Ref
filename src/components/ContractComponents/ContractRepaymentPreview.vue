<template>
  <v-container fluid class="container-repayment-preview">
    <v-layout align-start justify-start row>
      <v-flex xs8>
        <v-card id="print" color="#ffffff" style="font-family: 'Times New Roman'" class="box-preview-left">
          <div style="padding-left:20px; padding-right:20px;">
            <v-layout align-center justify-center column>
              <h4>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h4>
              <div style="border: 1px solid #BFBFBF !important; width: 100%; margin: 10px 10px;"></div>
              <h5>Độc lập - Tự do - Hạnh phúc</h5>
            </v-layout>
            <br/><br/>
            <v-layout align-start justify-start row class="body-container">
              <v-flex xs3>
                <img src="../../assets/camdo-logo.jpg" alt="logo" height="111" width="111">
              </v-flex>
              <v-flex xs9>
                <p style="padding-left: 75px;"><font size="5"><b style="text-align: -webkit-center;">PHIẾU THU TIỀN</b></font></p>
                <strong>Mã hợp đồng(HĐ): {{currentBranch}}-{{contractId}}</strong><br>
                <strong>Mã khách hàng(KH): HCMKH-{{clientId}}</strong><br>
              </v-flex>
            </v-layout>
            <br/><br/>
            <table>
              <tbody>
                <tr>
                  <td>Ngày lập phiếu:</td>
                  <td><span class="margin-left">{{transactionDate}}</span></td>
                </tr>
                <tr>
                  <td><strong>Họ và tên(KH):</strong></td>
                  <td><strong class="margin-left">{{customerName}}</strong></td>
                </tr>
                <tr>
                  <td>Số điện thoại:</td>
                  <td><span class="margin-left">{{phoneNumber}}</span></td>
                </tr>
                <tr>
                  <td>Địa chỉ:</td>
                  <td><span class="margin-left">{{address}}</span></td>
                </tr>
                <tr>
                  <td><strong>Lý do:</strong></td>
                  <td><strong class="margin-left">Tất toán HĐ số {{contractId}}</strong></td>
                </tr>
                <tr>
                  <td><br></td>
                  <td></td>
                </tr>
                <tr>
                  <td><strong>Tổng tiền:</strong></td>
                  <td><strong class="margin-left">{{formatedTotalMoney}} VNĐ</strong></td>
                </tr>
                <template v-if="interestDiscount !== 0">
                  <tr>
                    <td><strong>Giảm giá:</strong></td>
                    <td><strong class="margin-left">{{formatedInterestDiscount}} VNĐ</strong></td>
                  </tr>
                  <tr>
                    <td><strong>Tiền thu:</strong></td>
                    <td><strong class="margin-left">{{formatedMoney}} VNĐ</strong></td>
                  </tr>
                </template>
              </tbody>
            </table>
            <v-layout align-start justify-center row class="sign-class">
              <v-flex xs6 >
                <center>
                  <strong>Người nộp tiền</strong><br>
                  <strong>(Ký, và ghi họ tên)</strong>
                </center>
              </v-flex>
              <v-flex xs6>
                <center>
                  <strong>Người lập phiếu</strong><br>
                  <strong>(Ký, và ghi họ tên)</strong>
                </center>
              </v-flex>
            </v-layout>
            <br/><br/><br/><br/><br/><br/><br/> <br/><hr/><br/><br/><br/>
            <v-layout align-center justify-center column>
              <h4>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h4>
              <div style="border: 1px solid #BFBFBF !important; width: 100%; margin: 10px 10px;"></div>
              <h5>Độc lập - Tự do - Hạnh phúc</h5>
            </v-layout>
            <br/><br/>
            <v-layout align-start justify-start row class="body-container">
              <v-flex xs3>
                <img src="../../assets/camdo-logo.jpg" alt="logo" height="111" width="111">
              </v-flex>
              <v-flex xs9>
                <p style="padding-left: 75px;"><font size="5"><b style="text-align: -webkit-center;">PHIẾU THU TIỀN</b></font></p>
                <strong>Mã hợp đồng(HĐ): {{currentBranch}}-{{contractId}}</strong><br>
                <strong>Mã khách hàng(KH): HCMKH-{{clientId}}</strong><br>
              </v-flex>
            </v-layout>
            <br/><br/>
            <table>
              <tbody>
                <tr>
                  <td>Ngày lập phiếu:</td>
                  <td><span class="margin-left">{{transactionDate}}</span></td>
                </tr>
                <tr>
                  <td><strong>Họ và tên(KH):</strong></td>
                  <td><strong class="margin-left">{{customerName}}</strong></td>
                </tr>
                <tr>
                  <td>Số điện thoại:</td>
                  <td><span class="margin-left">{{phoneNumber}}</span></td>
                </tr>
                <tr>
                  <td>Địa chỉ:</td>
                  <td><span class="margin-left">{{address}}</span></td>
                </tr>
                <tr>
                  <td><strong>Lý do:</strong></td>
                  <td><strong class="margin-left">Tất toán HĐ số {{contractId}}</strong></td>
                </tr>
                <tr>
                  <td><br></td>
                  <td></td>
                </tr>
                <tr>
                  <td><strong>Tổng tiền:</strong></td>
                  <td><strong class="margin-left">{{formatedTotalMoney}} VNĐ</strong></td>
                </tr>
                <template v-if="interestDiscount !== 0">
                  <tr>
                    <td><strong>Giảm giá:</strong></td>
                    <td><strong class="margin-left">{{formatedInterestDiscount}} VNĐ</strong></td>
                  </tr>
                  <tr>
                    <td><strong>Tiền thu:</strong></td>
                    <td><strong class="margin-left">{{formatedMoney}} VNĐ</strong></td>
                  </tr>
                </template>
              </tbody>
            </table>
            <v-layout align-start justify-center row class="sign-class">
              <v-flex xs6 >
                <center>
                  <strong>Người nộp tiền</strong><br>
                  <strong>(Ký, và ghi họ tên)</strong>
                </center>
              </v-flex>
              <v-flex xs6>
                <center>
                  <strong>Người lập phiếu</strong><br>
                  <strong>(Ký, và ghi họ tên)</strong>
                </center>
              </v-flex>
            </v-layout>
          </div>
        </v-card>
      </v-flex>
      <v-flex xs4 class="box-preview-right">
        <v-card class="body-container">
          <strong>VUI LÒNG KIỂM TRA SỐ TIỀN VÀ</strong><br>
          <strong>IN PHIẾU THU</strong>
          <v-layout align-center justify-center row class="button">
            <v-btn :disabled="created === true" round class="btn-back" @click="backHandle">
              Back
            </v-btn>
            <v-btn fab dark small class="btn-print" @click="printHandle" :loading="contractRepayingRequest">
              <i class="material-icons">print</i>
            </v-btn>
            <v-btn :disabled="created === false" round class="btn-confirm"  @click="endHandle" >
              End
            </v-btn>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import {mapGetters} from 'vuex'

export default {
  name: "contract-repayment-preview",
  props: {
    contractId: String,
    clientId: String,
    transactionDate: String,
    customerName: String,
    phoneNumber: String,
    address: String,
    monney: Number,
    interestDiscount: Number,
  },
  data: () => ({
    printed: false,
  }),
  mounted() {
    window.scrollTo(0,0)
  },
  computed: {
    ...mapGetters({
      currentBranch: 'branch/currentBranch',
      currentBranchAddress: 'branch/currentBranchAddress',
      contractRepayingRequest: 'contract/contractRepayingRequest',
      contractRepayingResult: 'contract/contractRepayingResult',
      contractRepayingErrorCode: 'contract/contractRepayingErrorCode',
    }),
    created() {
      if (this.contractRepayingErrorCode === 200) {
        return true
      }
      return false
    },
    formatedMoney() {
      return this.formatMoney(this.monney * 1000000)
    },
    formatedInterestDiscount() {
      return this.formatMoney(this.interestDiscount * 1000000)
    },
    formatedTotalMoney() {
      return this.formatMoney(this.monney * 1000000 + this.interestDiscount* 1000000)
    },
  },
  watch: {
    created() {
      if (this.created) {
        this.printHandle()
      }
    },
  },
  methods: {
    backHandle() {
      if (this.created === false) {
        this.$emit('back')
      }
    },
    printHandle() {
      if (!this.created) {
       this.$emit('create')
      } else {
        this.$htmlToPaper('print')
      }
    },
    endHandle() {
      this.$emit('end')
    },
    formatMoney(money) {
      return money.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,').replace('.0', '')
    },
  },
}
</script>
<style>
.container-repayment-preview {
  padding: 0px !important;
}
.box-preview-left {
  padding: 50px !important;
  font-size: 13px;
}

.box-preview-left .margin-left {
    margin-left: 50px;
}

.logo-img {
  width:80px;
  height:75px;
  margin-left: 5px;
}

.titel-repayment-name {
  width: 100%;
  text-align: center;
}

.titel-repayment-name h1 {
  margin-left: -100px;
}

.box-preview-left .body-container {
  margin-top: 20px;
}

.sign-class {
  margin-top: 20px;
  text-align: center;
}

.sign-class .sign-customer strong {
  margin-left: -100px;
}

.toolbar {
  margin-top: 120px;
}

.box-preview-right {
  padding-left: 30px;
  text-align: center;
}

.box-preview-right .body-container {
  padding: 20px;
}

.button button {
  margin-right: 5px;
  font-size: 0.9vw !important;
  color: #ffffff !important;
  text-transform: capitalize !important;
}

.button .btn-print {
  background-color: #43425D !important;
}

.button .btn-back {
  background-color: #FFFFFF !important;
  color: #DD1E26 !important;
  min-width: 4vw !important;
}

.button .btn-back:focus {
  background-color: #EAE5E5 !important;
}

.button .btn-confirm {
  background-color: #DD1E26 !important;
  color: #FFFFFF;
}

.button .btn-confirm:hover {
  background-color: #E84D4D !important;
}
</style>