<template>
  <v-card fluid class="content-contract-tabs">
    <tabs
      :tabs="tabs"
      :currentTab="currentTab"
      :wrapper-class="'default-tabs'"
      :tab-class="'default-tabs__item'"
      :tab-active-class="'default-tabs__item_active'"
      @onClick="handleTabsClick"
    />
    <div>
      <div v-show="currentTab === 'Summary'"><contract-summary-tab :contractId="contractId"/></div>
      <div v-show="currentTab === 'RepaymentsShedule'"><repayment-shedule-tab :contractId="contractId"/></div>
      <div v-show="currentTab === 'Transaction'"><transaction-tab :contractId="contractId"/></div>
      <div v-show="currentTab === 'Documents'"><contract-document-tab :contractId="contractId"/></div>
      <div v-show="currentTab === 'CollateralInfo'"><contract-collatea-info-tab :contractId="contractId"/></div>
      <div v-show="currentTab === 'Notes'"><contract-notes-tab :contractId="contractId"/></div>
    </div>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Transaction from './Transaction.vue'
import Tabs from "vue-tabs-with-active-line";
import RepaymentsShedule from "./RepaymentSchedule.vue"
import ContractSummary from "./ContractSummary.vue";
import ContractDocument from './ContractDocument.vue';
import ContractCollateralInfo from './ContractCollateralInfo.vue';
import ContractNotes from './ContractNotes.vue';

const TABS = [
  {
    title: "THÔNG TIN CHUNG",
    value: "Summary"
  },
  {
    title: "LỊCH TRẢ NỢ",
    value: "RepaymentsShedule"
  },
  {
    title: "LỊCH GIAO DỊCH",
    value: "Transaction"
  },
  {
    title: "HỒ SƠ",
    value: "Documents"
  },
  {
    title: "THÔNG TIN TÀI SẢN",
    value: "CollateralInfo"
  },
  {
    title: "GHI CHÚ",
    value: "Notes"
  }
];

export default {
  name: "contract-tabs",
  components: {
    Tabs,
    'repayment-shedule-tab': RepaymentsShedule,
    'contract-summary-tab': ContractSummary, 
    'transaction-tab': Transaction,
    'contract-document-tab': ContractDocument,
    'contract-collatea-info-tab': ContractCollateralInfo,
    'contract-notes-tab': ContractNotes
  },
  props: {
    contractId: String,
  },
  data: () => ({
    tabs: TABS,
    currentTab: "Notes",
  }),
  watch: {
    init: {
      handler: 'initFlagSchedule',
      immediate: true
    }
  },
  methods: {
    ...mapActions({
      changeSchedule: 'contract/changeSchedule'
    }),
    handleTabsClick(newTab) {
      this.currentTab = newTab;
      if (newTab === 'RepaymentsShedule'){
        this.changeSchedule({flagSchedule: true});
      } else {
        this.changeSchedule({flagSchedule: false});
      }
    }, 
    initFlagSchedule() {
      this.changeSchedule({flagSchedule: false});
    }
  }
};
</script>
<style lang="scss">
.default-tabs {
  position: relative;
  margin: 0 auto;
  background-color: #D9DADB;
  justify-content: center;
  text-align: center;
  padding-top: 10px;
  padding-bottom : 5px;
  height: 100px;
  &__item {
    display: inline-block;
    margin: 0 3px;
    padding: 1vw;
    max-width: 12vw;
    height: 100% !important;
    padding-bottom: 8px;
    text-align: center;
    align-items: center;
    vertical-align: middle;
    font-size: 1vw;
    letter-spacing: 0.8px;
    color: #4D4F5C;
    text-decoration: none;
    border: none;
    cursor: pointer;
    transition: all 0.25s;
    &_active {
      color: #DD2028;
      background-color: #CBCBCB;
      border-bottom: 2px solid #DD2028;
    }
    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }
  }
  &__item:focus {
    outline: none !important;
  } 
  &__active-line {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background-color: #DD2028;
    transition: transform 0.4s ease, width 0.4s ease;
  }
}
.content-contract-tabs {
  padding: 0px;
  height: 100% !important;
}
</style>