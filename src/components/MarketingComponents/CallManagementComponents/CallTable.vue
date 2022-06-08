<template>
   <div>
    <v-layout align-center justify-end row>
      <v-btn color="primary" :style="{'margin-right': '0px'}">
        Refresh
      </v-btn>
    </v-layout>
    <v-data-table
      :headers="headers"
      :items="campaignOrderListResult"
      :expand="true"
      :loading="campaignOrderListRequest"
      :pagination.sync="pagination"
      :total-items="total"
      item-key="orderID"
      :rows-per-page-items=[20]
      class="elevation-1"
    >
      <template v-slot:items="props">
        <tr @dblclick="e => props.item.step != 'Unclaimed' && clickOrder(props.item.orderID)">
          <td class="text-xs-center content">{{ props.item.clientName }}</td>
          <td class="text-xs-center content">{{ translateGender(props.item.clientGender) }}</td>
          <td class="text-xs-center content">{{ props.item.asset }}</td>
          <td class="text-xs-center content">
            <v-menu open-on-hover top offset-y>
              <template v-slot:activator="{ on }">
                <div v-on="on">{{ renderClientNote(props.item.clientNote) }}</div>
              </template>
              <v-list>
                <v-list-tile
                  v-for="(value, index) in splitNote(props.item.clientNote)"
                  :key="index"
                >
                  <v-list-tile-title>{{ value }}</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </td>
          <td class="text-xs-center content">{{ props.item.staffUsername }}</td>
          <td class="text-xs-center content">{{ props.item.supportUsername }}</td>
          <td class="text-xs-center content">
            {{ translateStepFromEngToVi(props.item.step) }}
          </td>
          <td class="text-xs-center content">{{ props.item.promotionName }}</td>
          <td class="text-xs-center content">
            {{ translateStageFromEngToVi(props.item.stage) }}
          </td>
          <td class="text-xs-center" @dblclick.stop>
            <v-container class="pa-0">
              <v-layout class="btn-group" align-center justify-center row fill-height>
                <action-button 
                  :orderID="props.item.orderID" 
                  :step="props.item.step" 
                  :phone="props.item.phone" 
                  :staff="props.item.staff"
                  :stage="translateStageFromEngToVi(props.item.stage)"
                />
                <call-button :phone="props.item.phone" :name="props.item.clientName" :orderID="props.item.orderID"/>
                <div @click="props.expanded = !props.expanded" class="expand">
                  <v-icon v-if="props.expanded">keyboard_arrow_up</v-icon>
                  <v-icon v-else>keyboard_arrow_down</v-icon>
                </div>
              </v-layout>
            </v-container>
          </td>
        </tr>
      </template>

      <template v-slot:actions-prepend>
        <v-select
          class="page-select"
          v-model="pagination.page"
          :items="pageSelection"
          label="Page"
        ></v-select>
      </template>

      <template v-slot:expand="props">
        <order-note class="note" :note="props.item.note" :orderID="props.item.orderID"/>
      </template>
    </v-data-table>
   </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CallButton from "@/components/OrderComponents/CallButton.vue"
import ActionButton from "@/components/MarketingComponents/CallManagementComponents/ActionButton.vue"
import OrderNote from "@/components/OrderComponents/OrderNote.vue"
import { EventBus } from '../utils/event-bus'
import steps from './utils/steps'
import {translateStageFromEngToVi} from './utils/stages'
import {translateStepFromEngToVi} from './utils/steps'
import {isNullOrUndefined} from 'util'

