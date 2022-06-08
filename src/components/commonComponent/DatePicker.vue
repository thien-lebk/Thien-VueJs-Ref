<template>
    <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :disabled="disable"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        max-width="290px"
        min-width="290px"
    >
        <template v-slot:activator="{ on }">
            <v-text-field
                v-model.lazy="dateFormatted"
                append-icon="event"
                :label="label"
                :placeholder="placeholder"
                :disabled="disable"
                :rules="rules"
                :hint="hint"
                :persistent-hint="true"
                :outline="outline"
                :readonly="readonly"
                @click:append="menu=true"
            >
            </v-text-field>
        </template>
        <v-date-picker v-model="date" no-title @input="turnOff" :readonly="readonly"></v-date-picker>
    </v-menu>
</template>

<script>
import moment from 'moment'
import { setTimeout } from 'timers';

export default {
    name: "date-picker",
    props: {
        value: String,
        label: String,
        placeholder: {
            type: String,
            default: '',
        },
        disable: Boolean,
        readonly: Boolean,
        outline: Boolean,
        format: {
            type: String,
            default: "DD/MM/YYYY",
        },
        rules: {
            type: Array,
            default: function () {
                return [
                    value => {
                        if (value !== null) {
                            const isValid = moment(value, this.format, true).isValid()
                            if (isValid) return true
                            return "Dữ liệu không hợp lệ"
                        }
                        return "Dữ liệu không hợp lệ"
                    }
                ] 
            },
        },
        hint: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            menu: false,
            date: '',
        }
    },
    computed: {
        dateFormatted: {
            get () {return this.value},
            set (value) {this.$emit('input', value)}
        },
    },
    methods: {
        parseDate(date) {
            if (!date) return null
            return moment(this.date, this.format).format("YYYY-MM-DD")
        },
        turnOff() {
            this.dateFormatted = moment(this.date, "YYYY-MM-DD").format(this.format)
            //Bug from Vuetify, when turn off V-Menu then V-Dialog turn off too
            setTimeout(() => this.menu=false) 
        },
    },
}
</script>