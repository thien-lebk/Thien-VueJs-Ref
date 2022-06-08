<template>
<div>
    <div class="contract-notes">
        <textarea :value="listNotes" disabled rows="10" style="width:100%;height:100%;"></textarea>
    </div>
    <v-flex xs12 sm12 md12 class="border-text">
        <v-text-field
            v-on:keyup.enter="onEnterNote"
            v-model="textNote"
            label="Nhập ghi chú..."
            outline></v-text-field>
    </v-flex>
    <confirm-dialog 
        :textConfirm="textConfirm" 
        :showDialog="showDialog" 
        @callBackFunction="addNote($event)"/>
</div>
</template>

<script>
import ConfirmDialog from '../commonComponent/ConfirmDialog.vue'
import moment from 'moment';
import {mapActions, mapGetters} from 'vuex'
import { isNullOrUndefined } from 'util';

export default {
  name: "contract-notes-tab",
  components: { 
    ConfirmDialog
  },
  props: {
    contractId: String,
  },
  computed: {
    ...mapGetters({
      userLogin: 'auth/name',
      contractDetail: 'contract/contractDetail',
    }),
  },
  created() {
    this.getNote();
  },
  data() {
    return {
      textNote: "",
      textConfirm: "Xác nhận cập nhật ghi chú?",
      showDialog: false,
      listNotes: ""
    }
  },
  methods: {
    ...mapActions({
      getContractByContractId: 'contract/getContractByContractId',
      updateContract: "contract/updateContract",
    }),
    onEnterNote: function() {
      this.textNote = this.textNote.trim();
      if (this.textNote != "") {
        this.showDialog=true;
      }
    },
    addNote: async function(flag) {
      this.showDialog = false;
      if (flag) {
        if (this.textNote != "") {
          await this.getNote();
          if (this.listNotes !== "") {
            this.listNotes = this.listNotes.concat("\r\n");
          }
          this.listNotes = this.listNotes.concat(this.userLogin)
                          .concat(" - ")
                          .concat(this.formatDate(new Date()))
                          .concat(" - ")
                          .concat(this.textNote);
          this.updateContract({contractId : this.contractId, note: this.listNotes})
          this.textNote="";
        }
      }
    },
    getNote:async function(){
      await this.getContractByContractId({id: this.contractId});
      if (isNullOrUndefined(this.contractDetail) === false &&
          isNullOrUndefined(this.contractDetail.note) === false) {
        this.listNotes = this.contractDetail.note;
      }
    },
    formatDate: function(value) {
      if (value) {
        return new moment(String(value)).format('DD-MM-YYYY hh:mm');
      }
    }
  },
}
</script>

<style>
.contract-notes {
  margin-top: 15px;
  padding: 0 1vw 0 1vw;
  border: 1px solid #9D9D9D;
  border-radius: 2px;
  height: 50vh;
}

.contract-notes span {
  margin-bottom: 5px;
}

.border-text .v-input__slot {
  border: 1px solid #000000 !important;
}
.border-text .v-input__slot:hover, .border-text .v-input__slot::before {
  border: 1px solid #2D80D4 !important;
}
</style>
