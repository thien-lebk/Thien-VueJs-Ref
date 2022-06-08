import Vue from 'vue'

import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT_SUCCESS,
    REFRESH_TOKEN_PROMISE,
    REFRESH_TOKEN_SUCCESS
} from './types'

export default {
    [LOGIN_REQUEST] (state) {
        state.authenticating = true
        state.authenticationError = ''
        state.authenticationErrorCode = 0
    },
    [LOGIN_SUCCESS] (state, {token, profile}) {
        state.accessToken = token
        state.authenticating = false
        state.name = profile.name
        state.branch = profile.branch
        state.authenticationError = ''
        state.authenticationErrorCode = 200
    },
    [LOGIN_ERROR] (state, {errorCode, errorMessage}) {
        state.authenticating = false
        state.authenticationErrorCode = errorCode
        state.authenticationError = errorMessage
    },
    [LOGOUT_SUCCESS] (state) {
        state.accessToken = ''
    },
    [REFRESH_TOKEN_PROMISE] (state, promise) {
        state.refreshTokenPromise = promise
    },
    [REFRESH_TOKEN_SUCCESS] (state, accessToken) {
        state.accessToken = accessToken
    } 
}