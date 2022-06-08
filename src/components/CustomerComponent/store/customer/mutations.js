import Vue from 'vue'

import {
    CUSTOMER_REPAYMENT_SCHEDULE,
    CUSTOMER_LIST_REQUEST,
    CUSTOMER_LIST_SUCCESS,
    CUSTOMER_LIST_ERROR,
    CUSTOMER_DETAIL_SUCCESS,
    CUSTOMER_DETAIL_ERROR,
    CUSTOMER_DETAIL_REQUEST,
    CUSTOMER_FINDING_ERROR,
    CUSTOMER_FINDING_SUCCESS,
    CUSTOMER_FINDING_REQUEST,
    CUSTOMER_DOCUMENT_REQUEST,
    CUSTOMER_DOCUMENT_SUCCESS,
    CUSTOMER_SCHEDULE_REQUEST,
    CUSTOMER_SCHEDULE_LIST_SUCCESS,
    CUSTOMER_TRANSACTION_REQUEST,
    CUSTOMER_TRANSACTION_LIST_SUCCESS,
    CUSTOMER_SCHEDULE_TOTAL,
    CUSTOMER_SUMMARY_RESULT,
    CUSTOMER_SUMMARY_REQUEST,
    CUSTOMER_SUMMARY_TOTAL,
    CONTRACT_ACTIVE_REQUEST,
    CONTRACT_ACTIVE_RESULT,
    CONTRACT_CLOSE_REQUEST,
    CONTRACT_CLOSE_RESULT,
    BANK_ACCOUT_REQUEST,
    BANK_ACCOUT_RESULT,
    CUSTOMER_TH_REQUEST,
    CUSTOMER_TH_SUCCESS,
    CUSTOMER_TH_ERROR,
} from './types'

