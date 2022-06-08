export default function initialState() {
    return {
        // SAsset List Getting Function
        SAssetListRequest: false,
        SAssetListResult: [],
        SAssetListErrorCode: 0,
        SAssetListError: '',

        // CAsset Updating Function
        CAssetUpdatingRequest: false,
        CAssetUpdatingResult: null,
        CAssetUpdatingErrorCode: 0,
        CAssetUpdatingError: '',

        // CAsset Creating Function
        CAssetCreatingRequest: false,
        CAssetCreatingResult: null,
        CAssetCreatingErrorCode: 0,
        CAssetCreatingError: '',
    }
}