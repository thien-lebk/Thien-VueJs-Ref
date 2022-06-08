<template>
  <div class ="contract-transaction">
    <v-toolbar id="refresh" flat color="#0000" style="margin-bottom : 20px">
      <v-spacer></v-spacer>
      <v-layout align-center justify-end row>
        <v-btn round class="btn-upload" @click="upload">
          <i class="material-icons">add_box</i>
          Thêm
        </v-btn>
      </v-layout>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="bankAccoutListResult"
      :loading="bankAccoutListRequest"
      item-key="id"
      :expand="true"
      hide-actions
      class="elevation-1"
    >
      <template v-slot:items="props">
        <tr :key="props.index"> 
          <td class="text-xs-center content">{{ props.item.name }}</td>
          <td class="text-xs-center content">{{ props.item.bank }}</td>
          <td class="text-xs-center content ">{{ props.item.bank_accout }}</td>
          <td class="text-xs-center content">{{ props.item.branch }}</td>
          <td class="text-xs-center content">
            <v-btn class="btn-view" @click="edit(props.item.id, props.item.name, 
                    props.item.bank,  props.item.bank_accout, props.item.branch)">
              <i class="material-icons">edit</i>
            </v-btn>
          </td>
          <td class="text-xs-center content">
            <v-btn class="btn-view" @click="deleteBankAccout(props.item.id)">
              <i class="material-icons">delete</i>
            </v-btn>
          </td>
        </tr>
      </template>

      <template v-slot:no-data>
        <!-- Nothing -->
      </template>

     <!-- <template v-slot:expand="props">
          <call-table :expand="props.expanded" :orderID="props.item.orderID" />
      </template> -->

    </v-data-table>
    <v-dialog v-model="dialog" :max-width="maxWidth" persistent>
      <v-card v-if="dialogFlag === 1">
        <v-card-title class="headline">Xác nhận xóa tài khoản này?</v-card-title>
         <v-card-text style="margin-top: 2vh">
          <v-layout>
            <v-flex sm3></v-flex>
            <v-flex sm2>
              <v-btn
                color="green darken-1"
                round
                @click="deleteBank()">
                Yes
              </v-btn>
            </v-flex>
            <v-flex sm2></v-flex>
            <v-flex sm2>
              <v-btn color="while darken-1" round 
                @click="dialog = false">
                No
            </v-btn>
            </v-flex>
            
            <v-flex sm3></v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
      <v-card v-if="dialogFlag === 2">
        <v-card-title class="headline">Đang tải lên...</v-card-title>
        <v-card-text class="select-fix-height">
          <loading 
            :active.sync="isLoading" 
            :can-cancel="true" 
            :on-cancel="onCancel">
          </loading>
        </v-card-text>
      </v-card>
      <v-card v-if="dialogFlag === 3">
        <v-card-title class="headline">NHẬP THÔNG TIN TK NGÂN HÀNG</v-card-title>
        <v-card-text>
          <v-layout>
             <v-flex sm2>
              </v-flex>
              <v-flex sm2>
                  <v-subheader class="input-header">Họ và tên*</v-subheader>
              </v-flex>
              <v-flex sm7>
                  <v-text-field v-model.lazy="nameInput"   
                                :rules="[v => !!v || 'Yêu cầu cần có',]" 
                                 placeholder="Exp : Pham Le David" outlined>
                  </v-text-field>
            </v-flex>
            <v-flex sm1></v-flex>
          </v-layout>
           <v-layout>
              <v-flex sm2>
              </v-flex>
              <v-flex sm2>
                  <v-subheader class="input-header">Ngân Hàng</v-subheader>
              </v-flex>
              <v-flex sm7>
                  <v-text-field  v-model.lazy="bankName"  placeholder="Exp : Sacom Bank" outlined></v-text-field>
            </v-flex>
            <v-flex sm1></v-flex>
          </v-layout>
           <v-layout>
              <v-flex sm2>
              </v-flex>
              <v-flex sm2>
                  <v-subheader class="input-header">Số TK</v-subheader>
              </v-flex>
              <v-flex sm7>
                  <v-text-field v-model.lazy="bankNo" placeholder="Exp : 20192000695800" outlined></v-text-field>
            </v-flex>
            <v-flex sm1></v-flex>
          </v-layout>
           <v-layout>
              <v-flex sm2>
              </v-flex>
              <v-flex sm2>
                  <v-subheader class="input-header">Chi nhánh/ PGD</v-subheader>
              </v-flex>
              <v-flex sm7>
                  <v-text-field  v-model.lazy="bankBranch" placeholder="Exp : Q1" outlined></v-text-field>
            </v-flex>
             <v-flex sm1></v-flex>
          </v-layout>
          <v-layout>
              <v-flex sm8>
              </v-flex>
              <v-flex sm4>
                  <v-btn class="btnBack" color="#fff" round  @click="dialog = false">Back</v-btn>
                  <v-btn class="backConfirm" color="#fff" round @click="confirm">Confirm</v-btn>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay';
