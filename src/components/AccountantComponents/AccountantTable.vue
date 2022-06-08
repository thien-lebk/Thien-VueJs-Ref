<template>
   <v-card class="accountant-table">
    <v-data-table
      :headers="headers"
      :items="accountantListResult"
      item-key="contractId"
      hide-actions
      class="elevation-1"
    >
      <template v-slot:items="props">
        <tr>
          <td class="text-xs-center content">{{ props.item.contractId }}</td>
          <td class="text-xs-center content">{{ props.item.newContractId }}</td>
          <td class="text-xs-center content">{{ props.item.transactionLocation }}</td>
          <td class="text-xs-center content">{{ props.item.agent }}</td>
          <td class="text-xs-center content">{{ props.item.transactionDate }}</td>
          <td class="text-xs-center content">{{ props.item.transactionType }}</td>
          <td class="text-xs-center content">{{ props.item.assetType }}</td>
          <td class="text-xs-center content">{{ props.item.asset }}</td>
          <td class="text-xs-center content">{{ props.item.interestRate }}</td>
          <td class="text-xs-center content">{{ props.item.disbursalAmount }}</td>
          <td class="text-xs-center content">{{ props.item.interestPaid }}</td>
        </tr>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: "accountant-table",
  components: {
  },
  data() {
    return {
      headers: [
        {
          text: "Mã HĐ", value: "contractId", align: 'left', sortable: false, class: "header"
        },
        {
          text: "Mã HĐ Mới", value: "newContractId", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Địa Điểm", value: "transactionLocation", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Nhân viên", value: "agent", align: 'center', sortable: false, class: "header wrap-text"
        },
        {
          text: "Ngày Giao Dịch", value: "transactionDate", align: 'center', sortable: false, class: "header wrap-text"
        },
        {
          text: "Loại HĐ", value: "transactionType", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Loại tài sản", value: "assetType", align: 'center', sortable: false, class: "header wrap-text"
        },
        {
          text: "Mô tả tài sản", value: "asset", align: 'center', sortable: false, class: "header wrap-text"
        },
        {
          text: "Lãi xuất", value: "interestRate", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Giải ngân", value: "disbursalAmount", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Lãi", value: "interestPaid", align: 'center', sortable: false, class: "header"
        }
      ],
      accountantListResult: [
        {
          contractId:'3152',
          newContractId:'3152',
          transactionLocation:'CMT8',
          agent:'Hong',
          transactionDate:'2018/03/01',
          transactionType:'HD Mới',
          assetType:'Bike',
          asset:'Wave Aplha',
          interestRate:'4.99',
          disbursalAmount:'19,002,200',
          interestPaid:'(19,002,200)',
        },
      ],
    }
  },
  methods: {
    detail: function (contractID) {
      if (contractID != null){
        this.$router.push({path: '/contracts/contract-detail', query: {id: contractID}});
      }
    }
  },
}
</script>

<style scoped>
.accountant-table td.content {
  font-size: 1vw !important;
  padding: 0px !important;
}
.accountant-table .header {
  font-weight: bold !important;
  font-size: 1.2vw !important;
}

.accountant-table .wrap-text {
  word-wrap: break-word;
  white-space: pre-line !important;
}
</style>