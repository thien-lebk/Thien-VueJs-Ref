<template>
  <v-dialog v-model="dialog"  @keydown.esc="dialog = false" persistent max-width="1000px">
    <template v-slot:activator="{ on }">
      <v-btn round v-on="on" class="new-promotion">
        <div class="back-white plus">
          <i class="fas fa-plus"></i>
        </div>
          <strong>Tạo Promotion</strong>
      </v-btn>
    </template>

    <v-card>
      <v-card-title >
        <span class="title">New Promotion</span>
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
          </v-container>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="cancelBtn"
          color="#fff"
          @click="cancelHandle"
          :disabled="promotionCreatingRequest"
          round
        >
          Hủy
        </v-btn>
        <v-btn
          class="OkBtn"
          color="#dd1e26"
          @click="createHandle"
          :disabled="!valid"
          :loading="promotionCreatingRequest"
          round
        >
          Tạo
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import changeDigitToText from '../../../../mixins/money'
import { EventBus } from '../../utils/event-bus'

export default {
  name: 'new-promotion',
  data() {
    return {
      dialog: false,
      valid: false,
      promotionNameInput: null,
      descriptionInput: null,
      interestDiscountInput: null,
      maxDiscountInput: null,
      minPayoutInput: null,
      minDiscountInput: null,
    }
  },
  mounted() {
    EventBus.$on('new-promotion', () => {
      this.dialog = true
    })
  },
  computed: {
    ...mapGetters({
      promotionCreatingRequest: 'promotion/promotionCreatingRequest',
      promotionCreatingResult: 'promotion/promotionCreatingResult',
      promotionCreatingErrorCode: 'promotion/promotionCreatingErrorCode',
      promotionCreatingError: 'promotion/promotionCreatingError',
    }),
    maxDiscountHint() {
      return changeDigitToText(this.maxDiscountInput)
    },
    minPayoutHint() {
      return changeDigitToText(this.minPayoutInput)
    },
    minDiscountHint() {
      return changeDigitToText(this.minDiscountInput)
    },
  },
  methods: {
    ...mapActions({
      createPromotion: 'promotion/createPromotion',
      getPromotionList: 'promotion/getPromotionList',
    }),
    reset() {
      this.$refs.form.resetValidation()
      this.promotionNameInput = null
      this.descriptionInput = null
      this.interestDiscountInput = null
      this.maxDiscountInput = null
      this.minPayoutInput = null
      this.minDiscountInput = null
    },
    cancelHandle() {
      this.reset()
      this.dialog = false
    },
    createHandle() {
      const data = {
        promotionName: this.promotionNameInput,
        description: this.descriptionInput,
        interestDiscount: this.interestDiscountInput,
        maxDiscount: this.maxDiscountInput,
        minPayout: this.minPayoutInput,
        minDiscount: this.minDiscountInput,
      }
      this.createPromotion(data)
    }
  },
  watch: {
    promotionCreatingErrorCode() {
      if (this.promotionCreatingErrorCode === 201) {
        this.reset()
        this.dialog = false
        //Notify create Promotion Successfully
        this.$notify({
          group: 'foo',
          type: 'success',
          title: "Tạo Promotion thành công",
          text: ''
        })
        this.getPromotionList()
      } else {
        this.$notify({
          group: 'foo',
          type: 'error',
          title: "Error: "+this.promotionCreatingErrorCode,
          text: this.promotionCreatingError,
        })
      }
    }
  }
}
</script>

<style scoped>
.new-promotion {
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
.cancelBtn {
  color: #dd1e26 !important;
}
.OkBtn {
  color: #fff !important;
}
</style>