<template>
  <div class="contract-document">
      <v-toolbar id="refresh" flat color="#0000" style="margin-bottom : 20px">
        <v-spacer></v-spacer>
        <v-layout align-center justify-end row>
          <v-btn round class="btn-print" @click="reprint">
            <i class="material-icons">print</i>
            In HĐ  
          </v-btn>
          <v-btn round class="btn-upload" @click="upload">
            <i class="material-icons">cloud_upload</i>
            Upload
          </v-btn>
      </v-layout>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="documentListResult"
      :loading="documentListRequest"
      item-key="id"
      hide-actions
      class="elevation-1"
    >

      <template v-slot:items="props">
        <tr>
          <td class="text-xs-center content display-document-edit">
            <span>{{ props.item.document }}</span>
          </td>
          <td class="text-xs-center content">{{ props.item.uploader }}</td>
          <td class="text-xs-center content ">{{ props.item.create_date }}</td>
          <!-- <td class="text-xs-center content">{{ props.item.last_update }}</td> -->
          <td class="text-xs-center content" >
            <v-btn class="btn-view" @click="viewDocument(props.item.link)">
              <i class="material-icons">visibility</i>
            </v-btn>
          </td>
          <td class="text-xs-center content">
            <v-btn 
             @click.stop="openDialog(props.item.id)"
              class="btn-download" 
               >
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
    <v-dialog
      v-model="dialog"
      :max-width='maxWidth'
      persistent
    >
      <v-card v-if="dialogFlag === 1">
        <v-card-title class="headline">Xác nhận Xóa giấy tờ này?</v-card-title>

        <v-card-actions>
          <v-btn
            color="green darken-1"
            round
            style=" margin-left: 50px !important"
            @click="deleteDocument()"
          >
            Yes
          </v-btn>
          <v-btn
            color="while darken-1"
            round
            style="margin-left: 100px !important"
            @click="dialog = false"
          >
            No
          </v-btn>

        </v-card-actions>
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
        <v-card-text>
          <v-layout>
            <v-flex sm4 >
              <v-subheader class="input-header">Loại giấy tờ</v-subheader>
            </v-flex>
            <v-flex sm6 class="select-fix-height"> 
              <v-select
                  v-model="selected"
                  class=""
                  :items="documentType"
                  :rules="[v => !!v || 'Yều cầu cần có']"
                  height="10"
                  style="min-height:10px !important;"
                  outline
              >
              </v-select>
            </v-flex>
            <v-flex sm2 >
              <input type="file" ref="file" style="display: none" v-on:change="selectFile($event)">
              <v-btn class="mx-2" fab dark small color="indigo" @click="$refs.file.click()">
                <i class="material-icons">cloud_upload</i>
              </v-btn>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex sm4 >
              <v-subheader class="input-header">Tên file</v-subheader>
            </v-flex>
            <v-flex sm8 >
              <v-subheader class="input-header">{{fileName}}</v-subheader>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions style="margin-left: 284px;">
          <v-btn
            color="while darken-1"
            round
            @click="back()"
          >
            Back
          </v-btn>
          <v-btn
            color="red darken-1"
            round
            @click="uploadFile"
            :disabled="confirmDisabled"
          >
            Confirm
          </v-btn>
          
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Loading from 'vue-loading-overlay';

