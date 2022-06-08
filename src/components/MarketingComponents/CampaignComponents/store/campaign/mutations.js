import {
    CALL_CAMPAIGN_LIST_REQUEST,
    CALL_CAMPAIGN_LIST_SUCCESS,
    CALL_CAMPAIGN_LIST_ERROR,
    
    CAMPAIGN_SEARCHING_REQUEST,
    CAMPAIGN_SEARCHING_SUCCESS,
    CAMPAIGN_SEARCHING_ERROR,
    CAMPAIGN_SEARCHING_RESET,

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

export default {
    // Call Campaign List Function
    [CALL_CAMPAIGN_LIST_REQUEST] (state) {
        state.callCampaignListRequest = true
        state.callCampaignListResult = []
        state.promotionListErrorCode = 0
        state.promotionListError = ''
    },
    [CALL_CAMPAIGN_LIST_SUCCESS] (state, {campaigns}) {
        state.callCampaignListRequest = false
        state.callCampaignListResult = campaigns
        state.promotionListErrorCode = 200
    },
    [CALL_CAMPAIGN_LIST_ERROR] (state, {errorCode, errorMessage}) {
        state.callCampaignListRequest = false
        state.promotionListErrorCode = errorCode
        state.promotionListError = errorMessage
    },

    // Campaign Creating Function
    [CAMPAIGN_CREATING_REQUEST] (state) {
        state.campaignCreatingRequest = true
        state.campaignCreatingResult = null
        state.campaignCreatingErrorCode = 0
        state.campaignCreatingError = ''
    },
    [CAMPAIGN_CREATING_SUCCESS] (state, result) {
        state.campaignCreatingRequest = false
        state.campaignCreatingResult = result
        state.campaignCreatingErrorCode = 201
    },
    [CAMPAIGN_CREATING_ERROR] (state, {errorCode, errorMessage}) {
        state.campaignCreatingRequest = false
        state.campaignCreatingErrorCode = errorCode
        state.campaignCreatingError = errorMessage
    },

    // Campaign Updating Function
    [CAMPAIGN_UPDATING_REQUEST] (state) {
        state.campaignUpdatingRequest = true
        state.campaignUpdatingResult = null
        state.campaignUpdatingErrorCode = 0
        state.campaignUpdatingError = ''
    },

    [CAMPAIGN_UPDATING_SUCCESS] (state, {campaign}) {
        state.campaignUpdatingRequest = false
        state.campaignUpdatingResult = campaign
        state.campaignUpdatingErrorCode = 200
    },

    [CAMPAIGN_UPDATING_ERROR] (state, {errorCode, errorMessage}) {
        state.campaignUpdatingRequest = false
        state.campaignUpdatingErrorCode = errorCode
        state.campaignUpdatingError = errorMessage
    },

    // Campaign Deleting Function
    [CAMPAIGN_DELETING_REQUEST] (state) {
        state.campaignDeletingRequest = true
        state.campaignDeletingErrorCode = 0
        state.campaignDeletingError = ''
    },

    [CAMPAIGN_DELETING_SUCCESS] (state) {
        state.campaignDeletingRequest = false
        state.campaignDeletingErrorCode = 200
    },

    [CAMPAIGN_DELETING_ERROR] (state, {errorCode, errorMessage}) {
        state.campaignDeletingRequest = false
        state.campaignDeletingErrorCode = errorCode
        state.campaignDeletingError = errorMessage
    },

    // Get Call Campaign Detail Form
    [CALL_CAMPAIGN_DETAIL_FORM_REQUEST] (state) {
        state.callCampaignDetailForm = false
        state.callCampaignDetail = null
        state.callCampaignDetailErrorCode = 0
        state.callCampaignDetailError = ''
    },
    [CALL_CAMPAIGN_DETAIL_FORM_SUCCESS] (state, {detail}) {
        state.callCampaignDetailForm = true
        state.callCampaignDetail = detail
        state.callCampaignDetailErrorCode = 200
        state.callCampaignDetailError = ''
    },
    [CALL_CAMPAIGN_DETAIL_FORM_ERROR] (state, {errorCode, errorMessage}) {
        state.callCampaignDetailForm = false
        state.callCampaignDetailErrorCode = errorCode
        state.callCampaignDetailError = errorMessage
    },
    [TURN_OFF_CALL_CAMPAIGN_DIALOG] (state) {
        state.callCampaignDetailForm = false
    },
}