import Vue from 'vue'

import {
    CONTRACT_REPAYMENT_SCHEDULE,
    CONTRACT_LIST_REQUEST,
    CONTRACT_LIST_SUCCESS,
    CONTRACT_LIST_ERROR,

    CONTRACT_CREATING_REQUEST,
    CONTRACT_CREATING_SUCCESS,
    CONTRACT_CREATING_ERROR,
    CONTRACT_CREATING_RESET,

    CONTRACT_REPAYING_REQUEST,
    CONTRACT_REPAYING_SUCCESS,
    CONTRACT_REPAYING_ERROR,
    CONTRACT_REPAYING_RESET,

    CONTRACT_DETAIL_REQUEST,
    CONTRACT_DETAIL_SUCCESS,
    CONTRACT_DETAIL_ERROR,
    CONTRACT_DETAIL_RESET,

    CONTRACT_UPDATING_REQUEST,
    CONTRACT_UPDATING_SUCCESS,
    CONTRACT_UPDATING_ERROR,
    CONTRACT_UPDATING_RESET,

    CONTRACT_APPROVING_REQUEST,
    CONTRACT_APPROVING_SUCCESS,
    CONTRACT_APPROVING_ERROR,

    CONTRACT_FINDING_REQUEST,
    CONTRACT_FINDING_SUCCESS,
    CONTRACT_FINDING_ERROR,

    CONTRACT_DOCUMENT_REQUEST,
    CONTRACT_DOCUMENT_SUCCESS,

    CONTRACT_SCHEDULE_REQUEST,
    CONTRACT_SCHEDULE_LIST_SUCCESS,

    CONTRACT_TRANSACTION_REQUEST,
    CONTRACT_TRANSACTION_LIST_SUCCESS,
    CONTRACT_SCHEDULE_TOTAL,

    CONTRACT_SUMMARY_REQUEST,
    CONTRACT_SUMMARY_RESULT,
    CONTRACT_SUMMARY_ERROR,

    CONTRACT_REPAYMENT_REQUEST,
    CONTRACT_REPAYMENT_SUCCESS,
    CONTRACT_REPAYMENT_ERROR,

    CONTRACT_COUNT,
    CHANGE_CONTRACT_REMINDER,
} from './types'