export default {
  name: "contract-document-tab",
  components: {
    Loading
  },
  data() {
    return {
      headers: [
        {
          text: "Giấy tờ", value: "documnet", align: 'left', sortable: false, class: "header"
        },
        {
          text: "Người upload", value: "uploader", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Ngày tạo", value: "create_date", align: 'center', sortable: false, class: "header",
        },
        {
          text: "Xem", value: "view", align: 'center', sortable: false, class: "header"
        },
        {
          text: "Xóa", value: "delete", align: 'center', sortable: false, class: "header"
        }
      ],
      maxWidth: 400,
      confirmDisabled: true,
      isLoading: false,
      selected: 'Cavet',
      fileUpload: null,
      fileName: '',
      dialog: false,
      dialogFlag: 0,
      documentId: 0,
      documentType: ['CMND/HD', 'Cavet', 'Giấy ủy quyền', 'Hợp đồng nhà'],
    }
  },
  props: {
    contractId: String,
  },
  created() {
    this.getDocument();
  },
  computed: {
     ...mapGetters({
      documentListResult: 'contract/documentListResult',
      documentListRequest: 'contract/documentListRequest',
    }),
  },
  methods: {
     ...mapActions({
      getContractDocument: 'contract/getContractDocument',
      deleteContractDocument: 'contract/deleteContractDoucument',
      uploadContractDocument: 'contract/uploadContractDocument'
    }),
    getDocument(){
      this.getContractDocument({id: this.contractId})
    },
    viewDocument: function(link) {
       window.open(link, "_blank");  
    },
    deleteDocument: function() {
        this.deleteContractDocument({id: this.documentId});
        this.dialog = false
        setTimeout(() => {
           this.getContractDocument({id: this.contractId})
        },1000)
    },
    back: function() {
      this.dialog = false
      this.fileUpload = null
      this.confirmDisabled = true
      this.fileName =''
    },
    openDialog: function (id) {
        this.dialog = true
        this.dialogFlag = 1
        this.maxWidth = 400
        this.documentId = id
    },
    cancelcallback: function() {
        // Do nothing or some other stuffs
    },
    upload: function() {
      this.dialog = true
      this.dialogFlag = 3
      this.maxWidth = 500
    },
    selectFile: function(event) {
      let file = event.target.files[0];
      this.fileUpload = file
      if (file.size > 10*1024*1024){
        //dialog error
        alert('file quá lớn')
        return false;
      }
      this.fileName = file.name
      this.confirmDisabled= false
    },
    reprint() {
      this.$router.push({name: 'contract-reprint', params: {id: this.contractId}})
    },
    uploadFile: function() {
      // start loading
      // this.dialog = false
      this.isLoading = true;
      this.dialogFlag = 2
      this.maxWidth = 500
      var formData = new FormData();
      let documentType = this.selected
      formData.append('doc_type', documentType)
      formData.append('s3_path', this.fileUpload)
      formData.append('status', 1)
      formData.append('notes', null)
      formData.append('contract ', this.contractId)
      // formData.append('uploader', 1)
      this.uploadContractDocument(formData)
      //end loading
      setTimeout(() => {
        this.isLoading = false
        this.dialog = false
        this.getContractDocument({id: this.contractId})
      },5000)
      this.fileUpload = null
      this.confirmDisabled = true
      this.fileName =''
    },
    onCancel() {
      console.log('User cancelled the loader.')
    }
  },
}
</script>

<style scoped>
.contract-document >>> .v-toolbar{
  margin: 0px !important;
}

.display-document-edit {
  display: inline-flex !important;
  text-align: center;
  align-items: center;
  vertical-align: middle;
}

.display-document-edit span {
  margin-right: 7px;
  margin-left: 5px;
}

.btn-edit, .btn-view, .btn-download, .btn-delete {
  background-color: transparent !important;
  padding: 0px !important;
  margin: 0px !important;
  min-width: auto !important;
  border: none !important;
  box-shadow: none !important;
  font-size: 1vw !important;
}

.btn-upload i {
  margin-right: 3px;
}
.btn-upload {
  background-color: #2589BD !important;
  padding: 1px;
  font-size: 1vw !important;
  color: #ffffff !important;
  text-transform: capitalize !important;
}

.header {
  text-transform: uppercase;
  font-weight: bold !important;
  font-size: 1vw !important;
  background-color: #ebecec;
}
.headline {
  justify-content: center;
}
.btn-yes {
  margin-left: 50px !important;
  /* border-radius: 2px; */
}
.btn-no {
  margin-left: 100px !important;
  border-radius: 2px;
}
.btn-print {
  background-color: #43425D !important;
  color: #ffffff !important;
}
.select-fix-height >>> .vld-icon {
  text-align: center !important;
}
.select-fix-height >>> .v-text-field--box .v-input__slot, 
.select-fix-height >>> .v-text-field--outline .v-input__slot{
  min-height: 45px !important;
  border: 1px solid !important;
}
.select-fix-height >>> .v-select__selections {
  padding-top: 0px !important;
}
.select-fix-height >>> .v-input__append-inner{
  margin-top: 10px !important;
}
</style>
