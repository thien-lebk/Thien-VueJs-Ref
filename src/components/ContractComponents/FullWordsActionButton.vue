<template>
    <div>
        <v-layout v-if="active" align-center justify-center row style="margin-bottom:20px;">
            <v-btn round :disabled="disabled"  @click="onClickExtension" class="button" color="rgba(145,203,62, 0.89)">
                <i class="material-icons" color="rgba(255,255,255, 1)">hourglass_full</i>
                Gia Hạn
            </v-btn>
            <v-btn round :disabled="disabled" @click="onClickRepayment" class="button" color="rgba(234,82,111, 0.89)">
                <i class="material-icons" color="rgba(255,255,255, 1)">check_circle</i>
                Tất Toán
            </v-btn>
        </v-layout>
        <v-layout v-else-if="waiting" align-center justify-center row style="margin-bottom:20px;">
            <v-btn round @click="onClickApprove" :loading="contractApprovingRequest" :disabled="contractUpadtingRequest" class="button" color="rgba(255, 140, 0, 1)">
                <i class="material-icons">check_circle</i>
                Chấp nhận
            </v-btn>
            <v-btn round @click="onClickCancel" :loading="contractUpadtingRequest" :disabled="contractApprovingRequest" class="button" color="rgba(255,0,0, 1)">
                <i class="material-icons">cancel</i>
                Hủy
            </v-btn>
            <cancel-dialog
                v-model="cancelDialog"
                :orderId="String(orderId)"
                :contractId="String(contractId)"
                :staffId="String(staffId)"
                @finish="refresh"
            />
        </v-layout>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CancelDialog from "@/components/ContractComponents/CancelDialog.vue"
import { isNullOrUndefined } from 'util'
import moment from 'moment'

export default {
    name: "full-words-action-button",
    components: { 
        CancelDialog,
    },
    props: {
        disabled: Boolean,
        contractId: String,
    },
    data() {
        return {
            cancelDialog: false,
            orderId: null,
            staffId: null,
            maturesDate: null,
            status: null,
        }
    },
    computed: {
        ...mapGetters({
            contractDetailErrorCode: 'contract/contractDetailErrorCode',
            contractDetail: 'contract/contractDetail',
            orderDetail: 'order/orderDetail',
            contractApprovingRequest: 'contract/contractApprovingRequest',
            contractApprovingErrorCode: 'contract/contractApprovingErrorCode',
            contractApprovingError: 'contract/contractApprovingError',
            contractUpadtingRequest: 'contract/contractUpadtingRequest',
        }),
        active() {
            try {
                return (this.status.toUpperCase() === 'ACTIVE' | this.status.toUpperCase() === 'OVERDUE') & !this.disabled
            } catch (error) {
                return false
            }
        },
        waiting() {
            try {
                return this.status.toUpperCase() === 'WAITING'
            } catch (error) {
                return false
            }
        }
    },
    methods: {
        ...mapActions({
            approveContract: 'contract/approveContract',
            getContractByContractId: 'contract/getContractByContractId',
            changeStatus: 'order/changeStatus',
            getOrderDetailById: 'order/getOrderDetailById',
            cancelContract: 'contract/cancelContract',
        }),
        onClickExtension() {
            this.$router.push({name: 'extension-contract', params: {id: this.contractId}})
        },
        onClickRepayment() {
            this.$router.push({name: 'contract-repayment', params: {id: this.contractId}})
        },
        onClickApprove() {
            this.approveContract({
                contractId: this.contractId,
                approvementDate: moment(this.maturesDate, "D-M-YYYY").format("YYYY-MM-DD"),
            }).then(() => {
                if (this.contractApprovingErrorCode === 200) {
                    this.$notify({
                        group: 'foo',
                        type: 'success',
                        title: "Approve hợp đồng thành công",
                        text: ''
                    })
                    // Change status order
                    this.getOrderDetailById({id: this.orderId}).then(() => {
                        if (!isNullOrUndefined(this.orderDetail)) {
                            // Change order status to success
                            this.changeStatus({
                                orderId: this.orderId,
                                step: 'Contract',
                                stage: 'Active Contract',
                                status: 'Success',
                                staff: this.orderDetail.staff,
                            })
                        }
                    })
                } else {
                    this.$notify({
                        group: 'foo',
                        type: 'error',
                        title: "Error: "+this.contractApprovingErrorCode,
                        text: this.contractApprovingError,
                    })
                }
                this.refresh()
            })
        },
        onClickCancel() {
            // Change status order
            this.getOrderDetailById({id: this.orderId}).then(() => {
                if (!isNullOrUndefined(this.orderDetail)) {
                    this.staffId = this.orderDetail.staff
                }
            })
            this.cancelDialog = true
        },
        refresh() {
            this.getContractByContractId({id: this.contractId})
        },
    },
    watch: {
        contractDetailErrorCode() {
            if (this.contractDetailErrorCode === 200) {
                this.orderId = this.contractDetail.orderId
                this.maturesDate = this.contractDetail.maturesDate
                this.status = this.contractDetail.status
            }
        }
    }
}
</script>

<style scoped>
.button {
  font-size: 1vw !important;
  color: #ffffff !important;
  text-transform: capitalize !important;
}
</style>