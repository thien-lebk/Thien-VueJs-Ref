export default  {
    enabled: (state) => {
        return state.enabled
    },

    session: (state) => {
        return state.session
    },
    
    windowOpen: (state) => {
        return state.windowOpen
    },
    
    callBox: (state) => {
        return state.callBox
    },

    dialPad: (state) => {
        return state.dialPad
    },

    calling: (state) => {
        return state.calling
    },

    ring: (state) => {
        return state.ring
    },

    step: (state) => {
        return state.step
    },

    error: (state) => {
        return state.error
    },

    volume: (state) => {
        return state.volume
    },

    callID: (state) => {
        return state.callID
    },

    callUpdating: (state) => {
        return state.callUpdating
    },

    orderId: (state) => {
        return state.orderId
    },

    customerPhone: (state) => {
        return state.customerPhone
    },

    customerName: (state) => {
        return state.customerName
    },

    customerId: (state) => {
        return state.customerId
    },

    customerOrderResult: (state) => {
        return state.customerOrderResult
    },
    
    requestType: (state) => {
        return state.requestType
    },

    byEmployee: (state) => {
        return state.byEmployee
    },
}
