import ApiService from './api.service'
import { ProfileService } from './storage.service'
import { 
    deleteCustomerDocument, customerDoucument, customerBankAccout,
    customerApi, customerById, customerDocumentApi, contractActive, contractClose, 
    uploadBankAccout,deleteBankAccout, updateBankAcout, updateCustomerNote,
    customerTransactionHistory, updateCustomerAPI
} from '../config/backend-api'
import moment from 'moment'
import { isNullOrUndefined } from 'util';

class CustomerError extends Error {
    constructor(errorCode, message) {
        super(message)
        this.name = this.constructor.name
        this.message = message
        this.errorCode = errorCode
    }
}

const CustomerService = {

    getCustomerList: async function(page, condition) {
        try {

            let url = null;
            let searchAll = false;
            if (isNullOrUndefined(condition) === true || condition === "") {
                url = customerApi;
                searchAll = true;
            } else if(condition.match('^0[0-9]{9,10}$')) {
                url = customerApi.concat("?phone=", condition);
            } else if (!condition.match('(\\d)+')) {
                url = customerApi.concat("?name=", condition);
            } else {
                url = customerApi.concat("?nationalid=", condition);
            }

            if (page !== null && page !== 1) {
                if (searchAll) {
                    url = `${url}?page_size=${page}`
                }
                else {
                    url = `${url}&page_size=${page}`
                }
            }
            const response = await ApiService.get(url)

            const data = this.filterRawCustomerList(response.data.results)

            return {
                customers: data,
                count: response.data.count,
                // links: response.data['links'],
            }

        } catch (error) {

            throw new CustomerError(error.response.status, error.response.data.detail)
        }
    },


    getCustomerByCustomerId: async function(id) {
        try {

            const url = customerById.replace(":id", id)

            const response = await ApiService.get(url)

            const data = this.filterRawCustomer(response.data)
            
            return {
                customer: data,
                // count: response.data['count'],
                // links: response.data['links'],
            }

        } catch (error) {

            throw new CustomerError(error.response.status, error.response.data.detail)
        }
    },

    getCustomerTransactionHistory: async function(id) {
        try {

            const url = customerTransactionHistory.replace(":id", id)

            const response = await ApiService.get(url)

            const data = this.filterRawCustomerTH(response.data.data)
            
            return {
                customerTH: data,
                // count: response.data['count'],
                // links: response.data['links'],
            }

        } catch (error) {

            throw new CustomerError(error.response.status, error.response.data.detail)
        }
    },

    getCustomerDoucument: async function(id) {
        try {

            const url = customerDoucument.replace(":id", id)

            const response = await ApiService.get(url)

            const data = this.filterRawDocumnetList(response.data)
            
            return {
                docs: data,
            }

        } catch (error) {

            throw new CustomerError(error.response.status, error.response.data.detail)
        }
    },

    deleteCustomerDocument:  async function(id) {
        try {

            const url = deleteCustomerDocument.replace(":id", id)

            const responsedelete = await ApiService.delete(url)
            
            return {
                docs: responsedelete.data,
            }

        } catch (error) {

            throw new CustomerError(error.responsedelete.status, error.responsedelete.data.detail)
        }
    },

    uploadCustomerDocument: async function(data) {
        try {
            const currentUserID = ProfileService.getID()
            data.append('uploader', currentUserID)

            const response = await ApiService.post(customerDocumentApi, data)
            
            return {
                docs: response.data,
            }

        } catch (error) {

            throw new CustomerError(error.response.status, error.response.data.detail)
        }
    },

    getCustomerSummary: async function(id) {
        try {

            const url = customerSummary.replace(":id", id)

            const response = await ApiService.get(url)

            const data = this.filterRawSummary(response.data)

            const total = this.filterTotalSummary(response.data)
            
            return {
                customers: data,
                total: total
            }

        } catch (error) {

            throw new CustomerError(error.response.status, error.response.data.detail)
        }
    },

    getContractActive: async function(id) {
        try {

            const url = contractActive.replace(":id", id)

            const response = await ApiService.get(url)

            const data = this.filterRawContractActive(response.data)

            return {
                cus: data,
            }

        } catch (error) {

            throw new CustomerError(error.response.status, error.response.data.detail)
        }
    },

    getContractClose: async function(id) {
        try {

            const url = contractClose.replace(":id", id)

            const response = await ApiService.get(url)

            const data = this.filterRawContractClose(response.data)

            return {
                cus: data,
            }

        } catch (error) {

            throw new CustomerError(error.response.status, error.response.data.detail)
        }
    },

    getCustomerCollectoralInfo: async function(id) {
        try {

            const url = customerCollectoralInfo.replace(":id", id)

            const response = await ApiService.get(url)

            const data = this.filterRawCollectoralInfo(response.data)
            
            return {
                customers: data,
                total: total
            }

        } catch (error) {

            throw new CustomerError(error.response.status, error.response.data.detail)
        }
    },
    // get bank accout
    getBankAccout: async function(id) {

        try {

            const url = customerBankAccout.replace(":id", id)

            const response = await ApiService.get(url)

            const data = this.filterRawBankAccout(response.data)
            
            return {
                cus: data,
            }

        } catch (error) {

            throw new CustomerError(error.response.status, error.response.data.detail)
        }

    },

    // upload client bank
    deleteBankAccout: async function(id) {
        try {
            const url = deleteBankAccout.replace(":id", id)

            const response = await ApiService.delete(url)
            
            return {
                cus: response.data,
            }

        } catch (error) {

            throw new CustomerError(error.response.status, error.response.data.detail)
        }
    },

    // delete client bank
    uploadBankAccout: async function(data) {
        try {

            const response = await ApiService.post(uploadBankAccout, data)
            
            return {
                cus: response.data,
            }

        } catch (error) {

            throw new CustomerError(error.response.status, error.response.data.detail)
        }
    },

    // delete client bank
    updateBankAccout: async function(id, data) {
        try {

            const url = updateBankAcout.replace(":id", id)


            const response = await ApiService.put(url, data)
            
            return {
                cus: response.data,
            }

        } catch (error) {

            throw new CustomerError(error.response.status, error.response.data.detail)
        }
    },
    updateNote: async function(id, data) {
        try {
    
            const url = updateCustomerNote.replace(":id", id)
    
    
            const response = await ApiService.patch(url, data)
            
            return {
                cus: response.data,
            }
    
        } catch (error) {

            throw new CustomerError(error.response.status, error.response.data.detail)
        }
    },
    updateCustomer: async function(id, data) {
        try {
    
            const url = updateCustomerAPI.replace(":id", id)
    
            const currentUserID = ProfileService.getID()
            data['last_update_by'] = currentUserID
            const response = await ApiService.put(url, data)
            
            return {
                cus: response.data,
            }
    
        } catch (error) {

            throw new CustomerError(error.response.status, error.response.data.detail)
        }
    },

    filterRawBankAccout: function(rawData) {
        const data = []
        try {
            for (let item of rawData.data) {
                data.push({
                    id: item.id,
                    name: item.bank_account_name,
                    bank: item.bank_name,
                    bank_accout: item.bank_account_no,
                    branch: item.bank_branch,
                })
            }
            return data
        } catch (error) {
            console.log(error)
            throw error
        }
    },

    filterRawCustomer: function(item) {
        let data = null;
        try {
            const dateOfBirth = this.formatDate(item.date_of_birth, "DD/MM/YYYY")
            const created = this.formatDate(item.created, "DD/MM/YYYY")
            data =  {
                id: item.id,
                fullName: item.full_name,
                firstName: item.first_name,
                lastName: item.last_name,
                customerId: item.mifos_id,
                createdName: item.created_name,
                branchName: item.branch_name,
                created: created,
                gender: item.gender == null ? item.gender : item.gender.toLowerCase(),
                primaryPhone: item.primary_phone,
                alternativePhone: item.alternative_phone,
                fullAddress: item.fulladdress,
                email: item.email,
                dateOfBirth: dateOfBirth,
                nationalId: item.national_id,
                address: item.address,
                district: item.district,
                city: item.city,
                occupation: item.occupation,
                note: item.note,
                lastUpdatedName: item.last_updated_name,
            };
            return data
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    filterRawCustomerTH: function(item) {
        let data = null;
        try {
            const lastDisburse = this.formatDate(item.last_disburse, "DD/MM/YYYY HH:mm")
            data =  {
                totalOrder: item.total_order,
                totalLoan: item.total_loan,
                totalContract: item.total_contract,
                totalActiveContract: item.total_active_contract,
                lastDisburse: lastDisburse,
            };
            return data
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    
    filterRawCustomerList: function(rawData) {
        const data = []
        try {
            for (let item of rawData) {
            
                data.push({
                    id: item.id,
                    customerId: item.mifos_id,
                    customerName: item.full_name,
                    nationalId: item.national_id,
                    status: item.status,
                    gender: item.gender == null ? item.gender : item.gender.toLowerCase(),
                    branchName: item.branch_name,
                    primaryPhone: item.primary_phone,
                    createdName: item.created_name,
                })
            }
            return data
        } catch (error) {
            console.log(error)
            throw error
        }
    },

    filterRawDocumnetList: function(rawData) {
        const data = []
        try {
            for (let item of rawData.data) {
                //Example created: "2019-05-31T14:16:03.932314+07:00"   
                const created = new moment(item.created, "YYYY-MM-DD[T]HH:mm").format("DD-MM-YYYY HH:mm")

                data.push({
                    id: item.id,
                    uploader: item.uploader_name,
                    create_date: created,
                    last_update: item.status,
                    link: item.s3_path,
                    document: item.doc_type
                })
            }
            return data
        } catch (error) {
            console.log(error)
            throw error
        }
    },

    filterRawContractActive: function(rawData) {
        const data = []
        try {
            for (let item of rawData.data) {
                // Example created: "2019-05-31T14:16:03.932314+07:00"   
                const due_date = new moment(item.due_date, "YYYY-MM-DD[T]HH:mm").format("DD-MM-YYYY HH:mm")

                data.push({
                    id: item.id,
                    contractId: item.mifos_id,
                    loan_accout: item.interest_value,
                    due_date: due_date,
                    assset_type:  '',
                    storage_location: item.branch_name,
                    status: item.status,
                    loan_balance: item.approved_amount
                })
            }
            return data
        } catch (error) {
            console.log(error)
            throw error
        }
    },

    filterRawContractClose: function(rawData) {
        const data = []
        try {
            for (let item of rawData.data) {
                // Example created: "2019-05-31T14:16:03.932314+07:00"   
                const close_date = new moment(item.close_date, "YYYY-MM-DD[T]HH:mm").format("DD-MM-YYYY HH:mm")
                const type = item.asset_type === null ? '' : item.asset_description
                if (type.length > 30) {
                    type = type.substring(0, 30) + '...'
                }
                const store = item.storage_id === null ? '' : item.branch_name
                data.push({
                    id: item.id,
                    contractId: item.mifos_id,
                    loan_accout: item.interest_value,
                    close_date: close_date,
                    assset_type:  type,
                    storage_location: store,
                    status: item.status,
                    loan_balance: item.approved_amount
                })
            }
            return data
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    formatDate(value, format) {
        try{
            const dateResult = new moment(value, "YYYY-MM-DD[T]HH:mm");
            if (dateResult.isValid() === false) {
                return "";
            }
            return dateResult.format(format?format:"DD/MM/YYYY HH:mm");
        } catch (error) {
            console.log(error)
            return "";
        }
    }

}

export default CustomerService

export { CustomerService, CustomerError }