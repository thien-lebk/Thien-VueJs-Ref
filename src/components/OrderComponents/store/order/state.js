export default function initialState () {
    return {
        
        //Order Creating Function
        orderCreating: false,
        orderCreatingResult: null,
        orderCreatingErrorCode: 0,
        orderCreatingError: '',

        //Order Detail
        orderUpdating: false,
        orderUpdatingResult: null,
        orderUpdatingErrorCode: 0,
        orderUpdatingError: '',

        //Order List Getting Function
        orderListRequest: false,
        orderListResult: [],
        orderListErrorCode: 0,
        orderListError: '',
        
        //Order Call List Getting Function
        campaignOrderListRequest: false,
        campaignOrderListResult: [],
        campaignOrderListErrorCode: 0,
        campaignOrderListError: '',

        //Order Count
        orderCountResult: null,
        campaignOrderCampaignCountResult: null,

        // to turn on/off interval call api get order
        isOrderFinding: false,

        orderFindingRequest: false,
        orderFindingResult: [],
        orderFindingErrorCode: 0,
        orderFindingError: '',

        orderFilterFindingRequest: false,
        orderFilterFindingResult: [],
        orderFilterFindingErrorCode: 0,
        orderFilterFindingError: '',

        //Order Detail
        orderDetailForm: false,
        orderDetailRequest: false,
        orderDetailResult: null,
        orderDetailErrorCode: 0,
        orderDetailError: '',

        //Campaign Order Detail
        campaignOrderDetailForm: false,
        campaignOrderDetailRequest: false,
        campaignOrderDetailResult: null,
        campaignOrderDetailErrorCode: 0,
        campaignOrderDetailError: '',

        //Temporary Saved Order
        temporaryOrderDetail: null,
    }
}