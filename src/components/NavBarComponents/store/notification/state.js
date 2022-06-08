export default function initialState() {
    return {
        newNotificationResult: [],
        newNotificationErrorCode: 0,
        newNotificationError: '',

        notificationResult: [],
        notificationErrorCode: 0,
        notificationError: '',

        notificationUpdatingRequest: false,
        notificationUpdatingResult: null,
        notificationUpdatingErrorCode: 0,
        notificationUpdatingError: '',
    }
}