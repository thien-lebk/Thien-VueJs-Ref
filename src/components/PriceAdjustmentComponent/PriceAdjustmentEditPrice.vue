<template>
<div class="priceAdjustment-edit-price">
  <v-layout v-if="checkDiff === true && flag===1" align-center justify-center row>
    <v-btn fab dark small class="mx-1 btn-edit" @click="flag=2">
      <i class="material-icons">arrow_downward</i>
    </v-btn>
    <v-btn fab dark small class="mx-1 btn-done" @click="updateNewPriceInput()">
      <i class="material-icons">done</i>
    </v-btn>
  </v-layout>
  <v-form v-model="validate">
    <v-layout v-if="flag===2" align-center justify-center row>
      <v-text-field style="width:80px;"
                    :hint="newPriceHint()"
                    persistent-hint
                    :rules="[
                        v => !!v || 'Yều cầu cần có!',
                        v => /^-?\d*(\.[0-9]{1,3})?$/.test(v) || 'Dữ liệu không hợp lệ!',
                        v => v <= this.approvedAmountCondition || 'Giá mới phải nhỏ hơn giá cũ!' + (v <= this.approvedAmountCondition)
                    ]" 
                    v-on:keyup.enter="updateNewPriceInput()"
                    v-model="newPriceInput"></v-text-field>
      <v-text-field style="display:none;"></v-text-field>
      <v-btn fab dark small class="mx-1 btn-done-edit" @click="updateNewPriceInput()">
        <i class="material-icons">done</i>
      </v-btn>
    </v-layout>
  </v-form>
  <v-layout v-if="checkDiff === false || flag===3" class="price-lable">
      {{formatMoney(newPriceInput*1000000)}}
       <v-btn fab dark small class="mx-1 btn-edit" @click="flag=2, checkDiff = true">
        <i class="material-icons">arrow_downward</i>
      </v-btn>
  </v-layout>
</div>
</template>

<script>
import { isNullOrUndefined } from 'util';
import changeDigitToText from '../../mixins/money'
import {mapActions, mapGetters} from 'vuex'
import { async } from 'q';
import { formatMoney } from '../../mixins/money'

export default {
  name: "priceAdjustment-edit-price",
  components: {
  },
  props: {
    approved_amount: Number,
    diff_amount: Number,
    contractId: String
  },
  created() {
    this.changenewPriceInput();
  },
  computed: {
    
  },
  data() {
    return {
      flag:1,
      newPriceInput:0,
      validate: true,
      diffAmount:0,
      approvedAmountCondition:0,
      checkDiff: isNullOrUndefined(this.diff_amount)
    }
  },
  computed: {
    ...mapGetters({
      priceAdjustmentListError: 'priceAdjustment/priceAdjustmentListError',
      priceAdjustmentListErrorCode: 'priceAdjustment/priceAdjustmentListErrorCode',
    })
  },
  methods: {
    ...mapActions({
      updateDiffAmount: 'priceAdjustment/updateDiffAmount',
    }),
    changenewPriceInput() {
      if (isNaN(this.approved_amount)===false && isNaN(this.diff_amount)===false) {
        this.newPriceInput = ((this.approved_amount - this.diff_amount)/1000000).toFixed(3);
      }
      if (isNaN(this.approved_amount)===false) {
        this.approvedAmountCondition = this.approved_amount/1000000;
      }
    },
    updateNewPriceInput:async function(){
      if(this.validate===true) {
        this.diffAmount = (this.approvedAmountCondition * 1000 - this.newPriceInput * 1000) / 1000
        const result = await this.updateDiffAmount({contractId: this.contractId, diffAmount: this.diffAmount})
        if (result) {
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
              title: this.priceAdjustmentListErrorCode,
              text: this.priceAdjustmentListError,
          })
        }
        this.flag=3;
      }
    },
    newPriceHint() {
        return changeDigitToText(this.newPriceInput)
    },
    formatMoney: function(value) {
      return formatMoney(value)
    },
  },
}
</script>

<style>
.priceAdjustment-edit-price {
  margin: 0;
  padding: 0;
}

.priceAdjustment-edit-price .btn-edit {
  color: #EE7289 !important;
  background-color: #FAD2DA!important;
  height: 30px!important;
  width: 30px!important;
}

.priceAdjustment-edit-price .btn-done {
  color: #C7E59E !important;
  background-color: #91CB3E!important;
  border: 5px solid #D4EBB4!important;
  height: 30px!important;
  width: 30px!important;
}

.priceAdjustment-edit-price .btn-done i,
.priceAdjustment-edit-price .btn-edit i {
  font-size: 14px;
}

.priceAdjustment-edit-price .btn-done-edit {
  color: #C7E59E !important;
  background-color: #91CB3E!important;
  height: 20px!important;
  width: 20px!important;
}

.priceAdjustment-edit-price .btn-done-edit i {
  font-size: 12px;
}

.priceAdjustment-edit-price .price-lable {
  text-align: center;
  display: contents;
}

.priceAdjustment-edit-price input {
  text-align: center
}

</style>
