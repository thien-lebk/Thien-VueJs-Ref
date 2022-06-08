export default  {
    contractRepaymentSchedule: (state) => {
        return state.flagSchedule
    },
    
    contractListRequest: (state) => {
        return state.contractListRequest
    },

    contractListResult: (state) => {
        return state.contractListResult
    },

    contractListErrorCode: (state) => {
        return state.contractListErrorCode
    },

    contractListError: (state) => {
        return state.contractListError
    },
    
    contractCreatingRequest: (state) => {
        return state.contractCreatingRequest
    },

    contractCreatingResult: (state) => {
        return state.contractCreatingResult
    },

    contractCreatingErrorCode: (state) => {
        return state.contractCreatingErrorCode
    },

    contractCreatingError: (state) => {
        return state.contractCreatingError
    },

    contractRepayingRequest: (state) => {
        return state.contractRepayingRequest
    },

    contractRepayingResult: (state) => {
        return state.contractRepayingResult
    },

    contractRepayingErrorCode: (state) => {
        return state.contractRepayingErrorCode
    },

    contractRepayingError: (state) => {
        return state.contractRepayingError
    },

    contractDetailRequest: (state) => {
        return state.contractDetailRequest
    },

    contractDetail: (state) => {
        return state.contractDetail
    },

    contractDetailErrorCode: (state) => {
        return state.contractDetailErrorCode
    },

    contractDetailError: (state) => {
        return state.contractDetailError
    },

    contractUpadtingRequest: (state) => {
        return state.contractUpadtingRequest
    },

    contractUpadtingErrorCode: (state) => {
        return state.contractUpadtingErrorCode
    },

    contractUpadtingError: (state) => {
        return state.contractUpadtingError
    },

    contractApprovingRequest: (state) => {
        return state.contractApprovingRequest
    },

    contractApprovingResult: (state) => {
        return state.contractApprovingResult
    },

    contractApprovingErrorCode: (state) => {
        return state.contractApprovingErrorCode
    },

    contractApprovingError: (state) => {
        return state.contractApprovingError
    },

    documentListResult: (state) => {
        return state.documentListResult
    },

    documentListRequest: (state) => {
        return state.documentListRequest
    },

    scheduleListResult: (state) => {
        return state.scheduleListResult
    },

    scheduleListRequest: (state) => {
        return state.scheduleListRequest
    },

    transactionListResult: (state) => {
        return state.transactionListResult
    },

    transactionListRequest: (state) => {
        return state.transactionListRequest
    },

    contractTotalResult: (state) => {
        return state.contractTotalResult
    },
    
    summaryDetailRequest: (state) => {
        return state.summaryDetailRequest
    },
    
    summaryDetailResult: (state) => {
        return state.summaryDetailResult
    },

    summaryDetailErrorCode: (state) => {
        return state.summaryDetailErrorCode
    },

    contractTotalSummaryResult: (state) => {
        return state.contractTotalSummaryResult
    },

    contractCountResult: (state) => {
        return state.contractCountResult
    },

    contractFindingErrorCode: (state) => {
        return state.contractFindingErrorCode
    },

    contractRepaymentRequest: (state) => {
        return state.contractRepaymentRequest
    },

    contractRepaymentResult: (state) => {
        return state.contractRepaymentResult
    },

    contractRepaymentErrorCode: (state) => {
        return state.contractRepaymentErrorCode
    },

    contractRepaymentError: (state) => {
        return state.contractRepaymentError
    },

    contractDueDate: (state) => {
        try {
            return state.contractDetail.dueDate
        } catch (error) {
            return null
        }
    },
    contractReminder: (state) => {
        return state.contractReminder
    },

}
