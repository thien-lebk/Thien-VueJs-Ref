<template>
    <v-menu
        v-model="menu"
        :close-on-content-click="false"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        max-width="290px"
        min-width="290px"
    >
        <template v-slot:activator="{ on }">
            <v-text-field
                v-model.lazy="datetime"
                append-icon="event"
                :label="label"
                :disabled="disable"
                :rules="rules"
                :hint="hint"
                :persistent-hint="true"
                @click:append="menu=true"
            >
            </v-text-field>
        </template>
        <v-window v-model="step">
            <v-window-item :value="1">
                <v-date-picker v-model="date" no-title @input="step++"></v-date-picker>
            </v-window-item>
            <v-window-item :value="2">
                <v-time-picker v-if="this.menu" v-model="time" format="24hr" no-title @click:minute="turnOff"></v-time-picker>
            </v-window-item>
        </v-window>
    </v-menu>
</template>

<script>
import moment from 'moment'
import { setTimeout } from 'timers';

export default {
    name: "date-time-picker",
    props: {
        value: String,
        label: String,
        disable: {
            type: Boolean,
            default: false,
        },
        format: {
            type: String,
            default: "DD-MM-YYYY HH:mm",
        },
        rules: {
            type: Array,
            default: function () {
                if (this.disable === false) {
                    return [
                        value => {
                            if (value !== null) {
                                const isValid = moment(value, this.format, true).isValid()
                                if (isValid) return true
                                if (this.hint !== undefined) return this.hint
                            }
                            return "Dữ liệu không hợp lệ"
                        }
                    ]
                }
                return []
            },
        },
        hint: String,
    },
    data() {
        return {
            menu: false,
            step: 1,
            date: '',
            time: '',
        }
    },
    computed: {
        datetime: {
            get () {return this.value},
            set (value) {this.$emit('input', value)}
        },
    },
    methods: {
        turnOff() {
            this.datetime = moment(`${this.date} ${this.time}`, "YYYY-MM-DD HH:mm").format(this.format)
            this.step=1
            //Bug from Vuetify, when turn off V-Menu then V-Dialog turn off too
            setTimeout(() => this.menu=false) 
        },
    },
}
</script>