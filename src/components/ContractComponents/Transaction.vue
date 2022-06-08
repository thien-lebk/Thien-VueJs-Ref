<template>
  <div class ="contract-transaction">
    <v-data-table
      :headers="headers"
      :items="transactionListResult"
      :loading="transactionListRequest"
      item-key="day"
      :expand="true"
      hide-actions
      class="elevation-1"
    >
    <template v-if="headers" slot="headers" slot-scope="row">
        <tr>
          <th :key="header.text" v-for="header in row.headers" class="header" 
          v-bind:colspan="header.value === 'interest' ? 4 : 1"
          >
          {{ header.text }}
          </th>
        </tr>
      </template>
          <template v-slot:items="props">
        <tr :key="props.index"> 
          <td class="text-xs-center content">{{ props.item.office }}</td>
          <td class="text-xs-center content">{{ props.item.transaction_date }}</td>
          <td class="text-xs-center content ">{{ props.item.transaction_type }}</td>
          <td class="text-xs-center content">{{ formatMoney(props.item.amount) }}</td>
          <td v-bind:style="props.index === 0 ? 'font-weight: bold' :''" class="text-xs-center content" >{{ formatMoney(props.item.principal) }}</td>
          <td v-bind:style="props.index === 0 ? 'font-weight: bold' :''" class="text-xs-center content">{{ formatMoney(props.item.interest) }}</td>
          <td v-bind:style="props.index === 0 ? 'font-weight: bold' :''" class="text-xs-center content">{{ formatMoney(props.item.fee) }}</td>
          <td v-bind:style="props.index === 0 ? 'font-weight: bold' :''" class="text-xs-center content">{{ formatMoney(props.item.penalties) }}</td>
          <td class="text-xs-center content">{{ formatMoney(props.item.loan_balance) }}</td>
        </tr>
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
import { formatMoney } from '../../mixins/money'

export default {
  name: "transaction-tab",
  components: {
  },
  props: {
    contractId: String
  },
  data() {
    return {
      headers: [
        {
          text: "Chi nhánh", value: "office", align: 'left', sortable: false, class: "header", width: 3
        },
        {
          text: "Ngày giao dịch", value: "transaction_date", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Loại giao dịch", value: "transaction_type", align: 'center', sortable: false, class: "header", width: 1
        },
        {
          text: "Số tiền", value: "amount", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Chi tiết", value: "interest", align: 'center', sortable: false, class: "header", colspan :"4"
        },
        {
          text: "Dư nợ", value: "loan_balance", align: 'center', sortable: false, class: "header"
        },
      ],
    }
  },
  created() {
    this.getTransaction();
  },
  computed: {
     ...mapGetters({
      transactionListResult: 'contract/transactionListResult',
      transactionListRequest: 'contract/transactionListRequest',
      contractListError: 'contract/contractListError',
      contractListErrorCode: 'contract/contractListErrorCode',
      }),
  },
  methods: {
     ...mapActions({
      getContractTransactionLog: 'contract/getContractTransactionLog',
    }),
    getTransaction() {
      this.getContractTransactionLog({id: this.contractId})
    },
    formatMoney: function(value) {
      return formatMoney(value)
    },
  },
}
</script>

<style scoped>
.contract-transaction {
  margin-top: 15px;
}

.header {
  text-transform: uppercase;
  font-weight: bold !important;
  font-size: 1vw !important;
  background-color: #EBECEC;
  text-align: center;
}
#refresh .v-toolbar__content {
  padding-right: 0px;
}
</style>
