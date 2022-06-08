import Vue from 'vue'

import {
    CLIENT_SEARCHING_REQUEST,
    CLIENT_SEARCHING_SUCCESS,
    CLIENT_SEARCHING_ERROR,
    CLIENT_SEARCHING_RESET,
    
    CLIENT_CREATING_REQUEST,
    CLIENT_CREATING_SUCCESS,
    CLIENT_CREATING_ERROR,
    CLIENT_CREATING_RESET,

    CLIENT_UPDATING_REQUEST,
    CLIENT_UPDATING_SUCCESS,
    CLIENT_UPDATING_ERROR,
    CLIENT_UPDATING_RESET,

    CLIENT_DETAIL_REQUEST,
    CLIENT_DETAIL_SUCCESS,
    CLIENT_DETAIL_ERROR,
    CLIENT_DETAIL_RESET,
} from './types'

export default {
    //Client Search Function
    [CLIENT_SEARCHING_REQUEST] (state) {
        Vue.set(state, 'clientSearching', true)
        Vue.set(state, 'clientSearchResult', null)
        Vue.set(state, 'clientSearchError', '')
        Vue.set(state, 'clientSearchErrorCode', 0)
    },
    [CLIENT_SEARCHING_SUCCESS] (state, {result}) {
        Vue.set(state, 'clientSearching', false)
        if (result.status) { // Old Customer
            //Get first client from client array
            Vue.set(state, 'clientSearchResult', result.data[0])
        }
        Vue.set(state, 'clientSearchErrorCode', 200)
    },
    [CLIENT_SEARCHING_ERROR] (state, {errorCode, errorMessage}) {
        Vue.set(state, 'clientSearching', false),
        Vue.set(state, 'clientSearchErrorCode', errorCode)
        Vue.set(state, 'clientSearchError', errorMessage)
    },
    [CLIENT_SEARCHING_RESET] (state) {
        Vue.set(state, 'clientSearching', false)
        Vue.set(state, 'clientSearchResult', null)
        Vue.set(state, 'clientSearchError', '')
        Vue.set(state, 'clientSearchErrorCode', 0)
    },

    // Client Creating Function
    [CLIENT_CREATING_REQUEST] (state) {
        Vue.set(state, 'clientCreatingRequest', true)
        Vue.set(state, 'clientCreatingResult', null)
        Vue.set(state, 'clientCreatingError', '')
        Vue.set(state, 'clientCreatingErrorCode', 0)
    },
    [CLIENT_CREATING_SUCCESS] (state, {result}) {
        Vue.set(state, 'clientCreatingRequest', false)
        Vue.set(state, 'clientCreatingResult', result)
        Vue.set(state, 'clientCreatingErrorCode', 201)
    },
    [CLIENT_CREATING_ERROR] (state, {errorCode, errorMessage}) {
        Vue.set(state, 'clientCreatingRequest', false)
        Vue.set(state, 'clientCreatingError', errorMessage)
        Vue.set(state, 'clientCreatingErrorCode', errorCode)
    },
    [CLIENT_CREATING_RESET] (state) {
        Vue.set(state, 'clientCreatingRequest', false)
        Vue.set(state, 'clientCreatingResult', null)
        Vue.set(state, 'clientCreatingError', '')
        Vue.set(state, 'clientCreatingErrorCode', 0)
    },

    [CLIENT_UPDATING_REQUEST] (state) {
        Vue.set(state, 'clientUpdatingRequest', true)
        Vue.set(state, 'clientUpdatingResult', null)
        Vue.set(state, 'clientUpdatingError', '')
        Vue.set(state, 'clientUpdatingErrorCode', 0)
    },
    [CLIENT_UPDATING_SUCCESS] (state, {result}) {
        Vue.set(state, 'clientUpdatingRequest', false)
        Vue.set(state, 'clientUpdatingResult', result)
        Vue.set(state, 'clientUpdatingErrorCode', 200)
    },
    [CLIENT_UPDATING_ERROR] (state, {errorCode, errorMessage}) {
        Vue.set(state, 'clientUpdatingRequest', false)
        Vue.set(state, 'clientUpdatingError', errorMessage)
        Vue.set(state, 'clientUpdatingErrorCode', errorCode)
    },
    [CLIENT_UPDATING_RESET] (state) {
        Vue.set(state, 'clientUpdatingRequest', false)
        Vue.set(state, 'clientUpdatingResult', null)
        Vue.set(state, 'clientUpdatingError', '')
        Vue.set(state, 'clientUpdatingErrorCode', 0)
    },

    [CLIENT_DETAIL_REQUEST] (state) {
        Vue.set(state, 'clientDetailRequest', true)
        Vue.set(state, 'clientDetailResult', null)
        Vue.set(state, 'clientDetailError', '')
        Vue.set(state, 'clientDetailErrorCode', 0)
    },
    [CLIENT_DETAIL_SUCCESS] (state, {result}) {
        Vue.set(state, 'clientDetailRequest', false)
        Vue.set(state, 'clientDetailResult', result)
        Vue.set(state, 'clientDetailErrorCode', 200)
    },
    [CLIENT_DETAIL_ERROR] (state, {errorCode, errorMessage}) {
        Vue.set(state, 'clientDetailRequest', false)
        Vue.set(state, 'clientDetailError', errorMessage)
        Vue.set(state, 'clientDetailErrorCode', errorCode)
    },
    [CLIENT_DETAIL_RESET] (state) {
        Vue.set(state, 'clientDetailRequest', false)
        Vue.set(state, 'clientDetailResult', null)
        Vue.set(state, 'clientDetailError', '')
        Vue.set(state, 'clientDetailErrorCode', 0)
    },
}