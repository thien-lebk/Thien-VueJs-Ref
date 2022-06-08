import {
    TURN_OFF_ORDER_DIALOG,
    TURN_OFF_CAMPAIGN_ORDER_DIALOG,

    ORDER_CREATING_REQUEST,
    ORDER_CREATING_SUCCESS,
    ORDER_CREATING_ERROR,

    ORDER_UPDATING_REQUEST,
    ORDER_UPDATING_SUCCESS,
    ORDER_UPDATING_ERROR,

    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_RESET,
    ORDER_LIST_ERROR,

    ORDER_CAMPAIGN_LIST_REQUEST,
    ORDER_CAMPAIGN_LIST_SUCCESS,
    ORDER_CAMPAIGN_LIST_ERROR,

    ORDER_FINDING_FOR_TABLE_REQUEST,
    ORDER_FINDING_FOR_TABLE_SUCCESS,
    ORDER_FINDING_FOR_TABLE_ERROR,
    ORDER_FINDING_FOR_TABLE_RESET,

    ORDER_FINDING_REQUEST,
    ORDER_FINDING_SUCCESS,
    ORDER_FINDING_ERROR,

    ORDER_FILTER_FINDING_REQUEST,
    ORDER_FILTER_FINDING_SUCCESS,
    ORDER_FILTER_FINDING_ERROR,

    ORDER_LIST_SCHEDULE_REQUEST,
    ORDER_LIST_SCHEDULE_SUCCESS,
    ORDER_LIST_SCHEDULE_ERROR,

    ORDER_CAMPAIGN_LIST_SCHEDULE_REQUEST,
    ORDER_CAMPAIGN_LIST_SCHEDULE_SUCCESS,
    ORDER_CAMPAIGN_LIST_SCHEDULE_ERROR,

    ORDER_DETAIL_FORM_REQUEST,
    ORDER_DETAIL_FORM_SUCCESS,
    ORDER_DETAIL_FORM_ERROR,

    ORDER_CAMPAIGN_DETAIL_FORM_REQUEST,
    ORDER_CAMPAIGN_DETAIL_FORM_SUCCESS,
    ORDER_CAMPAIGN_DETAIL_FORM_ERROR,

    ORDER_DETAIL_REQUEST,
    ORDER_DETAIL_SUCCESS,
    ORDER_DETAIL_ERROR,
    ORDER_DETAIL_RESET,

    TEMPORARY_ORDER_SAVING_REQUEST,
} from './types'

import { OrderService, OrderError } from '../../../../services/order.service'
import { NotificationService, NotificationError} from '../../../../services/notification.service'

const has = Object.prototype.hasOwnProperty

let isChangePage = false
let isSchedule = false

