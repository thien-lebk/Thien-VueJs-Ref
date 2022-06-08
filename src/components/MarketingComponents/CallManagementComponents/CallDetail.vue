<template>
  <div>
    <v-dialog v-model="dialog"  @keydown.esc="dialog = false" persistent max-width="1000px">
      <v-card>
        <v-card-title >
          <span class="title">Call Detail</span>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text>
          <v-form v-model="valid" ref="form">
            <v-container>
              <v-layout>
                <v-flex sm6>
                  <v-text-field
                    v-model.lazy="nameInput"
                    label="Họ Tên"
                    readonly
                  >
                  </v-text-field>
                </v-flex>
                <v-flex sm6>
                  <v-select
                    v-model="genderInput"
                    :items="genderItems"
                    item-value="value"
                    item-text="text"
                    label="Giới tính"
                    readonly
                  >
                  </v-select>
                </v-flex>
              </v-layout>
              <v-layout>
                <v-flex sm6>
                  <v-text-field
                    v-model.lazy="phone1Input"
                    :rules="[
                      v => !!v || 'Phone is required',
                      //Phone has charater pre '+' (only one or no), from 10-13 digits.
                      v => /^[+]?[0-9]{10,13}$/.test(v) || 'Phone is not valid'
                    ]"
                    label="Phone 1"
                    required
                  >
                    <template slot="append">
                      <template v-if="campaignOrderDetailResult !== null && campaignOrderDetailResult.clientPrimaryPhone !== null && campaignOrderDetailResult.clientPrimaryPhone.trim() !== ''">
                        <v-icon 
                          v-if="!calling && !ring" 
                          @click="callHandle('phone1')"
                          :disabled="!enabled"
                          color="rgba(1, 151, 246, 1)"
                        >
                          call
                        </v-icon>
                        <v-icon 
                          v-else-if="orderCallId === orderId && campaignOrderDetailResult !== null && customerPhone === campaignOrderDetailResult.clientPrimaryPhone"
                          @click="terminateHandle" 
                          color="#dd1e26"
                        >
                          call_end
                        </v-icon>
                      </template>
                    </template>
                  </v-text-field>
                </v-flex>
                <v-flex sm6>
                  <v-text-field
                    v-model.lazy="phone2Input"
                    :rules="[
                      //Phone has charater pre '+' (only one or no), from 10-13 digits.
                      v => /^null$|^\s*$|^[0-9]{10,13}?$/.test(v) || 'Dữ liệu không hợp lệ'
                    ]"
                    label="Phone 2"
                  >
                    <template slot="append">
                      <template v-if="campaignOrderDetailResult !== null && campaignOrderDetailResult.clientAlternativePhone !== null && campaignOrderDetailResult.clientAlternativePhone.trim() !== ''">
                        <v-icon 
                          v-if="!calling && !ring" 
                          @click="callHandle('phone2')"
                          :disabled="!enabled"
                          color="rgba(1, 151, 246, 1)"
                        >
                          call
                        </v-icon>
                        <v-icon 
                          v-else-if="orderCallId === orderId && campaignOrderDetailResult !== null && customerPhone === campaignOrderDetailResult.campaignOrderDetailResult.clientAlternativePhone"
                          @click="terminateHandle" 
                          color="#dd1e26"
                        >
                          call_end
                        </v-icon>
                      </template>
                    </template>
                  </v-text-field>
                </v-flex>
              </v-layout>
              <v-layout>
                <v-flex sm6>
                  <v-text-field
                    v-model.lazy="mostPawnAssetInput"
                    label="Most Pawn Asset"
                    readonly
                  >
                  </v-text-field>
                </v-flex>
                <v-flex sm6>
                  <v-text-field
                    v-model.lazy="promotionInput"
                    label="Khuyến mãi"
                    readonly
                  >
                  </v-text-field>
                </v-flex>
              </v-layout>
              <v-textarea
                v-model.lazy="clientNoteInput"
                label="Ghi chú khác hàng"
                rows="2"
                auto-grow
                :placeholder="clientNotePlaceholder"
                :hint="clientNotePlaceholder"
              >
              </v-textarea>
              <v-layout>
                <v-flex sm6>
                  <v-select
                    v-model="stepInput"
                    :items="stepItems"
                    :rules="[v => !!v || 'Yều cầu cần có']"
                    label="Giai đoạn"
                    required
                  >
                  </v-select>
                </v-flex>
                <v-flex sm6>
                  <v-select
                    v-model="stageInput"
                    :items="stageItems"
                    :rules="[v => !!v || 'Yều cầu cần có']"
                    label="Trạng thái"
                    required
                  >
                  </v-select>
                </v-flex>
              </v-layout>
              <v-layout>
                <v-flex sm6>
                    <v-select
                      v-model="assetTypeInput"
                      :items="assetTypeItems"
                      :rules="[v => !!v || 'Yều cầu cần có']"
                      label="Loại tài sản"
                      required
                    >
                    </v-select>
                </v-flex>
                <v-flex sm6>
                  <v-textarea
                    v-model.lazy="noteInput"
                    label="Note"
                    rows="2"
                    auto-grow
                    :placeholder="notePlaceholder"
                    :hint="notePlaceholder"
                  >
                  </v-textarea>
                </v-flex>
              </v-layout>
              <v-layout>
                <v-flex sm6>
                  <v-textarea
                    v-model.lazy="assetInput"
                    label="Mô tả tài sản"
                    rows="1"
                    auto-grow
                    :rules="[v => !!v || 'Yều cầu cần có']"
                    required
                  >
                  </v-textarea>
                </v-flex>
                <v-flex sm6>
                  <date-time-picker
                    v-model="appointmentDateTimeInput"
                    label="Lịch hẹn giờ*"
                    :disable="appointmentDisable"
                    :hint="appointmentDateTimeHint"
                    format="D-M-YYYY H:m"
                  >
                  </date-time-picker>
                </v-flex>
              </v-layout>
              <v-layout>
                <v-flex sm6>
                  <v-text-field
                    v-model.lazy="expectedAmountInput"
                    :rules="[
                      v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ'
                    ]"
                    label="Giá mong muốn"
                    :hint="expectedAmountHint"
                  >
                  </v-text-field>
                </v-flex>
                <v-flex sm6>
                  <v-text-field
                    v-model.lazy="validatorAmountInput"
                    :rules="[
                        v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ'
                    ]"
                    label="Giá thẩm định"
                    :hint="validatorAmountHint"
                  >
                  </v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="contactBtn"
            color="#43425d"
            round
            @click="contractHandle"
            v-if="contractDisable"
            :disabled="clientUpdatingRequest || orderUpdating"
          >
            Hợp Đồng
          </v-btn>
          <v-btn
            class="cancelBtn"
            color="#fff"
            round
            @click="dialog = false"
            :disabled="clientUpdatingRequest || orderUpdating"
          >
            Cancel
          </v-btn>
          <v-btn
            class="OkBtn"
            color="#dd1e26"
            round
            :disabled="okDisable"
            :loading="clientUpdatingRequest || orderUpdating"
            @click="okHandle"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <confirm-dialog 
      textConfirm="Xác nhận cập nhật ghi chú?"
      :showDialog="showDialog" 
      @callBackFunction="update"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ConfirmDialog from '@/components/commonComponent/ConfirmDialog.vue'
