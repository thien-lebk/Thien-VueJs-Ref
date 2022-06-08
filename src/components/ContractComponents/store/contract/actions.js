import {
    CONTRACT_REPAYMENT_SCHEDULE,
    CONTRACT_LIST_REQUEST,
    CONTRACT_LIST_SUCCESS,
    CONTRACT_LIST_ERROR,

    CONTRACT_CREATING_REQUEST,
    CONTRACT_CREATING_SUCCESS,
    CONTRACT_CREATING_ERROR,
    CONTRACT_CREATING_RESET,

    CONTRACT_REPAYING_REQUEST,
    CONTRACT_REPAYING_SUCCESS,
    CONTRACT_REPAYING_ERROR,
    CONTRACT_REPAYING_RESET,

    CONTRACT_DETAIL_REQUEST,
    CONTRACT_DETAIL_SUCCESS,
    CONTRACT_DETAIL_ERROR,
    CONTRACT_DETAIL_RESET,

    CONTRACT_UPDATING_REQUEST,
    CONTRACT_UPDATING_SUCCESS,
    CONTRACT_UPDATING_ERROR,
    CONTRACT_UPDATING_RESET,

    CONTRACT_APPROVING_REQUEST,
    CONTRACT_APPROVING_SUCCESS,
    CONTRACT_APPROVING_ERROR,

    CONTRACT_FINDING_REQUEST,
    CONTRACT_FINDING_ERROR,
    CONTRACT_FINDING_SUCCESS,

    CONTRACT_DOCUMENT_REQUEST,
    CONTRACT_DOCUMENT_SUCCESS,

    CONTRACT_SCHEDULE_REQUEST,
    CONTRACT_SCHEDULE_LIST_SUCCESS,

    CONTRACT_TRANSACTION_REQUEST,
    CONTRACT_TRANSACTION_LIST_SUCCESS,
    CONTRACT_SCHEDULE_TOTAL,
    
    CONTRACT_SUMMARY_REQUEST,
    CONTRACT_SUMMARY_RESULT,
    CONTRACT_SUMMARY_ERROR,

    CONTRACT_REPAYMENT_REQUEST,
    CONTRACT_REPAYMENT_SUCCESS,
    CONTRACT_REPAYMENT_ERROR,

    CONTRACT_COUNT,
    CHANGE_CONTRACT_REMINDER,
} from './types'
import {ContractService, ContractError} from '../../../../services/contract.service'
import moment from 'moment'

const has = Object.prototype.hasOwnProperty

