export default function initialState () {
    return {
        customerListUploadingRequest: false,
        customerListUploadingErrorCode: 0,
        customerListUploadingError: '',

        customerListRequest: false,
        customerListResult: [],
        customerListErrorCode: 0,
        customerListError: '',

        customerListDetailRequest: false,
        customerListDetailResult: null,
        customerListDetailErrorCode: 0,
        customerListDetailError: '',

        customerListDeletingRequest: false,
        customerListDeletingErrorCode: 0,
        customerListDeletingError: '',
    }
}