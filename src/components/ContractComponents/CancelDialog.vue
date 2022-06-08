<template>
    <v-dialog v-model="this.value" persistent max-width="290" transition="">
        <template v-slot:activator="{ on }">
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Chọn lý do hủy Contract</span>
          </v-card-title>
          <v-card-text>
            <v-select
              :items="this.stageItems"
              v-model="stage"
              label="Lý do*"
              required
            ></v-select>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" :disabled="contractUpadtingRequest" flat @click="closeClick">Hủy</v-btn>
            <v-btn color="blue darken-1" :loading="contractUpadtingRequest" :disabled="disable" flat @click="saveClick">Lưu</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import {stages, translateStageFromViToEng, getStatus} from '../OrderComponents/utils/stages'

export default {
    name: "cancel-dialog",
    props: {
        value: Boolean,
        orderId: String,
        contractId: String,
        staffId: String,
    },
    data() {
        return {
            stage: '',
            stageItems: [
                stages.FRAUD,
                stages.NOT_ELIGIBLE,
                stages.RATE_DISAGREEMENT,
                stages.TERMS_DISAGREEMENT
            ].map((item) => item.vi),
        }
    },
    computed: {
        ...mapGetters({
            contractUpadtingRequest: 'contract/contractUpadtingRequest',
            contractUpadtingErrorCode: 'contract/contractUpadtingErrorCode',
            contractUpadtingError: 'contract/contractUpadtingError',
        }),
        disable() {
            return this.stage == '' ? true : false
        },
    },
    methods: {
        ...mapActions({
            changeStatus: 'order/changeStatus',
            cancelContract: 'contract/cancelContract',
            resetContractUpdatingResult: 'contract/resetContractUpdatingResult',
        }),
        closeClick() {
            this.$emit('input', false)
        },
        saveClick() {
            const engStage = translateStageFromViToEng(this.stage)
            const status = getStatus(this.stage)
            const orderDetail = {
                orderId: this.orderId,
                step:  'Contract',
                stage:  engStage,
                status: status,
                staff: this.staffId,
            }

            Promise.all([this.changeStatus(orderDetail), this.cancelContract({id: this.contractId})]).then(() => {
                if (this.contractUpadtingErrorCode === 200) {
                    this.$notify({
                        group: 'foo',
                        type: 'success',
                        title: "Hủy hợp đồng thành công",
                        text: ''
                    })
                    // Close Popup Form
                    this.$emit('input', false)
                    this.$emit('finish')
                } else {
                    this.$notify({
                        group: 'foo',
                        type: 'error',
                        title: "Error: "+this.contractUpadtingErrorCode,
                        text: this.contractUpadtingError,
                    })
                }
                this.resetContractUpdatingResult()
            })
        },
    },
}
</script>