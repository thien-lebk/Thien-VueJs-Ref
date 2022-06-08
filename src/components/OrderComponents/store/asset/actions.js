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

import { AssetService, AssetError } from '../../../../services/asset.serivce'

export default {
    async getSAssetList({commit}) {
        commit(SASSET_LIST_REQUEST)
        try {
            const result = await AssetService.getSAssetList()
            commit(SASSET_LIST_SUCCESS, {result})
        } catch (error) {
            if (error instanceof AssetError) {
                commit(SASSET_LIST_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(SASSET_LIST_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async updateCAsset({commit}, payload) {
        commit(CASSET_UPDATING_REQUEST)
        try {
            const result = await AssetService.updateCAsset(payload.id, payload.data)
            commit(CASSET_UPDATING_SUCCESS, {result})
        } catch (error) {
            if (error instanceof AssetError) {
                commit(CASSET_UPDATING_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(CASSET_UPDATING_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async createCAsset({commit}, payload) {
        commit(CASSET_CREATING_REQUEST)
        try {
            const result = await AssetService.createCAsset(payload)
            commit(CASSET_CREATING_SUCCESS, {result})
            return result
        } catch (error) {
            if (error instanceof AssetError) {
                commit(CASSET_CREATING_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(CASSET_CREATING_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    }
}