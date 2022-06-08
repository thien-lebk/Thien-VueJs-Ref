<template>
  <v-dialog v-model="dialog"  @keydown.esc="dialog = false" persistent max-width="1000px">

    <v-card>
      <v-card-title >
        <span class="title">Promotion Detail</span>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text>
        <v-form v-model="valid" ref="form">
          <v-container>
            <v-text-field
              :rules="[
                  v => !!v || 'Yêu cầu cần có',
              ]"
              v-model="promotionNameInput"
              label="Promotion Name"
              required
            >
            </v-text-field>
            <v-textarea
              label="Mô tả"
              rows="1"
              auto-grow
              v-model="descriptionInput"
              :rules="[v => !!v || 'Yều cầu cần có']"
              required
            >
            </v-textarea>
            <v-layout>
              <v-flex sm6>
                <v-text-field
                  :rules="[
                    v => !!v || 'Yêu cầu cần có',
                    v => {
                      if (v>0 && v<=100) {
                        return true
                      } return 'Lãi suất phải nằm từ 0 đến 100%'
                    }
                  ]"
                  v-model="interestDiscountInput"
                  label="Phần giảm lãi (%)"
                  required
                >
                </v-text-field>
              </v-flex>
              <v-flex sm6>
                <v-text-field
                  :rules="[
                    v => !!v || 'Yêu cầu cần có',
                    v => /^\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ'
                  ]"
                  v-model="maxDiscountInput"
                  :hint="maxDiscountHint"
                  persistent-hint
                  label="Giảm tối đa"
                  required
                >
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex sm6>
                <v-text-field
                  :rules="[
                    v => !!v || 'Yêu cầu cần có',
                    v => /^\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ'
                  ]"
                  v-model="minPayoutInput"
                  :hint="minPayoutHint"
                  persistent-hint
                  label="Giảm ngân tối thiểu"
                  required
                >
                </v-text-field>
              </v-flex>
              <v-flex sm6>
                <v-text-field
                  :rules="[
                    v => !!v || 'Yêu cầu cần có',
                    v => /^\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ'
                  ]"
                  v-model="minDiscountInput"
                  :hint="minDiscountHint"
                  persistent-hint
                  label="Giảm tối thiểu"
                  required
                >
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex sm6>
                <v-select
                  v-model="statusInput"
                  :items="statusItems"
                  :rules="[
                    v => !!v || 'Yêu cầu cần có',
                  ]"
                  label="Status"
                >
                </v-select>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="cancelBtn"
          color="#fff"
          @click="dialog = false"
          :disabled="promotionUpdatingRequest"
          round
        >
          Hủy
        </v-btn>
        <v-btn
          class="OkBtn"
          color="#dd1e26"
          @click="updateHandle"
          :disabled="okDiable"
          :loading="promotionUpdatingRequest"
          round
        >
          Lưu
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import changeDigitToText from '../../../../mixins/money'

export default {
  name: 'promotion-edit',
  data() {
    return {
      valid: false,
      id: null,
      promotionNameInput: null,
      descriptionInput: null,
      interestDiscountInput: null,
      maxDiscountInput: null,
      minPayoutInput: null,
      minDiscountInput: null,
      statusInput: null,
      statusItems: [ 'New', 'Inactive'],
    }
  },
  computed: {
    ...mapGetters({
      promotionDetailForm: 'promotion/promotionDetailForm',
      promotionDetail: 'promotion/promotionDetail',
      promotionUpdatingRequest: 'promotion/promotionUpdatingRequest',
      promotionUpdatingErrorCode: 'promotion/promotionUpdatingErrorCode',
      promotionUpdatingError: 'promotion/promotionUpdatingError',
    }),
    dialog: {
      get () { return this.promotionDetailForm },
      set (value) { if (!value) {this.turnOffDialog()} }
    },
    maxDiscountHint() {
      return changeDigitToText(this.maxDiscountInput)
    },
    minPayoutHint() {
      return changeDigitToText(this.minPayoutInput)
    },
    minDiscountHint() {
      return changeDigitToText(this.minDiscountInput)
    },
    okDiable() {
      if (this.valid && this.promotionDetail != null) {
        if (this.promotionNameInput != this.promotionDetail.promotionName) {
          return false
        }
        if (this.descriptionInput != this.promotionDetail.description) {
          return false
        }
        if (this.interestDiscountInput != this.promotionDetail.interestDiscount) {
          return false
        }
        
        if (this.maxDiscountInput != this.promotionDetail.maxDiscount) {
          return false
        }
        if (this.minPayoutInput != this.promotionDetail.minPayout) {
          return false
        }
        if (this.minDiscountInput != this.promotionDetail.minDiscount) {
          return false
        }
        if (this.statusInput != this.promotionDetail.status) {
          return false
        }
      }
      return true
    }
  },
  methods: {
    ...mapActions({
      turnOffDialog: 'promotion/turnOffDialog',
      updatePromotion: 'promotion/updatePromotion',
    }),
    updateHandle() {
      const data = {
        id: this.id,
        promotionName: this.promotionNameInput,
        description: this.descriptionInput,
        interestDiscount: this.interestDiscountInput,
        maxDiscount: this.maxDiscountInput,
        minPayout: this.minPayoutInput,
        minDiscount: this.minDiscountInput,
        status: this.statusInput,
      }
      this.updatePromotion(data).then(() => {
        if (this.promotionUpdatingErrorCode === 200) {
          //Turn off Dialog
          this.dialog = false
          //Notify update Promotion Successfully
          this.$notify({
            group: 'foo',
            type: 'success',
            title: "Cập nhật thành công",
            text: ''
          })
        } else {
          this.$notify({
            group: 'foo',
            type: 'error',
            title: "Error: "+this.promotionUpdatingErrorCode,
            text: this.promotionUpdatingError
          })
        }
      })
    }
  },
  watch: {
    promotionDetail() {
      if (this.promotionDetail !== null) {
        this.id = this.promotionDetail.id
        this.promotionNameInput = this.promotionDetail.promotionName
        this.descriptionInput = this.promotionDetail.description
        this.interestDiscountInput = this.promotionDetail.interestDiscount
        this.maxDiscountInput = this.promotionDetail.maxDiscount
        this.minPayoutInput = this.promotionDetail.minPayout
        this.minDiscountInput = this.promotionDetail.minDiscount
        this.statusInput = this.promotionDetail.status
      }
    },
  }
}
</script>

<style scoped>
.OkBtn {
  color: #fff !important;
}
.cancelBtn {
  color: #dd1e26 !important;
}
</style>