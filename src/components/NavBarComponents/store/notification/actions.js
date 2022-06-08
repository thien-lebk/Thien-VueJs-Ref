import {
    NEW_NOTIFICATION_REQUEST,
    NEW_NOTIFICATION_SUCCESS,
    NEW_NOTIFICATION_ERROR,

    NOTIFICATION_REQUEST,
    NOTIFICATION_SUCCESS,
    NOTIFICATION_ERROR,

    NOTIFICATION_UPDATING_REQUEST,
    NOTIFICATION_UPDATING_SUCCESS,
    NOTIFICATION_UPDATING_ERROR,
} from './types'

import { NotificationService, NotificationError } from '../../../../services/notification.service'
import vue from '../../../../main'

const has = Object.prototype.hasOwnProperty

export default {
    async getNewNotification({commit, getters}) {
        const oldNotificationResult = getters.newNotificationResult
        const oldNotificationResultID = oldNotificationResult.reduce((obj, item, index) => (obj[item.id] = index, obj) ,{})
        
        let newNotificationResultFilter

        commit(NEW_NOTIFICATION_REQUEST)
        try {
            const result = await NotificationService.getNewNotification()
            
            newNotificationResultFilter = result.filter((item) => {
                return !has.call(oldNotificationResultID, item.id)
            })

            commit(NEW_NOTIFICATION_SUCCESS, {result})
        } catch (error) {
            if (error instanceof NotificationError) {
                commit(NEW_NOTIFICATION_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(NEW_NOTIFICATION_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
        
        if (newNotificationResultFilter instanceof Array) {
            newNotificationResultFilter.forEach(element => {
                vue.$notify({
                  group: 'new-notification',
                  type: 'error',
                  title: element.orderId,
                  text: {
                    id: element.id,
                    message: element.message,
                    type: element.type,
                  },
                  speed: 2000,
                  duration: 604800, //1 week
                });
            })
        }
    },
    
    async getNotification({commit}) {
        commit(NOTIFICATION_REQUEST)
        try {
            const result = await NotificationService.getNotification()
            commit(NOTIFICATION_SUCCESS, {result})
        } catch (error) {
            if (error instanceof NotificationError) {
                commit(NOTIFICATION_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(NOTIFICATION_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async readNotification({commit}, {id}) {
        commit(NOTIFICATION_UPDATING_REQUEST)
        try {
            const result = await NotificationService.readNotification(id)
            commit(NOTIFICATION_UPDATING_SUCCESS, {result})
        } catch (error) {
            if (error instanceof NotificationError) {
                commit(NOTIFICATION_UPDATING_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(NOTIFICATION_UPDATING_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

}