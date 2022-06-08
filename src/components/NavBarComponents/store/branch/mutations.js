import Vue from 'vue'

import {
    CHANGE_BRANCH,
    REMOVE_BRANCH,
    BRANCH_LIST_REQUEST,
    BRANCH_LIST_SUCCESS,
    BRANCH_LIST_ERROR
} from './types'

export default {
    [CHANGE_BRANCH] (state, {name, id}) {
        state.currentBranch = name
        state.currentBranchID = id
    },
    [REMOVE_BRANCH] (state) {
        state.currentBranch = null
        state.currentBranchID = null
    },
    [BRANCH_LIST_REQUEST] (state) {
        state.branchListRequest = true
        state.branchListResult = []
        state.branchListErrorCode = 0
        state.branchListError = ''
    },
    [BRANCH_LIST_SUCCESS] (state, {result}) {
        state.branchListRequest = true
        state.branchListResult = result
        state.branchListErrorCode = 200
        state.branchListError = ''
    },
    [BRANCH_LIST_ERROR] (state, {errorCode, errorMessage}) {
        state.branchListRequest = true
        state.branchListErrorCode = errorCode
        state.branchListError = errorMessage
    },
}