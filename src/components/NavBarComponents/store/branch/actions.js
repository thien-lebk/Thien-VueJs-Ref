import {
    CHANGE_BRANCH,
    REMOVE_BRANCH,
    BRANCH_LIST_REQUEST,
    BRANCH_LIST_SUCCESS,
    BRANCH_LIST_ERROR
} from './types'

import{ BranchService, BranchError } from '../../../../services/branch.serivce'
import { CurrentBranchService } from '../../../../services/storage.service'

export default {
    async changeBranch ({ commit }, payload) {
        CurrentBranchService.saveCurrentBranch(payload)
        await commit(CHANGE_BRANCH, payload)
    },
    async getBranchList({commit}) {
        commit(BRANCH_LIST_REQUEST)
        try {
            const result = await BranchService.getAllBranch()
            commit(BRANCH_LIST_SUCCESS, {result})
        } catch (error) {
            if (error instanceof BranchError) {
                commit(BRANCH_LIST_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(BRANCH_LIST_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },
    async removeBranch({commit}) {
        commit(REMOVE_BRANCH)
    } 
}