export default function initialState () {
    return {
        // Call Campaign List Function
        callCampaignListRequest: false,
        callCampaignListResult: [],
        callCampaignListErrorCode: 0,
        callCampaignListError: '',

        // Campaign Creating Function
        campaignCreatingRequest: false,
        campaignCreatingResult: null,
        campaignCreatingErrorCode: 0,
        campaignCreatingError: '',

        // Campaign Updating Function
        campaignUpdatingRequest: false,
        campaignUpdatingResult: null,
        campaignUpdatingErrorCode: 0,
        campaignUpdatingError: '',

        // Campaign Deleting Function
        campaignDeletingRequest: false,
        campaignDeletingErrorCode: 0,
        campaignDeletingError: '',

        // Call Campaign Detail Form Function
        callCampaignDetailForm: false,
        callCampaignDetailRequest: false,
        callCampaignDetail: null,
        callCampaignDetailErrorCode: 0,
        callCampaignDetailError: '',
    }
}