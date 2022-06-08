<template>
  <v-container fluid class="pa-0 ma-0">
    <h2>CUSTOMER LIST</h2>
    
    <v-container fluid class="pa-0 background">
      <v-layout align-center row style="border-style: groove;">

        <v-layout align-center class="name-padding">
          <div class="customer-list-name">{{customerListName}}</div>
          <v-btn flat icon small>
            <v-icon>edit</v-icon>
          </v-btn>
        </v-layout>

        <v-layout align-center justify-end row>
          <v-btn round dark color="#4F6D7A" class="discard-btn">Discard</v-btn>
          <v-btn round dark color="#2589BD" class="save-btn">Save</v-btn>
          <v-btn flat icon @click="backHandle">
            <v-icon>clear</v-icon>
          </v-btn>
        </v-layout>
      </v-layout>

      <v-layout row>
        <v-flex md3>
          <v-expansion-panel>
            <v-expansion-panel-content
              v-for="(values, name, index) in fields"
              :key="index"
            >
              <template v-slot:header>
                <center>{{name}}</center>
              </template>

              <v-card class="round-card">
                <v-btn
                  color="#CECFD0"
                  class="black--text"
                  round
                  v-for="(value, index) in values"
                  :key="index"
                >
                  {{value}}
                  <v-icon right dark color="#4D4F5C">highlight_off</v-icon>
                </v-btn>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-flex>

        <v-flex md9>
          <v-layout align-center row style="border-style:hidden groove groove groove;">
            <div style="font-size: 22px; color: #808495; opacity: 1;">Filter</div>
            <v-layout align-center justify-end row>
              <v-btn flat icon color="#808495">
                <v-icon>filter_list</v-icon>
              </v-btn>
              <v-btn flat icon color="#808495">
                <v-icon>perm_identity</v-icon>
              </v-btn>
            </v-layout>
          </v-layout>

          <v-data-table
            :headers="headers"
            :items="clients"
            :loading="customerListDetailRequest"
            item-key="mifosId"
            :rows-per-page-items=[20]
            class="elevation-1"
          >
            <template v-slot:items="props">
              <tr>
                <td class="text-xs-center content">{{ props.item.mifosId }}</td>
                <td class="text-xs-center content">{{ props.item.fullName }}</td>
                <td class="text-xs-center content">{{ translateGender(props.item.gender) }}</td>
                <td class="text-xs-center content">{{ props.item.status }}</td>
              </tr>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-container>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CustomerListManagement from "@/components/MarketingComponents/CustomerListComponents/CustomerListManagement.vue"
import CustomerListTable from "@/components/MarketingComponents/CustomerListComponents/CustomerListTable.vue"
import fields from "./utils/customer_list_fields"

export default {
  name: "customer-list-detail",
  components: {
    CustomerListManagement,
    CustomerListTable,
  },
  data() {
    return {
      fields: fields,
      headers: [
        {
          text: "Client ID", value: "mifosId", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Tên khách hàng", value: "fullName", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Giới tính", value: "gender", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Trạng thái", value: "status", align: 'center', sortable: false, class: "header"
        },
      ],
    }
  },
  mounted() {
    const id = this.$route.params.id
    this.getCustomerListDetailFromId({id})
  },
  computed: {
    ...mapGetters({
      customerListDetailRequest: 'customerList/customerListDetailRequest',
      customerListDetailResult: 'customerList/customerListDetailResult',
      customerListDetailErrorCode: 'customerList/customerListDetailErrorCode',
      customerListDetailError: 'customerList/customerListDetailError',
    }),
    customerListName() {
      try {
        return this.customerListDetailResult.customerListName
      } catch (error) {
        return ''
      }
    },
    clients() {
      try {
        return this.customerListDetailResult.clients
      } catch (error) {
        return []
      }
    },
  },
  methods: {
    ...mapActions({
      getCustomerListDetailFromId: 'customerList/getCustomerListDetailFromId',
    }),
    backHandle() {
      this.$router.back()
    },
    translateGender(gender) {
      try {
        if (gender.toLowerCase() === 'male') {
          return 'Nam'
        } else if (gender.toLowerCase() === 'female') {
          return 'Nữ'
        }
      } catch (error) {
        
      }
      return ''
    },
  },
  watch: {
    customerListDetailErrorCode() {
      if (this.customerListDetailErrorCode !== 0 & this.customerListDetailErrorCode !== 200) {
        this.$router.push({ name: 'customer-list' })
        this.$notify({
          group: 'foo',
          type: 'error',
          title: "Error: "+this.customerListDetailErrorCode,
          text: this.customerListDetailError
        })
      }
    },
  }
}
</script>

<style scoped>
.background {
  background-color: #fff;
  margin-top: 20px;
}
.name-padding {
  padding-left: 30px;
}
.customer-list-name {
  font-size: 24px;
}
.discard-btn {
  color: #fff !important;
}
.save-btn {
  color: #fff !important;
}
.round-card {
  border-radius:50px;
}
</style>