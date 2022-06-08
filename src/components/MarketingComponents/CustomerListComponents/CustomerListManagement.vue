<template>
  <v-layout row>
    <v-flex md8 xs12>
      <h2>CUSTOMER LIST</h2>
    </v-flex>
    <v-flex md5 xs12>
      <v-layout align-center justify-end row>
        <customer-list-upload/>

        <v-btn round class="new-customer-list">
          <div class="back-white plus">
            <i class="fas fa-plus"></i>
          </div>
          <strong>Tạo Danh Sách</strong>
        </v-btn>

        <customer-list-filter/>

        <div class="has-search">
          <span class="fa fa-search form-control-feedback"></span>
          <input 
            style="width: 200px" 
            type="text" 
            class="form-control"
            placeholder="Nhập tên danh sách"
            v-model="customerListNameInput"
          />
        </div>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import CustomerListUpload from "@/components/MarketingComponents/CustomerListComponents/CustomerListUpload.vue"
import CustomerListFilter from "@/components/MarketingComponents/CustomerListComponents/CustomerListFilter.vue"

export default {
  name: "customer-list-management",
  components: {
    CustomerListUpload,
    CustomerListFilter,
  },
  data() {
    return {
      customerListNameInput: '',
    }
  }
}
</script>

<style scoped>
.new-customer-list {
  background-color: #dd1e26 !important;
  color: #fff !important;
  margin-right: 4px;
  margin-left: 4px;
}

.back-white {
  background-color: #fff;
  height: 45px;
  width: 45px;
  border-radius: 50%;
}

.back-white i {
  color: #dd1e26; 
  font-size: 25px;
  padding: 10px;
}

.plus {
  background-color: #fff;
  height: 25px;
  width: 25px;
  border-radius: 50%;
  margin-right: 5px;
}

.plus i {
  color: #dd1e26;
  font-size: 10px;
  padding: 8px 7px 8px 5px;
}

.has-search .form-control {
  padding-left: 2.375rem;
  padding-right: 0px;
  width: 300px;
}

.has-search .form-control-feedback {
  position: absolute ;
  z-index: 1;
  display: block;
  width: 2.375rem;
  height: 2.375rem;
  line-height: 2.8rem;
  text-align: center;
  pointer-events: none;
  color: #aaa;
  padding: 1px;
}

.form-control:hover {
  box-shadow: 0px 4px 5px 0px #898585;
}

.form-control {
  display: block;
  width: 100%;
  height: calc(1.5em + .75rem + 2px);
  padding: 1.375rem 1.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 2.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 2em;
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  box-shadow: 0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12);
}
</style>