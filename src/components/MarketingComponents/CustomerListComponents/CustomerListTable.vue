<template>
   <div>
    <v-layout align-center justify-end row>
      <v-btn color="primary" :style="{'margin-right': '0px'}" @click="getCustomerList">
        Refresh
      </v-btn>
    </v-layout>
    <v-data-table
      :headers="headers"
      :loading="customerListRequest"
      :items="customerListResult"
      :expand="true"
      class="table elevation-1"
    >
      <template v-slot:items="props">
        <tr>
          <td class="text-xs-center content">{{ props.item.customerListName }}</td>
          <td class="text-xs-center content">
            <v-layout align-center justify-center row>
              <i class="material-icons" 
                :class="getClassStatus(props.item.status)">
                fiber_manual_record
              </i>
              {{ props.item.status }}
            </v-layout>
          </td>
          <td class="text-xs-center content">{{ props.item.createdDate }}</td>
          <td class="text-xs-center content">{{ props.item.latestCampaign }}</td>
          <td class="text-xs-center">
            <v-container class="pa-0">
              <v-layout class="btn-group" align-center justify-center row fill-height>
                <v-btn
                  fab dark small icon class="ma-0" 
                  color="rgba(255, 147, 79, 0.17)"
                  @click="editHandle(props.item.id)"
                >
                  <v-icon color="rgba(255, 147, 79, 1)">edit</v-icon>
                </v-btn>
                <v-btn
                  v-if="props.item.enableDelete"
                  fab dark small icon class="ma-0" 
                  color="rgba(234, 82, 111, 0.17)"
                  @click="deleteHandle(props.item.id)"
                >
                  <v-icon color="rgba(234, 82, 111, 1)">clear</v-icon>
                </v-btn>
              </v-layout>
            </v-container>
          </td>
        </tr>
      </template>
    </v-data-table>
    <confirm-dialog 
      :textConfirm="textConfirm"
      :showDialog="showDialog" 
      @callBackFunction="confirmDeleteCustomerList($event)"
    />
   </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ConfirmDialog from '@/components/commonComponent/ConfirmDialog.vue'
import { isNullOrUndefined } from 'util'

export default {
  name: 'customer-list-table',
  components: {
    ConfirmDialog,
  },
  data() {
    return {
      headers: [
        {
          text: "TÊN DANH SÁCH", value: "customerListName", align: 'center', sortable: false, class: "header"
        },
        {
          text: "STATUS", value: "status", align: 'center', sortable: false, class: "header"
        },
        {
          text: "NGÀY TẠO", value: "createdDate", align: 'center', sortable: false, class: "header"
        },
        {
          text: "CHIẾN DỊCH", value: "latestCampaign", align: 'center', sortable: false, class: "header"
        },
        {
          text: "THAO TÁC", value: "action", align: 'center', sortable: false, class: "header"
        },
      ],
      textConfirm: "",
      showDialog: false,
      customerListDeletingSelectedId: null,
    }
  },
  mounted() {
    this.getCustomerList()
  },
  computed: {
    ...mapGetters({
      customerListRequest: 'customerList/customerListRequest',
      customerListResult: 'customerList/customerListResult',
      customerListErrorCode: 'customerList/customerListErrorCode',
      customerListError: 'customerList/customerListError',
      customerListDeletingErrorCode: 'customerList/customerListDeletingErrorCode',
      customerListDeletingError: 'customerList/customerListDeletingError'
    })
  },
  methods: {
    ...mapActions({
      getCustomerList: 'customerList/getCustomerList',
      deleteCustomerList: 'customerList/deleteCustomerList',
    }),
    getClassStatus(status) {
      if (isNullOrUndefined(status)) {
        return '';
      } else if (status.toUpperCase()==='DRAFT') {
        return 'draft-status';
      } else if (status.toUpperCase()==='ACTIVE') {
        return 'active-status';
      } else if (status.toUpperCase()==='UNASSIGNED') {
        return 'unassigned-status';
      }
    },
    deleteHandle(id) {
      const customerList = this.customerListResult.find(item => item.id === id)
      this.textConfirm = `Xác nhận xóa: ${customerList.customerListName}`
      this.showDialog = true
      this.customerListDeletingSelectedId = id
    },
    editHandle(id) {
      this.$router.push({ name: 'customer-list-detail', params: { id } })
    },
    async confirmDeleteCustomerList(flag) {
      if (flag) {
        await this.deleteCustomerList({ id:this.customerListDeletingSelectedId })
        if (this.customerListDeletingErrorCode === 200) {
          this.$notify({
            group: 'foo',
            type: 'success',
            title: "Xóa thành công",
            text: ''
          })
          this.getCustomerList()
        } else {
          this.$notify({
            group: 'foo',
            type: 'error',
            title: "Error: "+this.customerListDeletingErrorCode,
            text: this.customerListDeletingError,
          })
        }
      }
      this.textConfirm = ""
      this.showDialog = false
      this.customerListDeletingSelectedId = null
    },
  },
}
</script>

<style scoped>
.expand {
  margin: 5px 0px;
  cursor: pointer;
}

.table >>> th + th { border-left:1px solid #dddddd; }
.table >>> td + td { border-left:1px solid #dddddd; }

.draft-status {
  color: #FF934F;
}

.active-status {
  color: #91CB3E;
}

.unassigned-status {
  color: #ABABAB;
}
</style>