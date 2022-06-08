<template>
  <div>
    <v-layout align-center justify-end row>
      <v-btn color="primary"  @click="refresh" :style="{'margin-right': '0px'}">
        Refresh
      </v-btn>
    </v-layout>
    <v-data-table
      :headers="headers"
      :items="contractListResult"
      :loading="contractListRequest"
      :pagination.sync="pagination"
      :total-items="contractCountResult"
      item-key="loanId"
      :rows-per-page-items=[20]
      class="elevation-1"
    >
      <template v-slot:items="props">
        <tr @dblclick = "detail(props.item.id)">
          <td class="text-xs-center content">{{ props.item.loanId }}</td>
          <td class="text-xs-center content">{{ props.item.maturesDate }}</td>
          <td class="text-xs-center content ">{{ props.item.dueDate }}</td>
          <td class="text-xs-center content">{{ props.item.status }}</td>
          <td class="text-xs-center content">{{ props.item.clientName }}</td>
          <td class="text-xs-center content">{{ props.item.assetDescription }}</td>
          <td class="text-xs-center content">{{ formatMoney(props.item.approvedAmount) }}</td>
          <td class="text-xs-center content">{{ props.item.specialInterestValue }}</td>
          <td class="text-xs-center content">{{ props.item.storageId }}</td>
          <td class="text-xs-center content">{{ props.item.storageLocation }}</td>
        </tr>
      </template>

      <template v-slot:no-data>
        <!-- Nothing -->
      </template>
      
      <template v-slot:actions-prepend>
        <v-select
          class="page-select"
          v-model="pagination.page"
          :items="pageSelection"
          label="Page"
          v-on:change="changePage(`${pagination.page}`)"
        ></v-select>
      </template>

    </v-data-table>
  </div>
</template>

<script>
import ActionButton from './ActionButton.vue'
import {mapActions, mapGetters} from 'vuex'
import { isNullOrUndefined } from 'util'
import { formatMoney } from '../../mixins/money'

export default {
  name: "table-lib",
  components: { 
    'action-button-contract': ActionButton
  },
  data() {
    return {
      headers: [
        {
          text: "Mã HĐ", value: "loanId", align: 'left', sortable: false, class: "header", width: 3
        },
        {
          text: "Ngày tạo", value: "createdDate", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Ngày hết hạn", value: "dueDate", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Trạng thái", value: "loanStatus", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Khách hàng", value: "client", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Tài sản", value: "asset", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Khoản vay", value: "loanBalance", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Lãi suất", value: "interest", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Mã Kho", value: "storageId", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Kho", value: "storageLocation", align: 'center', sortable: false, class: "header"
        },
      ],
      pagination: {},
    } 
  },
  mounted(){
    this.getContractList({})
  },
  computed: {
    ...mapGetters({
      contractListResult: 'contract/contractListResult',
      contractListRequest: 'contract/contractListRequest',
      contractCountResult: 'contract/contractCountResult',
    }),
    pageSelection() {
      if (Number.isInteger(this.contractCountResult)) 
        return ([...Array(Math.ceil(this.contractCountResult/20)).keys()].map(x => ++x))
      return null
    },
  },
  methods : {
    ...mapActions({
      getContractList: 'contract/getContractList',
    }),
    refresh() {
      this.getContractList({})
    },
    detail: function (id) {
      if (isNullOrUndefined(id) === false) {
        this.$router.push({name: 'contract-detail', params: {id: id}});
      }
    },
    changePage: function (page) {
      this.getContractList({page})
    },
    formatMoney: function(value) {
      return formatMoney(value)
    },
  },
  watch: {
    pagination: {
      handler () {
        const page = this.pagination.page
        this.getContractList({page})
      }
    },
  }
}
</script>
<style scoped>
.header {
  text-transform: uppercase;
  font-weight: bold !important;
  font-size: 16px !important;
}
</style>
