<template>
    <div>
    <v-toolbar id="refresh" flat color="#F0F0F7">
      <v-spacer></v-spacer>
      <v-btn color="primary"  @click="getPriceAdjustmentContractList">
        Refresh
      </v-btn>
      
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="priceAdjustmentListResult"
      :loading="priceAdjustmentListRequest"
      :pagination.sync="pagination"
      :total-items="priceAdjustmentCountResult"
      item-key="loanId"
      :rows-per-page-items=[20]
      class="elevation-1"
    >
      <template v-slot:items="props">
        <tr>
          <td class="text-xs-center content">{{ props.item.loanId }}</td>
          <td class="text-xs-center content">{{ props.item.createdDate }}</td>
          <td class="text-xs-center content ">{{ props.item.dueDate }}</td>
          <td class="text-xs-center content">{{ props.item.status }}</td>
          <td class="text-xs-center content">{{ props.item.clientName }}</td>
          <td class="text-xs-center content">{{ props.item.assetDescription }}</td>
          <td class="text-xs-center content">{{ formatMoney(props.item.approvedAmount) }}</td>
          <td class="text-xs-center" @dblclick.stop>
            <!-- <v-layout v-if="props.item.diffAmount !== null">
              <span >{{formatMoney(props.item.approvedAmount-props.item.diffAmount)}}</span>
              <v-btn fab dark small class="mx-1 btn-edit" @click="flag=2">
                <i class="material-icons">arrow_downward</i>
              </v-btn>
            </v-layout> -->

            <priceAdjustment-edit-price
              :contractId="props.item.id+''" 
              :diff_amount="props.item.diffAmount" 
              :approved_amount="props.item.approvedAmount"/>
          </td>
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
import PriceAdjustmentEditPrice from './PriceAdjustmentEditPrice.vue'
import {mapActions, mapGetters} from 'vuex'
import { isNullOrUndefined } from 'util';
import { formatMoney } from '../../mixins/money'

export default {
    name: "priceAdjustment-table",
    components: { 
      PriceAdjustmentEditPrice 
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
                    text: "Giá mới", value: "action", align: 'center', sortable: false, class: "header"
                },
            ],
            pagination: {},
        } 
    },
    computed: {
      ...mapGetters({
      priceAdjustmentListResult: 'priceAdjustment/priceAdjustmentListResult',
      priceAdjustmentListRequest: 'priceAdjustment/priceAdjustmentListRequest',
      priceAdjustmentListErrorCode: 'priceAdjustment/priceAdjustmentListErrorCode',
      priceAdjustmentListError: 'priceAdjustment/priceAdjustmentListError',
      priceAdjustmentCountResult: 'priceAdjustment/priceAdjustmentCountResult',
      }),
      pageSelection() {
        if (Number.isInteger(this.priceAdjustmentCountResult)) 
          return ([...Array(Math.ceil(this.priceAdjustmentCountResult/20)).keys()].map(x => ++x))
        return null
    },
    },
    methods : {
      ...mapActions({
        getPriceAdjustmentContractList: 'priceAdjustment/getPriceAdjustmentContractList',
      }),
      changePage:async function (page) {
        await this.getPriceAdjustmentContractList({page})
        this.$emit('changeTotal', this.priceAdjustmentCountResult);
      },
      formatMoney: function(value) {
        return formatMoney(value)
      },
    },
   watch: {

      pagination: {
        handler () {
          const page = this.pagination.page
          this.changePage(page)
        }
      },
      priceAdjustmentListErrorCode() {
        if (this.priceAdjustmentListErrorCode == 1) {
          const page = this.pagination.page
          this.changePage(page)
        }
      }
   }
}
</script>
<style scoped>
.header {
  text-transform: uppercase;
  font-weight: bold !important;
  font-size: 16px !important;
}
#refresh >>> .v-toolbar__content {
  padding-right: 0px;
}
</style>
