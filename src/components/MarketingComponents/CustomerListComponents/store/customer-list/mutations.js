import {
    CUSTOMER_LIST_UPLOADING_REQUEST,
    CUSTOMER_LIST_UPLOADING_SUCCESS,
    CUSTOMER_LIST_UPLOADING_ERROR,

    CUSTOMER_LIST_REQUEST,
    CUSTOMER_LIST_SUCCESS,
    CUSTOMER_LIST_ERROR,

    CUSTOMER_LIST_DETAIL_REQUEST,
    CUSTOMER_LIST_DETAIL_SUCCESS,
    CUSTOMER_LIST_DETAIL_ERROR,

    CUSTOMER_LIST_DELETING_REQUEST,
    CUSTOMER_LIST_DELETING_SUCCESS,
    CUSTOMER_LIST_DELETING_ERROR,
} from './types'

export default {
    // Customer List Uploading Function
    [CUSTOMER_LIST_UPLOADING_REQUEST] (state) {
        state.customerListUploadingRequest = true
        state.customerListUploadingErrorCode = 0
        state.customerListUploadingError = ''
    },
    [CUSTOMER_LIST_UPLOADING_SUCCESS] (state) {
        state.customerListUploadingRequest = false
        state.customerListUploadingErrorCode = 201
        state.customerListUploadingError = ''
    },
    [CUSTOMER_LIST_UPLOADING_ERROR] (state, {errorCode, errorMessage}) {
        state.customerListUploadingRequest = false
        state.customerListUploadingErrorCode = errorCode
        state.customerListUploadingError = errorMessage
    },

    // Customer List Getting Function
    [CUSTOMER_LIST_REQUEST] (state) {
        state.customerListRequest = true
        state.customerListResult = []
        state.customerListErrorCode = 0
        state.customerListError = ''
    },
    [CUSTOMER_LIST_SUCCESS] (state, {customerList}) {
        state.customerListRequest = false
        state.customerListResult = customerList.reverse()
        state.customerListErrorCode = 200
        state.customerListError = ''
    },
    [CUSTOMER_LIST_ERROR] (state, {errorCode, errorMessage}) {
        state.customerListRequest = false
        state.customerListErrorCode = errorCode
        state.customerListError = errorMessage
    },

    // Customer List Detail Getting Function
    [CUSTOMER_LIST_DETAIL_REQUEST] (state) {
        state.customerListDetailRequest = true
        state.customerListDetailResult = null
        state.customerListDetailErrorCode = 0
        state.customerListDetailError = ''
    },
    [CUSTOMER_LIST_DETAIL_SUCCESS] (state, {customerListDetail}) {
        state.customerListDetailRequest = false
        state.customerListDetailResult = customerListDetail
        state.customerListDetailErrorCode = 200
        state.customerListDetailError = ''
    },
    [CUSTOMER_LIST_DETAIL_ERROR] (state, {errorCode, errorMessage}) {
        state.customerListDetailRequest = false
        state.customerListDetailErrorCode = errorCode
        state.customerListDetailError = errorMessage
    },

    // Customer List Deleting Function
    [CUSTOMER_LIST_DELETING_REQUEST] (state) {
        state.customerListDeletingRequest = true
        state.customerListDeletingErrorCode = 0
        state.customerListDeletingError = ''
    },
    [CUSTOMER_LIST_DELETING_SUCCESS] (state) {
        state.customerListDeletingRequest = false
        state.customerListDeletingErrorCode = 200
        state.customerListDeletingError = ''
    },
    [CUSTOMER_LIST_DELETING_ERROR] (state, {errorCode, errorMessage}) {
        state.customerListDeletingRequest = false
        state.customerListDeletingErrorCode = errorCode
        state.customerListDeletingError = errorMessage
    },
}