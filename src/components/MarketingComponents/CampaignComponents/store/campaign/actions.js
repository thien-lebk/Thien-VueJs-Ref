import {
    CALL_CAMPAIGN_LIST_REQUEST,
    CALL_CAMPAIGN_LIST_SUCCESS,
    CALL_CAMPAIGN_LIST_ERROR,

    CAMPAIGN_SEARCHING_REQUEST,
    CAMPAIGN_SEARCHING_SUCCESS,
    CAMPAIGN_SEARCHING_ERROR,

    CAMPAIGN_CREATING_REQUEST,
    CAMPAIGN_CREATING_SUCCESS,
    CAMPAIGN_CREATING_ERROR,

    CAMPAIGN_UPDATING_REQUEST,
    CAMPAIGN_UPDATING_SUCCESS,
    CAMPAIGN_UPDATING_ERROR,

    CALL_CAMPAIGN_DETAIL_FORM_REQUEST,
    CALL_CAMPAIGN_DETAIL_FORM_SUCCESS,
    CALL_CAMPAIGN_DETAIL_FORM_ERROR,
    TURN_OFF_CALL_CAMPAIGN_DIALOG,

    CAMPAIGN_DELETING_REQUEST,
    CAMPAIGN_DELETING_SUCCESS,
    CAMPAIGN_DELETING_ERROR,
} from './types'

import { CampaignService, CampaignError } from '../../../../../services/campaign.service'
import { CeleryService, CeleryError } from '../../../../../services/celery.service'

export default {
    async getCallCampaignList({commit}, payload={}) {
        commit(CALL_CAMPAIGN_LIST_REQUEST)
        
        const params = {
            ...payload,
            type: 'Call',
        }

        try {
            const campaigns = await CampaignService.getCampaignList(params)
            commit(CALL_CAMPAIGN_LIST_SUCCESS, {campaigns})
        } catch (error) {
            if (error instanceof CampaignError) {
                commit(CALL_CAMPAIGN_LIST_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(CALL_CAMPAIGN_LIST_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async createCampaign({commit}, payload) {
        commit(CAMPAIGN_CREATING_REQUEST)

        try {
            const { taskId } = await CampaignService.createCampaign(payload)

            const schedule = setInterval(async () => {
                try {
                    
                    const result = await CeleryService.getStatusFromTaskId(taskId)

                    if (result.status === 'SUCCESS') {

                        commit(CAMPAIGN_CREATING_SUCCESS, {orderTotal: result.order_total})
                        clearInterval(schedule)

                    } else if (result.status === 'FAILURE') {

                        commit(CAMPAIGN_CREATING_ERROR, {errorCode: 400, errorMessage: "Tạo order có vấn đề"})
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

        } catch (error) {
            if (error instanceof CampaignError) {
                commit(CAMPAIGN_CREATING_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(CAMPAIGN_CREATING_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async updateCampaign({commit}, payload) {
        commit(CAMPAIGN_UPDATING_REQUEST)

        try {
            const campaign = await CampaignService.updateCampaign(payload)
            commit(CAMPAIGN_UPDATING_SUCCESS, {campaign})
        } catch (error) {
            if (error instanceof CampaignError) {
                commit(CAMPAIGN_UPDATING_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(CAMPAIGN_UPDATING_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async deleteCampaign({commit}, payload) {
        commit(CAMPAIGN_DELETING_REQUEST)

        try {
            await CampaignService.deleteCampaign(payload.id)
            commit(CAMPAIGN_DELETING_SUCCESS)
        } catch (error) {
            if (error instanceof CampaignError) {
                commit(CAMPAIGN_DELETING_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(CAMPAIGN_DELETING_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async getCampaignDetail({commit, getters}, payload) {
        commit(CALL_CAMPAIGN_DETAIL_FORM_REQUEST)
        const callCampaignListResult = getters.callCampaignListResult
        const detail = callCampaignListResult.find(item => item.id === payload.id)

        if (detail !== undefined) {
            commit(CALL_CAMPAIGN_DETAIL_FORM_SUCCESS, {detail})
        } else {
            commit(CALL_CAMPAIGN_DETAIL_FORM_ERROR, {errorCode: 404, errorMessage: "Not found"})
        }
    },

    async turnOffCallCampaignDialog({commit}) {
        commit(TURN_OFF_CALL_CAMPAIGN_DIALOG)
    },
}