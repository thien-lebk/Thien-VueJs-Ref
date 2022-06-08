<template>
    <div class="center">
        <v-avatar
          :tile="false"
          :size="100"
          color="grey lighten-4"
          class="ma-3"
        >
          <img src="https://vuetifyjs.com/apple-touch-icon-180x180.png" alt="avatar">
        </v-avatar>

        <br/>
        
        <h3>{{customerName}}</h3>
        ({{customerPhone}})

        <div v-if="ring===true">
            <p style="display:inline-block;">Đang gọi</p>
            <img  style="vertical-align: middle;" src="../../assets/ring-animation.svg" alt="Loading"> 
        </div>
        <p v-else-if="step.includes('confirmed')">{{minutes}}:{{seconds}}</p>
        <br v-else/>
        
        <v-btn fab dark small :color="(calling | ring) ? '#dd1e26' : '#A9A9A9'" @click="terminate">
            <v-icon dark color="white">call_end</v-icon>
        </v-btn>

        <v-spacer class="margin"/>

        <p id='auto' v-if="customerOrderResult!== null  && customerOrderResult.type === 'detail'">
            {{customerOrderResult.order.orderID}} - {{customerOrderResult.order.assetDescription}}
        </p>
        <v-btn v-else @click="showDialog = true" round class="new-order" color="primary">
            <div class="back-white plus">
                <i class="fas fa-plus"></i>
            </div>
            New order
        </v-btn>
        <!-- only orderId is null, we will get result get order by phone -->
        <p v-if="customerOrderResult!== null  && customerOrderResult.type === 'list'" id='auto'>
            <span v-for="(order, index) in customerOrderResult.order" :key="index">
                <template>{{order.orderID}} - {{order.assetDescription}} <br/></template>
            </span>
        </p>

        <confirm-dialog 
            textConfirm="Xác nhận tạo order từ số điện thoại này?"
            :showDialog="showDialog" 
            @callBackFunction="create"
        />

        <router-link v-show="customerId !== null" :to="'/customers/'+customerId+'/customer-detail'"  class="client">
            Thông tin khách hàng
        </router-link>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ConfirmDialog from '@/components/commonComponent/ConfirmDialog.vue'
import moment from 'moment'

export default {
    name: "dialog-box",
    components: {
        ConfirmDialog,
    },
    data() {
        return {
            ringTimer: null,
            talkTimer: null,
            ringTime: 0,
            talkTime: 0,
            showDialog: false,
        }
    },
    computed: {
        ...mapGetters({
            customerPhone: 'call/customerPhone',
            customerName: 'call/customerName',
            customerId: 'call/customerId',
            customerOrderResult: 'call/customerOrderResult',
            calling: 'call/calling',
            ring: 'call/ring',
            step: 'call/step',
            error: 'call/error',
            orderId: 'call/orderId',
            requestType: 'call/requestType',
            callBox: 'call/callBox',
            orderCreatingResult: 'order/orderCreatingResult',
            orderCreatingErrorCode: 'order/orderCreatingErrorCode',
            orderCreatingError: 'order/orderCreatingError',
            orderDetail: 'order/orderDetail',
        }),
        minutes() {
            const minutes = Math.floor(this.talkTime / 60);
            return this.padTime(minutes);
        },
        seconds() {
            const seconds = this.talkTime - (this.minutes * 60);
            return this.padTime(seconds);
        },
    },
    methods: {
        ...mapActions({
            terminate: 'call/terminate',
            updateCall: 'call/updateCall',
            createOrder: 'order/createOrder',
        }),
        padTime: function(time) {
            return (time < 10 ? '0' : '') + time;
        },
        create(flag) {
            this.showDialog = false
            if (flag) {
                const data = {
                    phone: this.customerPhone,
                    firstName: this.customerName == 'Khách lạ' ? null : this.customerName,
                    expectedAmount: null,
                    validatorAmount: null,
                    assetTypeID: null,
                    assetTypeDescription: null,
                    source: 'Hotline',
                    note: null,
                }

                this.createOrder(data).then(() => {
                    //Create New Order Successfully, Close Dialog
                    if (this.orderCreatingErrorCode == 201) {
                        this.$notify({
                            group: 'foo',
                            type: 'success',
                            title: "Tạo Order thành công",
                            text: '',
                        })
                        this.getOrderDetailByIdAndOpenDialog({id: this.orderCreatingResult.id})
                    //Error
                    } else {
                        this.$notify({
                            group: 'foo',
                            type: 'error',
                            title: "Error: "+this.orderCreatingErrorCode,
                            text: this.orderCreatingError,
                        })
                    }
                })
            }
        },
    },
    watch: {
        calling() {
            //Begin calling
            if (this.calling) {
                this.talkTimer = setInterval(() => {this.talkTime++}, 1000)
            }
        },
        step() {
            switch(this.step) {
                case 'progress':
                    this.ringTimer = setInterval(() => {this.ringTime++}, 1000)
                    this.updateCall({callStatus: 'Ring'})
                    break
                case 'client confirmed': //Case only call out
                    clearInterval(this.ringTimer)
                    this.updateCall({
                        callStatus: 'In call', 
                        ringTime: this.ringTime,
                    })
                    this.ringTime = 0
                    break
                case 'ended':
                    clearInterval(this.talkTimer)
                    this.updateCall({
                        callStatus: this.error, 
                        talkTime: this.talkTime,
                        endTime: moment().format("YYYY-MM-DD HH:mm:ss"),
                    })
                    this.talkTime = 0
                    break
                case 'outcoming failed':
                    clearInterval(this.ringTimer)
                    this.updateCall({
                        callStatus: this.error, 
                        ringTime: this.ringTime,
                        endTime: moment().format("YYYY-MM-DD HH:mm:ss"),
                    })
                    this.ringTime = 0
                    break
            }
        },
    }
}
</script>

<style scoped>
.center {
    text-align: center;
    height: 100%;
}
.margin {
    margin-top: 15px;
}
.new-order {
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
  color: #1976d2; 
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
  color: #1976d2;
  font-size: 10px;
  padding: 8px 7px 8px 5px;
}
.client {
    margin-top: 15px;
    cursor: pointer;
    color: blue;
    font-size: 16px;
}

p#auto {
    overflow: scroll;
    height: 25px;
    overflow-x: hidden !important;
    border: 1px solid gold;
}
</style>
