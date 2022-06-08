<template>
    <v-data-table
        :headers="headers"
        :items="result"
        :rows-per-page-items=[10]
        class="call-table"
    >
        <template v-slot:items="props">
            <td class="text-xs-center">{{ props.item.agentName }}</td>
            <td class="text-xs-center">{{ props.item.startTime }}</td>
            <td class="text-xs-center">{{ props.item.ringTime }}</td>
            <td class="text-xs-center">{{ props.item.talkTime }}</td>
            <td class="text-xs-center">{{ props.item.callStatus }}</td>
        </template>
    </v-data-table>
</template>

<script>
import {CallService, CallError} from '../../services/call.service'
import {mapGetters} from 'vuex'

export default {
    name: "table-lib",
    props: {
        expand: Boolean,
        orderID: Number
    },
    mounted(){
        this.updateTable()
    },
    data() {
        return {
            headers: [
                {
                    text: "Nhân viên", value: "agentName", align: 'center', sortable: false, class: "header"
                },
                {
                    text: "Thời gian", value: "startTime", align: 'center', sortable: false, class: "header"
                },
                {
                    text: "Thời gian chờ", value: "ringTime", align: 'center', sortable: false, class: "header"
                },
                {
                    text: "Thời lượng cuộc gọi", value: "talkTime", align: 'center', sortable: false, class: "header"
                },
                {
                    text: "Trạng thái", value: "callStatus", align: 'center', sortable: false, class: "header"
                },
            ],
            result: [],
        }
    },
    computed: {
        ...mapGetters({
            orderStoreID: 'call/orderId',
            callUpdating: 'call/callUpdating'
        })
    },
    methods: {
        updateTable() {
            CallService.getCallByOrder(this.orderID).then(result => this.result = result)
        }
    },
    watch: {
        //callUpdating change true to false, updated call tablle
        callUpdating() {
            if (this.callUpdating === false && this.orderID === this.orderStoreID) {
                this.updateTable()
            }
        }
    }
}
</script>

<style scoped>
.call-table {
    padding: 0px 30px;
    font-size: 17px
}
.header {
  font-weight: bold !important;
  font-size: 14px !important;
}
</style>