import Vue from 'vue'

import {
    REMINDER_LIST_REQUEST,
    REMINDER_LIST_SUCCESS,
    REMINDER_LIST_ERROR,
    REMINDER_COUNT,
    
    PRICE_ADJUSTMENT_CONTRACT_FINDING_REQUEST,
    PRICE_ADJUSTMENT_CONTRACT_FINDING_SUCCESS,
    PRICE_ADJUSTMENT_CONTRACT_FINDING_ERROR,
} from './types'

export default {
    [REMINDER_LIST_REQUEST] (state) {
        Vue.set(state, 'priceAdjustmentListRequest', true)
        Vue.set(state, 'priceAdjustmentListResult', [])
        Vue.set(state, 'priceAdjustmentListError', '')
        Vue.set(state, 'priceAdjustmentListErrorCode', 0)
    },
    [REMINDER_LIST_SUCCESS] (state, {priceAdjustments}) {
        Vue.set(state, 'priceAdjustmentListRequest', false)
        Vue.set(state, 'priceAdjustmentListResult', priceAdjustments)
        Vue.set(state, 'priceAdjustmentListError', '')
        Vue.set(state, 'priceAdjustmentListErrorCode', 200)
    },
    [REMINDER_LIST_ERROR] (state, {errorCode, errorMessage}) {
        Vue.set(state, 'priceAdjustmentListRequest', false)
        Vue.set(state, 'summaryListRequest', false)
        Vue.set(state, 'transactionListRequest', false)
        Vue.set(state, 'priceAdjustmentListError', errorMessage)
        Vue.set(state, 'priceAdjustmentListErrorCode', errorCode)
    },
    [REMINDER_COUNT] (state, {count}) {
        Vue.set(state, 'priceAdjustmentCountResult', count)
    },

    [PRICE_ADJUSTMENT_CONTRACT_FINDING_REQUEST] (state) {
        Vue.set(state, 'priceAdjustmentFindingRequest', true)
        Vue.set(state, 'priceAdjustmentListResult', [])
        Vue.set(state, 'priceAdjustmentFindingErrorCode', 0)
        Vue.set(state, 'priceAdjustmentFindingError', '')
    },
    [PRICE_ADJUSTMENT_CONTRACT_FINDING_SUCCESS] (state, {contracts}) {
        Vue.set(state, 'priceAdjustmentFindingRequest', false)
        Vue.set(state, 'priceAdjustmentListResult', contracts)
        Vue.set(state, 'priceAdjustmentFindingErrorCode', 200)
    },
    [PRICE_ADJUSTMENT_CONTRACT_FINDING_ERROR] (state , {errorCode, errorMessage}) {
        Vue.set(state, 'priceAdjustmentFindingRequest', false)
        Vue.set(state, 'priceAdjustmentFindingErrorCode', errorCode)
        Vue.set(state, 'priceAdjustmentFindingError', errorMessage)
    },
}