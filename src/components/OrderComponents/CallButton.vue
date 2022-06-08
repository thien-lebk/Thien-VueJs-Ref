<template>
    <v-btn 
        fab small icon class="ma-0" 
        @click="openDialog" 
        :disabled="this.disable"
        color="rgba(1, 151, 246, 0.24)"
    >
      <v-icon color="rgba(1, 151, 246, 1)">call</v-icon>
    </v-btn>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    name: "call-button",
    props: {
        phone: String,
        name: String,
        orderID: Number,
    },
    computed: {
        ...mapGetters({
            enabled: 'call/enabled',
            calling: 'call/calling',
            ring: 'call/ring',
        }),
        disable() {
            if (this.calling || this.ring || !this.enabled) {
                return true
            } return false
        }
    },
    methods: {
        ...mapActions({
            call: 'call/call',
        }),
        openDialog() {
            //this.call({phone: '0972957262', name: this.name, orderID: this.orderID})
            this.call({phone: this.phone, name: this.name, orderId: this.orderID})
        }
    },
}
</script>

<style scoped>

</style>