import DateTimePicker from "@/components/commonComponent/DateTimePicker.vue"

import moment from 'moment'
import getStage from './utils/stage_functions'
import {translateStageFromEngToVi, translateStageFromViToEng, getStatus} from './utils/stages'
import {steps, translateStepFromEngToVi, translateStepFromViToEng} from './utils/steps'
import changeDigitToText from '../../../mixins/money'
import haveAppointment from '../../OrderComponents/utils/appointment'
import {isNullOrUndefined} from 'util'

export default {
  name: 'call-detail',
  components: {
    ConfirmDialog,
    DateTimePicker,
  },
  data() {
    return {
      valid: false,
      orderId: null,
      clientId: null,
      assetId: null,
      updateType: '',
      nameInput: '',
      genderInput: '',
      genderItems: [
        {
          text: "Nam",
          value: "male",
        },
        {
          text: "Nữ",
          value: "female",
        }
      ],
      phone1Input: '',
      phone2Input: '',
      mostPawnAssetInput: '',
      clientNoteInput: '',
      promotionInput: '',
      stageInput: '',
      stepInput: '',
      assetTypeInput: '',
      noteInput: '',
      assetInput: '',
      appointmentDateTimeInput: '',
      appointmentDateTimeHint: `Ví dụ: ${moment().format("D-M-YYYY H:m")}`,
      expectedAmountInput: '',
      validatorAmountInput: '',
      showDialog: false,
    }
  },
  computed: {
    ...mapGetters({
      SAssetListResult: 'asset/SAssetListResult',
      CAssetCreatingResult: 'asset/CAssetCreatingResult',
      campaignOrderDetailForm: 'order/campaignOrderDetailForm',
      campaignOrderDetailResult: 'order/campaignOrderDetailResult',
      campaignOrderDetailErrorCode: 'order/campaignOrderDetailErrorCode',
      campaignOrderDetailError: 'order/campaignOrderDetailError',
      orderUpdating: 'order/orderUpdating',
      orderUpdatingErrorCode: 'order/orderUpdatingErrorCode',
      orderUpdatingError: 'order/orderUpdatingError',
      clientUpdatingRequest: 'client/clientUpdatingRequest',
      clientUpdatingErrorCode: 'client/clientUpdatingErrorCode',
      clientUpdatingError: 'client/clientUpdatingError',
      enabled: 'call/enabled',
      calling: 'call/calling',
      ring: 'call/ring',
      orderCallId: 'call/orderId',
      customerPhone: 'call/customerPhone',
      userLogin: 'auth/name',
    }),
    dialog: {
      get () { return this.campaignOrderDetailForm },
      set (value) { if (!value) {this.turnOffCampaignOrderDialog()} }
    },
    expectedAmountHint() {
      return changeDigitToText(this.expectedAmountInput)
    },
    validatorAmountHint() {
      return changeDigitToText(this.validatorAmountInput)
    },
    //Send vietnamese stages to stageItems
    stageItems() {
      if (/\S/.test(this.stepInput) && this.stepInput != null) {
        //Get English Step
        const engStep = this.translateStepFromViToEng(this.stepInput)
        const stageTotal = getStage(engStep)
        return stageTotal.map(element => element.vi)
      }
      return []
    },
    //Send vietnamese steps to stepItems, except "Chưa nhận"/Unclaimed
    stepItems() {
      return Object.keys(steps).filter(key => {
        if (steps[key].vi !== "Chưa nhận") {
          return true
        } 
        return false
      }).map(key => steps[key].vi)
    },
    assetTypeItems() {
      return this.SAssetListResult.map(item => item.description)
    },
    //Enable user input appointment date
    appointmentDisable() {
      return !haveAppointment(this.stageInput)
    },
    clientNotePlaceholder() {
      try {
        if (this.campaignOrderDetailResult !== null) {
          const notes = this.campaignOrderDetailResult.clientNote.split("\r\n")
          return notes[notes.length - 1]
        }
        return null
      } catch (error) {
        return null
      }
    },
    notePlaceholder() {
      try {
        if (this.campaignOrderDetailResult !== null) {
          const notes = this.campaignOrderDetailResult.note.split("\r\n")
          return notes[notes.length - 1]
        }
        return null
      } catch (error) {
        return null
      }
    },
    updateFromContract() {
      if (this.valid && this.campaignOrderDetailResult !== null) {
        
        if (this.phone1Input !== this.campaignOrderDetailResult.clientPrimaryPhone) {
          return false
        }

        if (this.phone2Input !== this.campaignOrderDetailResult.clientAlternativePhone) {
          return false
        }

        if (this.clientNoteInput.trim() !== '') {
          return false
        }

        if (this.assetTypeInput !== this.campaignOrderDetailResult.asset) {
          return false
        }

        if (this.noteInput.trim() !== '') {
          return false
        }

        if (this.assetInput !== this.campaignOrderDetailResult.assetDescription) {
          return false
        }

        if (this.appointmentDateTimeInput !== this.campaignOrderDetailResult.appointment) {
          return false
        }

        if (this.expectedAmountInput !== this.campaignOrderDetailResult.expectedAmount) {
          if (!(this.expectedAmountInput === '' && this.campaignOrderDetailResult.expectedAmount === null)) {
            return false
          }
        }

        if (this.validatorAmountInput !== this.campaignOrderDetailResult.validatorAmount) {
          if (!(this.validatorAmountInput === '' && this.campaignOrderDetailResult.validatorAmount === null)) {
            return false
          } 
        }
      }
      return true
    },
    okDisable() {
      if (this.valid && this.campaignOrderDetailResult !== null) {
        
        if (this.stageInput === "Hợp đồng") {
          return true
        }

        if (this.phone1Input !== this.campaignOrderDetailResult.clientPrimaryPhone) {
          return false
        }
        if (this.phone2Input !== this.campaignOrderDetailResult.clientAlternativePhone) {
          return false
        }

        if (this.clientNoteInput.trim() !== '') {
          return false
        }

        if (this.stepInput !== this.translateStepFromEngToVi(this.campaignOrderDetailResult.step)) {
          return false
        }

        if (this.stageInput !== this.translateStageFromEngToVi(this.campaignOrderDetailResult.stage)) {
          return false
        }

        if (this.assetTypeInput !== this.campaignOrderDetailResult.asset) {
          return false
        }

        if (this.noteInput.trim() !== '') {
          return false
        }

        if (this.assetInput !== this.campaignOrderDetailResult.assetDescription) {
          return false
        }

        if (this.appointmentDateTimeInput !== this.campaignOrderDetailResult.appointment) {
          return false
        }

        if (this.expectedAmountInput !== this.campaignOrderDetailResult.expectedAmount) {
          if (!(this.expectedAmountInput === '' && this.campaignOrderDetailResult.expectedAmount === null)) {
            return false
          }
        }

        if (this.validatorAmountInput !== this.campaignOrderDetailResult.validatorAmount) {
          if (!(this.validatorAmountInput === '' && this.campaignOrderDetailResult.validatorAmount === null)) {
            return false
          } 
        }
      }
      return true
    },
    //Disable Contract Button when step is not Contact/Hợp đồng
    contractDisable() {
      if (this.stageInput === "Hợp đồng") {
        return true
      }
      return false
    },
  },
  methods: {
    ...mapActions({
      turnOffCampaignOrderDialog: 'order/turnOffCampaignOrderDialog',
      updateOrder: 'order/updateOrder',
      updateClient: 'client/updateClient',
      createCAsset: 'asset/createCAsset',
      updateCAsset: 'asset/updateCAsset',
    }),
    contractHandle() {
      // No change in order detail
      if (!this.updateFromContract) {
        const orderDetail = {
          phone:  this.phone1Input,
          firstName: null,
          lastName: null,
          expectedAmount: this.expectedAmountInput,
          validatorAmount: this.validatorAmountInput,
          assetType: this.assetTypeInput,
          asset: this.assetInput,
          assetID: this.assetId,
          orderId: this.orderId,
          source: this.campaignOrderDetailResult.source,
          staff: this.campaignOrderDetailResult.staff,
          promotionName: this.promotionInput,
        }

        this.$router.push({name: 'new-contract', params: {orderDetail}})
        this.dialog = false
      } else {
        if (this.noteInput.trim() == '' & this.clientNoteInput.trim() == '') {
          this.updateOrderForContractHandle()
        } else {
          this.showDialog = true
          this.updateType = 'contract'
        }
      }
    },
    okHandle() {
      if (this.noteInput.trim() == '' & this.clientNoteInput.trim() == '') {
        this.updateOrderHandle()
      } else {
        this.showDialog = true
        this.updateType = 'order'
      }
    },
    update(flag) {
      if (flag) {
        if (this.updateType === 'order') {
          this.updateOrderHandle()
        } else if (this.updateType === 'contract') {
          this.updateOrderForContractHandle()
        }
      }
      this.showDialog = false
    },
    updateCAssetHandle: async function() {
      const assetTypeId = this.findAssetTypeId(this.assetTypeInput)

      // Create or update CAsset
      if (isNullOrUndefined(this.assetId)) {
        await this.createCAsset({
          asset: assetTypeId,
          description: this.assetInput
        })
        this.assetId = this.CAssetCreatingResult.id
      } else {
        this.updateCAsset({
          id: this.assetId,
          data: {
            asset: assetTypeId,
            description: this.assetInput,
          }
        })
      }

      return this.assetId
    },
    getNote(newNote, oldNote) {
      let note = oldNote
      if (newNote.trim() !== '') {

        if (isNullOrUndefined(note)) {
          note = ''
        }

        if (note !== '') {
          note = note.concat("\r\n")
        }

        return note.concat(this.userLogin)
                .concat(" - ")
                .concat(moment().format('DD-MM-YYYY hh:mm'))
                .concat(" - ")
                .concat(newNote)

      }

      return note
    },
    updateOrderHandle: async function() {

      const CAssetId = await this.updateCAssetHandle()

      // Client Update

      const newClientNote = this.clientNoteInput
      const oldClientNote = this.campaignOrderDetailResult.clientNote

      const clientData = {
        clientID: this.clientId,
        primaryPhone: this.phone1Input,
        alternativePhone: this.phone2Input,
        note: this.getNote(newClientNote, oldClientNote),
      }      

      // Order Update

      let appointmentDateTime = null
      // When appointmentDateTimeInput enable
      if (this.appointmentDisable === false) {
        // Format from 01/01/2019 12:12 to 2019/01/01 12:12
        appointmentDateTime = moment(this.appointmentDateTimeInput, "DD-MM-YYYY HH:mm").format("YYYY-MM-DD HH:mm")
      }

      const newOrderNote = this.noteInput
      const oldOrderNote = this.campaignOrderDetailResult.note
      
      const orderData = {
        orderID: this.orderId,
        phone: this.phone1Input,
        expectedAmount: this.expectedAmountInput === '' ? null : this.expectedAmountInput,
        validatorAmount: this.validatorAmountInput === '' ? null : this.validatorAmountInput,
        step: this.translateStepFromViToEng(this.stepInput),
        stage: this.translateStageFromViToEng(this.stageInput),
        staff: this.campaignOrderDetailResult.staff,
        note: this.getNote(newOrderNote, oldOrderNote),
        appointmentDateTime: appointmentDateTime,
        status: this.getStatus(this.stageInput),
        CAssetID: CAssetId,
      }

      await Promise.all([ this.updateClient(clientData), this.updateOrder(orderData) ])
      
      if (this.orderUpdatingErrorCode === 200 & this.clientUpdatingErrorCode === 200) {
        this.$notify({
          group: 'foo',
          type: 'success',
          title: "Cập nhật thành công",
          text: ''
        })
        this.dialog=false
        this.clientNoteInput = ''
        this.noteInput = ''
      } else {
        if (this.orderUpdatingErrorCode !== 200) {
          this.$notify({
            group: 'foo',
            type: 'error',
            title: this.orderUpdatingErrorCode,
            text: this.orderUpdatingError
          })
        }

        if (this.clientUpdatingErrorCode !== 200) {
          this.$notify({
            group: 'foo',
            type: 'error',
            title: this.clientUpdatingErrorCode,
            text: this.clientUpdatingError
          })
        }
      }
    },
    updateOrderForContractHandle: async function() {
      const CAssetId = await this.updateCAssetHandle()

      // Client Update

      const newClientNote = this.clientNoteInput
      const oldClientNote = this.campaignOrderDetailResult.clientNote
      
      const clientData = {
        clientID: this.clientId,
        primaryPhone: this.phone1Input,
        alternativePhone: this.phone2Input,
        note: this.getNote(newClientNote, oldClientNote),
      }

      // Order Update

      let appointmentDateTime = null
      // When appointmentDateTimeInput enable
      if (this.appointmentDisable === false) {
        // Format from 01/01/2019 12:12 to 2019/01/01 12:12
        appointmentDateTime = moment(this.appointmentDateTimeInput, "DD-MM-YYYY HH:mm").format("YYYY-MM-DD HH:mm")
      }

      const newOrderNote = this.noteInput
      const oldOrderNote = this.campaignOrderDetailResult.note
      
      const orderData = {
        orderID: this.orderId,
        phone: this.phone1Input,
        expectedAmount: this.expectedAmountInput === '' ? null : this.expectedAmountInput,
        validatorAmount: this.validatorAmountInput === '' ? null : this.validatorAmountInput,
        staff: this.campaignOrderDetailResult.staff,
        note: this.getNote(newOrderNote, oldOrderNote),
        appointmentDateTime: appointmentDateTime,
        CAssetID: CAssetId,
      }

      await Promise.all([ this.updateClient(clientData), this.updateOrder(orderData) ])


      if (this.orderUpdatingErrorCode === 200 & this.clientUpdatingErrorCode === 200) {
        const orderDetail = {
          phone:  this.phone1Input,
          firstName: null,
          lastName: null,
          expectedAmount: this.expectedAmountInput,
          validatorAmount: this.validatorAmountInput,
          assetType: this.assetTypeInput,
          asset: this.assetInput,
          assetID: this.assetId,
          orderId: this.orderId,
          source: this.campaignOrderDetailResult.source,
          staff: this.campaignOrderDetailResult.staff,
          promotionName: this.promotionInput,
        }

        this.$router.push({name: 'new-contract', params: {orderDetail}})
        this.dialog = false
      } else {
        if (this.orderUpdatingErrorCode !== 200) {
          this.$notify({
            group: 'foo',
            type: 'error',
            title: this.orderUpdatingErrorCode,
            text: this.orderUpdatingError
          })
        }

        if (this.clientUpdatingErrorCode !== 200) {
          this.$notify({
            group: 'foo',
            type: 'error',
            title: this.clientUpdatingErrorCode,
            text: this.clientUpdatingError
          })
        }
      }
    },
    callHandle(phoneType) {
      const phone = phoneType === 'phone1' ? this.campaignOrderDetailResult.clientPrimaryPhone : this.campaignOrderDetailResult.clientAlternativePhone

      this.call({
        phone: phone, 
        name: this.nameInput, 
        orderId: this.orderId
      })
    },
    //Find asset ID from asset description
    findAssetTypeId: function(assetType) {
      const SAsset = this.SAssetListResult.find(item => item.description === assetType)
      return SAsset.id
    },
    translateStageFromEngToVi: function(englishStage) {
      return translateStageFromEngToVi(englishStage)
    },
    translateStageFromViToEng: function(vietnameseStage) {
      return translateStageFromViToEng(vietnameseStage)
    },
    translateStepFromEngToVi: function(englishStep) {
      return translateStepFromEngToVi(englishStep)
    },
    translateStepFromViToEng: function(vietnameseStep) {
      return translateStepFromViToEng(vietnameseStep)
    },
    getStatus: function(stage){
      return getStatus(stage)
    },
  },
  watch: {
    campaignOrderDetailResult() {
      if (this.campaignOrderDetailResult !== null) {
        this.orderId = this.campaignOrderDetailResult.orderID
        this.clientId = this.campaignOrderDetailResult.client
        this.assetId = this.campaignOrderDetailResult.assetID
        this.nameInput = this.campaignOrderDetailResult.clientName
        this.genderInput = this.campaignOrderDetailResult.clientGender
        this.phone1Input = this.campaignOrderDetailResult.clientPrimaryPhone
        this.phone2Input = this.campaignOrderDetailResult.clientAlternativePhone
        this.mostPawnAssetInput = this.campaignOrderDetailResult.mostPawnedAsset
        this.promotionInput = this.campaignOrderDetailResult.promotionName
        this.stageInput = this.translateStageFromEngToVi(this.campaignOrderDetailResult.stage)
        this.stepInput = this.translateStepFromEngToVi(this.campaignOrderDetailResult.step)
        this.assetTypeInput = this.campaignOrderDetailResult.asset
        this.assetInput = this.campaignOrderDetailResult.assetDescription
        this.appointmentDateTimeInput = this.campaignOrderDetailResult.appointment
        this.expectedAmountInput = this.campaignOrderDetailResult.expectedAmount == null ? '' : this.campaignOrderDetailResult.expectedAmount
        this.validatorAmountInput = this.campaignOrderDetailResult.validatorAmount == null ? '' : this.campaignOrderDetailResult.validatorAmount
      }
    },
    stepInput() {
      const oldStep = this.translateStepFromEngToVi(this.campaignOrderDetailResult.step)
      //When User go back old step
      if (this.stepInput === oldStep) {
        //Get old stage
        const oldStage = this.translateStageFromEngToVi(this.campaignOrderDetailResult.stage)
        //Current stage different old stage???
        if (this.stageInput !== oldStage) {
          this.stageInput = oldStage //Emit stageInput watcher
        } else {
          //Get old appointment from store
          this.appointmentDateTimeInput = this.campaignOrderDetailResult.appointment
        }
      } else {
        //When current stage is not in new stage Items
        this.stageInput = ''
      }
    },
    stageInput() {
      const oldStep = this.translateStepFromEngToVi(this.campaignOrderDetailResult.step)
      const oldStage = this.translateStageFromEngToVi(this.campaignOrderDetailResult.stage)

      if (this.stepInput === oldStep && this.stageInput === oldStage) {
        //Get old appointment from store
        this.appointmentDateTimeInput = this.campaignOrderDetailResult.appointment
      } else {
        this.appointmentDateTimeInput = ''
      }
    },
  }
}
</script>

<style scoped>
.contactBtn {
  color: #fff !important;
}

.cancelBtn {
  color: #dd1e26 !important;
}

.OkBtn {
  color: #fff !important;
}
</style>