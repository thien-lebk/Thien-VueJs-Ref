<template>
  <div class ="schudule-repayment">
    <v-toolbar id="refresh" flat color="#0000" style="margin-bottom : 20px">
      <v-spacer></v-spacer>
        <action-button
          style="margin-top:14px;"
          :disabled="summaryDetailErrorCode !== 200"
          :contractId="contractId"
        />
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="scheduleListResult"
      :loading="scheduleListRequest"
      item-key="day"
      :expand="true"
      hide-actions
      class="elevation-1"
    >

      <template v-slot:items="props">
        <tr>
          <td class="text-xs-center content">{{ props.item.day }}</td>
          <td class="text-xs-center content">{{ props.item.date }}</td>
          <td class="text-xs-center content ">{{ props.item.paid_date }}</td>
          <td class="text-xs-center content">{{ formatMoney(props.item.principal_due) }}</td>
          <td class="text-xs-center content" >
            {{ formatMoney(props.item.blance_of_loan) }}
          </td>
          <td class="text-xs-center content">{{ formatMoney(props.item.interest) }}</td>
          <td class="text-xs-center content">{{ formatMoney(props.item.fees) }}</td>
          <td class="text-xs-center content">{{ formatMoney(props.item.fenalties) }}</td>
          <td class="text-xs-center content">
            {{ formatMoney(props.item.due) }}
          </td>
          <td class="text-xs-center content">{{ formatMoney(props.item.pain) }}</td>
          <td class="text-xs-center content">{{ formatMoney(props.item.in_advance) }}</td>
          <td class="text-xs-center content">{{ formatMoney(props.item.late) }}</td>
          <td class="text-xs-center content">{{ formatMoney(props.item.outstanding) }}</td>
        </tr>
      </template>
      <template slot="footer">
        <td class="text-xs-center content total"></td>
        <td class="text-xs-center content total">Tổng</td>
        <td class="text-xs-center content total"></td> 
        <td class="text-xs-center content total">{{ formatMoney(contractTotalResult === null ? '' : contractTotalResult.totalPrincipalExpected) }}</td>
        <td class="text-xs-center content total"></td> 
        <td class="text-xs-center content total">{{ formatMoney(contractTotalResult === null ? '' : contractTotalResult.totalInterestCharged) }}</td>
        <td class="text-xs-center content total">{{ formatMoney(contractTotalResult === null ? '' : contractTotalResult.totalFeeChargesCharged) }}</td>
        <td class="text-xs-center content total">{{ formatMoney(contractTotalResult === null ? '' : contractTotalResult.totalPenaltyChargesCharged) }}</td>
        <td class="text-xs-center content total">{{ formatMoney(contractTotalResult === null ? '' : contractTotalResult.totalRepaymentExpected) }}</td> 
        <td class="text-xs-center content total">{{ formatMoney(contractTotalResult === null ? '' : contractTotalResult.totalRepayment) }}</td> 
        <td class="text-xs-center content total">{{ formatMoney(contractTotalResult === null ? '' : contractTotalResult.totalAdvancePayment) }}</td>
        <td class="text-xs-center content total">{{ formatMoney(contractTotalResult === null ? '' : contractTotalResult.totalPaidLate) }}</td> 
        <td class="text-xs-center content total">{{ formatMoney(contractTotalResult === null ? '' : contractTotalResult.totalOutstanding) }}</td>
    </template>

      <template v-slot:no-data>
        <!-- Nothing -->
      </template>

    </v-data-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { isNullOrUndefined } from 'util';
import { formatMoney } from '../../mixins/money'
import FullWordsActionButton from './FullWordsActionButton.vue'

export default {
  name: "repayment-shedule-tab",
  components: {
    'action-button': FullWordsActionButton
  },
  props: {
    contractId: String,
  },
  data() {
    return {
      headers: [
        {
          text: "Số ngày", value: "day", align: 'left', sortable: false, class: "header", width: 3
        },
        {
          text: "Ngày", value: "date", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Ngày thanh toán", value: "paid_date", align: 'center', sortable: false, class: "header", width: 1
        },
        {
          text: "Gốc đến hạn", value: "principal_due", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Giải ngân", value: "blance_of_loan", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Lãi", value: "interest", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Phí", value: "fees", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Lãi ngày", value: "fenalties", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Tổng", value: "due", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Đã thanh toán", value: "pain", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Thanh toán trước", value: "in_advance", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Trễ", value: "late", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Tổng nợ", value: "outstanding", align: 'center', sortable: false, class: "header"
        },
      ],
    }
  },
  created() {
    this.getSchedule();
  },
  computed: {
    ...mapGetters({
      scheduleListResult: 'contract/scheduleListResult',
      scheduleListRequest: 'contract/scheduleListRequest',
      contractTotalResult: 'contract/contractTotalResult',
      contractListError: 'contract/contractListError',
      contractListErrorCode: 'contract/contractListErrorCode',
      contractDetail: 'contract/contractDetail',
      summaryDetailErrorCode: 'contract/summaryDetailErrorCode',
    }),
  },
  methods: {
     ...mapActions({
      getContractRepaymentSchedule: 'contract/getContractRepaymentSchedule',
    }),
    getSchedule() {
      this.getContractRepaymentSchedule({id: this.contractId})
    },
    formatMoney: function(value) {
      return formatMoney(value)
    },
  },
}
</script>

<style scoped>
.schudule-repayment .v-toolbar{
  margin: 0px !important;
}

.header {
  text-transform: uppercase;
  font-weight: bold !important;
  font-size: 1vw !important;
  background-color: #EBECEC;
}
#refresh .v-toolbar__content {
  padding-right: 0px;
}
</style>
