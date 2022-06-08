import {
    CUSTOMER_LIST_UPLOADING_REQUEST,
    CUSTOMER_LIST_UPLOADING_SUCCESS,
    CUSTOMER_LIST_UPLOADING_ERROR,

    CUSTOMER_LIST_REQUEST,
    CUSTOMER_LIST_SUCCESS,
    CUSTOMER_LIST_ERROR,

    CUSTOMER_LIST_DETAIL_REQUEST,
    CUSTOMER_LIST_DETAIL_SUCCESS,
    CUSTOMER_LIST_DETAIL_ERROR,

    CUSTOMER_LIST_DELETING_REQUEST,
    CUSTOMER_LIST_DELETING_SUCCESS,
    CUSTOMER_LIST_DELETING_ERROR,
} from './types'
import { CustomerListService, CustomerListError } from '../../../../../services/customer_list.service'
import { CeleryService, CeleryError } from '../../../../../services/celery.service'

export default {
    async uploadCustomerList({commit}, payload) {
        commit(CUSTOMER_LIST_UPLOADING_REQUEST)
        try {
            const {taskId} = await CustomerListService.uploadCustomerList(payload)

            const schedule = setInterval(async () => {
                try {
                    
                    const {status} = await CeleryService.getStatusFromTaskId(taskId)

                    if (status === 'SUCCESS') {

                        commit(CUSTOMER_LIST_UPLOADING_SUCCESS)
                        clearInterval(schedule)

                    } else if (status === 'FAILURE') {

                        commit(CUSTOMER_LIST_UPLOADING_ERROR, {errorCode: 400, errorMessage: "File Excel có vấn đề"})
                        clearInterval(schedule)

                    }

                } catch (error) {
                    if (error instanceof CeleryError) {
                        commit(CUSTOMER_LIST_UPLOADING_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
                    } else {
                        commit(CUSTOMER_LIST_UPLOADING_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
                    }
                    clearInterval(schedule)
                }
            }, 3000)
        } catch(error) {
            if (error instanceof CustomerListError) {
                commit(CUSTOMER_LIST_UPLOADING_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(CUSTOMER_LIST_UPLOADING_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async getCustomerList({commit}) {
        commit(CUSTOMER_LIST_REQUEST)
        try {
            const customerList = await CustomerListService.getCustomerList()
            commit(CUSTOMER_LIST_SUCCESS, {customerList})
        } catch (error) {
            if (error instanceof CustomerListError) {
                commit(CUSTOMER_LIST_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(CUSTOMER_LIST_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async getCustomerListDetailFromId({commit}, payload) {
        commit(CUSTOMER_LIST_DETAIL_REQUEST)
        try {
            const customerListDetail = await CustomerListService.getCustomerListDetailFromId(payload.id)
            commit(CUSTOMER_LIST_DETAIL_SUCCESS, {customerListDetail})
        } catch (error) {
            if (error instanceof CustomerListError) {
                commit(CUSTOMER_LIST_DETAIL_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(CUSTOMER_LIST_DETAIL_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async deleteCustomerList({commit}, payload) {
        commit(CUSTOMER_LIST_DELETING_REQUEST)
        try {
            await CustomerListService.deleteCustomerList(payload.id)
            commit(CUSTOMER_LIST_DELETING_SUCCESS)
        } catch (error) {
            if (error instanceof CustomerListError) {
                commit(CUSTOMER_LIST_DELETING_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(CUSTOMER_LIST_DELETING_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
            console.log(error)
        }
    },
}