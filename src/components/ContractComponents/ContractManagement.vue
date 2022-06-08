<template>
  <div class="content">
      <v-layout row>
        <v-flex md5 xs12>
          <h2>QUẢN LÝ HỢP ĐỒNG</h2>
          <v-layout justify-start>
            <p class="list-inline-item" :style="`color:${this.status.NEW.color}`">{{this.status.NEW.vi}}: {{this.new}}</p>
            <p class="list-inline-item" :style="`color:${this.status.RENEWAL.color}`">{{this.status.RENEWAL.vi}}: {{this.renewal}}</p>
            <p class="list-inline-item" :style="`color:${this.status.RETURN.color}`">{{this.status.RETURN.vi}}: {{this.return}}</p>
            <p class="list-inline-item" :style="`color:${this.status.CLOSING.color}`">{{this.status.CLOSING.vi}}: {{this.closing}}</p>
            <p class="list-inline-item" :style="`color:${this.status.LATE.color}`">{{this.status.LATE.vi}}: {{this.late}}</p>
          </v-layout>
        </v-flex>

        <v-flex md7 xs12>
          <v-layout
            align-center
            justify-end
          >
            <div class="has-search">
              <span class="fa fa-search form-control-feedback"></span>
              <input 
                style="width: 200px" 
                type="text" 
                class="form-control"
                placeholder="Nhập mã hợp đồng"
                v-model="mifoInput"
                @keyup.enter="submit"
              />
            </div>

            <v-btn class="shadow margin-left-right" icon color="#43425D" >
              <v-icon color="#FFFFFF">print</v-icon>
            </v-btn>
          
            <v-btn round v-bind:class="classReminder" @click="activeButton">
              <i class="fas fa-exclamation-triangle" style="margin-right:5px"></i>
              Nhắc Lãi
            </v-btn>
            <!-- <new-order/> -->
          </v-layout> 
        </v-flex>
      </v-layout>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import NewOrder from "@/components/OrderComponents/NewOrder.vue"
import status from './utils/status'

export default {
  name: "contract-management",
  components: {
    NewOrder,
  },
  data() {
    return {
      status: status,
      mifoInput: '',
      active: false
    }
  },
  computed: {
    ...mapGetters({
      contractReminder: 'contract/contractReminder',
    }),
    new() {
      return 0
    },
    renewal() {
      return 0
    },
    return() {
      return 0
    },
    closing() {
      return 0
    },
    late() {
      return 0
    },
    classReminder: function() {
      if ( this.contractReminder) {
        return 'reminder-on'
      } else {
        return 'reminder-off'
      }
      
    }
  },
  methods: {
    ...mapActions({
      findContractByMifosId: 'contract/findContractByMifosId',
      changeContractReminder: 'contract/changeContractReminder',
      getContractOverDue: 'contract/getContractOverDue',
      getContractList: 'contract/getContractList',
    }),
    submit() {
      //Refresh
      if (/^\s*$/.test(this.mifoInput)) {
        if (this.contractReminder) {
          this.getContractOverDue({page:1})
        } else {
          this.getContractList({page:1})
        }
      } else {
        this.findContractByMifosId({id: this.mifoInput})
      }
    },
    activeButton: function() {
      if (this.contractReminder) {
        this.changeContractReminder({remider:false})
      } else {
        this.changeContractReminder({remider:true})
      }
    }
  }
};
</script>

<style scoped>
.content {
  padding-bottom: 0px;
  padding-top: 0px;
  padding-right: 0px;
}

.list-inline-item {
  font-size: 16px;
  color: #dd1e26;
  padding-right: 10px;
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

.shadow {
  box-shadow: rgba(0, 0, 0, 0.8) 0px 0.5pt 1pt !important
}

.margin-left-right {
  margin-right: 4px;
  margin-left: 4px;
}

.reminder-off {
  background-color: #43425D !important;
  color: #ffffff !important;
  margin-right: 4px;
  margin-left: 4px;
}
.reminder-on {
  background-color: #ccb0b000 !important;
  color: #ff0913 !important;
  margin-right: 4px;
  margin-left: 4px;
}
</style>