import {
    CUSTOMER_REPAYMENT_SCHEDULE,
    CUSTOMER_LIST_REQUEST,
    CUSTOMER_LIST_SUCCESS,
    CUSTOMER_LIST_ERROR,
    CUSTOMER_DETAIL_REQUEST,
    CUSTOMER_DETAIL_SUCCESS,
    CUSTOMER_DETAIL_ERROR,
    CUSTOMER_FINDING_REQUEST,
    CUSTOMER_FINDING_ERROR,
    CUSTOMER_DOCUMENT_REQUEST,
    CUSTOMER_DOCUMENT_SUCCESS,
    CUSTOMER_SCHEDULE_REQUEST,
    CUSTOMER_SCHEDULE_LIST_SUCCESS,
    CUSTOMER_TRANSACTION_REQUEST,
    CUSTOMER_TRANSACTION_LIST_SUCCESS,
    CUSTOMER_SCHEDULE_TOTAL,
    CUSTOMER_SUMMARY_REQUEST,
    CUSTOMER_SUMMARY_RESULT,
    CUSTOMER_SUMMARY_TOTAL,
	CONTRACT_ACTIVE_REQUEST,
    CONTRACT_ACTIVE_RESULT,
    CONTRACT_CLOSE_REQUEST,
    CONTRACT_CLOSE_RESULT,    
    BANK_ACCOUT_REQUEST,
    BANK_ACCOUT_RESULT,
    CUSTOMER_TH_SUCCESS,
    CUSTOMER_TH_ERROR,
    CUSTOMER_TH_REQUEST
} from './types'
import {CustomerService, CustomerError} from '../../../../services/customer.service'

const has = Object.prototype.hasOwnProperty

