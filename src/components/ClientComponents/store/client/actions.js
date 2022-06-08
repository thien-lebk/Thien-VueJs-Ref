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
import {ClientService, ClientError} from '../../../../services/client.service'

const has = Object.prototype.hasOwnProperty

export default {
    async searchClient({commit}, payload) {
        commit(CLIENT_SEARCHING_REQUEST)
        try {
            if (has.call(payload, 'phone')) {
                const result = await ClientService.getClientByPhone(payload.phone)
                commit(CLIENT_SEARCHING_SUCCESS, {result})
            } else if (has.call(payload, 'nationalId')) {
                const result = await ClientService.getClientByNationalID(payload.nationalId)
                commit(CLIENT_SEARCHING_SUCCESS, {result})
            } else {
                commit(CLIENT_SEARCHING_ERROR, {errorCode: 500, errorMessage: "No keyword"})
            }
            
        } catch (error) {
            if (error instanceof ClientError) {
                commit(CLIENT_SEARCHING_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(CLIENT_SEARCHING_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async resetClientSearch({commit}) {
        commit(CLIENT_SEARCHING_RESET)
    },

    async createClient({commit}, payload) {
        commit(CLIENT_CREATING_REQUEST)
        try {
            const result = await ClientService.createClient(payload)
            commit(CLIENT_CREATING_SUCCESS, {result})
        } catch (error) {
            if (error instanceof ClientError) {
                commit(CLIENT_CREATING_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(CLIENT_CREATING_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async resetClientCreatingResult({commit}) {
        commit(CLIENT_CREATING_RESET)
    },

    async updateClient({commit}, payload) {
        commit(CLIENT_UPDATING_REQUEST)
        try {
            const result = await ClientService.updateClient(payload)
            commit(CLIENT_UPDATING_SUCCESS, {result})
        } catch (error) {
            if (error instanceof ClientError) {
                commit(CLIENT_UPDATING_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(CLIENT_UPDATING_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async resetClientUpdatingResult({commit}) {
        commit(CLIENT_UPDATING_RESET)
    },

    async getClientById({commit}, payload) {
        commit(CLIENT_DETAIL_REQUEST)
        try {
            const result = await ClientService.getClientById(payload.id)
            commit(CLIENT_DETAIL_SUCCESS, {result})
        } catch (error) {
            if (error instanceof ClientError) {
                commit(CLIENT_DETAIL_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(CLIENT_DETAIL_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async resetClientDetail({commit}) {
        commit(CLIENT_DETAIL_RESET)
    },
}