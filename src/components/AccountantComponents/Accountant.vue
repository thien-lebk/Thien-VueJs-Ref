<template>
    <v-container fluid class="pa-0 ma-0">
        <accountant-management/>
        <accountant-table/>
    </v-container>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
// @ is an alias to /src
import AccountantManagement from "@/components/AccountantComponents/AccountantManagement.vue";
import AccountantTable from '@/components/AccountantComponents/AccountantTable.vue';

export default {
  name: "accountant",
  components: {
    AccountantManagement,
    AccountantTable,
  },
  methods: {
    ...mapActions({
    })
  },
}
</script>

<style scoped>

</style>