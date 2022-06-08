import Vue from 'vue'

import {
    SET_ENABLE,

    SESSION,

    OPEN_WINDOW,
    OPEN_CALL_BOX,
    OPEN_DIAL_PAD,

    CLOSE_WINDOW,
    CLOSE_CALL_BOX,
    CLOSE_DIAL_PAD,

    UPDATE_CALL_ID,
    CALL_UPDATING_REQUEST,
    UPDATE_ORDER_ID,
    UPDATE_ORDER_CONTENT,

    OUTCOMING_REQUEST,
    OUTCOMING_CONNECTED,
    OUTCOMING_RESPONSE,
    OUTCOMING_END,
    OUTCOMING_FAIL,

    INCOMING_REQUEST,
    INCOMING_RESPONSE,
    INCOMING_END,
    INCOMING_FAIL,

    SET_VOLUME,

    RESET_DETAIL,
    BY_EMPLOYEE,
} from './types'

import {getError} from '../../utils/call_errors'

export default {
    [SET_ENABLE] (state, {enabled}) {
        state.enabled = enabled
    },

    [SESSION] (state, {session}) {
        state.session = session
    },

    [OPEN_WINDOW] (state) {
        state.windowOpen = true
    },
    [OPEN_CALL_BOX] (state) {
        state.callBox = true
    },
    [OPEN_DIAL_PAD] (state) {
        state.dialPad = true
    },

    [CLOSE_WINDOW] (state) {
        state.windowOpen = false
    },
    [CLOSE_CALL_BOX] (state) {
        state.callBox = false
    },
    [CLOSE_DIAL_PAD] (state) {
        state.dialPad = false
    },
    [UPDATE_CALL_ID] (state, {id}) {
        state.callID = id
    },
    [CALL_UPDATING_REQUEST] (state, {requesting}) {
        state.callUpdating = requesting
    },
    [UPDATE_ORDER_ID] (state, {id}) {
        state.orderId = id
    },
    [UPDATE_ORDER_CONTENT] (state, result) {
        state.customerOrderResult = result
    },

    [SET_VOLUME] (state, {volume}) {
        state.volume = volume
    },

    //FOR OUTCOMING CALLING
    [OUTCOMING_REQUEST] (state, {customerPhone, customerName, customerId}) {
        state.requestType = 'outcoming'
        state.ring = true
        state.step = 'connecting'
        state.customerPhone = customerPhone
        state.customerName = customerName
        state.customerId = customerId
    },
    [OUTCOMING_CONNECTED] (state) {
        state.step = 'progress'
    },
    [OUTCOMING_RESPONSE] (state) {
        state.calling = true
        state.ring = false
        state.error = ''
        state.step = 'client confirmed'
    },
    [OUTCOMING_END] (state, {cause}) {
        state.calling = false
        state.ring = false
        const message = getError(cause, state.byEmployee);
        state.error = message
        state.step = 'ended'
    },
    [OUTCOMING_FAIL] (state, {cause}) {
        state.calling = false
        state.ring = false
        const message = getError(cause, state.byEmployee);
        state.error = message
        state.step = 'outcoming failed'
    },

    //FOR INCOMING CALLING
    [INCOMING_REQUEST] (state) {
        state.requestType = 'incoming'
        state.ring = true
        state.step = 'progress'
    },
    [INCOMING_RESPONSE] (state, {customerPhone, customerName, customerId}) {
        state.calling = true
        state.ring = false
        state.error = ''
        state.step = 'user confirmed'
        state.customerPhone = customerPhone
        state.customerName = customerName
        state.customerId = customerId
    },
    [INCOMING_END] (state, {cause}) {
        state.calling = false
        state.ring = false
        const message = getError(cause, state.byEmployee);
        state.error = message
        state.step = 'ended'
    },
    [INCOMING_FAIL] (state, {cause}) {
        state.calling = false
        state.ring = false
        const message = getError(cause, state.byEmployee);
        state.error = message
        state.step = 'incoming failed'
    },

    [RESET_DETAIL] (state) {
        state.error = ''
        state.step = 'rest'
        state.requestType = ''
        state.customerPhone = ''
        state.customerName = ''
        state.byEmployee = false
    },
    [BY_EMPLOYEE] (state, {byEmployee}) {
        state.byEmployee = byEmployee
    }
}