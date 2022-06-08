<template>
  <v-layout justify-center class="customer-edit-content">
    <div class="button">
      <v-btn class="btn-edit" @click="dialog = true">
        <i class="material-icons">border_color</i>
      </v-btn>
    </div>

    <v-dialog
      v-model="dialog"
      max-width="850px"
      class="dialog-content"
      persistent
    >
      <v-card class="customer-edit-content-dialog">
        <v-layout>
            <v-flex xs6>
              <v-card-title class="headline">Cập Nhật Thông Tin Khách Hàng</v-card-title>
              <table style="width:100%;">
                <tbody>
                  <tr>
                    <td>
                      <v-text-field
                        v-model="clientId"
                        outline
                        disabled
                        label="Mã khách hàng"
                        style="width:100%;">
                      </v-text-field>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <v-text-field
                        v-model="firstNameInput"
                        outline
                        label="Họ"
                        style="width:100%;"
                        rows="1"
                        auto-grow
                        :rules="[v => !!v || 'Yều cầu cần có']">
                      </v-text-field>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <v-text-field
                        v-model="lastNameInput"
                        outline
                        label="Tên"
                        style="width:100%;"
                        rows="1"
                        auto-grow
                        :rules="[v => !!v || 'Yều cầu cần có']">
                      </v-text-field>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <v-text-field
                        v-model="branchName"
                        outline
                        label="Chi nhánh"
                        disabled
                        style="width:100%;">
                      </v-text-field>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <v-text-field
                        v-model="createdName"
                        outline
                        disabled
                        label="Người tạo"
                        style="width:100%;">
                      </v-text-field>
                    </td>
                  </tr>
                </tbody>
              </table>
            </v-flex>
            <v-flex xs6>
              <v-card-title class="headline">Cập Nhật Thông Tin Liên Hệ</v-card-title>
              <table style="width:100%;">
                <tbody>
                  <tr>
                    <td style="width:50%;">
                      <v-text-field
                          v-model="phone1Input"
                          outline
                          label="Số Điện Thoại 1"
                          style="width:100%;"
                          :rules="[v => !!v || 'Yều cầu cần có']">
                      </v-text-field>
                    </td>
                    <td style="width:50%;">
                      <v-text-field
                          v-model="phone2Input"
                          outline
                          label="Số Điện Thoại 2"
                          style="width:100%;">
                      </v-text-field>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <v-text-field
                          v-model="addressInput"
                          outline
                          label="Địa Chỉ Nhà"
                          style="width:100%;">
                      </v-text-field>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <v-select
                          v-model="cityInput"
                          :items="cityItems"
                          label="Thành phố"
                          outline>
                      </v-select>
                    </td>
                    <td>
                      <v-select
                          v-model="districtInput"
                          :items="districtItems"
                          label="Quận"
                          outline>
                      </v-select>
                    </td>
                  </tr>
                  <tr>
                    <td style="width:50%;">
                      <v-text-field
                          v-model="nationalIdInput"
                          outline
                          label="CMND/HC"
                          style="width:100%;">
                      </v-text-field>
                    </td>
                    <td style="width:50%;">
                      <date-picker 
                          v-model="created"
                          outline
                          disable
                          label="Ngày tạo"
                          placeholder="dd/mm/yyyy"/>
                    </td>
                  </tr>
                  <tr>
                    <td style="width:50%;">
                      <date-picker 
                          v-model="dobInput"
                          outline
                          label="Ngày sinh"
                          :format="format"
                          :placeholder="format"/>
                    </td>
                    <td style="width:50%;">
                      <v-select
                          v-model="genderInput"
                          item-value="value"
                          item-text="text"
                          :items="genderItems"
                          label="Giới tính"
                          outline>
                      </v-select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </v-flex>
        </v-layout>
        <v-layout align-center justify-space-around row class="footer">
            <v-btn round class="btn-cancel" @click.stop="dialog = false" :disabled="clientUpdatingRequest">
              Cancel
            </v-btn>
            <v-btn round class="btn-ok" @click="onClickUpdateCustomer" :loading="clientUpdatingRequest">
              Ok
            </v-btn>
        </v-layout>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import DatePicker from "@/components/commonComponent/DatePicker.vue"
