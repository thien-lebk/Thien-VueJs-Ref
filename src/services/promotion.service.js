import ApiService from './api.service'
import { promotionAPI } from '../config/backend-api'

class PromotionError extends Error {
    constructor(errorCode, message) {
        super(message)
        this.name = this.constructor.name
        this.message = message
        this.errorCode = errorCode
    }
}

const PromotionService = {
    getPromotionList: async function() {
        try {
            const response = await ApiService.get(promotionAPI)
            const results = this.filterRawPromotionList(response.data)
            return {results}
        } catch (error) {
            throw new PromotionError(error.response.status, error.response.data)
        }
    },

    searchPromotionByName: async function(name) {
        const url = `${promotionAPI}?promotion_name=${name}`
        try {
            const response = await ApiService.get(url)
            const results = this.filterRawPromotionList(response.data)
            return {results}
        } catch (error) {
            throw new PromotionError(error.response.status, error.response.data)
        }
    },

    getPromotionDetail: async function(id) {
        const url = `${promotionAPI}${id}/`
        try {
            const response = await ApiService.get(url)
            const [result] = this.filterRawPromotionList([response.data])
            return result
        } catch (error) {
            throw new PromotionError(error.response.status, error.response.data)
        }
    },

    createPromotion: async function(promotionInfo) {
        const data = {
            promotion_name: promotionInfo.promotionName,
            description: promotionInfo.description,
            interest_discount: promotionInfo.interestDiscount,
            max_discount: Math.round(promotionInfo.maxDiscount * 1000000),
            min_discount: Math.round(promotionInfo.minDiscount * 1000000),
            min_payout: Math.round(promotionInfo.minPayout * 1000000),
        }

        try {
            const response = await ApiService.post(promotionAPI, data)
            if (response.status == 201) {
                return this.filterRawPromotionList([response.data])[0]
            }
        } catch (error) {
            console.log(error)
            throw new PromotionError(error.response.status, error.response.data.detail)
        }
    },

    updatePromotion: async function(promotionInfo) {
        const id = promotionInfo.id

        const data = {
            promotion_name: promotionInfo.promotionName,
            description: promotionInfo.description,
            interest_discount: promotionInfo.interestDiscount,
            max_discount: Math.round(promotionInfo.maxDiscount * 1000000),
            min_discount: Math.round(promotionInfo.minDiscount * 1000000),
            min_payout: Math.round(promotionInfo.minPayout * 1000000),
        }

        const url = `${promotionAPI}${id}/`

        try {
            const response = await ApiService.put(url, data)
            return this.filterRawPromotionList([response.data])[0]
        } catch (error) {
            throw new PromotionError(error.response.status, error.response.data)
        }
    },

    deletePromotion: async function(id) {
        const url = `${promotionAPI}${id}/`
        try {
            await ApiService.delete(url)
        } catch (error) {
            throw new PromotionError(error.response.status, error.response.data)
        }
    },

    filterRawPromotionList: function(rawData) {
        try {
            return rawData.map((item) => {
                return {
                    id: item.id,
                    promotionName: item.promotion_name,
                    description: item.description,
                    interestDiscount: item.interest_discount,
                    maxDiscount: item.max_discount / 1000000,
                    minDiscount: item.min_discount / 1000000,
                    minPayout: item.min_payout / 1000000,
                    status: item.status,
                }
            })
        } catch (error) {
            throw error
        }
    }
}

export default PromotionService

export { PromotionService, PromotionError }