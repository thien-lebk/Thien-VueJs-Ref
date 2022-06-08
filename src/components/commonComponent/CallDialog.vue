<template>
  <v-layout justify-center class="call-content">
    <slot name="default" :open="() => dialog = true">
    </slot>

    <v-dialog
      v-model="dialog"
      max-width="300"
      class="dialog-content"
    >
      <v-card>
        <v-card-title class="headline">Chọn số điện thoại để gọi cho khách hàng</v-card-title>

        <v-layout align-center justify-center column class="call-info">
          <v-layout align-center justify-center row>
            <div>
              <span>Số điện thoại 1:</span><br>
              <strong>{{phoneNumber1}}</strong>
            </div>
            <div class="button">
              <v-btn fab dark small class="mx-1 btn-call" @click="callHandle(1)" :disabled="disableCall">
                <i class="material-icons">call</i>
              </v-btn>
            </div>
          </v-layout>
          <div class="class-border" style="max-width: 200px;"></div>
          <v-layout align-center justify-center row v-if="disablePhone">
            <div>
              <span>Số điện thoại 2:</span><br>
              <strong>{{phoneNumber2}}</strong>
            </div>
            <div class="button">
              <v-btn fab dark small class="mx-1 btn-call" @click="callHandle(2)" :disabled="disableCall">
                <i class="material-icons">call</i>
              </v-btn>
            </div>
          </v-layout>
        </v-layout>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import { isNullOrUndefined } from 'util'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: "call-dialog",
  components: {
  },
  data () {
    return {
      dialog: false,
      classCSS:'btn-call-price-adjustment',
    }
  },
  props: {
    flagCustomer: String,
    phoneNumber1: String,
    phoneNumber2: String,
    name: String,
  },
  computed: {
    ...mapGetters({
        enabled: 'call/enabled',
        calling: 'call/calling',
        ring: 'call/ring'
    }),
    disableCall() {
      if (this.calling || this.ring || !this.enabled) {
          return true
      } return false
    },
    disablePhone(){
      if (isNullOrUndefined(this.phoneNumber2) === true ||
          String(this.phoneNumber2).trim() === "") {
            return false;
      }
      return true;
    }
  },
  methods : {
    ...mapActions({
      call: 'call/call',
    }),
    callHandle(type) {
      if (type === 1) {
        this.call({phone: this.phoneNumber1, name: this.name, orderID: null})
      } else {
        this.call({phone: this.phoneNumber2, name: this.name, orderID: null})
      }
      this.dialog = false
    }
  }
}
</script>
<style>
.button button {
  margin-right: 5px;
  font-size: 0.7vw !important;
}

.button .btn-call {
  background-color: #C2E6FD!important;
  color: #0197F6!important;
}

.button .btn-call-price-adjustment {
  background-color: #C2E6FD!important;
  color: #0197F6!important;
}

.button .btn-call-customer {
  background-color: #FFFFFF!important;
  color: #DD1E26!important;
}

.call-content {
  max-width: 65px!important;
  font-size: 1vw;
}

.call-content .dialog-content {
  margin: 0px!important;
}

.headline {
  text-align: center;
}
.call-info {
  padding-bottom: 20px;
}
.call-info span {
  color: #A5A5A7;
}
.call-content .class-border {
  border: 1px solid #BFBFBF;
  margin: 10px 20px;
}
</style>