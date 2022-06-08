<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-bottom="44"
    :nudge-left="400"
    :max-width="460"
  >
    <template v-slot:activator="{ on }">
      <div class="button-hard-size">
        <v-btn fab dark small class="mx-2 btn-filter" v-on="on">
          <img src="../../../assets/icon-filter-24.png">
        </v-btn>
      </div>
    </template>

    <v-card class="panel">
      <v-list class="pa-0">
        <v-list-tile ripple>
          <v-list-tile-title class="title">Nhân viên</v-list-tile-title>
          <v-list-tile-action>
            <v-text-field
              v-model="agentInput"
              hint="Ví dụ: David"
              class="agent"
            >
            </v-text-field>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile class="padding-status expand">
          <v-list-tile-title class="title">Step</v-list-tile-title>
          <v-list-tile-action>
            <v-layout class="btn-group" align-center justify-center row fill-height>
              <v-btn v-for="(step, index) in stepItems" :key="index" @click="selectStep(step)" round :color="stepSelectInput.includes(step) ? 'primary' : '#43425D4D'" small class="ma-1 button">{{step}}</v-btn>
            </v-layout>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile class="expand" ripple>
          <v-list-tile-title class="title">Tài sản</v-list-tile-title>
          <v-list-tile-action>
            <v-combobox
              v-model="assetTypeInput"
              :items="SAssetListResult"
              item-value="name"
              item-text="description"
              multiple
              class="select"
            >
            </v-combobox>
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
import {mapActions, mapGetters} from 'vuex'
import { EventBus } from '../utils/event-bus'
import { steps, translateStepFromViToEng } from './utils/steps'

export default {
  name: "call-filter",
  data() {
    return {
      menu: false,
      agentInput: '',
      stepItems: Object.keys(steps).map(key => steps[key].vi),
      stepSelectInput: [],
      assetTypeInput: [],
    }
  },
  mounted() {
    this.getSAssetList()
    EventBus.$on('reset-filter-call', () => {
      this.agentInput = ''
      this.stepSelectInput = []
      this.assetTypeInput = []
    })
  },
  computed: {
    ...mapGetters({
      SAssetListResult: 'asset/SAssetListResult',
    }),
  },
  methods: {
    ...mapActions({
      getSAssetList: 'asset/getSAssetList',
    }),
    selectStep(step) {
      const index = this.stepSelectInput.findIndex(item => item === step)
      if (index >= 0) {
        this.stepSelectInput.splice(index,1)
      } else {
        this.stepSelectInput.push(step)
      }
    },
    filter() {
      const data = {}

      if (this.agentInput.trim() !== '') {
        data.orderStaff = this.agentInput
      }

      if (this.stepSelectInput.length !== 0) {
        data.orderStep = this.stepSelectInput.map(item => translateStepFromViToEng(item))
      }

      if (this.assetTypeInput.length !== 0) {
        data.assetType = this.assetTypeInput.map(item => item.name)
      }

      EventBus.$emit('filter-call', data)
    }
  },
  watch: {
  },
}
</script>

<style scoped>
.button-hard-size .btn-filter{
  margin-right: 5px;
  font-size: 0.9vw !important;
  color: #DD1E26 !important;
  background-color: #ffffff !important;
}

.panel {
  padding: 8px 2px;
}

.title {
  max-width: 120px;
  font-size: 18px !important;
  font-weight: normal;
}

.agent >>> .v-text-field__slot {
  width: 286px;
}

.padding-status {
  padding-top: 13px;
}

.expand {
  height:auto;
}

.expand >>> .v-list__tile {
  height:auto;
}

.button {
  widows: 56px;
  font-size: 10px;
}

.btn-group {
  display: inline-block;
}

.select >>> .v-select__slot {
  width: 286px !important;
}

.filter-card {
  padding-top: 20px;
  padding-right: 16px;
}

.filterBtn {
  color: #fff !important;
}
</style>