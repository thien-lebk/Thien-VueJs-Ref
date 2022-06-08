import Vue from 'vue'

import {
    NEW_NOTIFICATION_REQUEST,
    NEW_NOTIFICATION_SUCCESS,
    NEW_NOTIFICATION_ERROR,

    NOTIFICATION_REQUEST,
    NOTIFICATION_SUCCESS,
    NOTIFICATION_ERROR,

    NOTIFICATION_UPDATING_REQUEST,
    NOTIFICATION_UPDATING_SUCCESS,
    NOTIFICATION_UPDATING_ERROR,
} from './types'

export default {
    [NEW_NOTIFICATION_REQUEST] (state) {
        state.newNotificationErrorCode = 0
        state.newNotificationError = ''
    },
    [NEW_NOTIFICATION_SUCCESS] (state, {result}) {
        state.newNotificationResult = result
        state.newNotificationErrorCode = 200
        state.newNotificationError = ''
    },
    [NEW_NOTIFICATION_ERROR] (state, {errorCode, errorMessage}) {
        state.newNotificationErrorCode = errorCode
        state.newNotificationError = errorMessage
    },

    [NOTIFICATION_REQUEST] (state) {
        state.notificationErrorCode = 0
        state.notificationError = ''
    },
    [NOTIFICATION_SUCCESS] (state, {result}) {
        state.notificationResult = result
        state.notificationErrorCode = 200
        state.notificationError = ''
    },
    [NOTIFICATION_ERROR] (state, {errorCode, errorMessage}) {
        state.notificationErrorCode = errorCode
        state.notificationError = errorMessage
    },

    [NOTIFICATION_UPDATING_REQUEST] (state) {
        state.notificationUpdatingRequest = true
        state.notificationUpdatingResult = null
        state.notificationUpdatingErrorCode = 0
        state.notificationUpdatingError = ''
    },
    [NOTIFICATION_UPDATING_SUCCESS] (state, {result}) {
        state.notificationUpdatingRequest = false
        state.notificationUpdatingResult = result
        state.notificationUpdatingErrorCode = 200
        state.notificationUpdatingError = ''
    },
    [NOTIFICATION_UPDATING_ERROR] (state, {errorCode, errorMessage}) {
        state.notificationUpdatingRequest = false
        state.notificationUpdatingErrorCode = errorCode
        state.notificationUpdatingError = errorMessage
    },

}