import Vue from 'vue'

import {
    PROMOTION_LIST_REQUEST,
    PROMOTION_LIST_SUCCESS,
    PROMOTION_LIST_ERROR,

    PROMOTION_SEARCHING_REQUEST,
    PROMOTION_SEARCHING_SUCCESS,
    PROMOTION_SEARCHING_ERROR,
    PROMOTION_SEARCHING_RESET,

    PROMOTION_CREATING_REQUEST,
    PROMOTION_CREATING_SUCCESS,
    PROMOTION_CREATING_ERROR,

    PROMOTION_UPDATING_REQUEST,
    PROMOTION_UPDATING_SUCCESS,
    PROMOTION_UPDATING_ERROR,
    
    PROMOTION_DELETING_REQUEST,
    PROMOTION_DELETING_SUCCESS,
    PROMOTION_DELETING_ERROR,

    PROMOTION_DETAIL_FORM_REQUEST,
    PROMOTION_DETAIL_FORM_SUCCESS,
    PROMOTION_DETAIL_FORM_ERROR,
    TURN_OFF_PROMOTION_DETAIL_FORM,

    PROMOTION_DETAIL_REQUEST,
    PROMOTION_DETAIL_SUCCESS,
    PROMOTION_DETAIL_ERROR,
} from './types'

export default {
    // Promotion List Function
    [PROMOTION_LIST_REQUEST] (state) {
        state.promotionListRequest = true
        state.promotionListResult = []
        state.promotionListErrorCode = 0
        state.promotionListError = ''
    },
    [PROMOTION_LIST_SUCCESS] (state, {results}) {
        state.promotionListRequest = false
        state.promotionListResult = results
        state.promotionListErrorCode = 200
    },
    [PROMOTION_LIST_ERROR] (state, {errorCode, errorMessage}) {
        state.promotionListRequest = false
        state.promotionListErrorCode = errorCode
        state.promotionListError = errorMessage
    },

    // Promotion Creating Function
    [PROMOTION_CREATING_REQUEST] (state) {
        state.promotionCreatingRequest = true
        state.promotionCreatingResult = null
        state.promotionCreatingErrorCode = 0
        state.promotionCreatingError = ''
    },
    [PROMOTION_CREATING_SUCCESS] (state, {result}) {
        state.promotionCreatingRequest = false
        state.promotionCreatingResult = result
        state.promotionCreatingErrorCode = 201
    },
    [PROMOTION_CREATING_ERROR] (state, {errorCode, errorMessage}) {
        state.promotionCreatingRequest = false
        state.promotionCreatingErrorCode = errorCode
        state.promotionCreatingError = errorMessage
    },

    // Promotion Detail Form Function
    [PROMOTION_DETAIL_FORM_REQUEST] (state) {
        state.promotionDetailForm = false
        state.promotionDetail = {}
        state.promotionDetailFormErrorCode = 0
        state.promotionDetailFormError = ''
    },
    [PROMOTION_DETAIL_FORM_SUCCESS] (state, {promotion}) {
        state.promotionDetailForm = true
        state.promotionDetail = promotion
        state.promotionDetailFormErrorCode = 200
    },
    [PROMOTION_DETAIL_FORM_ERROR] (state, {errorCode, errorMessage}) {
        state.promotionDetailForm = false
        state.promotionListErrorCode = errorCode
        state.promotionDetailFormError = errorMessage
    },
    [TURN_OFF_PROMOTION_DETAIL_FORM] (state) {
        state.promotionDetailForm = false
    },

    // Promotion Updating Function
    [PROMOTION_UPDATING_REQUEST] (state) {
        state.promotionUpdatingRequest = true
        state.promotionUpdatingResult = null
        state.promotionUpdatingErrorCode = 0
        state.promotionUpdatingError = ''
    },
    [PROMOTION_UPDATING_SUCCESS] (state, {result}) {
        state.promotionUpdatingRequest = false
        state.promotionUpdatingResult = result
        state.promotionUpdatingErrorCode = 200
    },
    [PROMOTION_UPDATING_ERROR] (state, {errorCode, errorMessage}) {
        state.promotionUpdatingRequest = false
        state.promotionUpdatingErrorCode = errorCode
        state.promotionUpdatingError = errorMessage
    },

    // Promotion Deleting Function
    [PROMOTION_DELETING_REQUEST] (state) {
        state.promotionDeletingRequest = true
        state.promotionDeletingResult = null
        state.promotionDeletingErrorCode = 0
        state.promotionDeletingError = ''
    },
    [PROMOTION_DELETING_SUCCESS] (state) {
        state.promotionDeletingRequest = false
        state.promotionDeletingErrorCode = 200
    },
    [PROMOTION_DELETING_ERROR] (state, {errorCode, errorMessage}) {
        state.promotionDeletingRequest = false
        state.promotionDeletingErrorCode = errorCode
        state.promotionDeletingError = errorMessage
    },

    // Promotion Detail Function
    [PROMOTION_DETAIL_REQUEST] (state) {
        state.promotionDetailRequest = true
        state.promotionDetail = {}
        state.promotionDetailErrorCode = 0
        state.promotionDetailError = ''
    },
    [PROMOTION_DETAIL_SUCCESS] (state, {promotion}) {
        state.promotionDetailRequest = false
        state.promotionDetail = promotion
        state.promotionDetailErrorCode = 200
    },
    [PROMOTION_DETAIL_ERROR] (state, {errorCode, errorMessage}) {
        state.promotionDetailRequest = false
        state.promotionListErrorCode = errorCode
        state.promotionDetailError = errorMessage
    },
}