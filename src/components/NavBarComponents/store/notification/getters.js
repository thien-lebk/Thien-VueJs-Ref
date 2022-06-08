export default  {
    newNotificationResult: (state) => {
        return state.newNotificationResult
    },
    newNormalNotificationResult: (state) => {
        return state.newNotificationResult.filter(item => item.type !== 'misscall')
    },
    newCallNotificationResult: (state) => {
        return state.newNotificationResult.filter(item => item.type === 'misscall')
    },
    newNotificationErrorCode: (state) => {
        return state.newNotificationErrorCode
    },
    newNotificationError: (state) => {
        return state.newNotificationError
    },
    notificationResult: (state) => {
        return state.notificationResult
    },
    normalNotificationResult: (state) => {
        return state.notificationResult.filter(item => item.type !== 'misscall')
    },
    callNotificationResult: (state) => {
        return state.notificationResult.filter(item => item.type === 'misscall')
    },
    notificationErrorCode: (state) => {
        return state.notificationErrorCode
    },
    notificationError: (state) => {
        return state.notificationError
    },
    notificationUpdatingRequest: (state) => {
        return state.notificationUpdatingRequest
    },
    notificationUpdatingResult: (state) => {
        return state.notificationUpdatingResult
    },
    notificationUpdatingErrorCode: (state) => {
        return state.notificationUpdatingErrorCode
    },
    notificationUpdatingError: (state) => {
        return state.notificationUpdatingError
    },
}