import { isNullOrUndefined } from 'util';
import provinceItems from '../../config/provinces'
import moment from 'moment'
export default {
  name: "customer-info-edit-dialog",
  components: {
    DatePicker,
  },
  props: {
    customerIdS: String,
  },
  data () {
    return {
      clientId: '',
      firstNameInput: '',
      lastNameInput: '',
      phone1Input: '',
      phone2Input: '',
      addressInput: '',
      districtInput: '',
      cityInput: '',
      dobInput: '',
      genderInput: '',
      nationalIdInput: '',
      createdName: '',
      branchName: '',
      created: '',
      format: 'D/M/YYYY',
      dialog: false,
      cityItems: Object.keys(provinceItems),
      genderItems: [
        {
          text: "Nam",
          value: "male",
        },
        {
          text: "Nữ",
          value: "female",
        }
      ],
    }
  },
  computed: {
    ...mapGetters({
      customerDetail: 'customer/customerDetail',
      customerDetailErrorCode: 'customer/customerDetailErrorCode',
      clientUpdatingRequest: 'client/clientUpdatingRequest',
    }),
    districtItems() {
      try {
        return provinceItems[this.cityInput]
      } catch (error) {
        return []
      }
    }
  },
  methods: {
    ...mapActions({
      getCustomerByCustomerId: 'customer/getCustomerByCustomerId',
      updateClient: 'client/updateClient',
    }),
    onClickUpdateCustomer:async function() {
      const data = {
          clientID:  this.customerIdS,
          firstName: this.firstNameInput,
          lastName: this.lastNameInput,
          primaryPhone: this.phone1Input,
          alternativePhone: this.phone2Input,
          address: this.addressInput,
          district: this.districtInput,
          city: this.cityInput,
          DOB: moment(this.dobInput, this.format).format("YYYY-MM-DD"),
          nationalId: this.nationalIdInput,
          gender: this.genderInput,
      }
      await this.updateClient(data);
      this.dialog = false;
      this.$emit('callBackFunction', this.customerIdS);
    },
  },
  watch: {
    customerDetailErrorCode() {
      if (this.customerDetailErrorCode === 200) {
        this.clientId = this.customerDetail.customerId
        this.firstNameInput = this.customerDetail.firstName
        this.lastNameInput = this.customerDetail.lastName
        this.createdName = this.customerDetail.createdName
        this.phone1Input = this.customerDetail.primaryPhone
        this.phone2Input = this.customerDetail.alternativePhone
        this.addressInput = this.customerDetail.address
        this.districtInput = this.customerDetail.district
        this.cityInput = this.customerDetail.city
        this.dobInput = this.customerDetail.dateOfBirth
        this.nationalIdInput = this.customerDetail.nationalId
        this.branchName = this.customerDetail.branchName
        this.created = this.customerDetail.created
        this.genderInput = this.customerDetail.gender
      } 
    }
  }
}
</script>
<style>
.customer-edit-content .button button {
  background-color: transparent !important;
  padding: 0px !important;
  margin: 0px !important;
  min-width: auto !important;
  border: none !important;
  box-shadow: none !important;
}

.customer-edit-content .button .btn-edit {
  color: #000000 !important;
  height: auto !important;
}

.customer-edit-content .button .btn-edit i {
  font-size: 16px;
}

.customer-edit-content-dialog {
  padding: 10px;
}

.customer-edit-content-dialog .headline {
  font-size: 20px !important;
  padding: 0px 0px 15px 0px !important;
}

.customer-edit-content-dialog .footer {
  padding: 5px;
  text-align: center;
  height: auto !important;
}

.customer-edit-content-dialog .footer .btn-cancel{
  background-color: #F0F0F0!important;
  color: #DD1E26;
}

.customer-edit-content-dialog .footer .btn-ok{
  background-color: #DD1E26 !important;
  color: #F0F0F0;
}

.customer-edit-content .class-border {
  border: 1px solid #BFBFBF;
  margin: 20px;
}

.field-none-details .v-text-field__details {
  display: none !important;
}
</style>