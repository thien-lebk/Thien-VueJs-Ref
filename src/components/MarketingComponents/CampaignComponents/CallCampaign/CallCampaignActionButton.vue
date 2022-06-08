<template>
  <v-layout align-center justify-center row>
    <v-btn
      fab dark small icon class="ma-0" 
      color="rgba(255, 147, 79, 0.17)"
      v-if="permission.CALL_CAMPAIGN.update.includes(user)"
      @click="editHandle"
    >
      <v-icon color="rgba(255, 147, 79, 1)">edit</v-icon>
    </v-btn>
    <v-btn
      fab dark small icon class="ma-0" 
      color="rgba(37, 137, 189, 0.17)"
    >
      <v-icon color="rgba(37, 137, 189, 1)">equalizer</v-icon>
    </v-btn>
    <v-btn
      fab dark small icon class="ma-0" 
      color="rgba(234, 82, 111, 0.17)"
      v-if="permission.CALL_CAMPAIGN.delete.includes(user) && status !== 'Complete'"
      :loading="loading"
      @click="deleteHandle"
    >
      <v-icon color="rgba(234, 82, 111, 1)">clear</v-icon>
    </v-btn>
    <confirm-dialog 
      :textConfirm="`Bạn có muốn xóa: ${name}?`"
      :showDialog="showDialog" 
      @callBackFunction="confirmHandle"
    />
  </v-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ConfirmDialog from '@/components/commonComponent/ConfirmDialog.vue'
import { ProfileService } from '../../../../services/storage.service'
import permission from "../utils/permission"

export default {
  name: 'call-campaign-action-button',
  components: {
    ConfirmDialog,
  },
  props: {
    id: Number,
    name: String,
    status: String,
  },
  data() {
    return {
      user: ProfileService.getIsStaff() ? 'staff' : 'user',
      permission: permission,
      showDialog: false,
      loading: false,
    }
  },
  computed: {
    ...mapGetters({
      campaignDeletingErrorCode: 'campaign/campaignDeletingErrorCode',
      campaignDeletingError: 'campaign/campaignDeletingError',
      campaignUpdatingErrorCode: 'campaign/campaignUpdatingErrorCode',
      campaignUpdatingError: 'campaign/campaignUpdatingError',
    })
  },
  methods: {
    ...mapActions({
      getCampaignDetail: 'campaign/getCampaignDetail',
      getCallCampaignList: 'campaign/getCallCampaignList',
      deleteCampaign: 'campaign/deleteCampaign',
      updateCampaign: 'campaign/updateCampaign',
    }),
    editHandle() {
      this.getCampaignDetail({ id:this.id })
    },
    deleteHandle() {
      this.showDialog = true
    },
    confirmHandle(flag) {
      if (flag) {
        this.loading = true
        if (this.status === 'Draft' ) {
          this.delete()
        } else if (this.status !== 'Complete' ) {
          this.cancel()
        }
      }
      this.showDialog = false
    },
    delete() {
      this.deleteCampaign({id:this.id}).then(() => {
        this.loading = false
        if (this.campaignDeletingErrorCode === 200) {
          this.$notify({
            group: 'foo',
            type: 'success',
            title: "Xóa thành công",
            text: '',
          })
          this.getCallCampaignList()
        } else {
          this.$notify({
            group: 'foo',
            type: 'success',
            title: this.campaignDeletingErrorCode,
            text: this.campaignDeletingError,
          })
        }
      })
    },
    cancel() {
      const data = {
        campaignId: this.id,
        status: 'Cancel',
      }

      this.updateCampaign(data).then(() => {
        this.loading = false
        if (this.campaignUpdatingErrorCode === 200) {
          this.$notify({
            group: 'foo',
            type: 'success',
            title: "Xóa thành công",
            text: ''
          })
          this.getCallCampaignList()
        } else {
          this.$notify({
            group: 'foo',
            type: 'success',
            title: this.campaignUpdatingErrorCode,
            text: this.campaignUpdatingError
          })
        }
      })
    },
  },
}
</script>

<style scoped>

</style>