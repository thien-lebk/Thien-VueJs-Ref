<template>
  <v-container fluid pa-0 ma-0>
    <order-management type="MyInbox"/>
    <my-inbox-table/>
  </v-container>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
// @ is an alias to /src
import OrderManagement from "@/components/OrderComponents/OrderManagement.vue";
import MyInboxTable from "@/components/OrderComponents/MyInboxComponents/MyInBoxTable.vue";

export default {
    name: "MyInbox",
    components: {
        OrderManagement,
        MyInboxTable,
    },
    methods: {
        ...mapActions({
            resetOrderList: 'order/resetOrderList',
        })
    },
    beforeDestroy() {
        this.resetOrderList()
    }
}
</script>

<style scoped>

</style>
