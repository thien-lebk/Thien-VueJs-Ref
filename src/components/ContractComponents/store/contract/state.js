export default function initialState () {
    return {
        // payment schedule
        flagSchedule: false,
        contractListRequest: false,
        contractListResult: [],
        contractListErrorCode: 0,
        contractListError: '',

        // Contract Creating Function
        contractCreatingRequest: false,
        contractCreatingResult: null,
        contractCreatingErrorCode: 0,
        contractCreatingError: '',

        // Contract Repaying Function
        contractRepayingRequest: false,
        contractRepayingResult: null,
        contractRepayingErrorCode: 0,
        contractRepayingError: '',

        contractDetailRequest: false,
        contractDetail: null,
        contractDetailErrorCode: 0,
        contractDetailError: '',

        contractUpadtingRequest: false,
        contractUpadtingErrorCode: 0,
        contractUpadtingError: '',

        contractApprovingRequest: false,
        contractApprovingResult: null,
        contractApprovingErrorCode: 0,
        contractApprovingError: '',

        contractFindingError: '',
        contractFindingErrorCode: 0,

        documentListResult: [],
        documentListRequest: false,

        scheduleListResult: [],
        scheduleListRequest: false,

        transactionListResult: [],
        transactionListRequest: false,

        contractTotalResult: null,
        contractTotalSummaryResult: null,

        summaryDetailRequest: false,
        summaryDetailResult: null,
        summaryDetailErrorCode: 0,
        summaryDetailError: '',
        
        contractRepaymentRequest: false,
        contractRepaymentResult: null,
        contractRepaymentErrorCode: 0,
        contractRepaymentError: '',

        contractCountResult: null,

        contractDueDate: null,
        

        contractReminder: false

    }
}