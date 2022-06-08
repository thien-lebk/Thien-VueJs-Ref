<template>
  <v-container fluid class="pa-0 ma-0">
    <customer-list-management/>
    <customer-list-table/>
  </v-container>
</template>

<script>
import CustomerListManagement from "@/components/MarketingComponents/CustomerListComponents/CustomerListManagement.vue"
import CustomerListTable from "@/components/MarketingComponents/CustomerListComponents/CustomerListTable.vue"

export default {
  name: "customer-list",
  components: {
    CustomerListManagement,
    CustomerListTable,
  },
}
</script>