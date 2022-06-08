<template>
  <v-card fluid class="content-customer-tabs">
    <tabs
      :tabs="tabs"
      :currentTab="currentTab"
      :wrapper-class="'default-tabs'"
      :tab-class="'default-tabs__item'"
      :tab-active-class="'default-tabs__item_active'"
      @onClick="handleTabsClick"
    />
    <div>
      <div v-show="currentTab === 'Summary'"><customer-summary-tab :customerId="customerId"/></div>
      <div v-show="currentTab === 'ContractNew'"><contract-new-tab :customerId="customerId"/></div>
      <div v-show="currentTab === 'ContractOld'"><contract-old-tab :customerId="customerId"/></div>
      <div v-show="currentTab === 'Documents'"><customer-document-tab :customerId="customerId"/></div>
      <div v-show="currentTab === 'BankAccout'"><bank-accout-tab :customerId="customerId"/></div>
      <div v-show="currentTab === 'Notes'"><customer-notes-tab :customerId="customerId"/></div>
    </div>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import BankAccout from './BankAccout.vue'
import Tabs from "vue-tabs-with-active-line";
import CustomerSummary from "./CustomerSummary.vue";
import CustomerDocument from './CustomerDocument.vue';
import CustomerNotes from './CustomerNotes.vue';
import ContractNew from './ContractNew.vue'
import ContractOld from './ContractOld.vue'

const TABS = [
  {
    title: "THÔNG TIN CHUNG",
    value: "Summary"
  },
  {
    title: "HỢP ĐỒNG MỞ",
    value: "ContractNew"
  },
  {
    title: "HỢP ĐỒNG CŨ",
    value: "ContractOld"
  },
  {
    title: "HỒ SƠ",
    value: "Documents"
  },
  {
    title: "TÀI KHOẢN NGÂN HÀNG",
    value: "BankAccout"
  },
  {
    title: "GHI CHÚ",
    value: "Notes"
  }
];

export default {
  name: "customer-tabs",
  components: {
    Tabs,
    'customer-summary-tab': CustomerSummary, 
    'customer-document-tab': CustomerDocument,
    'bank-accout-tab': BankAccout,
    'customer-notes-tab': CustomerNotes,
    'contract-new-tab': ContractNew,
    'contract-old-tab': ContractOld
  },
  props: {
    customerId: String,
  },
  data: () => ({
    tabs: TABS,
    currentTab: "ContractNew",
  }),
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
    max-width: 9vw;
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
.content-customer-tabs {
  padding: 0px;
  height: 100% !important;
}
</style>