export default {

    async changeSchedule({commit}, payload) {
        const schedule = payload.flagSchedule;
        commit(CONTRACT_REPAYMENT_SCHEDULE, schedule)
    },

    async createContract({commit}, payload) {
        commit(CONTRACT_CREATING_REQUEST)

        try {
            const result = await ContractService.createContract(payload)
            commit(CONTRACT_CREATING_SUCCESS, {result})            
        } catch (error) {
            console.log(error)
            if (error instanceof ContractError) {
                commit(CONTRACT_CREATING_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(CONTRACT_CREATING_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async approveContract({commit}, payload) {
        commit(CONTRACT_APPROVING_REQUEST)

        try {
            const result = await ContractService.approveContract(payload)
            commit(CONTRACT_APPROVING_SUCCESS, {result})            
        } catch (error) {
            if (error instanceof ContractError) {
                commit(CONTRACT_APPROVING_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(CONTRACT_APPROVING_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async cancelContract({commit}, payload) {
        commit(CONTRACT_UPDATING_REQUEST)

        try {
            const result = await ContractService.cancelContract(payload.id)
            commit(CONTRACT_UPDATING_SUCCESS, {result})
            
            // case: Cancel renewal contract, set open old contract
            if (has.call(payload, 'oldContractId')) {
                ContractService.updateContract({
                    contractId: payload.oldContractId,
                    status: 'Active',
                })
            }
        } catch (error) {
            if (error instanceof ContractError) {
                commit(CONTRACT_UPDATING_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(CONTRACT_UPDATING_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async resetContractUpdatingResult({commit}) {
        commit(CONTRACT_UPDATING_RESET)
    },

    async resetContractCreatingResult({commit}) {
        commit(CONTRACT_CREATING_RESET)
    },

    async changeContractReminder({commit}, payload) {
        commit(CHANGE_CONTRACT_REMINDER, payload)
    },

    async getContractList({commit}, payload) {
        commit(CONTRACT_LIST_REQUEST)
        try {
            const page = has.call(payload, 'page') ? payload.page : null
            const {contracts, count} = await ContractService.getContractList(page)
            commit(CONTRACT_LIST_SUCCESS, {contracts})
            commit(CONTRACT_COUNT, {count})
        } catch (error) {
            if (error instanceof ContractError) {
                commit(CONTRACT_LIST_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(CONTRACT_LIST_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async getContractByContractId({commit}, payload) {
        commit(CONTRACT_DETAIL_REQUEST)
        try {
            const {contract} = await ContractService.getContractByContractId(payload.id)
            commit(CONTRACT_DETAIL_SUCCESS, {contract})
        } catch (error) {
            if (error instanceof ContractError) {
                commit(CONTRACT_DETAIL_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(CONTRACT_DETAIL_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async resetContractDetail({commit}) {
        commit(CONTRACT_DETAIL_RESET)
    },

    async getContractDocument({commit}, payload) {
        commit(CONTRACT_DOCUMENT_REQUEST)
        try {
            const id = has.call(payload, 'id') ? payload.id : null
            const {docs} = await ContractService.getContractDoucument(id)
            commit(CONTRACT_DOCUMENT_SUCCESS, {docs})
        } catch (error) {
            if (error instanceof ContractError) {
                commit(CONTRACT_LIST_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(CONTRACT_LIST_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async deleteContractDoucument({commit}, payload) {
        try {
            const id = has.call(payload, 'id') ? payload.id : null
            const {docs} = await ContractService.deleteContractDocument(id)
        } catch (error) {
            if (error instanceof ContractError) {
                commit(CONTRACT_LIST_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(CONTRACT_LIST_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async uploadContractDocument({commit}, data) {

        try {
            const {docs} = await ContractService.uploadContractDocument(data)
        } catch(error) {
            if (error instanceof ContractError) {
                commit(CONTRACT_LIST_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(CONTRACT_LIST_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async getContractRepaymentSchedule({commit}, payload) {
        commit(CONTRACT_SCHEDULE_REQUEST)
        try {
            const id = has.call(payload, 'id') ? payload.id : null
            const {contracts, total} = await ContractService.getContractRepaymentSchedule(id)
            commit(CONTRACT_SCHEDULE_LIST_SUCCESS, {contracts})
            commit(CONTRACT_SCHEDULE_TOTAL, {total})
        } catch(error) {
            if (error instanceof ContractError) {
                commit(CONTRACT_LIST_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(CONTRACT_LIST_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async getContractTransactionLog({commit}, payload) {
        commit(CONTRACT_TRANSACTION_REQUEST)
        try {
            const id = has.call(payload, 'id') ? payload.id : null
            const {contracts} = await ContractService.getContractTransactionLog(id)
            commit(CONTRACT_TRANSACTION_LIST_SUCCESS, {contracts})
        } catch(error) {
            if (error instanceof ContractError) {
                commit(CONTRACT_LIST_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(CONTRACT_LIST_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async getContractSummary({commit}, payload) {
        commit(CONTRACT_SUMMARY_REQUEST)
        try {
            const {contracts, total} = await ContractService.getContractSummary(payload.id)
            commit(CONTRACT_SUMMARY_RESULT, {contracts, total})
        } catch(error) {
            if (error instanceof ContractError) {
                commit(CONTRACT_SUMMARY_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                console.log(error)
                commit(CONTRACT_SUMMARY_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },
    
    async updateContract({commit}, payload) {
        commit(CONTRACT_UPDATING_REQUEST)
        try {
            const result = await ContractService.updateContract(payload)
            commit(CONTRACT_UPDATING_SUCCESS, {result})
        } catch(error) {
            if (error instanceof ContractError) {
                commit(CONTRACT_UPDATING_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(CONTRACT_UPDATING_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async getRepayment({commit}, payload) {
        commit(CONTRACT_REPAYMENT_REQUEST)
        try {
            const repayment = await ContractService.getRepayment(payload.id)
            commit(CONTRACT_REPAYMENT_SUCCESS, {repayment})
        } catch(error) {
            if (error instanceof ContractError) {
                commit(CONTRACT_REPAYMENT_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(CONTRACT_REPAYMENT_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async repayContract({commit}, payload) {
        commit(CONTRACT_REPAYING_REQUEST)
        try {
            const result = await ContractService.repayContract(payload)
            commit(CONTRACT_REPAYING_SUCCESS, {result})            
        } catch (error) {
            if (error instanceof ContractError) {
                commit(CONTRACT_REPAYING_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(CONTRACT_REPAYING_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async resetContractRepayingResult({commit}) {
        commit(CONTRACT_REPAYING_RESET)
    },

    async findContractByMifosId({commit, getters}, payload) {
        commit(CONTRACT_FINDING_REQUEST)
        try {
            const contractReminder = getters.contractReminder

            let contracts
            if (contractReminder) {
                contracts = await ContractService.findOverDueContractByMifosId(payload.id)
            } else {
                contracts = await ContractService.findContractByMifosId(payload.id)
            }
             
            commit(CONTRACT_FINDING_SUCCESS, {contracts})
            commit(CONTRACT_COUNT, {count: null})
        } catch (error) {
            if (error instanceof ContractError) {
                commit(CONTRACT_FINDING_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                console.log(error)
                commit(CONTRACT_FINDING_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async getContractOverDue({commit}, payload) {
        commit(CONTRACT_FINDING_REQUEST)
        try {
            const page = has.call(payload, 'page') ? payload.page : null
            const {contracts, count} = await ContractService.getContractOverDue(page)
            commit(CONTRACT_FINDING_SUCCESS, {contracts})
            commit(CONTRACT_COUNT, {count: count})
        } catch (error) {
            if (error instanceof ContractError) {
                commit(CONTRACT_FINDING_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(CONTRACT_FINDING_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },
       
}