export default {

    async createOrder({commit}, payload) {
        commit(ORDER_CREATING_REQUEST)
        try {
            const result = await OrderService.createOrder(payload)
            commit(ORDER_CREATING_SUCCESS, {result})
        } catch (error) {
            if (error instanceof OrderError) {
                commit(ORDER_CREATING_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(ORDER_CREATING_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async turnOffDialog({commit}) {
        commit(TURN_OFF_ORDER_DIALOG)
    },

    async turnOffCampaignOrderDialog({commit}) {
        commit(TURN_OFF_CAMPAIGN_ORDER_DIALOG)
    },

    async resetOrderList({commit}) {
        commit(ORDER_LIST_RESET)
    },

    async findOrderByPhone({commit}, payload) {
        commit(ORDER_FINDING_REQUEST)
        try {
            const result = await OrderService.findOrderByPhone(payload.phone)
            commit(ORDER_FINDING_SUCCESS, {result})
        } catch (error) {
            if (error instanceof OrderError) {
                commit(ORDER_FINDING_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(ORDER_FINDING_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async findOrderByPhoneForTable({commit}, payload) {
        if (/^\s*$/.test(payload.phone)) {
            //Refresh Order
            commit(ORDER_FINDING_FOR_TABLE_RESET)
        } else {
            commit(ORDER_FINDING_FOR_TABLE_REQUEST)
            try {
                const result = await OrderService.findOrderByPhone(payload.phone)
                commit(ORDER_FINDING_FOR_TABLE_SUCCESS, {result})
            } catch (error) {
                if (error instanceof OrderError) {
                    commit(ORDER_FINDING_FOR_TABLE_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
                } else {
                    commit(ORDER_FINDING_FOR_TABLE_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
                }
            }
        }
    },

    async findFilterOrderList({commit}, payload) {
        commit(ORDER_FILTER_FINDING_REQUEST)
        try {
            const result = await OrderService.getFilterOrderList(payload)
            commit(ORDER_FILTER_FINDING_SUCCESS, {result})
        } catch (error) {
            if (error instanceof OrderError) {
                commit(ORDER_FILTER_FINDING_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(ORDER_FILTER_FINDING_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async getOrderList({commit}, payload) {
        commit(ORDER_LIST_REQUEST)
        isChangePage = true

        try {
            const page = has.call(payload, 'page') ? payload.page : null
            const {orders, count} = await OrderService.getOrderList(page)
            commit(ORDER_LIST_SUCCESS, {orders, count})
        } catch (error) {
            if (error instanceof OrderError) {
                commit(ORDER_LIST_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(ORDER_LIST_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }

        if (!isSchedule) {
            isChangePage = false
        }
    },

    async planOrderList({commit}, payload) {
        commit(ORDER_LIST_SCHEDULE_REQUEST)
        isSchedule = true

        try {
            const page = has.call(payload, 'page') ? payload.page : null
            const {orders, count} = await OrderService.getOrderList(page)
            if (!isChangePage) {
                commit(ORDER_LIST_SCHEDULE_SUCCESS, {orders, count})
            }
            isChangePage = false

        } catch (error) {
            if (error instanceof OrderError) {
                commit(ORDER_LIST_SCHEDULE_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(ORDER_LIST_SCHEDULE_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }

        isSchedule = false
    },

    async getOrderListFromCampaign({commit}, { campaignId, page=null, params={} }) {
        commit(ORDER_CAMPAIGN_LIST_REQUEST)
        isChangePage = true
        try {
            const {orders, count} = await OrderService.getOrderListFromCampaignId({campaignId,page,params})
            commit(ORDER_CAMPAIGN_LIST_SUCCESS, {orders, count})
        } catch (error) {
            if (error instanceof OrderError) {
                commit(ORDER_CAMPAIGN_LIST_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(ORDER_CAMPAIGN_LIST_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }

        if (!isSchedule) {
            isChangePage = false
        }
    },

    async planOrderListFromCampaign({commit}, { campaignId, page=null, params={} }) {
        commit(ORDER_CAMPAIGN_LIST_SCHEDULE_REQUEST)
        isSchedule = true

        try {
            const {orders, count} = await OrderService.getOrderListFromCampaignId({campaignId,page,params})
            if (!isChangePage) {
                commit(ORDER_CAMPAIGN_LIST_SCHEDULE_SUCCESS, {orders, count})
            }
            isChangePage = false

        } catch (error) {
            if (error instanceof OrderError) {
                commit(ORDER_CAMPAIGN_LIST_SCHEDULE_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(ORDER_CAMPAIGN_LIST_SCHEDULE_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }

        isSchedule = false
    },

    async getOrderListFromStaff({commit}) {
        commit(ORDER_LIST_REQUEST)
        isChangePage = true

        try {
            const {orders, count} = await OrderService.getOrderListFromStaff()
            commit(ORDER_LIST_SUCCESS, {orders, count})
        } catch (error) {
            if (error instanceof OrderError) {
                commit(ORDER_LIST_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(ORDER_LIST_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }

        if (!isSchedule) {
            isChangePage = false
        }
    },

    async planOrderListFromStaff({commit}) {
        commit(ORDER_LIST_SCHEDULE_REQUEST)
        try {
            const {orders, count} = await OrderService.getOrderListFromStaff()

            if (!isChangePage) {
                commit(ORDER_LIST_SCHEDULE_SUCCESS, {orders, count})
            }
            isChangePage = false
        } catch (error) {
            if (error instanceof OrderError) {
                commit(ORDER_LIST_SCHEDULE_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(ORDER_LIST_SCHEDULE_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async getOrderDetail({commit, getters}, payload) {
        commit(ORDER_DETAIL_FORM_REQUEST)
        const orderListResult = getters.orderListResult
        for (let order of orderListResult) {
            if (order.orderID == payload.orderID) {
                commit(ORDER_DETAIL_FORM_SUCCESS, {order})
                return true
            }
        }
        commit(ORDER_DETAIL_FORM_ERROR, {errorCode: 404, errorMessage: "Not found"})
    },

    async getOrderDetailByIdAndOpenDialog({commit}, payload) {
        commit(ORDER_DETAIL_FORM_REQUEST)
        try {
            const order = await OrderService.getOrderDetail(payload.id)

            if (has.call(order, 'promotionName')) {
                commit(ORDER_CAMPAIGN_DETAIL_FORM_SUCCESS, {campaignOrder:order})
            } else {
                commit(ORDER_DETAIL_FORM_SUCCESS, {order})
            }
        } catch (error) {
            if (error instanceof OrderError) {
                commit(ORDER_DETAIL_FORM_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(ORDER_DETAIL_FORM_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async getOrderDetailById({commit}, payload) {
        commit(ORDER_DETAIL_REQUEST)
        try {
            const order = await OrderService.getOrderDetail(payload.id)
            commit(ORDER_DETAIL_SUCCESS, {order})
        } catch (error) {
            if (error instanceof OrderError) {
                commit(ORDER_DETAIL_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(ORDER_DETAIL_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async getCampaignOrderDetail({commit, getters}, payload) {
        commit(ORDER_CAMPAIGN_DETAIL_FORM_REQUEST)
        const campaignOrderListResult = getters.campaignOrderListResult
        
        const campaignOrder = campaignOrderListResult.find(order => order.orderID === payload.orderID)

        if (campaignOrder !== undefined) {
            commit(ORDER_CAMPAIGN_DETAIL_FORM_SUCCESS, {campaignOrder})
        } else {
            commit(ORDER_CAMPAIGN_DETAIL_FORM_ERROR, {errorCode: 404, errorMessage: "Not found"})
        }
    },

    async resetOrderDetailById({commit}) {
        commit(ORDER_DETAIL_RESET)
    },

    async updateOrder({commit}, payload) {
        commit(ORDER_UPDATING_REQUEST)
        try {
            const result = await OrderService.updateOrder(payload)
            commit(ORDER_UPDATING_SUCCESS, {result})
            
            const {orderID, status} = payload
            if (["Failed", "Invalid", "Success"].includes(status)) {
                NotificationService.deleteNotification(orderID)
            }
        } catch (error) {
            if (error instanceof OrderError) {
                commit(ORDER_UPDATING_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else if (error instanceof NotificationError) {
                console.log(error)
            } else {
                commit(ORDER_UPDATING_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async claimOrder({commit}, payload) {
        commit(ORDER_UPDATING_REQUEST)
        try {
            const result = await OrderService.claimOrder(payload)
            commit(ORDER_UPDATING_SUCCESS, {result})
        } catch (error) {
            if (error instanceof OrderError) {
                commit(ORDER_UPDATING_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(ORDER_UPDATING_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async changeStage({commit}, payload) {
        commit(ORDER_UPDATING_REQUEST)
        try {
            const result = await OrderService.changeStage(payload)
            commit(ORDER_UPDATING_SUCCESS, {result})

            const {orderID, status} = payload
            if (["Failed", "Invalid", "Success"].includes(status)) {
                NotificationService.deleteNotification(orderID)
            }
        } catch (error) {
            if (error instanceof OrderError) {
                commit(ORDER_UPDATING_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else if (error instanceof NotificationError) {
                console.log(error)
            } else {
                commit(ORDER_UPDATING_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    async changeStatus({commit}, payload) {
        commit(ORDER_UPDATING_REQUEST)
        try {
            const result = await OrderService.changeStatus(payload)
            commit(ORDER_UPDATING_SUCCESS, {result})

            const {orderId, status} = payload
            if (["Failed", "Invalid", "Success"].includes(status)) {
                NotificationService.deleteNotification(orderId)
            }
        } catch (error) {
            if (error instanceof OrderError) {
                commit(ORDER_UPDATING_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else if (error instanceof NotificationError) {
                console.log(error)
            } else {
                commit(ORDER_UPDATING_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },

    saveOrderTemporarily({commit}, payload) {
        commit(TEMPORARY_ORDER_SAVING_REQUEST, {orderDetail: payload.orderDetail})
    },

    removeTemporaryOrder({commit}) {
        commit(TEMPORARY_ORDER_SAVING_REQUEST, {orderDetail: null})
    },
}