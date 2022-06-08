<template>
  <v-data-table
    :headers="headers"
    :items="callCampaignListResult"
    :loading="callCampaignListRequest"
    hide-actions
    class="table elevation-1"
  >
    <template v-slot:items="props">
      <tr>
        <td @click="campaignNameClickHandle(props.item.id)" class="text-xs-center content name-td">{{ props.item.campaignName }}</td>
        <td class="text-xs-center content">
          <v-layout align-center justify-center row>
            <i class="material-icons" 
              :class="getClassStatus(props.item.status)">
              <template v-if="props.item.status !== 'Pause'">
                fiber_manual_record
              </template>
              <template v-else>
                pause
              </template>
            </i>
            {{ props.item.status }}
          </v-layout>
        </td>
        <td class="text-xs-center content">{{ props.item.createdDate }}</td>
        <td class="text-xs-center content">{{ props.item.description }}</td>
        <td class="text-xs-center content">{{ props.item.warmLead }}</td>
        <td @click="promotionClickHandle(props.item.promotionId)" class="text-xs-center content name-td">{{ props.item.promotionName }}</td>
        <td><call-campaign-action-button :id="props.item.id" :name="props.item.campaignName" :status="props.item.status"/></td>
      </tr>
    </template>
  </v-data-table>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CallCampaignActionButton from "@/components/MarketingComponents/CampaignComponents/CallCampaign/CallCampaignActionButton.vue"
import { isNullOrUndefined } from 'util'

export default {
  name: 'call-campaign-table',
  components: {
    CallCampaignActionButton,
  },
  data() {
    return {
      headers: [
        {
          text: "TÊN CHIẾN DỊCH", value: "campaignName", align: 'center', sortable: false, class: "header"
        },
        {
          text: "TRẠNG THÁI", value: "status", align: 'center', sortable: false, class: "header"
        },
        {
          text: "NGÀY TẠO", value: "createdDate", align: 'center', sortable: false, class: "header"
        },
        {
          text: "MỔ TẢ", value: "description", align: 'center', sortable: false, class: "header wrap-text"
        },
        {
          text: "WARM LEAD", value: "warmLead", align: 'center', sortable: false, class: "header wrap-text"
        },
        {
          text: "KHUYẾN MÃI", value: "promotionName", align: 'center', sortable: false, class: "header"
        },
        {
          text: "THAO TÁC", value: "actions", align: 'center', sortable: false, class: "header"
        },
      ],
    }
  },
  mounted() {
    this.getCallCampaignList()
  },
  computed: {
    ...mapGetters({
      callCampaignListRequest: 'campaign/callCampaignListRequest',
      callCampaignListResult: 'campaign/callCampaignListResult',
      callCampaignListErrorCode: 'campaign/callCampaignListErrorCode',
      callCampaignListError: 'campaign/callCampaignListError',
    }),
  },
  methods: {
    ...mapActions({
      getCallCampaignList: 'campaign/getCallCampaignList',
      getPromotionByIdAndOpenDialog: 'promotion/getPromotionByIdAndOpenDialog',
    }),
    campaignNameClickHandle(id) {
      this.$router.push({name: 'call-management', params: {id}})
    },
    promotionClickHandle(id) {
      this.getPromotionByIdAndOpenDialog({id})
    },
    getClassStatus(status) {
      if (isNullOrUndefined(status)) {
        return '';
      } else if (status.toUpperCase()==='DRAFT') {
        return 'draft-status';
      } else if (status.toUpperCase()==='ACTIVE') {
        return 'active-status';
      } else if (status.toUpperCase()==='COMPLETE') {
        return 'complete-status';
      } else if (status.toUpperCase()==='PAUSE') {
        return 'pause-status';
      }
    },
  },
  watch: {
    callCampaignListErrorCode() {
      if (this.callCampaignListErrorCode !== 200 && this.callCampaignListErrorCode !== 0) {
        this.$notify({
          group: 'foo',
          type: 'success',
          title: this.callCampaignListErrorCode,
          text: this.callCampaignListError,
        })
      }
    },
  }
}
</script>

<style scoped>
.table {
  border-top: 0.3px solid rgba(0,0,0,0.87);
}

.name-td {
  text-decoration: underline;
  cursor:pointer;
  color: #2589BD;
}

.draft-status {
  color: #FF934F;
}

.active-status {
  color: #91CB3E;
}

.complete-status {
  color: #ABABAB;
}

.pause-status {
  color: #ABABAB;
}
</style>