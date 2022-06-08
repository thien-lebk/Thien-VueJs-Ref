import {
    SASSET_LIST_REQUEST,
    SASSET_LIST_SUCCESS,
    SASSET_LIST_ERROR,

    CASSET_UPDATING_REQUEST,
    CASSET_UPDATING_SUCCESS,
    CASSET_UPDATING_ERROR,

    CASSET_CREATING_REQUEST,
    CASSET_CREATING_SUCCESS,
    CASSET_CREATING_ERROR,
} from './types'

export default {
    // SAsset List Getting Function
    [SASSET_LIST_REQUEST] (state) {
        state.SAssetListRequest = true
        state.SAssetListResult = []
        state.SAssetListError = ''
        state.SAssetListErrorCode = 0
    },
    [SASSET_LIST_SUCCESS] (state, {result}) {
        state.SAssetListRequest = false
        state.SAssetListResult = result
        state.SAssetListError = ''
        state.SAssetListErrorCode = 200
    },
    [SASSET_LIST_ERROR] (state, {errorCode, errorMessage}) {
        state.SAssetListRequest = false
        state.SAssetListError = errorMessage
        state.SAssetListErrorCode = errorCode
    },

    // Casset Updating Function
    [CASSET_UPDATING_REQUEST] (state) {
        state.CAssetUpdatingRequest = true
        state.CAssetUpdatingResult = null
        state.CAssetUpdatingError = ''
        state.CAssetUpdatingErrorCode = 0
    },
    [CASSET_UPDATING_SUCCESS] (state, {result}) {
        state.CAssetUpdatingRequest = false
        state.CAssetUpdatingResult = result
        state.CAssetUpdatingErrorCode = 200
    },
    [CASSET_UPDATING_ERROR] (state, {errorCode, errorMessage}) {
        state.CAssetUpdatingRequest = false
        state.CAssetUpdatingError = errorMessage
        state.CAssetUpdatingErrorCode = errorCode
    },

    // Casset Updating Function
    [CASSET_CREATING_REQUEST] (state) {
        state.CAssetCreatingRequest = true
        state.CAssetCreatingResult = null
        state.CAssetCreatingErrorCode = 0
        state.CAssetCreatingError = ''
    },
    [CASSET_CREATING_SUCCESS] (state, {result}) {
        state.CAssetCreatingRequest = false
        state.CAssetCreatingResult = result
        state.CAssetCreatingErrorCode = 200
    },
    [CASSET_CREATING_ERROR] (state, {errorCode, errorMessage}) {
        state.CAssetCreatingRequest = false
        state.CAssetCreatingErrorCode = errorCode
        state.CAssetCreatingError = errorMessage
    },
}