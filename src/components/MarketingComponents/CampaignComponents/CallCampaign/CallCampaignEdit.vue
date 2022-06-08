<template>
  <div>
    <v-dialog v-model="dialog" max-width="1000px">
      <v-card>
        <v-card-title>
          <span class="title">Campaign #{{id}}</span>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text>
          <v-form v-model="valid" ref="form">
            <v-container>
              <v-layout>
                <v-flex sm6>
                  <v-text-field
                    v-model.lazy="campaignNameInput"
                    :rules="[
                      v => !!v || 'Yêu cầu cần có',
                    ]"
                    label="Campaign Name"
                    required
                  >
                  </v-text-field>
                </v-flex>
                <v-flex sm6>
                  <v-text-field
                    v-model="customerListInput"
                    label="Customer List"
                    readonly
                  >
                  </v-text-field>
                </v-flex>
              </v-layout>
              <v-textarea
                v-model="descriptionInput"
                label="Mô tả"
                rows="1"
                auto-grow
                :rules="[v => !!v || 'Yều cầu cần có']"
                required
              >
              </v-textarea>
              <v-layout>
                <v-flex sm6>
                  <v-select
                    v-model="allocationRuleInput"
                    :items="allocationRuleItems"
                    label="Allocation rule"
                    readonly
                  >
                  </v-select>
                </v-flex>
                <v-flex sm6>
                  <v-select
                    v-model="statusInput"
                    :items="statusItems"
                    :rules="[v => !!v || 'Yều cầu cần có']"
                    label="Trạng thái"
                    required
                  >
                  </v-select>
                </v-flex>
              </v-layout>
              <v-layout>
                <v-flex sm6>
                  <v-combobox
                    v-model="branchesInput"
                    :items="branchListResult"
                    label="Branch"
                    item-value="id"
                    item-text="name"
                    multiple
                    readonly
                  >
                  </v-combobox>
                </v-flex>
                <v-flex sm6>
                  <v-select
                    v-model="promotionInput"
                    :items="promotionListResult"
                    item-value="id"
                    item-text="promotionName"
                    :rules="[v => !!v || 'Yều cầu cần có']"
                    label="Promotion"
                    required
                  >
                    <template slot="append-outer">
                      <v-btn flat icon color="#DD1E26" class="ma-0" @click="newPromotionHandle">
                        <v-icon>add_circle</v-icon>
                      </v-btn>
                    </template>
                  </v-select>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="cancel-btn"
            color="#fff"
            @click="turnOffCallCampaignDialog"
            @disabled="campaignUpdatingRequest"
            round
          >
            Hủy
          </v-btn>
          <v-btn
            class="confirm-btn"
            color="#dd1e26"
            :disabled="okDiable"
            :loading="campaignUpdatingRequest"
            @click="okHandle"
            round
          >
            Lưu
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { EventBus } from '../../utils/event-bus'

export default {
  name: "call-campaign-edit",
  data() {
    return {
      valid: false,
      id: '',
      campaignNameInput: '',
      allocationRuleInput: '',
      allocationRuleItems: [
        'Dormant rule',
        'Random allocation',
      ],
      statusInput: '',
      statusItems: [],
      branchesInput: [],
      descriptionInput: '',
      promotionInput: '',
      customerListInput: '',
    }
  },
  computed: {
    ...mapGetters({
      branchListResult: 'branch/branchListResult',
      promotionListResult: 'promotion/promotionListResult',
      callCampaignDetailForm: 'campaign/callCampaignDetailForm',
      callCampaignDetail: 'campaign/callCampaignDetail',
      campaignUpdatingRequest: 'campaign/campaignUpdatingRequest',
      campaignUpdatingErrorCode: 'campaign/campaignUpdatingErrorCode',
      campaignUpdatingError: 'campaign/campaignUpdatingError',
    }),
    dialog: {
      get () { return this.callCampaignDetailForm },
      set (value) { if (!value) {this.turnOffCallCampaignDialog()} }
    },
    okDiable() {
      if (this.valid && this.callCampaignDetail !== null) {
        if (this.campaignNameInput !== this.callCampaignDetail.campaignName) {
          return false
        }

        if (this.statusInput !== this.callCampaignDetail.status) {
          return false
        }

        if (this.descriptionInput !== this.callCampaignDetail.description) {
          return false
        }

        if (this.promotionInput !== this.callCampaignDetail.promotionId) {
          return false
        }
      }
      return true
    },
  },
  methods: {
    ...mapActions({
      getPromotionList: 'promotion/getPromotionList',
      turnOffCallCampaignDialog: 'campaign/turnOffCallCampaignDialog',
      updateCampaign: 'campaign/updateCampaign',
      getCallCampaignList: 'campaign/getCallCampaignList',
    }),
    newPromotionHandle() {
      EventBus.$emit('new-promotion')
      this.dialog = false
    },
    okHandle() {
      const branches = this.branchesInput.map(item => item.id)

      const data = {
        campaignId: this.id,
        campaignName: this.campaignNameInput,
        description: this.descriptionInput,
        status: this.statusInput,
        promotion: this.promotionInput,
      }

      this.updateCampaign(data).then(() => {
        if (this.campaignUpdatingErrorCode === 200) {
          this.$notify({
            group: 'foo',
            type: 'success',
            title: "Chỉnh sửa thành công",
            text: ''
          })
          this.dialog = false
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
  watch: {
    callCampaignDetailForm() {
      if (this.callCampaignDetailForm) {
        this.getPromotionList()
        this.id = this.callCampaignDetail.id
        this.campaignNameInput = this.callCampaignDetail.campaignName
        this.allocationRuleInput = this.callCampaignDetail.allocationRule
        this.statusInput = this.callCampaignDetail.status

        if (this.callCampaignDetail.status === 'Draft') {
          this.statusItems = [
            'Draft',
            'Active',
            'Pause',
            'Complete',
          ]
        } else {
          this.statusItems = [
            'Active',
            'Pause',
            'Complete',
          ]
        }

        this.branchesInput = this.branchListResult.filter(item => this.callCampaignDetail.branches.includes(item.id)) 
        this.descriptionInput  = this.callCampaignDetail.description
        this.promotionInput = this.callCampaignDetail.promotionId
        this.customerListInput  = this.callCampaignDetail.customerListName
      }
    }
  },
}
</script>

<style scoped>
.new-call-campaign {
  background-color: #dd1e26 !important;
  color: #fff !important;
  margin-right: 4px;
  margin-left: 4px;
}

.back-white {
  background-color: #fff;
  height: 45px;
  width: 45px;
  border-radius: 50%;
}

.back-white i {
  color: #dd1e26; 
  font-size: 25px;
  padding: 10px;
}

.plus {
  background-color: #fff;
  height: 25px;
  width: 25px;
  border-radius: 50%;
  margin-right: 5px;
}

.plus i {
  color: #dd1e26;
  font-size: 10px;
  padding: 8px 7px 8px 5px;
}

.cancel-btn {
  color: #dd1e26 !important;
}

.confirm-btn {
  color: #fff !important;
}
</style>