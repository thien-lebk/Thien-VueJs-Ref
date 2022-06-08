import Vue from 'vue'

import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_ERROR,
} from './types'

export default {
    [PRODUCT_LIST_REQUEST] (state) {
        Vue.set(state, 'productListRequest', true)
        Vue.set(state, 'productListResult', {})
        Vue.set(state, 'productListErrorCode', '')
        Vue.set(state, 'productListError', 0)
    },
    [PRODUCT_LIST_SUCCESS] (state, {products}) {
        Vue.set(state, 'productListRequest', false)
        Vue.set(state, 'productListResult', products)
        Vue.set(state, 'productListError', '')
        Vue.set(state, 'productListErrorCode', 200)
    },
    [PRODUCT_LIST_ERROR] (state, {errorCode, errorMessage}) {
        Vue.set(state, 'productListRequest', false)
        Vue.set(state, 'productListError', errorMessage)
        Vue.set(state, 'productListErrorCode', errorCode)
    },
}