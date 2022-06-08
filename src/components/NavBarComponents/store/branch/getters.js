export default  {
    currentBranch: (state) => {
        return state.currentBranch
    },
    currentBranchID: (state) => {
        return state.currentBranchID
    },
    currentBranchAddress: (state) => {
        for (let branch of state.branchListResult) {
            if (branch.id === state.currentBranchID) {
                return branch.address
            }
        }
    },
    branchListRequest: (state) => {
        return state.branchListRequest
    },
    branchListResult: (state) => {
        return state.branchListResult
    },
    branchListErrorCode: (state) => {
        return state.branchListErrorCode
    },
    branchListError: (state) => {
        return state.branchListError
    },
}