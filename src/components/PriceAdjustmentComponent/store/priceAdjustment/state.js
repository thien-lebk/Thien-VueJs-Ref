export default function initialState () {
    return {
        priceAdjustmentListRequest: false,
        priceAdjustmentListResult: [],
        priceAdjustmentListErrorCode: 0,
        priceAdjustmentListError: '',
        priceAdjustmentCountResult: 0,

        priceAdjustmentFindingRequest: false,
        priceAdjustmentFindingErrorCode: 0,
        priceAdjustmentFindingError: '',
    }
}