<template>
    <v-container fluid class="pa-0 ma-0">
        <contract-management/>
        <contract-reminder-table v-if="contractReminder"/>
        <contract-table v-else/>
    </v-container>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
// @ is an alias to /src
import ContractManagement from "@/components/ContractComponents/ContractManagement.vue"
import ContractTable from "@/components/ContractComponents/ContractTable.vue"
import ContractReminderTable from "@/components/ContractComponents/ContractReminderTable.vue"

export default {
  name: "contract",
  components: {
    ContractManagement,
    ContractTable,
    ContractReminderTable,
  },
  computed: {
    ...mapGetters({
      contractReminder: 'contract/contractReminder',
    }),
  }
}
</script>