import { mapActions, mapGetters } from "vuex";

export default {
  name: "transaction-tab",
  components: {
    Loading
  },
  props: {
    customerId: String,
  },
  data() {
    return {
      headers: [
        {
          text: "Họ tên", value: "name", align: 'left', sortable: false, class: "header", width: 3
        },
        {
          text: "Ngân hàng", value: "bank", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Số tài khoản", value: "bank_accout", align: 'center', sortable: false, class: "header", width: 1
        },
        {
          text: "Chi nhánh/PGD", value: "branch", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Điều chỉnh", value: "adjusted", align: 'center', sortable: false, class: "header", colspan :"4"
        },
        {
          text: "Xóa", value: "delete", align: 'center', sortable: false, class: "header"
        },
      ],
      nameInput: '',
      bankBranch: '',
      bankNo: '',
      bankName: '',
      dialog: false,
      maxWidth: 800,
      dialogFlag: 0,
      isLoading: false,
      banksId: 0,
      modeEditOrCreate: true,
    }
  },
  created() {
    this.bankAccout();
  },
  computed: {
    ...mapGetters({
      bankAccoutListResult: "customer/bankAccoutListResult",
      bankAccoutListRequest: "customer/bankAccoutListRequest"
    })
  },
  methods: {
      ...mapActions({
      getBankAccout: "customer/getBankAccout",
      uploadBankAccout: "customer/uploadBankAccout",
      deleteBanksAcc: "customer/deleteBankAccout",
      updateBankAccout: "customer/updateBankAccout",
    }),
    // get data bank accout
    bankAccout() {
      this.getBankAccout({id : this.customerId})
    },
    // open modal upload
    upload: function() {
      this.maxWidth = 800
      this.dialog = true
      this.dialogFlag = 3
      this.nameInput = ''
      this.bankName = ''
      this.bankNo = ''
      this.bankBranch = ''
    },
    // open modal delete
    deleteBankAccout: function(id) {
      this.banksId = id
       this.dialog = true
       this.dialogFlag = 1
       this.maxWidth = 600
    },
    // call api delete 
    deleteBank: function() {
      this.deleteBanksAcc({id: this.banksId})
      setTimeout(() => {
      this.dialog = false
       this.getBankAccout({id : this.customerId})
      },2000)
    },
    onCancel() {
      console.log('User cancelled the loader.')
    },
    // call api upload
    confirm: function() {
      this.dialogFlag = 2
      this.isLoading = true;
      var bankInfo = {
          bank_account_name: this.nameInput,
          bank_name: this.bankName,
          bank_account_no: this.bankNo,
          bank_branch: this.bankBranch,
          primary: true,
          client: this.customerId
      };
      // create 
      if (this.modeEditOrCreate === true) {
        this.uploadBankAccout({data: bankInfo})
      } else {
        this.updateBankAccout({id : this.banksId, data: bankInfo})
      }
      // set time out
      setTimeout(() => {
        this.isLoading = false
        this.dialog = false
       this.getBankAccout({id : this.customerId})
      },3000)
    },
    // open modal edit
    edit: function(id, name, bank, bank_accout, branch) {
      this.nameInput = name
      this.bankName = bank
      this.bankNo = bank_accout
      this.bankBranch = branch
      this.banksId = id
      this.dialog = true
      this.dialogFlag = 3
      this.modeEditOrCreate = false
    },
  },
}
</script>

<style>
.contract-transaction {
  margin-top: 15px;
}
table.v-table tbody td:first-child, table.v-table tbody td:not(:first-child), 
table.v-table tbody th:first-child, table.v-table tbody th:not(:first-child), 
table.v-table thead td:first-child, table.v-table thead td:not(:first-child), 
table.v-table thead th:first-child, table.v-table thead th:not(:first-child) {
  padding: 0 5px;
}
td.content {
  font-size: 1vw !important;
  padding: 0px !important;
}
.header {
  text-transform: uppercase;
  font-weight: bold !important;
  font-size: 1vw !important;
  background-color: #EBECEC;
}
#refresh .v-toolbar__content {
  padding-right: 0px;
}
.input-header {
  font-size: 16px;
  font-weight: bold;
  float: left;
}
.backConfirm {
  float: right;
  background-color: #DC1C2E !important;
  color: #FFFFFF !important;
}
.btnBack {
  color: #DC1C2E !important;
  background-color: #FFFFFF !important;
}
</style>
