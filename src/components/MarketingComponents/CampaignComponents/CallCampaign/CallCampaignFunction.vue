<template>
  <v-layout align-center justify-end row>
    <new-call-campaign v-if="permission.CALL_CAMPAIGN.create.includes(user)"/>
    <call-campaign-filter/>
    <div class="has-search">
      <span class="fa fa-search form-control-feedback"></span>
      <input 
        style="width: 200px" 
        type="text" 
        class="form-control"
        placeholder="Nhập tên chiến dịch"
        v-model="campaignInput"
      />
    </div>
  </v-layout>
</template>

<script>
import NewCallCampaign from "@/components/MarketingComponents/CampaignComponents/CallCampaign/NewCallCampaign.vue"
import CallCampaignFilter from "@/components/MarketingComponents/CampaignComponents/CallCampaign/CallCampaignFilter.vue"
import { ProfileService } from '../../../../services/storage.service'
import permission from "../utils/permission"

export default {
  name: 'call-campaign',
  components: {
    NewCallCampaign,
    CallCampaignFilter
  },
  data(){
    return {
      campaignInput: '',
      user: ProfileService.getIsStaff() ? 'staff' : 'user',
      permission: permission,
    }
  }
}
</script>

<style scoped>
.has-search .form-control {
  padding-left: 2.375rem;
  padding-right: 0px;
  width: 300px;
}

.has-search .form-control-feedback {
  position: absolute ;
  z-index: 1;
  display: block;
  width: 2.375rem;
  height: 2.375rem;
  line-height: 2.8rem;
  text-align: center;
  pointer-events: none;
  color: #aaa;
  padding: 1px;
}

.form-control:hover {
  box-shadow: 0px 4px 5px 0px #898585;
}

.form-control {
  display: block;
  width: 100%;
  height: calc(1.5em + .75rem + 2px);
  padding: 1.375rem 1.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 2.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 2em;
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  box-shadow: 0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12);
}
</style>