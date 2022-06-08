<template>
    <div class="action-contract-button">
        <v-layout align-center justify-center row v-if="showButton===1">
            <v-btn fab dark small icon class="ma-0" @click="onClickExtension" color="rgba(76, 185, 99, 0.17)">
                <v-icon color="rgba(76, 185, 99, 1)">hourglass_full</v-icon>
            </v-btn>
            <v-btn fab dark small icon class="ma-0" @click="onClickRepayment" color="rgba(234, 82, 111, 0.17)">
                <v-icon color="rgba(234, 82, 111, 1)">check_circle</v-icon>
            </v-btn>
        </v-layout>
        <v-layout align-center justify-center row v-if="showButton===2">
            <v-btn fab dark small icon class="ma-0" @click="onClickApprovement" :loading="contractApprovingRequest" :disabled="contractUpadtingRequest || orderUpdating" color="rgba(255, 140, 0, 0.17)">
                <v-icon color="rgba(255, 140, 0, 1)">check_circle</v-icon>
            </v-btn>
            <v-btn fab dark small icon class="ma-0" @click="onClickCancle" :disabled="contractApprovingRequest" color="rgba(255,0,0, 0.17)">
                <v-icon color="rgba(255,0,0, 1)">cancel</v-icon>
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
import {mapActions, mapGetters} from 'vuex'
import CancelDialog from "@/components/ContractComponents/CancelDialog.vue"
import { isNullOrUndefined } from 'util'
import moment from 'moment'

export default {
    name: "action-button-contract",
    components: { 
        CancelDialog,
    },
    props: {
        status: String,
        contractId: String,
        orderId: String,
        maturesDate: String,
        clientId: Number,
    },
    data() {
        return {
            cancelDialog: false,
            staffId: null,
        }
    },
    computed: {
        ...mapGetters({
            contractApprovingRequest: 'contract/contractApprovingRequest',
            contractApprovingErrorCode: 'contract/contractApprovingErrorCode',
            contractApprovingError: 'contract/contractApprovingError',
            contractUpadtingRequest: 'contract/contractUpadtingRequest',
            contractUpadtingErrorCode: 'contract/contractUpadtingErrorCode',
            contractUpadtingError: 'contract/contractUpadtingError',
            orderUpdating: 'order/orderUpdating',
            orderDetail: 'order/orderDetail',
        }),
        showButton() {
            if (isNullOrUndefined(this.status)===false && (this.status.toUpperCase()==='ACTIVE' ||
            this.status.toUpperCase()==='OVERDUE')) {
                return 1;
            } else if (isNullOrUndefined(this.status)===false && this.status.toUpperCase()==='WAITING') {
                return 2;
            }
            return 3;
        },
    },
    methods: {
        ...mapActions({
            approveContract: 'contract/approveContract',
            changeStatus: 'order/changeStatus',
            getOrderDetailById: 'order/getOrderDetailById',
            cancelContract: 'contract/cancelContract',
        }),
        onClickExtension() {
            if (isNullOrUndefined(this.contractId) === false) {
                this.$router.push({name: 'extension-contract', params: {id: this.contractId}})
            }
        },
        onClickRepayment() {
            if (isNullOrUndefined(this.contractId) === false) {
                this.$router.push({name: 'contract-repayment', params: {id: this.contractId}})
            }
        },
        onClickApprovement() {
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
        onClickCancle() {
            // Change status order
            this.getOrderDetailById({id: this.orderId}).then(() => {
                if (!isNullOrUndefined(this.orderDetail)) {
                    this.staffId = this.orderDetail.staff
                }
            })
            this.cancelDialog = true
        },
        refresh() {
            this.$emit('refresh')
        },
    }
}
</script>

<style>
.action-contract-button button {
  font-size: 1vw !important;
  color: #ffffff !important;
  text-transform: capitalize !important;
}

.action-contract-button button i {
  font-size: 1vw !important;
  margin-right: 3px;
}
</style>
 