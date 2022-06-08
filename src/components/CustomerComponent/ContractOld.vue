<template>
  <div class ="schudule-repayment">
    <v-data-table
      :headers="headers"
      :items="contractCloseListResult"
      :loading="contractCloseListRequest"
      item-key="day"
      :expand="true"
      :rows-per-page-items=[10]
      class="elevation-1"
      :style="{'margin-top' : '20px'}"
    >

      <template v-slot:items="props">
        <tr @dblclick = "detail(props.item.id)">
          <td class="text-xs-center content">
            <div class="icon-status">
              <i class="material-icons close-status">
                fiber_manual_record
              </i>
              <span>{{ props.item.contractId }}</span>
            </div>
          </td>
          <td class="text-xs-center content">{{ props.item.loan_accout }}</td>
          <td class="text-xs-center content ">{{ props.item.close_date }}</td>
          <td class="text-xs-center content">{{ props.item.assset_type }}</td>
          <td class="text-xs-center content">{{ formatMoney(props.item.loan_balance) }}</td>
          <td class="text-xs-center content">{{ props.item.storage_location }}</td>
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
import { isNullOrUndefined } from 'util';
import { formatMoney } from '../../mixins/money'

export default {
  name: "contract-old-tab",
  components: {
  },
  data() {
    return {
      headers: [
        {
          text: "Mã hợp đồng", value: "contractId", align: 'center', sortable: false, class: "header wrap-text", 
        },
        {
          text: "Loan Accout", value: "loan_accout", align: 'center', sortable: false, class: "header wrap-text"
        },
        {
          text: "Ngày đóng HĐ", value: "close_date", align: 'center', sortable: false, class: "header wrap-text", 
        },
        {
          text: "Tài sản", value: "assset_type", align: 'center', sortable: false, class: "header wrap-text"
        },
        {
          text: "Loan Balance", value: "loan_balance", align: 'center', sortable: false, class: "header wrap-text"
        },
        {
          text: "Storage Location", value: "storage_location", align: 'center', sortable: false, class: "header wrap-text"
        },
      ],
    }
  },
  created() {
    this.getContractClose();
  },
  props: {
    customerId: String,
  },
  computed: {
    ...mapGetters({
      contractCloseListResult: "customer/contractCloseListResult",
      contractCloseListRequest: "customer/contractCloseListRequest"
    })
  },
  methods: {
      ...mapActions({
      contractClose: "customer/getContractClose",
    }),
    formatMoney: function(value) {
      return formatMoney(value)
    },
    getContractClose() {
      this.contractClose({id : this.customerId})
    },
    detail: function (id) {
      if (isNullOrUndefined(id) === false) {
        this.$router.push({name: 'contract-detail', params: {id: id}});
      }
    }
  },
}
</script>

<style scoped>
td.content {
  font-size: 1vw !important;
  padding: 0px !important;
}
.header {
  text-transform: uppercase;
  font-weight: bold !important;
  font-size: 1vw !important;
  background-color: #EBECEC;
}

.icon-status {
  display: inline-flex;
  margin-right: 5px;
  text-align: left;
  align-items: center;
  vertical-align: middle;
}

.wrap-text {
  word-wrap: break-word;
  white-space: pre-line !important;
}

.close-status {
  color: #CECFD0;
}
</style>