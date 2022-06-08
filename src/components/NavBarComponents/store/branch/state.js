import { CurrentBranchService } from '../../../../services/storage.service';

export default function initialState() {
    return {
        //Current Branch
        currentBranch: CurrentBranchService.getCurrentBranchName(),
        currentBranchID: CurrentBranchService.getCurrentBranchID(),
        //For Branch API
        branchListRequest: false,
        branchListResult: [],
        branchListErrorCode: 0,
        branchListError: '',
    }
}