export default {
    async getCustomerList({commit}, payload) {
        commit(CUSTOMER_LIST_REQUEST)
        try {
            const page = has.call(payload, 'page') ? payload.page : null
            const condition = has.call(payload, 'condition') ? payload.condition : null
            const {customers, count} = await CustomerService.getCustomerList(page, condition)
            commit(CUSTOMER_LIST_SUCCESS, {customers, count})
        } catch (error) {
            if (error instanceof CustomerError) {
                commit(CUSTOMER_LIST_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(CUSTOMER_LIST_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async getCustomerByCustomerId({commit}, payload) {
        commit(CUSTOMER_DETAIL_REQUEST)
        try {
            const id = has.call(payload, 'id') ? payload.id : null
            const {customer} = await CustomerService.getCustomerByCustomerId(id)
            commit(CUSTOMER_DETAIL_SUCCESS, {customer})
        } catch (error) {
            if (error instanceof CustomerError) {
                commit(CUSTOMER_DETAIL_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(CUSTOMER_DETAIL_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async getCustomerTransactionHistory({commit}, payload) {
        commit(CUSTOMER_TH_REQUEST)
        try {
            const id = has.call(payload, 'id') ? payload.id : null
            const {customerTH} = await CustomerService.getCustomerTransactionHistory(id)
            commit(CUSTOMER_TH_SUCCESS, {customerTH})
        } catch (error) {
            if (error instanceof CustomerError) {
                commit(CUSTOMER_TH_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(CUSTOMER_TH_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async getCustomerDocument({commit}, payload) {
        commit(CUSTOMER_DOCUMENT_REQUEST)
        try {
            const id = has.call(payload, 'id') ? payload.id : null
            const {docs} = await CustomerService.getCustomerDoucument(id)
            commit(CUSTOMER_DOCUMENT_SUCCESS, {docs})
        } catch (error) {
            if (error instanceof CustomerError) {
                commit(CUSTOMER_LIST_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(CUSTOMER_LIST_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async deleteCustomerDoucument({commit}, payload) {
        try {
            const id = has.call(payload, 'id') ? payload.id : null
            const {docs} = await CustomerService.deleteCustomerDocument(id)
        } catch (error) {
            if (error instanceof CustomerError) {
                commit(CUSTOMER_LIST_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(CUSTOMER_LIST_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async uploadCustomerDocument({commit}, data) {

        try {
            const {docs} = await CustomerService.uploadCustomerDocument(data)
        } catch(error) {
            if (error instanceof CustomerError) {
                commit(CUSTOMER_LIST_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(CUSTOMER_LIST_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async updateNote({commit}, payload) {
        try {
            const id = has.call(payload, 'id') ? payload.id : null
            const data = has.call(payload, 'data') ? payload.data : null
            const {cus} = await CustomerService.updateNote(id, data)
        } catch(error) {
            if (error instanceof CustomerError) {
                commit(CUSTOMER_LIST_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(CUSTOMER_LIST_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async updateCustomer({commit}, payload) {
        try {
            const id = has.call(payload, 'id') ? payload.id : null
            const customer = has.call(payload, 'customer') ? payload.customer : null
            const {cus} = await CustomerService.updateCustomer(id, customer)
        } catch(error) {
            if (error instanceof CustomerError) {
                commit(CUSTOMER_LIST_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(CUSTOMER_LIST_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async getContractActive({commit}, payload) {
        commit(CONTRACT_ACTIVE_REQUEST)
        try {
            const id = has.call(payload, 'id') ? payload.id : null
            const {cus} = await CustomerService.getContractActive(id)
            commit(CONTRACT_ACTIVE_RESULT, {cus})

        } catch(error) {
            if (error instanceof CustomerError) {
                commit(CUSTOMER_LIST_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(CUSTOMER_LIST_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async getContractClose({commit}, payload) {
        commit(CONTRACT_CLOSE_REQUEST)
        try {
            const id = has.call(payload, 'id') ? payload.id : null
            const {cus} = await CustomerService.getContractClose(id)
            commit(CONTRACT_CLOSE_RESULT, {cus})

        } catch(error) {
            if (error instanceof CustomerError) {
                commit(CUSTOMER_LIST_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(CUSTOMER_LIST_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async getBankAccout({commit}, payload) {
        commit(BANK_ACCOUT_REQUEST)
        try {
            const id = has.call(payload, 'id') ? payload.id : null
            const {cus} = await CustomerService.getBankAccout(id)
            commit(BANK_ACCOUT_RESULT, {cus})
        } catch(error) {
            if (error instanceof CustomerError) {
                commit(CUSTOMER_LIST_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(CUSTOMER_LIST_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async uploadBankAccout({commit}, payload) {
        try {
            const data = has.call(payload, 'data') ? payload.data : null
            const {cus} = await CustomerService.uploadBankAccout(data)
        } catch(error) {
            if (error instanceof CustomerError) {
                commit(CUSTOMER_LIST_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(CUSTOMER_LIST_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async deleteBankAccout({commit}, payload) {
        try {
            const id = has.call(payload, 'id') ? payload.id : null
            const {cus} = await CustomerService.deleteBankAccout(id)
        } catch(error) {
            if (error instanceof CustomerError) {
                commit(CUSTOMER_LIST_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(CUSTOMER_LIST_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async updateBankAccout({commit}, payload) {
        try {
            const id = has.call(payload, 'id') ? payload.id : null
            const data = has.call(payload, 'data') ? payload.data : null
            const {cus} = await CustomerService.updateBankAccout(id, data)
        } catch(error) {
            if (error instanceof CustomerError) {
                commit(CUSTOMER_LIST_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(CUSTOMER_LIST_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async getCustomerSummary({commit}, payload) {
        commit(CUSTOMER_SUMMARY_REQUEST)
        try {
            const id = has.call(payload, 'id') ? payload.id : null
            const {customers, total} = await CustomerService.getCustomerSummary(id)
            commit(CUSTOMER_SUMMARY_RESULT, {customers})
            commit(CUSTOMER_SUMMARY_TOTAL, {total})
        } catch(error) {
            if (error instanceof CustomerError) {
                commit(CUSTOMER_LIST_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(CUSTOMER_LIST_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },
    
}