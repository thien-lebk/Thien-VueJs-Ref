import Vue from 'vue'

import {
    ORDER_CREATING_REQUEST,
    ORDER_CREATING_SUCCESS,
    ORDER_CREATING_ERROR,

    ORDER_UPDATING_REQUEST,
    ORDER_UPDATING_SUCCESS,
    ORDER_UPDATING_ERROR,

    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_RESET,
    ORDER_LIST_ERROR,

    ORDER_CAMPAIGN_LIST_REQUEST,
    ORDER_CAMPAIGN_LIST_SUCCESS,
    ORDER_CAMPAIGN_LIST_ERROR,

    ORDER_FINDING_FOR_TABLE_REQUEST,
    ORDER_FINDING_FOR_TABLE_SUCCESS,
    ORDER_FINDING_FOR_TABLE_ERROR,
    ORDER_FINDING_FOR_TABLE_RESET,

    ORDER_FINDING_REQUEST,
    ORDER_FINDING_SUCCESS,
    ORDER_FINDING_ERROR,

    ORDER_FILTER_FINDING_REQUEST,
    ORDER_FILTER_FINDING_SUCCESS,
    ORDER_FILTER_FINDING_ERROR,

    ORDER_LIST_SCHEDULE_REQUEST,
    ORDER_LIST_SCHEDULE_SUCCESS,
    ORDER_LIST_SCHEDULE_ERROR,

    ORDER_CAMPAIGN_LIST_SCHEDULE_REQUEST,
    ORDER_CAMPAIGN_LIST_SCHEDULE_SUCCESS,
    ORDER_CAMPAIGN_LIST_SCHEDULE_ERROR,

    ORDER_DETAIL_FORM_REQUEST,
    ORDER_DETAIL_FORM_SUCCESS,
    ORDER_DETAIL_FORM_ERROR,

    ORDER_CAMPAIGN_DETAIL_FORM_REQUEST,
    ORDER_CAMPAIGN_DETAIL_FORM_SUCCESS,
    ORDER_CAMPAIGN_DETAIL_FORM_ERROR,

    TURN_OFF_ORDER_DIALOG,
    TURN_OFF_CAMPAIGN_ORDER_DIALOG,

    ORDER_DETAIL_REQUEST,
    ORDER_DETAIL_SUCCESS,
    ORDER_DETAIL_ERROR,
    ORDER_DETAIL_RESET,

    TEMPORARY_ORDER_SAVING_REQUEST,
} from './types'

