<template>
    <v-btn
        fab dark small icon class="ma-0" 
        v-if="orderStep == 'Unclaimed'" 
        @click="this.unclaimedButtonHandle"
        color="rgba(76, 185, 99, 0.17)"
    >
        <v-icon color="rgba(76, 185, 99, 1)">reply</v-icon>
    </v-btn>
    <v-menu v-else top>
        <template v-slot:activator="{ on }">
            <v-btn 
                fab dark small icon class="ma-0"  
                v-on="on"
                v-if="orderStep == 'Pending'"
                color="rgba(215, 65, 167, 0.17)"
            >
                <v-icon  color="rgba(215, 65, 167, 1)">check_circle_outline</v-icon>
            </v-btn>
            <v-btn 
                fab dark small icon class="ma-0"  
                v-on="on"
                v-else-if="orderStep == 'Appointment'"
                color="rgba(205, 133, 63, 0.17)"
            >
                <v-icon  color="rgba(205, 133, 63, 1)">meeting_room</v-icon>
            </v-btn>
            <v-btn 
                fab dark small icon class="ma-0"  
                v-on="on"
                v-else-if="orderStep == 'Contact'"
                color="rgba(0, 0, 255, 0.17)"
            >
                <v-icon  color="rgba(0, 0, 255, 1)">perm_contact_calendar</v-icon>
            </v-btn>
            <v-btn 
                fab dark small icon class="ma-0"  
                v-on="on"
                v-else-if="orderStep == 'Quoted'"
                color="rgba(255, 140, 0, 0.17)"
            >
                <v-icon  color="rgba(255, 140, 0, 1)">sync</v-icon>
            </v-btn>
            <v-btn 
                fab dark small icon class="ma-0"  
                v-on="on"
                v-else-if="orderStep == 'Contract'"
                color="rgba(0, 0, 139, 0.17)"
            >
                <v-icon  color="rgba(0, 0, 139, 1)">assignment_turned_in</v-icon>
            </v-btn>
                
        </template>
        <v-list>
            <v-list-tile
            v-for="(item, index) in stages"
            :key="index"
            @click="StageChangingHandle(item.title)"
            >
                <v-list-tile-title class="ma-2">{{ item.title }}</v-list-tile-title>
            </v-list-tile>
        </v-list>
    </v-menu>
               
</template>

<script>

import {mapActions, mapGetters} from 'vuex'

import {getStage} from './utils/stage_functions'
import {translateStageFromViToEng, getStatus} from './utils/stages'
import haveAppointment from './utils/appointment'

export default {
    name: "action-button",
    props: {
        orderID: Number,
        step: String,
        staff: Number,
        stage: String,
    },
    computed: {
        ...mapGetters({
            orderUpdatingErrorCode: 'order/orderUpdatingErrorCode'
        }),
        orderStep() {
            return this.step
        },
        stageTotal() {
            return getStage(this.step)
        },
        //Get Vietnamese Stages
        stages() {

            const result = []
            
            if (this.stageTotal != undefined) {
                for (let stage of this.stageTotal) {
                    if (stage.vi != this.stage && !haveAppointment(stage.vi)) {
                        result.push({
                            title: stage.vi
                        })
                    }
                }
            }

            return result
        }
    },
    methods: {
        ...mapActions({
            claimOrder: 'order/claimOrder',
            changeStage: 'order/changeStage',
        }),
        unclaimedButtonHandle: function() {
            const payload = {
                orderID: this.orderID,
            }
            this.claimOrder(payload).then(() => {
                if (this.orderUpdatingErrorCode==200) {
                    this.$notify({
                        group: 'foo',
                        type: 'success',
                        title: "nhận Order thành công",
                        text: ''
                    });
                }
            })
        },
        StageChangingHandle: function(vietnameseStage) {
            const newStage = this.translateStageFromViToEng(vietnameseStage)
            const newStatus = this.getStatus(vietnameseStage)
            const payload = {
                orderID: this.orderID,
                staff: this.staff,
                stage: newStage,
                status: newStatus
            }
            this.changeStage(payload).then(() => {
                if (this.orderUpdatingErrorCode==200) {
                    this.$notify({
                        group: 'foo',
                        type: 'success',
                        title: "cập nhật trạng thái thành công",
                        text: ''
                    });
                }
            })
        },
        //Get English Stage to Update Order
        translateStageFromViToEng: function(vietnameseStage) {
            return translateStageFromViToEng(vietnameseStage)
        },
        getStatus: function(stage) {
            return getStatus(stage)
        }

    }
}
</script>

<style scoped>

</style>
 