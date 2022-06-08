<template>
    <div>
        <textarea :value="note" disabled rows="6" auto-grow style="width:100%;"></textarea>
        <v-text-field
            v-model="noteInput"
            v-on:keyup.enter="onEnterNote"
            label="Nhập ghi chú..."
        >
        </v-text-field>
        <confirm-dialog 
            textConfirm="Xác nhận cập nhật ghi chú?"
            :showDialog="showDialog" 
            @callBackFunction="addNote($event)"
        />
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

import ConfirmDialog from '@/components/commonComponent/ConfirmDialog.vue'
import moment from 'moment'

export default {
    name: "order-note",
    components: {
        ConfirmDialog,
    },
    props: {
        note: String,
        orderID: Number,
    },
    data() {
        return {
            noteInput: '',
            showDialog: false
        }
    },
    computed: {
        ...mapGetters({
            userLogin: 'auth/name',
            orderUpdatingErrorCode: 'order/orderUpdatingErrorCode',
        }),
    },
    methods: {
        ...mapActions({
            updateOrder: 'order/updateOrder',
        }),
        onEnterNote() {
            const textNote = this.noteInput.trim()
            if (textNote !== "") {
                this.showDialog=true
            }
        },
        addNote(flag) {
            this.showDialog = false;
            if (flag) {
                let newNote
                if (this.note !== null) {
                    newNote = this.note
                } else {
                    newNote = ""
                }
                    
                if (newNote !== "") {
                    newNote = newNote.concat("\r\n");
                }
                
                newNote = newNote.concat(this.userLogin)
                    .concat(" - ")
                    .concat(moment().format('DD-MM-YYYY hh:mm'))
                    .concat(" - ")
                    .concat(this.noteInput)

                this.updateOrder({
                    orderID: this.orderID, 
                    note: newNote,
                }).then(() => {
                    if (this.orderUpdatingErrorCode === 200) {
                        this.noteInput = ''
                    }
                })
            }
        },
    },
}
</script>