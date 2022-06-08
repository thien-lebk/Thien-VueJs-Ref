<template>
  <div class="content">
      <v-layout row>
        <v-flex md6 xs12>
          <h2>{{this.name}}</h2>
          <v-layout justify-start>
            <p v-if="this.unclaimed != null" class="list-inline-item" :style="`color:${this.steps.UNCLAIMED.color}`">{{this.steps.UNCLAIMED.vi}}: {{this.unclaimed}}</p>
            <p class="list-inline-item" :style="`color:${this.steps.PENDING.color}`">{{this.steps.PENDING.vi}}: {{this.pending}}</p>
            <p class="list-inline-item" :style="`color:${this.steps.CONTACT.color}`">{{this.steps.CONTACT.vi}}: {{this.contact}}</p>
            <p class="list-inline-item" :style="`color:${this.steps.QUOTED.color}`">{{this.steps.QUOTED.vi}}: {{this.quoted}}</p>
            <p class="list-inline-item" :style="`color:${this.steps.APPOINTMENT.color}`">{{this.steps.APPOINTMENT.vi}}: {{this.appointment}}</p>
          </v-layout>
        </v-flex>

        <v-flex md6 xs12>
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
                  placeholder="Nhập số điện thoại"
                  v-model="phoneInput"
                  @keyup.enter="submit"
                />
              </div>
        
              <new-order/>

            </v-layout> 
        </v-flex>
      </v-layout>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

import NewOrder from "@/components/OrderComponents/NewOrder.vue"

import steps from './utils/steps'

export default {
  name: "order-management",
  components: {
    NewOrder,
  },
  props: {
    type: String,
  },
  data() {
    return {
      steps: steps,
      phoneInput: ''
    }
  },
  computed: {
    name() {
      switch(this.type) {
        case 'Order':
          return 'Order Management'
        case 'MyInbox':
          return 'My Inbox'
      }
    },
    ...mapGetters({
      orderCountResult: 'order/orderCountResult'
    }),
    unclaimed() {
      try {
        if (Object.prototype.hasOwnProperty.call(this.orderCountResult,'unclaimed')) {
          return this.orderCountResult['unclaimed']
        }
      } catch (error) {
        
      }
      return null
    },
    pending() {
      if (this.orderCountResult != null) {
        return this.orderCountResult['pending']
      }
      return null
    },
    contact() {
      if (this.orderCountResult != null) {
        return this.orderCountResult['contact']
      }
      return null
    },
    quoted() {
      if (this.orderCountResult != null) {
        return this.orderCountResult['quoted']
      }
      return null
    },
    appointment() {
      if (this.orderCountResult != null) {
        return this.orderCountResult['appointment']
      }
      return null
    }
  },
  methods: {
    ...mapActions({
      findOrderByPhoneForTable: 'order/findOrderByPhoneForTable'
    }),
    submit: function() {
      this.findOrderByPhoneForTable({phone: this.phoneInput})
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
  padding-right: 10px;
  color: #dd1e26;
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

</style>