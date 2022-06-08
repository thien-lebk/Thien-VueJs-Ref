import ApiService from '../services/api.service'
import { ProfileService } from './storage.service'
import { newNotificationFromUserIDAPI, notificationFromUserIDAPI, notificationAPI, deleteNotificationAPI } from '../config/backend-api'
import moment from 'moment'

class NotificationError extends Error {
    constructor(errorCode, message) {
        super(message)
        this.name = this.constructor.name
        this.message = message
        this.errorCode = errorCode
    }
}

const NotificationService = {
    createNotification: async function(newData) {
        const data = {
            user: ProfileService.getID(),
            order: newData.orderId,
            message: newData.message,
            type: newData.type,
        }

        try {

            const response = await ApiService.post(notificationAPI, data)
            return this.filterNotification([response.data])[0]

        } catch (error) {
            console.log(error)
            throw new NotificationError(error.response.status, error.response.data)

        }
    },
    getNewNotification: async function () {

        const id = ProfileService.getID()

        const url = newNotificationFromUserIDAPI.replace(":id", id)

        try {

            const response = await ApiService.get(url)
            return this.filterNotification(response.data.data)

        } catch (error) {

            throw new NotificationError(error.response.status, error.response.data)

        }
    },

    getNotification: async function () {

        const id = ProfileService.getID()

        const url = notificationFromUserIDAPI.replace(":id", id)

        try {

            const response = await ApiService.get(url)
            return this.filterNotification(response.data.data)

        } catch (error) {
            console.log(error)
            throw new NotificationError(error.response.status, error.response.data)

        }
    },

    readNotification: async function (id) {

        const url = `${notificationAPI}${id}/`
        const data = {
            readable: true
        }

        try {

            const response = await ApiService.patch(url, data)
            return response.data

        } catch (error) {

            throw new NotificationError(error.response.status, error.response.data)

        }
        
    },

    deleteNotification: async function (id) {
        const url = deleteNotificationAPI.replace(":id", id)

        try {

            const response = await ApiService.get(url)
            return response.data

        } catch (error) {

            throw new NotificationError(error.response.status, error.response.data)

        }
    },

    filterNotification: function(rawData) {
        return rawData.map((item) => {
            const created = new moment(item.created.substring(0, 16), "YYYY-MM-DD[T]HH:mm").format("DD-MM-YYYY HH:mm")
            return {
                id: item.id,
                userId: item.user,
                orderId: item.order,
                message: item.message,
                readable: item.readable,
                created: created,
                type: item.type,
            }
        })
    },
}

export default NotificationService

export { NotificationService, NotificationError }