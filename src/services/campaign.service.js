import ApiService from './api.service'
import { BranchService } from './branch.serivce'
import { ProfileService } from './storage.service'
import { campaignAPI } from '../config/backend-api'
import moment from 'moment'

const has = Object.prototype.hasOwnProperty

class CampaignError extends Error {
    constructor(errorCode, message) {
        super(message)
        this.name = this.constructor.name
        this.message = message
        this.errorCode = errorCode
    }
}

const CampaignService = {
    createCampaign: async function(newData) {
        const data = {
            campaign_name: newData.campaignName,
            customer_list: newData.customerList,
            description: newData.description,
            status: newData.status,
            allocation_rule: newData.allocationRule,
            branches: newData.branches,
            promotion: newData.promotion,
            type: newData.type,
            created_by: ProfileService.getID(),
        }

        if (data.status === 'Active') {
            data.active_date = moment().format("YYYY-MM-DD HH:mm")
        }

        try {
            const response = await ApiService.post(campaignAPI, data)
            return {
                taskId: response.data.task_id
            }
        } catch (error) {
            throw new CampaignError(error.response.status, error.response.data.detail)
        }
    },

    updateCampaign: async function(campaignInfo) {
        const {campaignId} = campaignInfo

        const campaignData = {
            last_update_by: ProfileService.getID(),
        }

        if (campaignInfo.campaignName != null) {
            campaignData.campaign_name = campaignInfo.campaignName
        }

        if (campaignInfo.description != null) {
            campaignData.description = campaignInfo.description
        }

        if (campaignInfo.status != null) {
            campaignData.status = campaignInfo.status

            if (campaignInfo.setActive === true) {
                campaignData.active_date = moment().format("YYYY-MM-DD HH:mm")
            } else if (campaignInfo.setComplete === true) {
                campaignData.complete_date = moment().format("YYYY-MM-DD HH:mm")
            }
        }

        if (campaignInfo.allocationRule != null) {
            campaignData.allocation_rule = campaignInfo.allocationRule
        }

        if (campaignInfo.branches != null) {
            campaignData.branches = campaignInfo.branches
        }

        if (campaignInfo.promotion != null) {
            campaignData.promotion = campaignInfo.promotion
        }

        if (campaignInfo.type != null) {
            campaignData.type = campaignInfo.type
        }

        const url = `${campaignAPI}${campaignId}/`
        try {
            const response = await ApiService.patch(url, campaignData)
            return this.filterRawCampaignList([response.data])[0]
        } catch (error) {
            throw new CampaignError(error.response.status, error.response.data)
        }
    },

    getCampaignList: async function(payload) {
        const params = new URLSearchParams()

        if (has.call(payload, 'type')) {
            params.append("type", payload.type)
        }

        if (has.call(payload, 'status')) {
            for (let item of payload.status) {
                params.append("status", item)
            }
        }

        if (has.call(payload, 'createdFrom') & has.call(payload, 'createdTo')) {
            params.append("created_from", payload.createdFrom)
            params.append("created_to", payload.createdTo)
        }

        try {
            const response = await ApiService.get(campaignAPI, {params})
            return this.filterRawCampaignList(response.data)
        } catch (error) {
            throw new CampaignError(error.response.status, error.response.data.detail)
        }
    },

    deleteCampaign: async function(id) {
        const url = `${campaignAPI}${id}/`
        try {
            await ApiService.delete(url)
        } catch (error) {
            throw new CampaignError(error.response.status, error.response.data)
        }
    },

    filterRawCampaignList: function(rawData) {
        return rawData.map(item => {
            //Example created: "2019-05-31T14:16:03.932314+07:00"   
            const created = moment(item.created.substring(0, 16), "YYYY-MM-DD[T]HH:mm").format("DD-MM-YYYY HH:mm")
            const lastModify = moment(item.last_modify.substring(0, 16), "YYYY-MM-DD[T]HH:mm").format("DD-MM-YYYY HH:mm")
            
            let activeDate = null
            if (item.active_date !== null) {
                activeDate = moment(item.active_date.substring(0, 16), "YYYY-MM-DD[T]HH:mm").format("DD-MM-YYYY HH:mm")
            }

            let completeDate = null
            if (item.complete_date !== null) {
                completeDate = moment(item.complete_date.substring(0, 16), "YYYY-MM-DD[T]HH:mm").format("DD-MM-YYYY HH:mm")
            }

            return {
                id: item.id,
                promotionName: item.promotion_name,
                promotionId: item.promotion,
                status: item.status,
                branches: BranchService.filterRawBranchList(item.branches),
                campaignName: item.campaign_name,
                description: item.description,
                allocationRule: item.allocation_rule,
                warmLead: item.warm_lead,
                createdDate: created,
                lastModify: lastModify,
                activeDate: activeDate,
                completeDate: completeDate,
                customerListId: item.customer_list,
                customerListName: item.customer_list_name,
                type: item.type,
            }
        })
    },
}

export default CampaignService

export { CampaignService, CampaignError }