<template>
  <v-container fluid class="pa-0 ma-2">
    <v-layout row>
      <v-flex md5 class="title">
        <h2>Tất Toát Hợp Đồng</h2>
        <h3 v-show="step===1">Overview</h3>
        <h3 v-show="step===2">Phiếu Thu</h3>
      </v-flex>
      <v-spacer />
      <v-flex md4>
        <v-stepper alt-labels v-model="step" class="elevation-0 background">
          <v-stepper-header>
            <template v-for="index in 2" class="step">
              <v-stepper-step :step="index" color="#dd1e26" :key="`step-${index}`">Step {{index}}</v-stepper-step>
              <v-divider v-if="index !== 2" :key="`divider-${index}`" />
            </template>
          </v-stepper-header>
        </v-stepper>
      </v-flex>
    </v-layout>
    <v-window v-model="step">
      <v-window-item :value="1">
        <v-form v-model="valid" class="form-contract">
          <v-container>
            <v-layout>
              <v-flex class="header-form header-form-lef">
                <v-subheader class="input-header">
                  Mã HĐ
                  <span class="required">*</span>
                </v-subheader>
              </v-flex>
              <v-flex sm4>
                <v-text-field
                  v-model="contractIdInput"
                  rows="1"
                  auto-grow
                  :rules="[v => !!v || 'Yều cầu cần có']"
                  :readonly = "true"
                ></v-text-field>
              </v-flex>
              <v-spacer class="space" />
              <v-flex class="header-form">
                <v-subheader class="input-header">Còn nợ</v-subheader>
              </v-flex>
              <v-flex sm4>
                <v-text-field
                  v-model="feeInput"
                  placeholder="Còn nợ"
                  :rules="[
                    v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ']"
                  :hint="feeHint"
                  persistent-hint
                  readonly
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex class="header-form header-form-lef">
                <v-subheader class="input-header">
                  Ngày giao dịch
                  <span class="required">*</span>
                </v-subheader>
              </v-flex>
              <v-flex sm4>
                <date-picker 
                  v-model="transactionDateInput"
                  :rules="[rules.check]" 
                  :format="format" 
                  placeholder="dd-mm-yyyy"
                />
              </v-flex>
              <v-spacer class="space" />
              <v-flex class="header-form">
                <v-subheader class="input-header">Lãi trễ hạn</v-subheader>
              </v-flex>
              <v-flex sm4>
                <v-text-field
                  v-model="penaltyInput"
                  placeholder="Lãi trễ hạn"
                  :rules="[
                    v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ']"
                  :hint="penaltyHint"
                  persistent-hint
                  readonly
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex class="header-form header-form-lef">
                <v-subheader class="input-header">
                  Ngày đến hạn
                  <span class="required">*</span>
                </v-subheader>
              </v-flex>
              <v-flex sm4>
                <date-picker :readonly ="true" :format="format" v-model="maturityDateInput" placeholder="dd/mm/yyyy"/>
              </v-flex>
              <v-spacer class="space" />
              <v-flex class="header-form">
                <v-subheader class="input-header">Số ngày trễ</v-subheader>
              </v-flex>
              <v-flex sm4>
                <v-text-field
                  v-model="dayOfLateInput"
                  placeholder="Số ngày trễ"
                  readonly
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex class="header-form header-form-lef">
                <v-subheader class="input-header">
                  Gốc
                </v-subheader>
              </v-flex>
              <v-flex sm4>
                <v-text-field
                  v-model="principalInput"
                  placeholder="Gốc"
                  :hint="principalHint"
                  readonly
                  persistent-hint
                  :rules="[
                    v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ']"
                ></v-text-field>
              </v-flex>
              <v-spacer class="space" />
              <v-flex class="header-form" >
                <v-subheader class="input-header">Tiền giảm<span class="required"></span></v-subheader>
              </v-flex>
              <v-flex sm4>
                <v-text-field
                  v-model="interestDiscountInput"
                  required
                  :hint="interestDiscountHint"
                  persistent-hint
                  readonly
                >
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex class="header-form header-form-lef">
                <v-subheader class="input-header">
                  Lãi
                </v-subheader>
              </v-flex>
              <v-flex sm4>
                <v-text-field
                  v-model="interestInput"
                  placeholder="Lãi"
                  readonly
                  :hint="interestHint"
                  persistent-hint
                ></v-text-field>
              </v-flex>
              <v-spacer class="space" />
              <v-flex class="header-form">
                <v-subheader class="input-header">Tổng tiền</v-subheader>
              </v-flex>
              <v-flex sm4>
                <v-text-field
                  v-model="totalPaymentInput"
                  placeholder="Tổng tiền"
                  readonly
                  :rules="[
                    v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ']"
                  :hint="totalPaymentHint"
                  persistent-hint
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout justify-end>
              <v-flex class="header-form">
                <v-subheader class="input-header">Hình thức thanh toán</v-subheader>
              </v-flex>
              <v-flex sm4>
                <v-radio-group v-model="paymentTypeInput" row>
                    <v-radio color="#dd1e26" label="Tiền mặt" aria-checked="true" value="Tiền mặt"></v-radio>
                    <v-radio color="#dd1e26" label="Chuyển khoản" value="Chuyển khoản"></v-radio>
                </v-radio-group>
              </v-flex>
            </v-layout>
            <v-layout align-end justify-end class="button-bottom">
              <v-btn round class="btn-back" @click="cancleHandle">
                Back
              </v-btn>
              <v-btn round class="btn-next" :disabled="!valid" @click="step++">
                Next
              </v-btn>
            </v-layout>
          </v-container>
        </v-form>
      </v-window-item>
      <v-window-item :value="2">
        <contract-repayment-preview v-if="endExtent === false"
        :contractId ="contractIdInput"
        :clientId ="String(customerMifosId)"
        :transactionDate="transactionDateInput"
        :customerName="customerName"
        :phoneNumber="phoneNumber"
        :address="address"
        :monney="totalPaymentInput"
        :interestDiscount="interestDiscountInput"
        @create="createHandle"
        @end="endHandle"
        @back="step--" />
        <v-layout v-if="endExtent === true" class="form">
            <center>
                <v-icon size="150" color="#157F1F">check_circle</v-icon>
                <br/>
                <strong class="content-success">HOÀN THÀNH TẤT TOÁN</strong>
                <br/>
                <v-btn class="nextBtn"
                    color="#dd1e26"
                    round
                    min-width="166"
                    min-height="51"
                    @click="backHandle"
                >
                    Back
                </v-btn>
            </center>
        </v-layout>
      </v-window-item>
    </v-window>
  </v-container>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import DatePicker from "@/components/commonComponent/DatePicker.vue"
