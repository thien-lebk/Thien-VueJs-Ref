<template>
    <v-container fluid class="pa-0 ma-0">
        <call-management/>
        <call-table/>
    </v-container>
</template>

<script>
import CallManagement from "@/components/MarketingComponents/CallManagementComponents/CallManagement.vue"
import CallTable from "@/components/MarketingComponents/CallManagementComponents/CallTable.vue"

export default {
    name: "call-managements",
    components: {
        CallManagement,
        CallTable,
    },
}
</script>