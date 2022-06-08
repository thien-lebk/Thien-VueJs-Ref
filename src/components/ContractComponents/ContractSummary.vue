<template>
  <div class ="contract-summary">
    <v-data-table
      :headers="headers"
      :items="summaryList"
      :loading="summaryDetailRequest"
      item-key="original"
      hide-actions
      class="elevation-1"
    >

      <template v-slot:items="props">
        <tr>
          <td class="text-xs-left content" :class="props.item.css"><span>{{ props.item.original }}</span></td>
          <td class="text-xs-center content">{{ formatMoney(props.item.loan_amount) }}</td>
          <td class="text-xs-center content">{{ formatMoney(props.item.paid) }}</td>
          <td class="text-xs-center content ">{{ formatMoney(props.item.waived) }}</td>
          <td class="text-xs-center content" >{{ formatMoney(props.item.writtenOff) }}</td>
          <td class="text-xs-center content">{{ formatMoney(props.item.outstanding) }}</td>
          <td class="text-xs-center content">{{ formatMoney(props.item.overdue) }}</td>
        </tr>
      </template>

       <template slot="footer">
        <td class="text-xs-left content bold-text"><span>Tổng</span></td>
        <td class="text-xs-center content total">{{ formatMoney(totalSummary === null ? '' : totalSummary.loan_amount) }}</td>
        <td class="text-xs-center content total">{{ formatMoney(totalSummary === null ? '' : totalSummary.paid) }}</td>
        <td class="text-xs-center content total">{{ formatMoney(totalSummary === null ? '' : totalSummary.waived) }}</td>
        <td class="text-xs-center content total">{{ formatMoney(totalSummary === null ? '' : totalSummary.writtenOff) }}</td>
        <td class="text-xs-center content total">{{ formatMoney(totalSummary === null ? '' : totalSummary.outstanding) }}</td> 
        <td class="text-xs-center content total">{{ formatMoney(totalSummary === null ? '' : totalSummary.overdue) }}</td> 
    </template>

      <template v-slot:no-data>
        <!-- Nothing -->
      </template>

     <!-- <template v-slot:expand="props">
          <call-table :expand="props.expanded" :orderID="props.item.orderID" />
      </template> -->

    </v-data-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { isNullOrUndefined } from 'util';
import moment from 'moment'

import { formatMoney } from '../../mixins/money'

