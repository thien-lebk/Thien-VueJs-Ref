<template>
    <v-layout align-center justify-center row>
        <v-btn fab dark small icon class="ma-0" @click="onClickExtension" color="rgba(76, 185, 99, 0.17)">
            <v-icon class="material-icons" color="rgba(76, 185, 99, 1)">shopping_cart</v-icon>
        </v-btn>
        <call-dialog 
            flagCustomer="customer"
            :phoneNumber1="phoneNumber1"
            :phoneNumber2="phoneNumber2"
            :name="clientName"
        >
            <template slot-scope="scope">
                <v-btn fab dark small icon class="ma-0" color="rgba(234, 82, 111, 0.17)" @click="onClickCall(scope.open)">
                    <v-icon class="material-icons" color="rgba(234, 82, 111, 1)">call</v-icon>
                </v-btn>
            </template>
        </call-dialog>
    </v-layout>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import CallDialog from '../commonComponent/CallDialog.vue'
import { isNullOrUndefined } from 'util'

export default {
    name: "reminder-action-button",
    components: { 
        CallDialog,
    },
    props: {
        contractId: String,
        clientId: Number,
    },
    data() {
        return {
            clientName: '',
            phoneNumber1: '',
            phoneNumber2: '',
        }
    },
    computed: {
        ...mapGetters({
            clientDetailResult: 'client/clientDetailResult',
            clientDetailErrorCode: 'client/clientDetailErrorCode',
        }),
    },
    methods: {
        ...mapActions({
            getClientById: 'client/getClientById',
        }),
        onClickExtension() {
            if (isNullOrUndefined(this.contractId) === false) {
                this.$router.push({name: 'extension-contract', params: {id: this.contractId}})
            }
        },
        onClickCall(callback) {
            this.getClientById({id: this.clientId}).then(() => {
                if (this.clientDetailErrorCode === 200) {
                    this.clientName = this.clientDetailResult.fullName
                    this.phoneNumber1 = this.clientDetailResult.primaryPhone
                    this.phoneNumber2 = this.clientDetailResult.alternativePhone
                    callback()
                }
            })
        },
    }
}
</script>