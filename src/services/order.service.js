import ApiService from './api.service'
import { ProfileService, CurrentBranchService } from './storage.service'
import { AssetService } from './asset.serivce'
import { orderAPI, orderFromStaffAPI, getOrderAPI, getOrderFromCampaignAPI } from '../config/backend-api'
import moment from 'moment'
import {isNullOrUndefined} from 'util'
const has = Object.prototype.hasOwnProperty

class OrderError extends Error {
    constructor(errorCode, message) {
        super(message)
        this.name = this.constructor.name
        this.message = message
        this.errorCode = errorCode
    }
}

const OrderService = {

    createOrder : async function(newOrderInfo) {

        let CAsset = null

        if (newOrderInfo.assetTypeID != null || newOrderInfo.assetTypeDescription != null) {

            const CAssetData = {
                asset: newOrderInfo.assetTypeID,
                description: newOrderInfo.assetTypeDescription
            }        
    
            try {
                CAsset = await AssetService.createCAsset(CAssetData)
            } catch (error) {
                throw new OrderError(error.errorCode, error.message)
            }
        }
       
        const data = {
            phone: newOrderInfo.phone,
            first_name: newOrderInfo.firstName,
            staff: ProfileService.getID(),
            source: newOrderInfo.source,
            asset: isNullOrUndefined(CAsset) ? null : CAsset.id,
            note: newOrderInfo.note,
            branch: CurrentBranchService.getCurrentBranchID(),
            date_claim: moment().format("YYYY-MM-DD HH:mm"),
            status: "In Progress",
            step: "Pending",
            stage: "Order Claimed",
        }

        if (newOrderInfo.expectedAmount != null) {
            data.required_amount = Math.round(newOrderInfo.expectedAmount * 1000000)
        }

        if (newOrderInfo.validatorAmount != null) {
            data.proposed_amount = Math.round(newOrderInfo.validatorAmount * 1000000)
        }

        try {
            const response = await ApiService.post(orderAPI, data)
            if (response.status == 201) {
                return response.data
            }
        } catch (error) {
            throw new OrderError(error.response.status, error.response.data.detail)
        }
    },

    updateOrder: async function(orderInfo) {

        const orderID = orderInfo.orderID

        const orderData = {}

        if (orderInfo.phone != null) {
            orderData.phone = orderInfo.phone
        }

        if (orderInfo.name != null) {
            orderData.first_name = orderInfo.name
        }

        if (orderInfo.clientId != null) {
            orderData.client = orderInfo.clientId
        }

        if (orderInfo.CAssetID != null) {
            orderData.asset = orderInfo.CAssetID
        }

        if (orderInfo.source != null) {
            orderData.source = orderInfo.source
        }

        if (orderInfo.step != null) {
            orderData.step = orderInfo.step
        }

        if (orderInfo.stage != null) {
            orderData.stage = orderInfo.stage
        }

        if (orderInfo.note != null) {
            orderData.note = orderInfo.note
        }

        if (orderInfo.status != null) {
            orderData.status = orderInfo.status
        }

        if (orderInfo.appointmentDateTime != null) {
            orderData.appointment = orderInfo.appointmentDateTime
        }

        const currentUserID = ProfileService.getID()

        if (currentUserID != orderInfo.staff) {
            orderData.support_agent = currentUserID
        }

        if (orderInfo.expectedAmount != null) {
            orderData.required_amount = Math.round(orderInfo.expectedAmount * 1000000)
            
        }

        if (orderInfo.validatorAmount != null) {
            orderData.proposed_amount = Math.round(orderInfo.validatorAmount * 1000000)
        }

        const url = `${orderAPI}${orderID}/`
        try {
            const response = await ApiService.patch(url, orderData)
            return response.data
        } catch (error) {
            throw new OrderError(error.response.status, error.response.data)
        }
        
    },

    claimOrder: async function(data) {
        const orderID = data.orderID

        const orderData = {
            staff: ProfileService.getID(),
            branch: CurrentBranchService.getCurrentBranchID(),
            step: "Pending",
            stage: "Order Claimed",
            status: "In Progress",
        }

        const url = `${orderAPI}${orderID}/`
        try {
            const response = await ApiService.patch(url, orderData)
            return response.data
        } catch (error) {
            console.log( error.response.data)
            throw new OrderError(error.response.status, error.response.data)
        }
    },

    changeStage: async function(data) {
        const orderID = data.orderID

        const orderData = {
            stage: data.stage,
            status: data.status,
        }

        const currentUserID = ProfileService.getID()

        if (currentUserID != data.staff) {
            orderData.support_agent = currentUserID
        }

        const url = `${orderAPI}${orderID}/`
        try {
            const response = await ApiService.patch(url, orderData)
            return response.data
        } catch (error) {
            throw new OrderError(error.response.status, error.response.data)
        }
    },

    changeStatus: async function(data) {
        const orderId = data.orderId

        const url = `${orderAPI}${orderId}/`

        const orderData = {
            step: data.step,
            stage: data.stage,
            status: data.status,
        }

        const currentUserID = ProfileService.getID()

        if (currentUserID != data.staff) {
            orderData.support_agent = currentUserID
        }


        try {
            const response = await ApiService.patch(url, orderData)
            return this.filterRawOrderList([response.data])[0]
        } catch (error) {
            throw new OrderError(error.response.status, error.response.data)
        }
    },

    getOrderList: async function(page) {
        try {

            let url = getOrderAPI
            if (page !== null && page !== 1) {
                url = `${getOrderAPI}?page=${page}`
            }

            const response = await ApiService.get(url)

            const data = this.filterRawOrderList(response.data['data'])

            return {
                orders: data,
                count: response.data['count'],
                links: response.data['links'],
            }

        } catch (error) {

            throw new OrderError(error.response.status, error.response.data.detail)
        }
    },

    getOrderListFromCampaignId: async function({campaignId, page, params={}}) {
        try {

            let url = getOrderFromCampaignAPI.replace(":id", campaignId)
            
            const searchParams = new URLSearchParams()

            if (page !== null && page !== 1) {
                searchParams.append('page', page)
            }

            if (has.call(params, 'phone')) {
                searchParams.append("phone", params.phone)
            }

            if (has.call(params, 'clientName')) {
                searchParams.append("client_name", params.clientName)
            }
            
            if (has.call(params, 'orderStaff')) {
                searchParams.append("order_staff", params.orderStaff)
            }


            if (has.call(params, 'assetType')) {
                for (let item of params.assetType) {
                    searchParams.append("asset_type", item)
                }
            }

            if (has.call(params, 'orderStep')) {
                for (let item of params.orderStep) {
                    searchParams.append("order_step", item)
                }
            }

            const response = await ApiService.get(url, { params:searchParams })

            const data = this.filterRawOrderList(response.data['data'])

            return {
                orders: data,
                count: response.data['count'],
                links: response.data['links'],
            }

        } catch (error) {
            console.log(error)
            throw new OrderError(error.response.status, error.response.data.detail)
        }
    },

    getFilterOrderList: async function(config) {
        try {

            let url = `${orderAPI}?`
            
            if (has.call(config, 'phone')) {
                if (Array.isArray(config.phone)) {
                    for (let item of config.phone) {
                        url+=`phone=${item}&`
                    }
                } else {
                    url+=`phone=${config.phone}&`
                }
            }

            if (has.call(config, 'status')) {
                if (Array.isArray(config.status)) {
                    for (let item of config.status) {
                        url+=`status=${item}&`
                    }
                } else {
                    url+=`status=${config.status}&`
                }
            }

            const response = await ApiService.get(url)

            return this.filterRawOrderList(response.data)

        } catch (error) {

            throw new OrderError(error.response.status, error.response.data.detail)
        }
    },

    getOrderListFromStaff: async function() {
        const id = ProfileService.getID()

        const url = orderFromStaffAPI.replace(":id", id)

        try {

            const response = await ApiService.get(url)

            const result = this.filterRawOrderList(response.data.data)

            return {
                orders: result,
                count: response.data['count']
            }

        } catch (error) {

            throw new OrderError(error.response.status, error.response.data)
        }
    },
    getOrderDetail: async function (id) {
        const orderUrl = `${orderAPI}${id}/`
        
        try {
            const response = await ApiService.get(orderUrl)
            const [result] = await this.filterRawOrderList([response.data])
            return result
        } catch (error) {
            throw new OrderError(error.response.status, error.response.data)
        }
    },

    findOrderByPhone: async function(phone) {
        const orderUrl = `${orderAPI}?phone=${phone}`

        try {
            const response = await ApiService.get(orderUrl)
            const data = this.filterRawOrderList(response.data)
            return data
        } catch (error) {
            throw new OrderError(error.response.status, error.response.data.detail)
        }
    },

    filterRawOrderList: function(rawData) {
        return rawData.map(item => {
            //Example created: "2019-05-31T14:16:03.932314+07:00"   
            const created = moment(item.created.substring(0, 16), "YYYY-MM-DD[T]HH:mm").format("DD-MM-YYYY HH:mm")
            const lastModify = moment(item.last_modify.substring(0, 16), "YYYY-MM-DD[T]HH:mm").format("DD-MM-YYYY HH:mm")

            let appointment = null
            if (has.call(item, 'appointment')) {
                appointment = moment(item.appointment, "YYYY-MM-DD HH:mm").format("DD-MM-YYYY HH:mm")
            }

            const data = {
                orderID: item.id,
                phone: item.phone,
                name: item.first_name,
                client: item.client,
                staff: item.staff,
                agent: item.staff_name,
                expectedAmount: item.required_amount / 1000000,
                branchName: item.branch_name,
                marketAmount: item.market_amount,
                validatorAmount: item.proposed_amount / 1000000,
                approvedAmount: item.approved_amount / 1000000,
                supporter: item.support_agent,
                supportAgentName: item.support_agent_name,
                staffUsername: item.staff_username,
                supportUsername: item.support_username,
                createdDate: created,
                appointment: appointment,
                dateClaim: item.date_claim,
                lastModify: lastModify,
                tagId: item.tag_id,
                assetID: item.asset,
                asset: item.asset_type,
                assetDescription: item.asset_description,
                stage: item.stage,
                step: item.step,
                status: item.status,
                source: item.source,
                note: item.note
            }
            
            if (has.call(item, 'promotion_name')) {
                data.promotionName = item.promotion_name
            }

            if (has.call(item, 'client_gender')) {
                data.clientGender = item.client_gender
            }

            if (has.call(item, 'client_name')) {
                data.clientName = item.client_name
            }

            if (has.call(item, 'client_note')) {
                data.clientNote = item.client_note
            }
            
            if (has.call(item, 'client_primary_phone')) {
                data.clientPrimaryPhone = item.client_primary_phone
            }

            if (has.call(item, 'client_alternative_phone')) {
                data.clientAlternativePhone = item.client_alternative_phone
            }

            if (has.call(item, 'most_pawned_asset')) {
                data.mostPawnedAsset = item.most_pawned_asset
            }

            return data
        })
    },
}

export default OrderService

export { OrderService, OrderError }