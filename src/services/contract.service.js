import ApiService from './api.service'
import { ProfileService, CurrentBranchService } from './storage.service'
import { 
    deleteContractDocument, contractDoucument, contractCollectoralInfo, contractSummary,
    contractApi, contractById, contractDocumentApi, contractRepaymentSchedule, 
    contractTransaction, updateContractNote, updateContractRepaymentAPI, contractOverDue, contractApprovement,
    priceAdjustment,
} from '../config/backend-api'
import moment from 'moment'
import {isNullOrUndefined} from 'util'

const has = Object.prototype.hasOwnProperty

class ContractError extends Error {
    constructor(errorCode, message) {
        super(message)
        this.name = this.constructor.name
        this.message = message
        this.errorCode = errorCode
    }
}

const ContractService = {

    createContract: async function(newContractInfo) {

        const data = {
            order: newContractInfo.orderID,
            client: newContractInfo.clientID,
            product: newContractInfo.productID,
            required_amount: Math.round(newContractInfo.expectedAmount * 1000000),
            market_amount: Math.round(newContractInfo.marketAmount * 1000000),
            proposed_amount: Math.round(newContractInfo.validatorAmount * 1000000),
            approved_amount: Math.round(newContractInfo.approvedAmount * 1000000),
            special_interest_value: newContractInfo.interestRate,
            agent: ProfileService.getID(),
            branch: CurrentBranchService.getCurrentBranchID(),
            warehousing_fee: Math.round(newContractInfo.warehousingFee * 1000000),
            matures_date: newContractInfo.openingDate,
            due_date: newContractInfo.expirationDate,
        }

        if (!isNullOrUndefined(newContractInfo.penalty)) {
            data.penalty = Math.round(newContractInfo.penalty * 1000000)
        }
        
        if (!isNullOrUndefined(newContractInfo.overdueFee)) {
            data.overdue_fee = Math.round(newContractInfo.overdueFee * 1000000)
        }

        if (!isNullOrUndefined(newContractInfo.oldPenalty) || Math.round(newContractInfo.oldPenalty) > 0) {
            data.old_penalty = Math.round(newContractInfo.oldPenalty * 1000000)
        }

        if (!isNullOrUndefined(newContractInfo.parentContractId)) {
            data.parent_contract_id = newContractInfo.parentContractId
        }

        try {
            const response = await ApiService.post(contractApi, data)
            if (response.status == 201) {
                return this.filterRawContractList([response.data])[0]
            }
        } catch (error) {
            throw new ContractError(error.response.status, error.response.data.detail)
        }
    },

    updateContract: async function(contractInfo) {
        try {

            const contractId = contractInfo.contractId
    
            const url = `${contractApi}${contractId}/`

            const contractData = {}

            if (!isNullOrUndefined(contractInfo.note)) {
                contractData['note'] = contractInfo.note
            }

            if (!isNullOrUndefined(contractInfo.diffAmount)) {
                contractData['diff_amount'] = Math.round(contractInfo.diffAmount * 1000000)
            }

            if (!isNullOrUndefined(contractInfo.status)) {
                contractData['status'] = contractInfo.status
            }
    
            const response = await ApiService.patch(url, contractData)
            
            return this.filterRawContract(response.data)
    
        } catch (error) {
            throw new ContractError(error.response.status, error.response.data.detail)
        }
    },

    approveContract: async function(contractInfo) {

        const url = contractApprovement.replace(":id", contractInfo.contractId)

        const data = {
            approvement_date: contractInfo.approvementDate,
        }
        try {
            const response = await ApiService.post(url, data)

            if (response.status === 200) {
                return response.data
            }
            
        } catch (error) {
            throw new ContractError(error.response.status, error.response.data.detail)
        }
    },

    cancelContract: async function(contractId) {
        const url = `${contractApi}${contractId}/`

        const contractData = {
            status: 'Closed',
            closed_branch: CurrentBranchService.getCurrentBranchID(),
            closed_by_user: ProfileService.getID(),
            close_date: moment().format("YYYY-MM-DD"),
        }

        try {
            const response = await ApiService.patch(url, contractData)
            return this.filterRawContract(response.data)
        } catch (error) {
            throw new ContractError(error.response.status, error.response.data.detail)
        }
    },

    getContractList: async function(page) {
        try {

            let url = contractApi
            if (page !== null && page !== 1) {
                url = `${contractApi}?page=${page}`
            }

            const response = await ApiService.get(url)

            const data = this.filterRawContractList(response.data.results)

            return {
                contracts: data,
                count: response.data['count'],
                // links: response.data['links'],
            }

        } catch (error) {
            throw new ContractError(error.response.status, error.response.data.detail)
        }
    },

    getPriceAdjustmentContractList: async function(page) {
        try {

            // chỉnh sửa thành api của priceAdjustment
            let url = priceAdjustment
            if (page !== null && page !== 1) {
                url = `${priceAdjustment}?page=${page}`
            }

            const response = await ApiService.get(url)

            const data = this.filterRawContractList(response.data.results)

            return {
                priceAdjustments: data,
                count: response.data['count'],
                // links: response.data['links'],
            }

        } catch (error) {
            throw new ContractError(error.response.status, error.response.data.detail)
        }
    },

    getContractByContractId: async function(id) {
        try {

            const url = contractById.replace(":id", id)

            const response = await ApiService.get(url)

            const data = this.filterRawContract(response.data)
            
            return {
                contract: data,
                // count: response.data['count'],
                // links: response.data['links'],
            }

        } catch (error) {

            throw new ContractError(error.response.status, error.response.data.detail)
        }
    },

    getContractDoucument: async function(id) {
        try {

            const url = contractDoucument.replace(":id", id)

            const response = await ApiService.get(url)

            const data = this.filterRawDocumnetList(response.data)
            
            return {
                docs: data,
            }

        } catch (error) {

            throw new ContractError(error.response.status, error.response.data.detail)
        }
    },

    getRepayment: async function(id) {
        try {

            const url = updateContractRepaymentAPI.replace(":id", id)

            const {data} = await ApiService.get(url)
    
            return {
                mifosId: data.mifos_id,
                maturityDate: moment(data.expected_maturity_date, "YYYY-MM-DD").format("D-M-YYYY"),
                principal: data.principal/1000000,
                interestCharged: data.interest_charged/1000000,
                overdueFee: data.overdue_fee/1000000,
                overdueDay: data.overdue_day,
                penaltyChargesCharged : data.penalty_charges_charged/1000000,
                total: data.total/1000000,
            }

        } catch (error) {

            throw new ContractError(error.response.status, error.response.data.detail)
        }
    },

    deleteContractDocument:  async function(id) {
        try {

            const url = deleteContractDocument.replace(":id", id)

            const responsedelete = await ApiService.delete(url)
            
            return {
                docs: responsedelete.data,
            }

        } catch (error) {

            throw new ContractError(error.responsedelete.status, error.responsedelete.data.detail)
        }
    },

    uploadContractDocument: async function(data) {
        try {
            const currentUserID = ProfileService.getID()
            data.append('uploader', currentUserID)
            const url = contractDocumentApi;

            const response = await ApiService.post(contractDocumentApi, data)
            
            return {
                docs: response.data,
            }

        } catch (error) {

            throw new ContractError(error.response.status, error.response.data.detail)
        }
    },

    getContractSummary: async function(id) {
        try {

            const url = contractSummary.replace(":id", id)

            const response = await ApiService.get(url)

            if (response.data.detail === null) {
                throw new ContractError(503, 'Not active')
            }
            
            return {
                contracts: this.filterRawSummary(response.data),
                total: this.filterTotalSummary(response.data)
            }

        } catch (error) {
            if (error instanceof ContractError) {
                throw new ContractError(error.errorCode, error.message)
            }
            throw new ContractError(error.response.status, error.response.data.detail)
        }
    },

    getContractRepaymentSchedule: async function(id) {
        try {

            const url = contractRepaymentSchedule.replace(":id", id)

            const response = await ApiService.get(url)

            const data = this.filterRawRepaymentSchedule(response.data)

            const total = this.filterRawContractTotalSchedule(response.data)
            
            return {
                contracts: data,
                total: total
            }

        } catch (error) {

            throw new ContractError(error.response.status, error.response.data.detail)
        }
    },

    getContractCollectoralInfo: async function(id) {
        try {

            const url = contractCollectoralInfo.replace(":id", id)

            const response = await ApiService.get(url)

            const data = this.filterRawCollectoralInfo(response.data)
            
            return {
                contracts: data,
                total: total
            }

        } catch (error) {

            throw new ContractError(error.response.status, error.response.data.detail)
        }
    },

    getContractTransactionLog: async function(id) {

        try {

            const url = contractTransaction.replace(":id", id)

            const response = await ApiService.get(url)

            const data = this.filterRawTransactionInfo(response.data)
            
            return {
                contracts: data,
            }

        } catch (error) {

            throw new ContractError(error.response.status, error.response.data.detail)
        }

    },

    repayContract: async function(contractData) {

        try {
            const data = {
                repayment_date: contractData.repaymentDate,
                closed_branch: CurrentBranchService.getCurrentBranchID(),
            }
            const url = updateContractRepaymentAPI.replace(":id", contractData.id)
            const response = await ApiService.post(url, data)
            // Do not need filter data
            // Example Data: {"detail":"No fee overdue","message":"successful Repayment"}
            return response.data
        } catch (error) {
            const array = error.response.data.detail.map(x =>{
                const key = Object.keys(x);
                return x[key]
            })
            throw new ContractError(error.response.status, array.join())
        }
    },

    findContractByMifosId: async function(id) {
        const contractUrl = `${contractApi}?mifos_id=${id}`

        try {
            const response = await ApiService.get(contractUrl)
            const data = this.filterRawContractList(response.data.results)
            return data
        } catch (error) {
            throw new ContractError(error.response.status, error.response.data.detail)
        }
    },

    findOverDueContractByMifosId: async function(id) {
        const contractUrl = `${contractOverDue}?mifos_id=${id}`

        try {
            const response = await ApiService.get(contractUrl)
            const data = this.filterRawContractList(response.data.results)
            return data
        } catch (error) {
            throw new ContractError(error.response.status, error.response.data.detail)
        }
    },

    findOverDueContractByMifosId: async function(id) {
        const contractUrl = `${contractOverDue}?mifos_id=${id}`

        try {
            const response = await ApiService.get(contractUrl)
            const data = this.filterRawContractList(response.data.results)
            return data
        } catch (error) {
            throw new ContractError(error.response.status, error.response.data.detail)
        }
    },

    findPriceAdjustmentContractByMifosId: async function(id) {
        const contractUrl = `${priceAdjustment}?mifos_id=${id}`

        try {
            const response = await ApiService.get(contractUrl)
            const data = this.filterRawContractList(response.data.results)
            return data
        } catch (error) {
            throw new ContractError(error.response.status, error.response.data.detail)
        }
    },

    getContractOverDue: async function(page) {
        try {
            let url = contractOverDue
            if (page !== null && page !== 1) {
                url = `${contractOverDue}?page=${page}`
            }
            const response = await ApiService.get(url)
            const data = this.filterRawContractList(response.data.results)
            return {
                contracts: data,
                count: response.data['count'],
                // links: response.data['links'],
            }
        } catch (error) {
            throw new ContractError(error.response.status, error.response.data.detail)
        }
    },

 
    filterRawContract: function(item) {
        let data = null;
        try {
            //Example created: "2019-05-31T14:16:03.932314+07:00"   
            const created = new moment(item.created, "YYYY-MM-DD[T]HH:mm").format("D-M-YYYY");

            const approvedAmount = item.approved_amount
            let interestValue = item.special_interest_value
            if (isNullOrUndefined(interestValue)) {
                interestValue = item.interest_value 
            }
            // const assetDescription = item.asset_description.length > 30 ? 
            //             item.asset_description.substring(0,30) + '...' : item.asset_description
            let principal = Math.floor(approvedAmount - (approvedAmount * interestValue / 100) * 1000) /1000
            let upperPrincipal = Math.round(principal * 1000)
            let downPrincipal = Math.floor(principal * 1000)
            let rounding = 0
            if (upperPrincipal - downPrincipal === 1){
                rounding = 0.001
            } else {
                rounding = 0
            }

            data = {
                id: item.id,
                loanId: item.mifos_id,
                createdDate: created,
                status: item.status,
                maturesDate: new moment(item.matures_date, "YYYY-MM-DD[T]HH:mm").format("D-M-YYYY"),
                agentName: item.agent_name,
                clientId: item.client,
                clientMifosId: item.client_mifos_id,
                clientName: item.client_name,
                branchName: item.branch_name,
                storageId: item.storage_id,
                storageLocation: item.storage_location,
                assetDescription: item.asset_description,
                // Loại tài sản
                assetType: item.asset_type,
                // Giá mong muốn
                requiredAmount: item.required_amount/1000000,
                // Giá thẩm định
                proposedAmount: item.proposed_amount/1000000,
                // Giá cầm
                approvedAmount: approvedAmount/1000000,
                // Phụ kiện 
                description: item.description,
                // note
                note: item.note,
                // product
                product: item.product,
                // gói
                productDesc: item.product_desc,
                // Ngày hết hợp đồng
                dueDate: new moment(item.due_date, "YYYY-MM-DD[T]HH:mm").format("D-M-YYYY"),
                // Lãi suất
                interestValue : interestValue,
                // Gốc
                principal: principal,
                // Khoản làm tròn
                rounding: rounding, 
                // Phí kho bãi
                warehousingFee: item.warehousing_fee /1000000,
                // Rớt giá
                diffAmount: item.diff_amount / 1000000,
                orderId: item.order,
                order: item.order,
                // Promotion Id
                promotion: item.promotion,
                specialInterestValue: item.special_interest_value,
            };
            return data
        } catch (error) {
            throw error
        }
    },
    
    filterRawContractList: function(rawData) {
        const data = []
        try {
            for (let item of rawData) {
                //Example created: "2019-05-31T14:16:03.932314+07:00"   
                const created = new moment(item.created, "YYYY-MM-DD[T]HH:mm").format("D-M-YYYY")
                
                const dueDate = null;
                if (item.due_date !== null) {
                    dueDate = new moment(item.due_date, "YYYY-MM-DD[T]HH:mm").format("D-M-YYYY")
                }

                const maturesDate = null;
                if (item.matures_date !== null) {
                    maturesDate = new moment(item.matures_date, "YYYY-MM-DD[T]HH:mm").format("D-M-YYYY")
                }
                 
                data.push({
                    id: item.id,
                    loanId: item.mifos_id,
                    createdDate: created,
                    dueDate: dueDate,
                    maturesDate: maturesDate,
                    orderId: item.order,
                    status: item.status,
                    clientName: item.client_name,
                    clientId: item.client,
                    clientMifosId: item.client_mifos_id,
                    assetDescription: this.subTextAsset(item.asset_description),
                    approvedAmount: item.approved_amount,
                    diffAmount: item.diff_amount,
                    interest: item.interest_value,
                    storageId: item.storage_id,
                    storageLocation: item.storage_location,
                    branchName: item.branch_name,
                    specialInterestValue: item.special_interest_value
                })
            }
            return data
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    subTextAsset: function(textFull) {
        if(textFull === null || textFull === undefined || textFull.length <= 30) {
            return textFull
        } else {
            return textFull.substring(0, 30) + "...";
        }
    },
    filterRawDocumnetList: function(rawData) {
        const data = []
        try {
            for (let item of rawData.data) {
                //Example created: "2019-05-31T14:16:03.932314+07:00"   
                const created = new moment(item.created, "YYYY-MM-DD[T]HH:mm").format("D-M-YYYY HH:mm")

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

    filterRawRepaymentSchedule: function(rawData) {
        const data = []
        try {
            for (let item of rawData.detail.repaymentSchedule.periods) {
                //Example created: [yyyy,mm,dd]
                const date = this.getDateFromArray(item.dueDate)
                const paid = this.getDateFromArray(item.fromDate)

                data.push({
                    day: item.daysInPeriod,
                    date: date,
                    paid_date: paid,
                    principal_due: item.principalOutstanding,
                    blance_of_loan: item.principalLoanBalanceOutstanding,
                    interest: item.interestOutstanding,
                    fees: item.feeChargesOutstanding,
                    fenalties: '',
                    due: item.totalDueForPeriod,
                    pain: item.totalPaidForPeriod,
                    in_advance: item.totalPaidInAdvanceForPeriod,
                    late: item.totalPaidLateForPeriod,
                    outstanding: item.totalOutstandingForPeriod
                })
            }
            return data
        } catch (error) {
            console.log(error)
            throw error
        }
    },

    filterRawContractTotalSchedule: function(item) {
        let total = null;
        try {
            total = {
                // Total Outstanding
                totalOutstanding: item.detail.repaymentSchedule.totalOutstanding,
                // Total Late
                totalPaidLate: item.detail.repaymentSchedule.totalPaidLate,
                // Total In Advance
                totalAdvancePayment: item.detail.repaymentSchedule.totalAdvancePayment,
                // Total Paid
                totalRepayment: item.detail.repaymentSchedule.totalRepayment,
                // Total Due
                totalRepaymentExpected: item.detail.repaymentSchedule.totalRepaymentExpected,
                // Total Penalties
                totalPenaltyChargesCharged: item.detail.repaymentSchedule.totalPenaltyChargesCharged,
                // Total Fees
                totalFeeChargesCharged: item.detail.repaymentSchedule.totalFeeChargesCharged,
                //Total Interest
                totalInterestCharged: item.detail.repaymentSchedule.totalInterestCharged,
                // Total Principle due
                totalPrincipalExpected: item.detail.repaymentSchedule.totalPrincipalExpected,
            }
            return total
        } catch (error) {
            console.log(error)
            throw error
        }
    },

    // chưa có bản map, đang chờ bản map
    filterRawCollectoralInfo: function(rawData) {
        const data = []
        try {

        } catch (error) {
            console.log(error)
            throw error
        }
    },

    filterRawTransactionInfo: function(rawData) {
        const data = []
        if (rawData.detail.length > 0) {
            data.push(
                {
                    office: '',
                    transaction_date: '',
                    transaction_type: '',
                    amount: '',
                    principal: 'Gốc',
                    interest: 'Lãi',
                    fee: 'Phí',
                    penalties: 'Lãi thêm',
                    loan_balance: '',
                },
            )
        }
        try {
            for (let item of rawData.detail) {
                //Example created: "2019-05-31T14:16:03.932314+07:00"   
                const date = this.getDateFromArray(item.date)
            
                data.push({
                    office: item.officeName,
                    transaction_date: date,
                    transaction_type: item.type.value,
                    amount: item.amount,
                    principal:  item.principalPortion,
                    fee: item.feeChargesPortion,
                    interest: item.interestPortion,
                    penalties: item.penaltyChargesPortion,
                    loan_balance: item.outstandingLoanBalance,
                })
            }
            return data
        } catch (error) {
            console.log(error)
            throw error
        }
    },

    filterRawSummary: function(rawData) {
        let data = null
        data = {
            principalDisbursed: rawData.detail.principalDisbursed,
            principalPaid: rawData.detail.principalPaid,
            principalWrittenOff: rawData.detail.principalWrittenOff,
            principalOutstanding: rawData.detail.principalOutstanding,
            principalOverdue: rawData.detail.principalOverdue,
            principalNetDisbursed: rawData.detail.principalNetDisbursed,
            interestCharged: rawData.detail.interestCharged,
            interestPaid: rawData.detail.interestPaid,
            interestWaived: rawData.detail.interestWaived,
            interestWrittenOff: rawData.detail.interestWrittenOff,
            interestOutstanding: rawData.detail.interestOutstanding,
            interestOverdue: rawData.detail.interestOverdue,
            feeChargesCharged: rawData.detail.feeChargesCharged,
            feeChargesDueAtDisbursementCharged: rawData.detail.feeChargesDueAtDisbursementCharged,
            feeChargesPaid: rawData.detail.feeChargesPaid,
            feeChargesWaived: rawData.detail.feeChargesWaived,
            feeChargesWrittenOff: rawData.detail.feeChargesWrittenOff,
            feeChargesOutstanding: rawData.detail.feeChargesOutstanding,
            feeChargesOverdue: rawData.detail.feeChargesOverdue,
            penaltyChargesCharged: rawData.detail.penaltyChargesCharged,
            penaltyChargesPaid: rawData.detail.penaltyChargesPaid,
            penaltyChargesWaived: rawData.detail.penaltyChargesWaived,
            penaltyChargesWrittenOff: rawData.detail.penaltyChargesWrittenOff,
            penaltyChargesOutstanding: rawData.detail.penaltyChargesOutstanding,
            penaltyChargesOverdue: rawData.detail.penaltyChargesOverdue,
            totalExpectedRepayment: rawData.detail.totalExpectedRepayment,
            totalRepayment: rawData.detail.totalRepayment,
            totalExpectedCostOfLoan: rawData.detail.totalExpectedCostOfLoan,
            totalCostOfLoan: rawData.detail.totalCostOfLoan,
            totalWaived: rawData.detail.totalWaived,
            totalWrittenOff: rawData.detail.totalWrittenOff,
            totalOutstanding: rawData.detail.totalOutstanding,
            totalOverdue: rawData.detail.totalOverdue,
        }
        return data
    },

    filterTotalSummary: function(rawData) {
        const total = {
            original: 'Tổng',
            css:'bold-text',
            loan_amount: rawData.detail.totalExpectedRepayment,
            paid: rawData.detail.totalRepayment,
            waived: rawData.detail.totalWaived,
            outstanding: rawData.detail.totalOutstanding,
            unpaid: rawData.detail.totalWrittenOff,
            overdue: rawData.detail.totalOverdue,
        }
        return total
    },
    getDateFromArray(array) {
        if(isNullOrUndefined(array) === false && array.length === 3) {
            return String(array[2]).concat('/').concat(array[1]+'').concat('/').concat(array[0]+'');
        }
        return '';
    }

}

export default ContractService

export { ContractService, ContractError }