export default {

    //Order Creating Function
    [ORDER_CREATING_REQUEST] (state) {
        state.orderCreating = true
        state.orderCreatingResult = null
        state.orderCreatingErrorCode = 0
        state.orderCreatingError = ''
    },
    [ORDER_CREATING_SUCCESS] (state, {result}) {
        state.orderCreating = false
        state.orderCreatingResult = result
        state.orderCreatingErrorCode = 201
    },
    [ORDER_CREATING_ERROR] (state, {errorCode, errorMessage}) {
        state.orderCreating = false
        state.orderCreatingError = errorMessage
        state.orderCreatingErrorCode = errorCode
    },

    //Order Updating Function
    [ORDER_UPDATING_REQUEST] (state) {
        state.orderUpdating = true
        state.orderUpdatingResult = null
        state.orderUpdatingErrorCode = 0
        state.orderUpdatingError = ''
    },
    [ORDER_UPDATING_SUCCESS] (state, {result}) {
        state.orderUpdating = false
        state.orderUpdatingResult = result
        state.orderUpdatingErrorCode = 200
    },
    [ORDER_UPDATING_ERROR] (state, {errorCode, errorMessage}) {
        state.orderUpdating = false
        state.orderUpdatingErrorCode = errorCode
        state.orderUpdatingError = errorMessage
    },
    //Order List Getting Function
    [ORDER_LIST_REQUEST] (state) {
        state.orderListRequest = true
        state.orderListResult = []
        state.orderCountResult = null
        state.orderListError = ''
        state.orderListErrorCode = 0
        state.isOrderFinding = false
    },
    [ORDER_LIST_SUCCESS] (state, {orders, count}) {
        state.orderListRequest = false
        state.orderListResult = orders
        state.orderCountResult = count
        state.orderListError = ''
        state.orderListErrorCode = 200
    },
    [ORDER_LIST_RESET] (state) {
        state.orderListRequest = false
        state.orderListResult = []
        state.orderListError = ''
        state.orderListErrorCode = 0
    },
    [ORDER_LIST_ERROR] (state, {errorCode, errorMessage}) {
        state.orderListRequest = false
        state.orderListError = errorMessage
        state.orderListErrorCode = errorCode
    },

    //Order Finding Function For Order Table
    [ORDER_FINDING_FOR_TABLE_REQUEST] (state) {
        state.orderListRequest = true
        state.orderListResult = []
        state.orderListError = ''
        state.orderListErrorCode = 0
        state.isOrderFinding = true
    },
    [ORDER_FINDING_FOR_TABLE_SUCCESS] (state, {result}) {
        state.orderListRequest = false
        state.orderListResult = result
        state.orderListError = ''
        state.orderListErrorCode = 200
    },
    [ORDER_FINDING_FOR_TABLE_ERROR] (state, {errorCode, errorMessage}) {
        state.orderListRequest = false
        state.orderListError = errorMessage
        state.orderListErrorCode = errorCode
    },
    [ORDER_FINDING_FOR_TABLE_RESET] (state) {
        state.isOrderFinding = false
    },

    //Order Finding Function
    [ORDER_FINDING_REQUEST] (state) {
        state.orderFindingRequest = true
        state.orderFindingResult = []
        state.orderFindingErrorCode = 0
        state.orderFindingError = ''
    },
    [ORDER_FINDING_SUCCESS] (state, {result}) {
        state.orderFindingRequest = false
        state.orderFindingResult = result
        state.orderFindingErrorCode = 200
        state.orderFindingError = ''
    },
    [ORDER_FINDING_ERROR] (state, {errorCode, errorMessage}) {
        state.orderFindingRequest = false
        state.orderFindingErrorCode = errorCode
        state.orderFindingError = errorMessage
    },

    //Order Filter Finding Function
    [ORDER_FILTER_FINDING_REQUEST] (state) {
        state.orderFilterFindingRequest = true
        state.orderFilterFindingResult = []
        state.orderFilterFindingErrorCode = 0
        state.orderFilterFindingError = ''
    },
    [ORDER_FILTER_FINDING_SUCCESS] (state, {result}) {
        state.orderFilterFindingRequest = false
        state.orderFilterFindingResult = result
        state.orderFilterFindingErrorCode = 200
        state.orderFilterFindingError = ''
    },
    [ORDER_FILTER_FINDING_ERROR] (state, {errorCode, errorMessage}) {
        state.orderFilterFindingRequest = false
        state.orderFilterFindingErrorCode = errorCode
        state.orderFilterFindingError = errorMessage
    },

    //Order List Getting Function
    [ORDER_LIST_SCHEDULE_REQUEST] (state) {
        state.orderListError = ''
        state.orderListErrorCode = 0
    },
    [ORDER_LIST_SCHEDULE_SUCCESS] (state, {orders, count}) {
        state.orderListResult = orders
        state.orderCountResult = count
        state.orderListError = ''
        state.orderListErrorCode = 200
    },
    [ORDER_LIST_SCHEDULE_ERROR] (state, {errorCode, errorMessage}) {
        state.orderListError = errorMessage
        state.orderListErrorCode = errorCode
    },

    //Order Campaign List Function
    [ORDER_CAMPAIGN_LIST_REQUEST] (state) {
        state.campaignOrderListRequest = true
        state.campaignOrderListResult = []
        state.campaignOrderListErrorCode = 0
        state.campaignOrderListError = ''
    },
    [ORDER_CAMPAIGN_LIST_SUCCESS] (state, {orders, count}) {
        state.campaignOrderListRequest = false
        state.campaignOrderListResult = orders
        state.campaignOrderCampaignCountResult = count
        state.campaignOrderListErrorCode = 200
    },
    [ORDER_CAMPAIGN_LIST_ERROR] (state, {errorCode, errorMessage}) {
        state.campaignOrderListRequest = false
        state.campaignOrderListErrorCode = errorCode
        state.campaignOrderListError = errorMessage
    },

    //Order Campaign Getting Function
    [ORDER_CAMPAIGN_LIST_SCHEDULE_REQUEST] (state) {
        state.campaignOrderListErrorCode = 0
        state.campaignOrderListError = ''
    },
    [ORDER_CAMPAIGN_LIST_SCHEDULE_SUCCESS] (state, {orders, count}) {
        state.campaignOrderListResult = orders
        state.campaignOrderCampaignCountResult = count
        state.campaignOrderListErrorCode = 200
    },
    [ORDER_CAMPAIGN_LIST_SCHEDULE_ERROR] (state, {errorCode, errorMessage}) {
        state.campaignOrderListErrorCode = errorCode
        state.campaignOrderListError = errorMessage
    },

    //Get Order Detail Form
    [ORDER_DETAIL_FORM_REQUEST] (state) {
        state.orderDetailForm = false
        state.orderDetailResult = null
        state.orderDetailErrorCode = 0
        state.orderDetailError = ''
    },
    [ORDER_DETAIL_FORM_SUCCESS] (state, {order}) {
        state.orderDetailForm = true
        state.orderDetailResult = order
        state.orderDetailErrorCode = 200
        state.orderDetailError = ''
    },
    [ORDER_DETAIL_FORM_ERROR] (state, {errorCode, errorMessage}) {
        state.orderDetailForm = false
        state.orderDetailErrorCode = errorCode
        state.orderDetailError = errorMessage
    },

    //Get Order Detail 
    [ORDER_DETAIL_REQUEST] (state) {
        state.orderDetailRequest = true
        state.orderDetailResult = null
        state.orderDetailErrorCode = 0
        state.orderDetailError = ''
    },
    [ORDER_DETAIL_SUCCESS] (state, {order}) {
        state.orderDetailRequest = false
        state.orderDetailResult = order
        state.orderDetailErrorCode = 200
    },
    [ORDER_DETAIL_ERROR] (state, {errorCode, errorMessage}) {
        state.orderDetailRequest = false
        state.orderDetailErrorCode = errorCode
        state.orderDetailError = errorMessage
    },
    [ORDER_DETAIL_RESET] (state) {
        state.orderDetailRequest = false
        state.orderDetailResult = null
        state.orderDetailErrorCode = 0
        state.orderDetailError = ''
    },

    //Get Campaign Order Detail Form
    [ORDER_CAMPAIGN_DETAIL_FORM_REQUEST] (state) {
        state.campaignOrderDetailForm = false
        state.campaignOrderDetailResult = null
        state.campaignOrderDetailErrorCode = 0
        state.campaignOrderDetailError = ''
    },
    [ORDER_CAMPAIGN_DETAIL_FORM_SUCCESS] (state, {campaignOrder}) {
        state.campaignOrderDetailForm = true
        state.campaignOrderDetailResult = campaignOrder
        state.campaignOrderDetailErrorCode = 200
        state.campaignOrderDetailError = ''
    },
    [ORDER_CAMPAIGN_DETAIL_FORM_ERROR] (state, {errorCode, errorMessage}) {
        state.campaignOrderDetailForm = false
        state.campaignOrderDetailErrorCode = errorCode
        state.campaignOrderDetailError = errorMessage
    },

    [TURN_OFF_ORDER_DIALOG] (state) {
        state.orderDetailForm = false
    },

    [TURN_OFF_CAMPAIGN_ORDER_DIALOG] (state) {
        state.campaignOrderDetailForm = false
    },

    [TEMPORARY_ORDER_SAVING_REQUEST] (state, {orderDetail}) {
        state.temporaryOrderDetail = orderDetail
    },
}