export default {
  name: 'call-table',
  components: {
    CallButton,
    ActionButton,
    OrderNote,
  },
  data() {
    return {
      headers: [
        {
          text: "HỌ TÊN", value: "name", align: 'center', sortable: false, class: "header"
        },
        {
          text: "GENDER", value: "supportAgent", align: 'center', sortable: false, class: "header"
        },
        {
          text: "TÀI SẢN", value: "asset", align: 'center', sortable: false, class: "header"
        },
        {
          text: "GHI CHÚ VỀ KHÁCH HÀNG", value: "clientNote", align: 'center', sortable: false, class: "header"
        },
        {
          text: "AGENT", value: "staffUsername", align: 'center', sortable: false, class: "header"
        },
        {
          text: "SUPPORT AGENT", value: "supportUsername", align: 'center', sortable: false, class: "header"
        },
        {
          text: "ĐÁNH GIÁ", value: "step", align: 'center', sortable: false, class: "header"
        },
        {
          text: "KHUYẾN MÃI", value: "promotionName", align: 'center', sortable: false, class: "header"
        },
        {
          text: "TRẠNG THÁI", value: "stage", align: 'center', sortable: false, class: "header"
        },
        {
          text: "THAO TÁC", value: "action", align: 'center', sortable: false, class: "header"
        },
      ],
      pagination: {},
      schedule: null,
      total: 0,
      params: {},
    }
  },
  mounted() {
    EventBus.$on('filter-call', (params) => {
      this.params = params
      EventBus.$emit('reset-search-call')
    })
    EventBus.$on('search-call', (params) => {
      this.params = params
      EventBus.$emit('reset-filter-call')
    })
  },
  computed: {
    ...mapGetters({
      campaignOrderListRequest: 'order/campaignOrderListRequest',
      campaignOrderListResult: 'order/campaignOrderListResult',
      campaignOrderCampaignCountResult: 'order/campaignOrderCampaignCountResult',
      campaignOrderListErrorCode: 'order/campaignOrderListErrorCode',
      campaignOrderListError: 'order/campaignOrderListError',
      orderUpdatingErrorCode: 'order/orderUpdatingErrorCode',
    }),
    campaignId() {
      return String(this.$route.params.id)
    },
    pageSelection() {
      if (Number.isInteger(this.total)) return ([...Array(Math.ceil(this.total/20)).keys()].map(x => ++x))
      return null
    },
  },
  methods: {
    ...mapActions({
      getOrderListFromCampaign: 'order/getOrderListFromCampaign',
      planOrderListFromCampaign: 'order/planOrderListFromCampaign',
      getCampaignOrderDetail: 'order/getCampaignOrderDetail',
    }),
    translateStageFromEngToVi: function(englishStage) {
      return translateStageFromEngToVi(englishStage)
    },
    translateStepFromEngToVi: function(englishStep) {
      return translateStepFromEngToVi(englishStep)
    },
    renderClientNote(note) {
      if (typeof note === 'string') {
        const notes = note.split('\r\n')
        const description = notes[notes.length-1].split(' - ')[2]
        if (!isNullOrUndefined(description) && description.length > 15) {
          return description.substring(0, 15) + '...'
        }
        return description
      }
      return ''
    },
    splitNote(note) {
      if (typeof note === 'string') {
        return note.split('\r\n')
      }
      return []
    },
    translateGender(gender) {
      if (typeof gender === 'string') {
        if (gender.toLowerCase() === 'male') {
          return "Nam"
        } else if (gender.toLowerCase() === 'female') {
          return "Nữ"
        }
      }
      return ""
    },
    clickOrder(orderID) {
      this.getCampaignOrderDetail({orderID})
    },
    refresh() {
      this.getOrderListFromCampaign({ campaignId:this.campaignId,page:1,params:this.params })
      if (this.schedule === null) {
        this.schedule = setInterval(() => {this.planOrderListFromCampaign({ campaignId:this.campaignId,page:1,params:this.params })}, 5000)
      }
    },
  },
  watch: {
    campaignOrderListErrorCode() {
      if (this.campaignOrderListErrorCode !== 200 & this.campaignOrderListErrorCode !== 0) {
        this.$notify({
          group: 'foo',
          type: 'success',
          title: this.campaignOrderListErrorCode,
          text: this.campaignOrderListErrorCode,
        })
      }
    },
    pagination: {
      handler () {
        const page = this.pagination.page
        if (this.schedule !== null) {
          clearInterval(this.schedule)
        }
        this.getOrderListFromCampaign({ campaignId:this.campaignId,page,params:this.params })
        this.schedule = setInterval(() => {this.planOrderListFromCampaign({ campaignId:this.campaignId,page,params:this.params })}, 5000)
      },
      deep: true
    },
    params() {
      this.getOrderListFromCampaign({ campaignId:this.campaignId,params:this.params  })
    },
    orderUpdatingErrorCode() {
      //Update Order or Change Stage Successfully
      if (this.orderUpdatingErrorCode == 200) {
        const page = this.pagination.page
        this.planOrderListFromCampaign({ campaignId:this.campaignId,page,params:this.params })
      }
    },
    campaignOrderCampaignCountResult() {
      if (this.campaignOrderCampaignCountResult !== null) {
        const total = this.campaignOrderCampaignCountResult.total
        if (this.total !== total) {
          this.total = total
        }
      }
    },
  },
  beforeDestroy() {
    clearInterval(this.schedule);
  }
}
</script>

<style scoped>
.expand {
  margin: 5px 0px;
  cursor: pointer;
}
.note {
  padding: 5px 30px;
  display: inline-block;
  word-break: break-word;
  width: 100%;
}
</style>