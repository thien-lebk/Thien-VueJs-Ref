import {
    REMINDER_LIST_REQUEST,
    REMINDER_LIST_SUCCESS,
    REMINDER_LIST_ERROR,
    REMINDER_COUNT,

    PRICE_ADJUSTMENT_CONTRACT_FINDING_REQUEST,
    PRICE_ADJUSTMENT_CONTRACT_FINDING_SUCCESS,
    PRICE_ADJUSTMENT_CONTRACT_FINDING_ERROR,
} from './types'
import {ContractService, ContractError} from '../../../../services/contract.service'

const has = Object.prototype.hasOwnProperty

export default {
    async getPriceAdjustmentContractList({commit}, payload) {
        commit(REMINDER_LIST_REQUEST)
        try {
            const page = has.call(payload, 'page') ? payload.page : null
            const {priceAdjustments, count} = await ContractService.getPriceAdjustmentContractList(page)
            commit(REMINDER_LIST_SUCCESS, {priceAdjustments})
            commit(REMINDER_COUNT, {count})
        } catch (error) {
            if (error instanceof ContractError) {
                commit(REMINDER_LIST_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                console.log(error)
                commit(REMINDER_LIST_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async updateDiffAmount({commit}, payload) {
        try {
            const result = await ContractService.updateContract(payload)
            return true
        } catch(error) {
            if (error instanceof ContractError) {
                commit(REMINDER_LIST_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(REMINDER_LIST_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
            return false
        }
    },

    async findOverDueContractByMifosId({commit}, payload) {
        commit(PRICE_ADJUSTMENT_CONTRACT_FINDING_REQUEST)
        try {
            const contracts = await ContractService.findPriceAdjustmentContractByMifosId(payload.id)
            commit(PRICE_ADJUSTMENT_CONTRACT_FINDING_SUCCESS, {contracts})
        } catch (error) {
            if (error instanceof ContractError) {
                commit(PRICE_ADJUSTMENT_CONTRACT_FINDING_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(PRICE_ADJUSTMENT_CONTRACT_FINDING_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },
}