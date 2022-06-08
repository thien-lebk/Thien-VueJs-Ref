<template>
  <v-dialog v-model="dialog" max-width="1000px">
    <template v-slot:activator="{ on }">
      <v-btn round v-on="on" class="new-call-campaign">
        <div class="back-white plus">
          <i class="fas fa-plus"></i>
        </div>
        <strong>Tạo Campaign</strong>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="title">New Campaign</span>
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
                <v-select
                  v-model="customerListInput"
                  :items="customerListResult"
                  item-value="id"
                  item-text="customerListName"
                  :rules="[v => !!v || 'Yều cầu cần có']"
                  label="Customer List"
                  required
                >
                </v-select>
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
                  :rules="[v => !!v || 'Yều cầu cần có']"
                  label="Allocation rule"
                  required
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
                  :rules="[v => v.length > 0 || 'Yều cầu cần có']"
                  multiple
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
          @click="cancelHandle"
          :disabled="campaignCreatingRequest"
          round
        >
          Hủy
        </v-btn>
        <v-btn
          class="confirm-btn"
          color="#dd1e26"
          :disabled="!valid"
          @click="createHandle"
          :loading="campaignCreatingRequest"
          round
        >
          Tạo
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import { EventBus } from '../../utils/event-bus'

export default {
  name: "new-call-campaign",
  data() {
    return {
      dialog: false,
      valid: false,
      campaignNameInput: '',
      allocationRuleInput: 'Dormant rule',
      allocationRuleItems: [
        'Dormant rule',
        'Random allocation',
      ],
      statusInput: 'Draft',
      statusItems: [
        'Draft',
        'Active',
        'Pause',
      ],
      branchesInput: [],
      descriptionInput: '',
      promotionInput: '',
      customerListInput: '',
    }
  },
  computed: {
    ...mapGetters({
      branchListResult: 'branch/branchListResult',
      customerListResult: 'customerList/customerListResult',
      promotionListResult: 'promotion/promotionListResult',
      campaignCreatingRequest: 'campaign/campaignCreatingRequest',
      campaignCreatingResult: 'campaign/campaignCreatingResult',
      campaignCreatingErrorCode: 'campaign/campaignCreatingErrorCode',
      campaignCreatingError: 'campaign/campaignCreatingError',
    }),
  },
  methods: {
    ...mapActions({
      getPromotionList: 'promotion/getPromotionList',
      getCustomerList: 'customerList/getCustomerList',
      createCampaign: 'campaign/createCampaign',
      getCallCampaignList: 'campaign/getCallCampaignList',
    }),
    reset() {
      this.$refs.form.resetValidation()
      this.campaignNameInput = null
      this.allocationRuleInput = 'Dormant rule'
      this.statusInput = 'Draft'
      this.branchSelect = []
      this.descriptionInput = null
      this.promotionInput = null
      this.customerListInput = null
    },
    newPromotionHandle() {
      EventBus.$emit('new-promotion')
      this.dialog = false
    },
    cancelHandle() {
      this.reset()
      this.dialog = false
    },
    createHandle() {
      const branches = this.branchesInput.map(item => item.id)

      const data = {
        campaignName: this.campaignNameInput,
        customerList: this.customerListInput,
        description: this.descriptionInput,
        status: this.statusInput,
        allocationRule: this.allocationRuleInput,
        branches: branches,
        promotion: this.promotionInput,
        type: 'Call',
      }
      this.createCampaign(data)
    },
  },
  watch: {
    dialog() {
      if (this.dialog) {
        this.getPromotionList()
        this.getCustomerList()
      }
    },
    campaignCreatingErrorCode() {
      if (this.campaignCreatingErrorCode === 201) {
        this.reset()
        this.dialog = false
        //Notify create Campaign Successfully
        this.$notify({
          group: 'foo',
          type: 'success',
          title: "Tạo Campaign thành công",
          text: `Đã tạo ${this.campaignCreatingResult.orderTotal} order`
        })
        this.getCallCampaignList()
      } else if (this.campaignCreatingErrorCode !== 0) {
        this.$notify({
          group: 'foo',
          type: 'error',
          title: "Error: "+this.campaignCreatingErrorCode,
          text: this.campaignCreatingError,
        })
      }
    },
  }
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