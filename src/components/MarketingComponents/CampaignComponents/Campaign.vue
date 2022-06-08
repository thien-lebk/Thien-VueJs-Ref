<template>
  <v-container fluid class="pa-0 ma-0">
    <campaign-management v-model="currentTab" :tabItems="tabItems"/>
    <call-campaign-table v-if="currentTab=='Call Campaign'"/>
    <promotion-table v-else-if="currentTab=='Promotion'"/>
    <call-campaign-edit />
    <promotion-edit />
  </v-container>
</template>

<script>
import CampaignManagement from "@/components/MarketingComponents/CampaignComponents/CampaignManagement.vue"
import PromotionTable from "@/components/MarketingComponents/CampaignComponents/Promotion/PromotionTable.vue"
import CallCampaignTable from "@/components/MarketingComponents/CampaignComponents/CallCampaign/CallCampaignTable.vue"
import CallCampaignEdit from "@/components/MarketingComponents/CampaignComponents/CallCampaign/CallCampaignEdit.vue"
import PromotionEdit from '@/components/MarketingComponents/CampaignComponents/Promotion/PromotionEdit.vue'
import permission from "./utils/permission"

export default {
  name: "campaign",
  components: {
    CampaignManagement,
    CallCampaignTable,
    PromotionTable,
    CallCampaignEdit,
    PromotionEdit,
  },
  data() {
    return {
      currentTab: 'Call Campaign',
      tabItems: [
        {name:'Call Campaign', icon: 'settings_phone', requires: permission.CALL_CAMPAIGN.general,},
        // {name:'SMS Campaign', icon: 'question_answer'},
        {name:'Promotion', icon: 'loyalty', requires: permission.PROMOTION.general,},
      ],
    }
  }
}
</script>