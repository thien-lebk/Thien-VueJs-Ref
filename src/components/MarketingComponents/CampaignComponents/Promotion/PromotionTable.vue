<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="promotionListResult"
      :loading="promotionListRequest"
      hide-actions
      class="table elevation-1"
    >
      <template v-slot:items="props">
        <tr>
          <td class="text-xs-center content">{{ props.item.promotionName }}</td>
          <td class="text-xs-center content">{{ props.item.description }}</td>
          <td class="text-xs-center content">{{ props.item.interestDiscount }} %</td>
          <td class="text-xs-center content">{{ formatMoney(props.item.maxDiscount) }}</td>
          <td class="text-xs-center content">{{ formatMoney(props.item.minDiscount) }}</td>
          <td class="text-xs-center content">{{ formatMoney(props.item.minPayout) }}</td>
          <td>
            <v-layout align-center justify-center row v-if="props.item.status !== 'In use'">
              <v-btn
                fab dark small icon class="ma-0" 
                color="rgba(255, 147, 79, 0.17)"
                @click="editForm(props.item.id)"
              >
                <v-icon color="rgba(255, 147, 79, 1)">edit</v-icon>
              </v-btn>
              <v-btn
                fab dark small icon class="ma-0" 
                color="rgba(234, 82, 111, 0.17)"
                @click="deleteHandle(props.item.id, props.item.promotionName)"
              >
                <v-icon color="rgba(234, 82, 111, 1)">clear</v-icon>
              </v-btn>
          </v-layout>
          </td>
        </tr>
      </template>
    </v-data-table>
    <confirm-dialog :textConfirm="message" :showDialog="dialog" @callBackFunction="confirmDelete"/>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import ConfirmDialog from '@/components/commonComponent/ConfirmDialog.vue'
import {formatMoney} from '../../../../mixins/money'

export default {
  name: 'promotion-table',
  components: {
    ConfirmDialog,
  },
  data() {
    return {
      headers: [
        {
          text: "TÊN PROMOTION", value: "promotionName", align: 'center', sortable: false, class: "header"
        },
        // {
        //   text: "CAMPAIGN ACTIVE", value: "campaignActive", align: 'center', sortable: false, class: "header"
        // },
        // {
        //   text: "NGÀY TẠO", value: "createdDate", align: 'center', sortable: false, class: "header"
        // },
        {
          text: "MÔ TẢ", value: "description", align: 'center', sortable: false, class: "header"
        },
        {
          text: "PHẦN LÃI GIẢM", value: "interestDiscount", align: 'center', sortable: false, class: "header"
        },
        {
          text: "GIẢM TỐI ĐA", value: "maxDiscount", align: 'center', sortable: false, class: "header"
        },
        {
          text: "GIẢM TỐI THIỂU", value: "minDiscount", align: 'center', sortable: false, class: "header"
        },
        {
          text: "GIẢM NGÂN TỐI THIỂU", value: "minPayout", align: 'center', sortable: false, class: "header"
        },
        {
          text: "THAO TÁC", value: "actions", align: 'center', sortable: false, class: "header"
        },
      ],
      message: "",
      dialog: false,
      deleteSelected: null,
    }
  },
  mounted() {
    this.getPromotionList()
  },
  computed: {
    ...mapGetters({
      promotionListRequest: 'promotion/promotionListRequest',
      promotionListResult: 'promotion/promotionListResult',
      promotionListErrorCode: 'promotion/promotionListErrorCode',
      promotionListError: 'promotion/promotionListError',
      promotionDeletingErrorCode: 'promotion/promotionDeletingErrorCode',
      promotionDeletingError: 'promotion/promotionDeletingError',
      promotionUpdatingErrorCode: 'promotion/promotionUpdatingErrorCode',
    })
  },
  methods: {
    ...mapActions({
      getPromotionList: 'promotion/getPromotionList',
      getPromotionDetail: 'promotion/getPromotionDetail',
      deletePromotion: 'promotion/deletePromotion',
    }),
    formatMoney(value) {
      return formatMoney(value * 1000000)
    },
    editForm(id) {
      this.getPromotionDetail({id})
    },
    deleteHandle(id, name) {
      this.deleteSelected = id
      this.message = `Bạn muốn xóa Promotion: ${name}`
      this.dialog = true
    },
    confirmDelete(confirm) {
      if (confirm) {
        this.deletePromotion({id:this.deleteSelected}).then(() => {
          if (this.promotionDeletingErrorCode === 200) {
            this.$notify({
              group: 'foo',
              type: 'success',
              title: "Xóa promotion thành công",
              text: ''
            })
            this.getPromotionList()
          } else {
            this.$notify({
              group: 'foo',
              type: 'error',
              title: "Error: "+this.promotionDeletingErrorCode,
              text: this.promotionDeletingError,
            })
          }
        })
      }
      this.deleteSelected = null
      this.message = ""
      this.dialog = false
    }
  },
  watch: {
    promotionUpdatingErrorCode() {
      if (this.promotionUpdatingErrorCode === 200) {
        this.getPromotionList()
      }
    }
  }
}
</script>

<style scoped>
.table {
    border-top: 0.3px solid rgba(0,0,0,0.87);
}
</style>