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

import { PromotionService, PromotionError } from '../../../../../../services/promotion.service'

export default {
    async getPromotionList({commit}) {
        commit(PROMOTION_LIST_REQUEST)
        try {
            const {results} = await PromotionService.getPromotionList()
            commit(PROMOTION_LIST_SUCCESS, {results})
        } catch (error) {
            if (error instanceof PromotionError) {
                commit(PROMOTION_LIST_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(PROMOTION_LIST_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async searchPromotionByName({commit}, payload) {
        commit(PROMOTION_LIST_REQUEST)
        try {
            const {results} = await PromotionService.searchPromotionByName(payload.name)
            commit(PROMOTION_LIST_SUCCESS, {results})
        } catch (error) {
            if (error instanceof PromotionError) {
                commit(PROMOTION_LIST_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(PROMOTION_LIST_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async createPromotion({commit}, payload) {
        commit(PROMOTION_CREATING_REQUEST)
        try {
            const result = await PromotionService.createPromotion(payload)
            commit(PROMOTION_CREATING_SUCCESS, {result})
        } catch (error) {
            if (error instanceof PromotionError) {
                commit(PROMOTION_CREATING_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(PROMOTION_CREATING_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async getPromotionDetail({commit, getters}, payload) {
        commit(PROMOTION_DETAIL_FORM_REQUEST)
        const promotionListResult = getters.promotionListResult
        const promotion = promotionListResult.find(item => item.id === payload.id)
        if (promotion !== undefined) {
            commit(PROMOTION_DETAIL_FORM_SUCCESS, {promotion})
        } else {
            commit(PROMOTION_DETAIL_FORM_ERROR, {errorCode: 404, errorMessage: "Not found"})
        }
    },

    async getPromotionByIdAndOpenDialog({commit}, payload) {
        commit(PROMOTION_DETAIL_FORM_REQUEST)
        try {
            const promotion = await PromotionService.getPromotionDetail(payload.id)
            commit(PROMOTION_DETAIL_FORM_SUCCESS, {promotion})
        } catch (error) {
            if (error instanceof PromotionError) {
                commit(PROMOTION_DETAIL_FORM_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(PROMOTION_DETAIL_FORM_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async getPromotionById({commit}, payload) {
        commit(PROMOTION_DETAIL_REQUEST)
        try {
            const promotion = await PromotionService.getPromotionDetail(payload.id)
            commit(PROMOTION_DETAIL_SUCCESS, {promotion})
        } catch (error) {
            if (error instanceof PromotionError) {
                commit(PROMOTION_DETAIL_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(PROMOTION_DETAIL_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async updatePromotion({commit}, payload) {
        commit(PROMOTION_UPDATING_REQUEST)
        try {
            const result = await PromotionService.updatePromotion(payload)
            commit(PROMOTION_UPDATING_SUCCESS, {result})
        } catch (error) {
            if (error instanceof PromotionError) {
                commit(PROMOTION_UPDATING_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(PROMOTION_UPDATING_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async turnOffDialog({commit}) {
        commit(TURN_OFF_PROMOTION_DETAIL_FORM)
    },

    async deletePromotion({commit}, payload) {
        commit(PROMOTION_DELETING_REQUEST)
        try {
            await PromotionService.deletePromotion(payload.id)
            commit(PROMOTION_DELETING_SUCCESS)
        } catch (error) {
            if (error instanceof PromotionError) {
                commit(PROMOTION_DELETING_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(PROMOTION_DELETING_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    }
}