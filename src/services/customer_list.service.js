import ApiService from './api.service'
import { customerListAPI, uploadCustomerListFileAPI } from '../config/backend-api'
import moment from 'moment'

class CustomerListError extends Error {
    constructor(errorCode, message) {
        super(message)
        this.name = this.constructor.name
        this.message = message
        this.errorCode = errorCode
    }
}

const CustomerListService = {
    uploadCustomerList: async function(data) {
        const formData = new FormData()

        formData.append("customer_list_name", data.customerListName)
        formData.append("description", data.description)
        formData.append("customer_list_file", data.customerListFile)

        try {
            const response = await ApiService.post(uploadCustomerListFileAPI, formData)
            
            return {
                taskId: response.data.task_id
            }
        } catch (error) {
            throw new CustomerListError(error.response.status, error.response.data.detail)
        }

    },
    getCustomerList: async function() {
        try {

            const response = await ApiService.get(customerListAPI)

            return this.filterRawCustomerList(response.data)

        } catch (error) {

            throw new CustomerListError(error.response.status, error.response.data.detail)
        }
    },

    getCustomerListDetailFromId: async function (id) {
        const url = `${customerListAPI}${id}/`

        try {

            const response = await ApiService.get(url)
            return this.filterRawCustomCustomerListDetail(response.data)

        } catch (error) {
            throw new CustomerListError(error.response.status, error.response.data.detail)
        }
    },

    deleteCustomerList: async function (id) {
        const url = `${customerListAPI}${id}/`

        try {

            await ApiService.delete(url)

        } catch (error) {

            throw new CustomerListError(error.response.status, error.response.data.detail)
        }
    },

    filterRawCustomerList: function(rawData) {
        return rawData.map(item => {
            const created = new moment(item.created.substring(0, 16), "YYYY-MM-DD[T]HH:mm").format("DD-MM-YYYY HH:mm")

            return {
                id: item.id,
                customerListName: item.customer_list_name,
                description: item.description,
                status: item.status,
                latestCampaign: item.latest_campaign,
                customerIdList: item.customer_id_list,
                enableDelete: item.enable_delete,
                createdDate: created,
            }
        })
    },

    filterRawCustomCustomerListDetail: function(rawData) {
        const created = new moment(rawData.created.substring(0, 16), "YYYY-MM-DD[T]HH:mm").format("DD-MM-YYYY HH:mm")

        return {
            id: rawData.id,
            customerListName: rawData.customer_list_name,
            description: rawData.description,
            status: rawData.status,
            created: created,
            latestCampaign: rawData.latest_campaign,
            clients: this.filterRawClientList(rawData.clients),
        }
    },

    filterRawClientList: function(rawData) {
        try {
            return rawData.map(item => {
                //Example created: "2019-05-31T14:16:03.932314+07:00"   
                const created = new moment(item.created.substring(0, 16), "YYYY-MM-DD[T]HH:mm").format("DD-MM-YYYY")

                let dateOfBirth = null
                if (item.date_of_birth !== null) {
                    dateOfBirth = new moment(item.date_of_birth, "YYYY-MM-DD").format("DD-MM-YYYY")
                } 
                
                let lastContractClosedDate = null
                if (item.last_contract_closed_date !== null) {
                    lastContractClosedDate = new moment(item.last_contract_closed_date, "YYYY-MM-DD").format("DD-MM-YYYY")
                }

                return {
                    id: item.id,
                    firstName: item.first_name,
                    lastName: item.last_name,
                    fullName: item.full_name,
                    fulladdress: item.fulladdress,
                    email: item.email,
                    created: created,
                    createdBy: item.created_by,
                    createdName: item.created_name,
                    primaryPhone: item.primary_phone,
                    alternativePhone: item.alternative_phone,
                    address: item.address,
                    district: item.district,
                    city: item.city,
                    gender: item.gender,
                    dateOfBirth: dateOfBirth,
                    country: item.country,
                    nationalId: item.national_id,
                    occupation: item.occupation,
                    status: item.status,
                    lastUpdateBy: item.last_update_by,
                    note: item.note,
                    branch: item.branch,
                    mifosId: item.mifos_id,
                    lastContractClosedDate: lastContractClosedDate,
                    totalInterestContributed: item.total_interest_contributed,
                    latestFailReason: item.latest_fail_reason,
                    highestDisbursalAmount: item.highest_disbursal_amount,
                    mostPawnedAsset: item.most_pawned_asset,
                }
            })
        } catch (error) {
            console.log(error)
            throw error
        }
    },
}

export default CustomerListService

export { CustomerListService, CustomerListError }