export default {
  name: "contract-summary-tab",
  components: {
  },
  props: {
    contractId: String,
  },
  data() {
    return {
      headers: [
        {
          text: "", value: "original", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Khoản vay", value: "loan_amount", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Đã thanh toán", value: "paid", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Waived", value: "waived", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Nợ xấu", value: "writtenOff", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Chưa thanh toán", value: "outstanding", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Quá hạn", value: "overdue", align: 'center', sortable: false, class: "header"
        }
      ],
      summaryList: [],
      totalSummary: null,
      format: 'D-M-YYYY',
    }
  },
  created() {
    this.getSummary()
  },
  computed: {
    ...mapGetters({
      contractDetail: 'contract/contractDetail',
      summaryDetailRequest: 'contract/summaryDetailRequest',
      summaryDetailResult: 'contract/summaryDetailResult',
      summaryDetailErrorCode: 'contract/summaryDetailErrorCode',
      contractDueDate: 'contract/contractDueDate',
      productListResult: 'product/productListResult',
    }),
  },
  methods: {
     ...mapActions({
      getContractSummary: 'contract/getContractSummary',
      getContractByContractId: 'contract/getContractByContractId',
      getProduct: 'product/getProduct',
    }),
    formatMoney: function(value) {
      return formatMoney(value)
    },
    getSummary: async function() { 
      this.getProduct()
      await Promise.all([this.getContractByContractId({id: this.contractId}), this.getContractSummary({id: this.contractId})])

      if (this.summaryDetailErrorCode === 200) {
        const dateDiff = this.diffDate(moment().format(this.format), this.contractDueDate)
        const everyday = this.productListResult[this.contractDetail.productDesc].repayEvery
        const dueInterest = Math.round((this.summaryDetailResult.interestCharged/everyday)*dateDiff/1000) * 1000
        const diffAmount = isNullOrUndefined(this.contractDetail.diffAmount) ? 0 : this.contractDetail.diffAmount * 1000000
        const warehousingFee =  isNullOrUndefined(this.contractDetail.warehousingFee) ? 0 : this.contractDetail.warehousingFee * 1000000
        
        const principal = {
            original: 'Gốc',
            css:'bold-text',
            loan_amount: this.summaryDetailResult.principalDisbursed,
            paid: this.summaryDetailResult.principalPaid,
            waived: '',
            writtenOff: this.summaryDetailResult.principalWrittenOff,
            outstanding: this.summaryDetailResult.principalOutstanding,
            overdue: this.summaryDetailResult.principalOverdue,
        }
        this.summaryList.push(principal)

        const interest = {
            original: 'Lãi',
            css:'bold-text',
            loan_amount: this.summaryDetailResult.interestCharged,
            paid: this.summaryDetailResult.interestPaid,
            waived: this.summaryDetailResult.interestWaived,
            writtenOff: this.summaryDetailResult.interestWrittenOff,
            outstanding: this.summaryDetailResult.interestOutstanding,
            overdue: this.summaryDetailResult.interestOverdue,
        }
        this.summaryList.push(interest)
        
        const fees = {
            original: 'Phí',
            css:'bold-text',
            loan_amount: this.summaryDetailResult.feeChargesCharged,
            paid: this.summaryDetailResult.feeChargesPaid,
            waived: this.summaryDetailResult.feeChargesWaived,
            writtenOff: this.summaryDetailResult.feeChargesWrittenOff,
            outstanding: this.summaryDetailResult.feeChargesOutstanding,
            overdue: this.summaryDetailResult.feeChargesOverdue,
        }
        this.summaryList.push(fees)
        
        const storage = {
            original: 'Storage',
            css:'normal-text',
            loan_amount: '',
            paid: warehousingFee,
            waived: '',
            writtenOff: '',
            outstanding: '',
            overdue: '',
        }
        this.summaryList.push(storage)
        
        const price = {
            original: 'Rớt giá',
            css:'normal-text',
            loan_amount: '',
            paid: '',
            waived: '',
            writtenOff: '',
            outstanding: diffAmount,
            overdue: '',
        }
        this.summaryList.push(price)
        
        const peanalties = {
            original: 'Lãi trễ',
            css:'bold-text',
            loan_amount: '',
            paid: '',
            waived: '',
            writtenOff: '',
            outstanding: dueInterest,
            overdue: dueInterest,
        }
        this.summaryList.push(peanalties)
        
        this.totalSummary = {
            original: 'Tổng',
            css:'normal-text',
            loan_amount: this.summaryDetailResult.totalExpectedRepayment ,
            paid: this.summaryDetailResult.principalPaid + this.summaryDetailResult.interestPaid + this.summaryDetailResult.feeChargesPaid + warehousingFee,
            waived:  this.summaryDetailResult.totalWaived,
            writtenOff: this.summaryDetailResult.totalWrittenOff,
            outstanding: this.summaryDetailResult.totalOutstanding + dueInterest,
            overdue: '',
        }
      }
    },
    diffDate: function(date1, date2) {
      const dt1 = moment(date1, this.format)
      const dt2 = moment(date2, this.format)
      if (dt2 > dt1) {
          return 0
      }
      return dt1.diff(dt2, 'days')
    },
  },
}
</script>

<style scoped>
.contract-summary {
  margin-top: 15px;
}

.header {
  text-transform: uppercase;
  font-weight: bold !important;
  font-size: 1vw !important;
  background-color: #EBECEC;
}

.bold-text span {
  font-weight: bold  !important;
  margin-left: 1vw !important;
}
.normal-text span {
  font-weight: normal !important;
  margin-left: 4vw !important;
}

</style>
