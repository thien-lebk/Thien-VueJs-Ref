export default function initialState () {
    return {
        //Promotion List Function
        promotionListRequest: false,
        promotionListResult: [],
        promotionListErrorCode: 0,
        promotionListError: '',

        //Promotion Creating Function
        promotionCreatingRequest: false,
        promotionCreatingResult: null,
        promotionCreatingErrorCode: 0,
        promotionCreatingError: '',

        //Promotion Updating Function
        promotionUpdatingRequest: false,
        promotionUpdatingResult: null,
        promotionUpdatingErrorCode: 0,
        promotionUpdatingError: '',

        //Promotion Deleting Function
        promotionDeletingRequest: false,
        promotionDeletingErrorCode: 0,
        promotionDeletingError: '',

        //Promotion Detail Function
        promotionDetailRequest: false,
        promotionDetailForm: false,
        promotionDetail: {},
        promotionDetailErrorCode: 0,
        promotionDetailError: '',
    }
}