import ContractRepaymentPreview from './ContractRepaymentPreview.vue';
import changeDigitToText from '../../mixins/money'
import {getCost, getRoundFee, getInterestValue, getInterestDiscountValue} from './utils/caculate'
import moment from 'moment'
import {isNullOrUndefined} from 'util'

export default {
  name: "contract-repayment",
  components: {
    DatePicker,
    'contract-repayment-preview': ContractRepaymentPreview
  },
  data: () => ({
    step: 1,
    valid: true,
    contractIdInput: '',
    feeInput: 0,
    assetTypeItems: [],
    penaltyInput: '',
    principalInput: '',
    paymentTypeInput: 'Tiền mặt',
    totalPaymentInput: 0,
    interestDiscountInput: 0,
    interestInput:'',
    maturityDateInput: '',
    maturityDateCloneInput: '',
    transactionDateInput: moment().format('D-M-YYYY'),
    format: 'D-M-YYYY',
    transactionDateCloneInput: '',
    dayOfLateInput: '',
    packageInput: '',
    interestRateInput:'',
    customerName:'',
    customerId:'',
    phoneNumber:'',
    address:'',
    pawnPriceInput:'',
    endExtent: false,
    customerMifosId: '',
    rules: {
      check: value => {
        const dt1 = moment(value, 'D-M-YYYY')
        if (dt1.isValid()) {
          const dt2 = moment()
          if (dt1 > dt2) {
            return 'Ngày nhập phải trước thời điểm hiện tại'
          }
          return true
        }
        return 'Dữ liệu không hợp lệ'
      },
    }
  }),
  mounted() {
    this.getProduct()
    this.getContractInfo()
  },
  beforeDestroy() {
    this.resetContractRepayingResult()
  },
  computed: {
    ...mapGetters({
      contractDetail: 'contract/contractDetail',
      contractDetailErrorCode: 'contract/contractDetailErrorCode',
      productListResult: 'product/productListResult',
      customerDetail: 'customer/customerDetail',
      contractTotalSummaryResult: 'contract/contractTotalSummaryResult',
      contractRepayingError: 'contract/contractRepayingError',
      contractRepayingErrorCode: 'contract/contractRepayingErrorCode',
      summaryDetailResult: 'contract/summaryDetailResult',
      contractRepaymentResult: 'contract/contractRepaymentResult',
      contractRepaymentErrorCode: 'contract/contractRepaymentErrorCode',
      contractRepaymentError: 'contract/contractRepaymentError',
      promotionDetail: 'promotion/promotionDetail',
      promotionDetailErrorCode: 'promotion/promotionDetailErrorCode',
    }),
    feeHint() {
      return changeDigitToText(this.feeInput)
    },
    penaltyHint() {
      return changeDigitToText(this.penaltyInput)
    },
    principalHint() {
      return changeDigitToText(this.principalInput)
    },
    totalPaymentHint() {
      return changeDigitToText(this.totalPaymentInput)
    },
    interestHint() {
      return changeDigitToText(this.interestInput)
    },
    interestDiscountHint() {
      return changeDigitToText(this.interestDiscountInput)
    },
    contractId() {
      return String(this.$route.params.id)
    }
  },
  methods: {
    ...mapActions({
      getContractByContractId: 'contract/getContractByContractId',
      getProduct: 'product/getProduct',
      getCustomerByCustomerId: 'customer/getCustomerByCustomerId',
      getContractSummary: 'contract/getContractSummary',
      repayContract: 'contract/repayContract',
      resetContractRepayingResult: 'contract/resetContractRepayingResult',
      getRepayment: 'contract/getRepayment',
      getPromotionById: 'promotion/getPromotionById',
    }),
    getContractInfo() {
      const repayDetailPromise = this.getRepayment({id: this.contractId})
      
      repayDetailPromise.then(() => {
        if (this.contractRepaymentErrorCode === 200) {
          // Mã hợp đồng
          this.contractIdInput = String(this.contractRepaymentResult.mifosId)
          // Ngày hết hạn
          this.maturityDateInput = this.contractRepaymentResult.maturityDate
          // Gốc
          this.principalInput = this.contractRepaymentResult.principal 
          // Lãi
          this.interestInput = this.contractRepaymentResult.interestCharged
          // Tổng tiền 
          this.totalPaymentInput = this.contractRepaymentResult.total  
          // Lãi trễ
          this.penaltyInput = this.contractRepaymentResult.overdueFee 
          // Số ngày trễ
          this.dayOfLateInput = this.contractRepaymentResult.overdueDay 
        } else {
          if (this.contractRepaymentError === "Contract was closed") {
            this.$notify({
              group: 'foo',
              type: 'error',
              title: "Error: 503",
              text: "Hợp đồng đã đóng"
            })
          } else {
            this.$notify({
              group: 'foo',
              type: 'error',
              title: "Error: "+this.contractRepaymentErrorCode,
              text: this.contractRepaymentError,
            })
          }
          this.$router.push({name: 'contract'})
        }
      })

      const contractDetailPromise = this.getContractByContractId({id: this.contractId})
      
      contractDetailPromise.then(() => {
        if (this.contractDetailErrorCode === 200) {
          this.customerId = String(this.contractDetail.clientId)

          this.getCustomerByCustomerId({id: this.customerId}).then(() => {
            if (!isNullOrUndefined(this.customerDetail)) {
              this.customerMifosId =  this.customerDetail.customerId
              this.customerName = this.customerDetail.fullName
              this.phoneNumber = this.customerDetail.primaryPhone
              this.address = this.customerDetail.fullAddress
            }
          })
        }
      })

      Promise.all([ repayDetailPromise,contractDetailPromise ]).then(() => {
        if (!isNullOrUndefined(this.contractDetail.promotion)) {
          this.getPromotionById({id:this.contractDetail.promotion}).then(() => {
            if (this.promotionDetailErrorCode === 200) {
              this.interestDiscountInput = getInterestDiscountValue({
                approvedAmount: this.contractDetail.approvedAmount,
                interestValue: this.contractRepaymentResult.interestCharged,
                interestDiscount: this.promotionDetail.interestDiscount,
                maxDiscount: this.promotionDetail.maxDiscount,
                minDiscount: this.promotionDetail.minDiscount,
                minPayout: this.promotionDetail.minPayout,
              })
              this.totalPaymentInput = this.contractRepaymentResult.total - this.interestDiscountInput
            }
          })
        }
      })

      this.getContractSummary({id: this.contractId}).then(() => {
        if (!isNullOrUndefined(this.summaryDetailResult)) {
          this.feeInput = String((this.summaryDetailResult.totalOutstanding/1000000).toFixed(3))
        } else {
          this.$router.push({name: 'contract'})
          this.$notify({
              group: 'foo',
              type: 'error',
              title: "Error: "+this.summaryDetailErrorCode,
              text: "Hợp đồng gia hạn chưa active"
          })
        }
      })

    },
    createHandle() {
      const repaymentDate = moment(this.transactionDateInput, this.format).format("YYYY-MM-DD")
      const data = { 
        id: this.contractId,
        repaymentDate: repaymentDate 
      }
      this.repayContract(data).then(() => {
        if (this.contractRepayingErrorCode === 200) {
          this.$notify({
              group: 'foo',
              type: 'success',
              title: "Tất toán thành công",
              text: ''
          });
        } else {
          this.$notify({
              group: 'foo',
              type: 'error',
              title: "Error: "+this.contractRepayingError,
              text: this.contractCreatingError
          });
        }
    })
    },
    cancleHandle() {
      this.$router.back()
    },
    backHandle() {
      this.$router.back()
    },
    endHandle() {
      this.endExtent = true
    },
  }
};
</script>
<style scoped>
.background {
  background-color: #F0F0F7;
}
.step {
  padding-top: 0px;
}
.title {
  padding-top: 20px;
  padding-left: 16px;
}

.title h3 {
  font-weight: normal;
}

.form-contract {
  background-color: #ffffff;
  border-style: solid;
  border-width: 1px;
}
.padding {
  padding-left: 95px;
  padding-right: 95px;
  background-color: #ffffff;
  border-style: solid;
}
.form {
  background-color: #ffffff;
  border-style: solid;
  border-width: 1px;
}
.input-header {
  font-size: 1vw;
  color: black;
}
.header-form {
  max-width: 11%;
  width: 11%;
}
.header-form-left {
  margin-left: 5%;
}
.space {
  max-width: 15%;
}
.required {
  color: #dd1e26;
}
.btn-back, .btn-next{
  margin: 5px;
  padding: 1px;
  font-size: 1vw !important;
  text-transform: capitalize !important;
}
.btn-back {
  background-color: #FFFFFF !important;
  color: #DD1E26;
}
.btn-back:focus {
  background-color: #EAE5E5 !important;
}
.btn-next {
  background-color: #DD1E26 !important;
  color: #FFFFFF;
}
.btn-next:hover {
  background-color: #E84D4D !important;
}
.form {
    background-color: #ffffff;
    border-style: solid;
    justify-content: center;
}
.content-success {
    color: #4D4F5C;
    font-size: 70px;
}
</style>