export default {
    [CONTRACT_REPAYMENT_SCHEDULE] (state, result) {
        state.flagSchedule = result
    },
    [CONTRACT_LIST_REQUEST] (state) {
        state.contractListRequest = true
        state.contractListResult = []
        state.contractListError = ''
        state.contractListErrorCode = 200
    },
    [CONTRACT_LIST_SUCCESS] (state, {contracts}) {
        state.contractListRequest = false
        state.contractListResult = contracts
        state.contractListError = ''
        state.contractListErrorCode = 200
    },
    [CONTRACT_LIST_ERROR] (state, {errorCode, errorMessage}) {
        state.contractListRequest = false
        state.summaryDetailRequest = false
        state.transactionListRequest = false
        state.contractListError = errorMessage
        state.contractListErrorCode = errorCode
    },
    //Contract Creating Function
    [CONTRACT_CREATING_REQUEST] (state) {
        state.contractCreatingRequest = true
        state.contractCreatingResult = null
        state.contractCreatingError = ''
        state.contractCreatingErrorCode = 0
    },
    [CONTRACT_CREATING_SUCCESS] (state, {result}) {
        state.contractCreatingRequest = false
        state.contractCreatingResult = result
        state.contractCreatingErrorCode = 201
    },
    [CONTRACT_CREATING_ERROR] (state, {errorCode, errorMessage}) {
        state.contractCreatingRequest = false
        state.contractCreatingError = errorMessage
        state.contractCreatingErrorCode = errorCode
    },
    [CONTRACT_CREATING_RESET] (state) {
        state.contractCreatingRequest = false
        state.contractCreatingResult = null
        state.contractCreatingError = ''
        state.contractCreatingErrorCode = 0
    },

    // Contract repaying function
    [CONTRACT_REPAYING_REQUEST] (state) {
        state.contractRepayingRequest = true
        state.contractRepayingResult = null
        state.contractRepayingErrorCode = 0
        state.contractRepayingError = ''
    },
    [CONTRACT_REPAYING_SUCCESS] (state, {result}) {
        state.contractRepayingRequest = false
        state.contractRepayingResult = result
        state.contractRepayingErrorCode = 200
    },
    [CONTRACT_REPAYING_ERROR] (state, {errorCode, errorMessage}) {
        state.contractRepayingRequest = false
        state.contractRepayingErrorCode = errorCode
        state.contractRepayingError = errorMessage
    },
    [CONTRACT_REPAYING_RESET] (state) {
        state.contractRepayingRequest = false
        state.contractRepayingResult = null
        state.contractRepayingErrorCode = 0
        state.contractRepayingError = ''
    },

    //Contract Detail Getting function
    [CONTRACT_DETAIL_REQUEST] (state) {
        state.contractDetailRequest = true
        state.contractDetail = null
        state.contractDetailErrorCode = 0
        state.contractDetailError = ''
    },
    [CONTRACT_DETAIL_SUCCESS] (state, {contract}) {
        state.contractDetailRequest = false
        state.contractDetail = contract
        state.contractDetailErrorCode = 200
        state.contractDetailError = ''
    },
    [CONTRACT_DETAIL_ERROR] (state, {errorCode, errorMessage}) {
        state.contractDetailRequest = false
        state.contractDetailError = errorMessage
        state.contractDetailErrorCode = errorCode
    },
    [CONTRACT_DETAIL_RESET] (state) {
        state.contractDetailRequest = false
        state.contractDetail = null
        state.contractDetailErrorCode = 0
        state.contractDetailError = ''
    },

    // contract updating function
    [CONTRACT_UPDATING_REQUEST] (state) {
        state.contractUpadtingRequest = true
        state.contractUpadtingErrorCode = 0
        state.contractUpadtingError = ''
    },
    [CONTRACT_UPDATING_SUCCESS] (state, {result}) {
        state.contractUpadtingRequest = true
        state.contractDueDate = result.dueDate
        state.contractDetail = result
        state.contractUpadtingErrorCode = 200
        state.contractUpadtingError = ''
    },
    [CONTRACT_UPDATING_ERROR] (state, {errorCode, errorMessage}) {
        state.contractUpadtingRequest = false
        state.contractUpadtingError = errorMessage
        state.contractUpadtingErrorCode = errorCode
    },
    [CONTRACT_UPDATING_RESET] (state) {
        state.contractUpadtingRequest = false
        state.contractUpadtingErrorCode = 0
        state.contractUpadtingError = ''
    },

    // contract disbursing function
    [CONTRACT_APPROVING_REQUEST] (state) {
        state.contractApprovingRequest = true
        state.contractApprovingResult = null
        state.contractApprovingErrorCode = 0
        state.contractApprovingError = ''
    },
    [CONTRACT_APPROVING_SUCCESS] (state, {result}) {
        state.contractApprovingRequest = false
        state.contractApprovingResult = result
        state.contractApprovingErrorCode = 200
        state.contractApprovingError = ''
    },
    [CONTRACT_APPROVING_ERROR] (state, {errorCode, errorMessage}) {
        state.contractApprovingRequest = false
        state.contractApprovingErrorCode = errorCode
        state.contractApprovingError = errorMessage
    },

    //contract Finding Function
    [CONTRACT_FINDING_REQUEST] (state) {
        state.contractListRequest = true
        state.contractListResult = []
        state.contractListError = ''
        state.contractListErrorCode = 0
        state.contractFindingError = ''
        state.contractFindingErrorCode = 0
    },
    [CONTRACT_FINDING_SUCCESS] (state, {contracts}) {
        state.contractListRequest = false
        state.contractListResult = contracts
        state.contractListError = ''
        state.contractListErrorCode = 200
        state.contractFindingError = ''
        state.contractFindingErrorCode = 200
    },
    [CONTRACT_FINDING_ERROR] (state, {errorCode, errorMessage}) {
        state.contractListRequest = false
        state.contractListError = errorMessage
        state.contractListErrorCode = errorCode
        state.contractFindingError = errorMessage
        state.contractFindingErrorCode = errorCode
    },
    [CONTRACT_DOCUMENT_REQUEST] (state) {
        state.documentListRequest = true
        state.documentListResult = []
        state.contractListError = ''
        state.contractListErrorCode = 200
    },
    [CONTRACT_DOCUMENT_SUCCESS] (state, {docs}) {
        state.documentListRequest = false
        state.documentListResult = docs
        state.contractListError = ''
        state.contractListErrorCode = 200
    },
    [CONTRACT_SCHEDULE_REQUEST] (state) {
        state.scheduleListRequest = true
        state.scheduleListResult = []
        state.contractListError = ''
        state.contractListErrorCode = 200
    },
    [CONTRACT_SCHEDULE_LIST_SUCCESS] (state, {contracts}) {
        state.scheduleListRequest = false
        state.scheduleListResult = contracts
        state.contractListError = ''
        state.contractListErrorCode = 200
    },
    [CONTRACT_TRANSACTION_REQUEST] (state) {
        state.transactionListRequest = true
        state.transactionListResult = []
        state.contractListError = ''
        state.contractListErrorCode = 200
    },
    [CONTRACT_TRANSACTION_LIST_SUCCESS] (state, {contracts}) {
        state.transactionListRequest = false
        state.transactionListResult = contracts
        state.contractListError = ''
        state.contractListErrorCode = 200
    },
    [CONTRACT_SCHEDULE_TOTAL] (state, {total}) {
        state.summaryDetailRequest = false
        state.contractTotalResult = total
    },
    [CONTRACT_SUMMARY_REQUEST] (state) {
        state.summaryDetailRequest = true
        state.summaryDetailResult = null
        state.contractTotalSummaryResult = null
        state.summaryDetailErrorCode = 0
        state.summaryDetailError = ''
    },
    [CONTRACT_SUMMARY_RESULT] (state, {contracts, total}) {
        state.summaryDetailRequest = false
        state.summaryDetailResult = contracts
        state.contractTotalSummaryResult = total
        state.summaryDetailErrorCode = 200
        state.summaryDetailError = ''
    },
    [CONTRACT_SUMMARY_ERROR] (state, {errorCode, errorMessage}) {
        state.summaryDetailRequest = false
        state.summaryDetailErrorCode = errorCode
        state.summaryDetailError = errorMessage
    },

    [CONTRACT_REPAYMENT_REQUEST] (state) {
        state.contractRepaymentRequest = true
        state.contractRepaymentResult = null
        state.contractRepaymentErrorCode = 0
        state.contractRepaymentError = ''
    },
    [CONTRACT_REPAYMENT_SUCCESS] (state, {repayment}) {
        state.contractRepaymentRequest = true
        state.contractRepaymentResult = repayment
        state.contractRepaymentErrorCode = 200
        state.contractRepaymentError = ''
    },
    [CONTRACT_REPAYMENT_ERROR] (state, {errorCode, errorMessage}) {
        state.contractRepaymentRequest = false
        state.contractRepaymentErrorCode = errorCode
        state.contractRepaymentError = errorMessage
    },

    [CONTRACT_COUNT] (state, {count}) {
        state.contractCountResult = count
    },
    [CHANGE_CONTRACT_REMINDER] (state, {remider}) {
        state.contractReminder = remider
    },
}