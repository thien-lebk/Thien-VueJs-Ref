<template>
  <v-container fluid class="content">
      <v-layout align-start justify-start row>
        <v-flex xs6>
          <h2>KẾ TOÁN & QUỸ</h2>
          <div class="statistical">
            <p>Cần duyệt: <span style="color: red;">{{totalRecordNeedApprove}}</span></p>
            <p>Đã duyệt: <span style="color: red;">{{totalRecordApproved}}</span></p>
            <p>Từ chối: <span style="color: red;">{{totalRecordReject}}</span></p>
          </div>
        </v-flex>
        <v-flex xs6>
          <v-layout align-start justify-end row class="accountant-top">
            <accountant-filter />
            <div class="has-search">
              <span class="fa fa-search form-control-feedback"></span>
              <input 
                style="width: 250px" 
                type="text" 
                class="form-control"
                placeholder="Nhập Mã HĐ"
                v-model="txtFilter"
                @keyup.enter="submit"
              />
            </div>

          </v-layout>
        </v-flex>
      </v-layout>
  </v-container>
</template>
<script>
import AccountantFilter from "@/components/AccountantComponents/AccountantFilter.vue"

export default {
  name: "accountant-management",
  components: {
    AccountantFilter,
  },
  data: () => ({
    totalRecordNeedApprove: 10,
    totalRecordApproved: 2,
    totalRecordReject: 1,
    txtFilter: "",
  }),
}
</script>
<style scoped>
.content {
  margin: 0px !important;
  padding: 0px !important;
}

.content .accountant-top {
  align-items: center;
  vertical-align: middle;
}

.has-search .form-control {
  padding-left: 2.375rem;
  padding-right: 0px;
  width: 300px;
}

.form-control:hover {
  box-shadow: 0px 4px 5px 0px #898585;
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
}

.content .statistical {
  display: flex;
}

.content .statistical p {
  margin-right: 10px;
}
</style>