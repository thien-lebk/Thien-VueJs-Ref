import ApiService from './api.service'
import { celeryStatusAPI } from '../config/backend-api'

class CeleryError extends Error {
    constructor(errorCode, message) {
        super(message)
        this.name = this.constructor.name
        this.message = message
        this.errorCode = errorCode
    }
}

const CeleryService = {
    getStatusFromTaskId: async function(taskId) {
        const url = `${celeryStatusAPI}?task_id=${taskId}`
        try {
            const response = await ApiService.get(url)
            // Keys dynamic
            return response.data
        } catch (error) {
            throw new CeleryError(error.response.status, error.response.data)
        }
    },
}

export default CeleryService

export { CeleryService, CeleryError }