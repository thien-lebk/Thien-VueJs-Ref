import ApiService from './api.service'
import { getBranchAPI } from '../config/backend-api'

class BranchError extends Error {
    constructor(errorCode, message) {
        super(message)
        this.name = this.constructor.name
        this.message = message
        this.errorCode = errorCode
    }
}

const BranchService = {
    getAllBranch: async function () {
        try {
            const response = await ApiService.get(getBranchAPI)
            const result = await this.filterRawBranchList(response.data)
            return result
        } catch (error) {
            throw new BranchError(error.response.status, error.response.data)
        }
    },

    filterRawBranchList: function(rawData) {
        return rawData.map(item => {
            if (typeof item === 'number') {
                return item
            } else {
                return {
                    id: item.id,
                    name: item.branch_name,
                    address: item.branch_address,
                }
            }
        })
    }
}

export default BranchService

export { BranchService, BranchError }