export default {
    [CUSTOMER_REPAYMENT_SCHEDULE] (state, result) {
        Vue.set(state, 'flagSchedule', result)
    },
    [CUSTOMER_LIST_REQUEST] (state) {
        Vue.set(state, 'customerListRequest', true)
        Vue.set(state, 'customerListResult', [])
        Vue.set(state, 'customerCountResult', 0)
        Vue.set(state, 'customerListError', '')
        Vue.set(state, 'customerListErrorCode', 200)
    },
    [CUSTOMER_LIST_SUCCESS] (state, {customers, count}) {
        Vue.set(state, 'customerListRequest', false)
        Vue.set(state, 'customerListResult', customers)
        Vue.set(state, 'customerCountResult', count)
        Vue.set(state, 'customerListError', '')
        Vue.set(state, 'customerListErrorCode', 200)
    },
    [CUSTOMER_LIST_ERROR] (state, {errorCode, errorMessage}) {
        Vue.set(state, 'customerListRequest', false)
        Vue.set(state, 'customerListError', errorMessage)
        Vue.set(state, 'customerListErrorCode', errorCode)
    },
    [CUSTOMER_DETAIL_SUCCESS] (state, {customer}) {
        Vue.set(state, 'customerDetailForm', true)
        Vue.set(state, 'customerDetail', customer)
        Vue.set(state, 'customerDetailErrorCode', 200)
        Vue.set(state, 'customerDetailError', '')
    },
    [CUSTOMER_DETAIL_ERROR] (state, {errorCode, errorMessage}) {
        Vue.set(state, 'customerDetailForm', false)
        Vue.set(state, 'customerDetail', {})
        Vue.set(state, 'customerDetailError', errorMessage)
        Vue.set(state, 'customerDetailErrorCode', errorCode)
    },
    [CUSTOMER_DETAIL_REQUEST] (state) {
        Vue.set(state, 'customerDetailForm', false)
        Vue.set(state, 'customerDetail', {})
        Vue.set(state, 'customerDetailErrorCode', 0)
        Vue.set(state, 'customerDetailError', '')
    },
    [CUSTOMER_TH_SUCCESS] (state, {customerTH}) {
        Vue.set(state, 'customerTHForm', true)
        Vue.set(state, 'customerTH', customerTH)
        Vue.set(state, 'customerTHErrorCode', 200)
        Vue.set(state, 'customerTHError', '')
    },
    [CUSTOMER_TH_ERROR] (state, {errorCode, errorMessage}) {
        Vue.set(state, 'customerTHForm', false)
        Vue.set(state, 'customerTH', {})
        Vue.set(state, 'customerTHError', errorMessage)
        Vue.set(state, 'customerTHErrorCode', errorCode)
    },
    [CUSTOMER_TH_REQUEST] (state) {
        Vue.set(state, 'customerTHForm', false)
        Vue.set(state, 'customerTH', {})
        Vue.set(state, 'customerTHErrorCode', 0)
        Vue.set(state, 'customerTHError', '')
    },
    //customer Finding Function
    [CUSTOMER_FINDING_REQUEST] (state) {
        Vue.set(state, 'customerListRequest', true)
        Vue.set(state, 'customerDetail', [])
        Vue.set(state, 'customerListError', '')
        Vue.set(state, 'customerListErrorCode', 0)
        Vue.set(state, 'customerFindingError', '')
        Vue.set(state, 'customerFindingErrorCode', 0)
    },
    [CUSTOMER_FINDING_SUCCESS] (state, {customer}) {
        Vue.set(state, 'customerListRequest', false)
        Vue.set(state, 'customerDetail', customer[0])
        Vue.set(state, 'customerListError', '')
        Vue.set(state, 'customerListErrorCode', 200)
        Vue.set(state, 'customerFindingError', '')
        Vue.set(state, 'customerFindingErrorCode', 200)
    },
    [CUSTOMER_FINDING_ERROR] (state, {errorCode, errorMessage}) {
        Vue.set(state, 'customerListRequest', false)
        Vue.set(state, 'customerListError', errorMessage)
        Vue.set(state, 'customerListErrorCode', errorCode)
        Vue.set(state, 'customerFindingError', errorMessage)
        Vue.set(state, 'customerFindingErrorCode', errorCode)
    },
    [CUSTOMER_DOCUMENT_REQUEST] (state) {
        Vue.set(state, 'documentListRequest', true)
        Vue.set(state, 'documentListResult', [])
        Vue.set(state, 'customerListError', '')
        Vue.set(state, 'customerListErrorCode', 200)
    },
    [CUSTOMER_DOCUMENT_SUCCESS] (state, {docs}) {
        Vue.set(state, 'documentListRequest', false)
        Vue.set(state, 'documentListResult', docs)
        Vue.set(state, 'customerListError', '')
        Vue.set(state, 'customerListErrorCode', 200)
    },
    [CUSTOMER_SCHEDULE_REQUEST] (state) {
        Vue.set(state, 'scheduleListRequest', true)
        Vue.set(state, 'scheduleListResult', [])
        Vue.set(state, 'customerListError', '')
        Vue.set(state, 'customerListErrorCode', 200)
    },
    [CUSTOMER_SCHEDULE_LIST_SUCCESS] (state, {customers}) {
        Vue.set(state, 'scheduleListRequest', false)
        Vue.set(state, 'scheduleListResult', customers)
        Vue.set(state, 'customerListError', '')
        Vue.set(state, 'customerListErrorCode', 200)
    },
    [CUSTOMER_TRANSACTION_REQUEST] (state) {
        Vue.set(state, 'transactionListRequest', true)
        Vue.set(state, 'transactionListResult', [])
        Vue.set(state, 'customerListError', '')
        Vue.set(state, 'customerListErrorCode', 200)
    },
    [CUSTOMER_TRANSACTION_LIST_SUCCESS] (state, {customers}) {
        Vue.set(state, 'transactionListRequest', false)
        Vue.set(state, 'transactionListResult', customers)
        Vue.set(state, 'customerListError', '')
        Vue.set(state, 'customerListErrorCode', 200)
    },
    [CUSTOMER_SCHEDULE_TOTAL] (state, {total}) {
        Vue.set(state, 'customerTotalResult', total)
    },
    [CUSTOMER_SUMMARY_TOTAL] (state, {total}) {
        Vue.set(state, 'customerTotalSummaryResult', total)
    },
    [CUSTOMER_SUMMARY_REQUEST] (state) {
        Vue.set(state, 'summaryListRequest', true)
        Vue.set(state, 'summaryListResult', [])
        Vue.set(state, 'customerListError', '')
        Vue.set(state, 'customerListErrorCode', 200)
    },
    [CUSTOMER_SUMMARY_RESULT] (state, {customers}) {
        Vue.set(state, 'summaryListRequest', false)
        Vue.set(state, 'summaryListResult', customers)
        Vue.set(state, 'customerListError', '')
        Vue.set(state, 'customerListErrorCode', 200)
    },
    [CONTRACT_ACTIVE_REQUEST] (state) {
        Vue.set(state, 'contractActiveListRequest', true)
        Vue.set(state, 'contractActiveListResult', [])
        Vue.set(state, 'customerListError', '')
        Vue.set(state, 'customerListErrorCode', 200)
    },
    [CONTRACT_ACTIVE_RESULT] (state, {cus}) {
        Vue.set(state, 'contractActiveListRequest', false)
        Vue.set(state, 'contractActiveListResult', cus)
        Vue.set(state, 'customerListError', '')
        Vue.set(state, 'customerListErrorCode', 200)
    },
    [CONTRACT_CLOSE_REQUEST] (state) {
        Vue.set(state, 'contractCloseListRequest', true)
        Vue.set(state, 'contractCloseListResult', [])
        Vue.set(state, 'customerListError', '')
        Vue.set(state, 'customerListErrorCode', 200)
    },
    [CONTRACT_CLOSE_RESULT] (state, {cus}) {
        Vue.set(state, 'contractCloseListRequest', false)
        Vue.set(state, 'contractCloseListResult', cus)
        Vue.set(state, 'customerListError', '')
        Vue.set(state, 'customerListErrorCode', 200)
    },
    [BANK_ACCOUT_REQUEST] (state) {
        Vue.set(state, 'bankAccoutListRequest', true)
        Vue.set(state, 'bankAccoutListResult', [])
        Vue.set(state, 'customerListError', '')
        Vue.set(state, 'customerListErrorCode', 200)
    },
    [BANK_ACCOUT_RESULT] (state, {cus}) {
        Vue.set(state, 'bankAccoutListRequest', false)
        Vue.set(state, 'bankAccoutListResult', cus)
        Vue.set(state, 'customerListError', '')
        Vue.set(state, 'customerListErrorCode', 200)
    },
}