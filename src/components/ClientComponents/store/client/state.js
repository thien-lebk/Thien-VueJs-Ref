export default function initialState () {
    return {
        //Client Search Function
        clientSearching: false,
        clientSearchResult: null,
        clientSearchErrorCode: 0,
        clientSearchError: '',
        
        // Client Creating Function
        clientCreatingRequest: false,
        clientCreatingResult: null,
        clientCreatingErrorCode: 0,
        clientCreatingError: '',

        // Client Updating Function
        clientUpdatingRequest: false,
        clientUpdatingResult: null,
        clientUpdatingErrorCode: 0,
        clientUpdatingError: '',

        // Client Detail Function
        clientDetailRequest: false,
        clientDetailResult: null,
        clientDetailErrorCode: 0,
        clientDetailError: '',
    }
}