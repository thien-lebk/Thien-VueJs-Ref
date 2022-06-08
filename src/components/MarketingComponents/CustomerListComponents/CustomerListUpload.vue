<template>
  <v-dialog v-model="dialog" max-width="600px">
    
    <template v-slot:activator="{ on }">
      <v-btn round v-on="on" class="upload-btn" color="#2589BD">
        <v-icon :style="{'padding-right': '3px'}">cloud_upload</v-icon>
        <strong>Upload</strong>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="justify-center">
        <h2>PHÂN BỔ DANH SÁCH KHÁCH HÀNG</h2>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text>
        <v-form v-model="valid" ref="form">
          <table style="width:100%;">
            <tr>
              <td><v-subheader class="pa-0">Tên danh sách khách hàng</v-subheader></td>
              <td>
                <v-text-field
                  v-model.lazy="nameInput"
                  :rules="[
                    v => !!v || 'Yêu cầu cần có',
                    v => {
                      if(typeof v === 'string') {
                        return v.length < 255 || 'Không quá 255 ký tự'
                      }
                      return false
                    },
                  ]"
                  required
                >
                </v-text-field>
              </td>
            </tr>

            <tr>
              <td><v-subheader class="pa-0">Mô tả</v-subheader></td>
              <td>
                <v-textarea
                  v-model="descriptionInput"
                  rows="1"
                  auto-grow
                  :rules="[
                    v => !!v || 'Yều cầu cần có',
                    v => {
                      if(typeof v === 'string') {
                        return v.length < 255 || 'Không quá 255 ký tự'
                      }
                      return false
                    },
                  ]"
                  required
                >
                </v-textarea>
              </td>
            </tr>

            <tr>
              <td><v-subheader class="pa-0">Tên file</v-subheader></td>
              <td>
                <v-layout align-center row>
                  {{fileName}}
                  <v-layout align-center justify-end row>
                    <input type="file" ref="file" style="display: none" @change="selectFile" />
                    <v-btn class="mx-2" fab dark icon small color="indigo" @click="open">
                      <i class="material-icons">cloud_upload</i>
                    </v-btn>
                  </v-layout>
                </v-layout>
              </td>
            </tr>
          </table>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="cancel-btn"
          color="#fff"
          @click="cancelHanle"
          :disabled="customerListUploadingRequest"
          round
        >
          Cancel
        </v-btn>
        <v-btn
          class="confirm-btn"
          color="#dd1e26"
          :disabled="!valid || confirmDisabled"
          :loading="customerListUploadingRequest"
          @click="uploadFile"
          round
        >
          Confirm
        </v-btn>
      </v-card-actions>
    </v-card>
    </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: "customer-list-upload",
  data() {
    return {
      dialog: false,
      valid: false,
      nameInput: '',
      descriptionInput: '',
      file: null,
      fileName: "",
      confirmDisabled: true,
    }
  },
  computed: {
    ...mapGetters({
      customerListUploadingRequest: 'customerList/customerListUploadingRequest',
      customerListUploadingErrorCode: 'customerList/customerListUploadingErrorCode',
      customerListUploadingError: 'customerList/customerListUploadingError',
    }),
  },
  methods: {
    ...mapActions({
      uploadCustomerList: 'customerList/uploadCustomerList',
      getCustomerList: 'customerList/getCustomerList',
    }),
    open() {
      this.$refs.file.click()
    },
    selectFile(event) {
      const item = event.target.files[0]
      if (item.size > 10 * 1024 * 1024) {
        //dialog error
        alert("file quá lớn")
        this.file = null
        this.fileName = ""
        this.confirmDisabled = true
      } else {
        this.file = item
        this.fileName = item.name
        this.confirmDisabled = false
      }
    },
    reset() {
      //Reset Form
      this.nameInput = ''
      this.descriptionInput = ''
      this.file = null
      this.fileName = ''
      this.confirmDisabled = true
      this.$refs.form.resetValidation()
      this.$refs.file.value= null
    },
    cancelHanle() {
      this.reset()
      this.dialog = false
    },
    uploadFile() {
      const data = {
        customerListName: this.nameInput,
        description: this.descriptionInput,
        customerListFile: this.file,
      }
      this.uploadCustomerList(data)
    },
  },
  watch: {
    customerListUploadingErrorCode() {
      if (this.customerListUploadingErrorCode === 201) {
        this.$notify({
          group: 'foo',
          type: 'success',
          title: "Upload thành công",
          text: ''
        })
        this.dialog = false
        this.getCustomerList()
      } else if (this.customerListUploadingErrorCode !== 0) {
        this.$notify({
          group: 'foo',
          type: 'error',
          title: "Error: "+this.customerListUploadingErrorCode,
          text: this.customerListUploadingError
        })
      }
      this.reset()
    }
  }
}
</script>

<style scoped>
.upload-btn {
  color: #fff !important;
}

.cancel-btn {
  color: #dd1e26 !important;
}

.confirm-btn {
  color: #fff !important;
}
</style>