<template>
  <v-menu
  v-model="menu"
    :close-on-content-click="false"
    :nudge-bottom="44"
    :nudge-left="400"
    :min-width="460"
  >
    <template v-slot:activator="{ on }">
      <div class="button-hard-size">
        <v-btn fab dark small class="mx-2 btn-filter" v-on="on">
          <img src="../../../../assets/icon-filter-24.png">
        </v-btn>
      </div>
    </template>

    <v-card class="panel">
      <v-list class="pa-0">
        <v-list-tile>
          <v-list-tile-title class="title">Ngày</v-list-tile-title>
          <v-list-tile-action>
            <v-layout row class="custom-date-picker">
              <date-picker sm1 v-model="createdFromInput" :rules="rules" :format="format"/>
              <v-flex sm1 />
              <date-picker sm1 v-model="createdToInput" :rules="rules" :format="format"/>
            </v-layout>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile class="padding-status">
          <v-list-tile-title class="title">Trạng thái</v-list-tile-title>
          <v-list-tile-action>
            <v-layout align-center justify-center row fill-height>
              <v-btn @click="selectStatus(item)" v-for="(item, key) in status" :key="key" round :color="statusSelectInput.includes(item) ? 'primary' : '#43425D4D'" small class="ma-1 button">{{item}}</v-btn>
            </v-layout>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
      <v-card-actions class="filter-card">
        <v-spacer></v-spacer>
        <v-btn
          class="filterBtn"
          color="#dd1e26"
          round
          small
          @click="filter"
        >
          Lọc
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
import { mapActions } from 'vuex'
import DatePicker from "@/components/commonComponent/DatePicker.vue"
import moment from 'moment'

export default {
  name: "call-campaign-filter",
  components: {
    DatePicker,
  },
  data() {
    return {
      menu: false,
      createdFromInput: '',
      createdToInput: '',
      statusSelectInput: [],
      status: ['Draft', 'Active', 'Pause', 'Complete'],
      format: "D/M/YYYY",
      rules: [
        value => {
          if (value !== null & value.trim() !== '') {
            const isValid = moment(value, this.format, true).isValid()
            if (isValid) return true
            return "Dữ liệu không hợp lệ"
          }
          return true
        },
      ]
    }
  },
  methods: {
    ...mapActions({
      getCallCampaignList: 'campaign/getCallCampaignList',
    }),
    selectStatus(status) {
      const index = this.statusSelectInput.findIndex(item => item === status)
      if (index >= 0) {
        this.statusSelectInput.splice(index,1)
      } else {
        this.statusSelectInput.push(status)
      }
    },
    filter() {
      const params = {}

      if (this.statusSelectInput.length > 0) {
        params.status = this.statusSelectInput
      }

      if (moment(this.createdFromInput, "DD-MM-YYYY").isValid() & moment(this.createdToInput, "DD-MM-YYYY").isValid()) {
        params.createdFrom = moment(this.createdFromInput, "DD-MM-YYYY").format("YYYY-MM-DD")
        params.createdTo = moment(this.createdToInput, "DD-MM-YYYY").format("YYYY-MM-DD")
      }
      this.getCallCampaignList(params)
    },
  }
}
</script>

<style scoped>
.button-hard-size .btn-filter{
  margin-right: 5px;
  font-size: 0.9vw !important;
  color: #DD1E26 !important;
  background-color: #ffffff !important;
}

.title {
    max-width: 130px;
    font-size: 18px !important;
    font-weight: normal;
}

.custom-date-picker >>> .v-input__slot{
    max-width: 150px !important;
}

.padding-status {
    padding-top: 13px;
}

.button {
    min-width: 69px;
    font-size: 9px;
    color: #43425D;
}

.filter-card {
    padding-top: 20px;
    padding-right: 0px;
}

.filterBtn {
  color: #fff !important;
}
</style>