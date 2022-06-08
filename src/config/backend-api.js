const baseURL = process.env.VUE_APP_BASE_URL

export const loginApi = `${baseURL}/auth/token/`

export const refreshTokenApi = `${baseURL}/auth/token/refresh/`

export const getBranchAPI = `${baseURL}/branches/`

export const SAssetListAPI = `${baseURL}/sassets/`

export const CAssetsAPI = `${baseURL}/cassets/`

export const clientAPI = `${baseURL}/client/`

export const orderAPI = `${baseURL}/orders/`

export const productApi = `${baseURL}/products/`

export const getOrderAPI = `${baseURL}/orders/custom_list/`

export const orderFromStaffAPI = `${baseURL}/staffs/:id/orders/`

export const newNotificationFromUserIDAPI = `${baseURL}/staffs/:id/new_notification/`

export const notificationFromUserIDAPI = `${baseURL}/staffs/:id/notification/`

export const notificationAPI = `${baseURL}/notifications/`

export const deleteNotificationAPI = `${baseURL}/orders/:id/delete-noti/`

export const callAPI = `${baseURL}/calls/`

export const orderCallAPI = `${baseURL}/orders/:id/calls/`

export const contractApi = `${baseURL}/contracts/`

export const contractById = `${baseURL}/contracts/:id/`

export const contractDoucument = `${baseURL}/contracts/:id/contract-docs/`

export const deleteContractDocument = `${baseURL}/contract-docs/:id/`

export const contractDocumentApi = `${baseURL}/contract-docs/`

export const contractSummary = `${baseURL}/contracts/:id/contract-summary/`

export const contractCollectoralInfo = `${baseURL}/contracts/:id/collectoral-info/`

export const contractTransaction = `${baseURL}/contracts/:id/transaction-log/`

export const contractRepaymentSchedule = `${baseURL}/contracts/:id/repayment-schedule/`

export const contractApprovement = `${baseURL}/contracts/:id/approve/`

export const updateContractNote = `${baseURL}/contracts/:id/`

export const customerApi = `${baseURL}/client/`

export const customerDoucument = `${baseURL}/client/:id/client-docs/`

export const deleteCustomerDocument = `${baseURL}/client-docs/:id/`

export const customerDocumentApi = `${baseURL}/client-docs/`

export const customerById = `${baseURL}/client/:id/`

export const contractActive = `${baseURL}/client/:id/active-contracts/`

export const contractClose = `${baseURL}/client/:id/close-contracts/`

export const customerBankAccout = `${baseURL}/client/:id/bank_accounts/`

export const uploadBankAccout = `${baseURL}/client-banks/`

export const deleteBankAccout = `${baseURL}/client-banks/:id/`

export const updateBankAcout = `${baseURL}/client-banks/:id/`

export const updateCustomerNote = `${baseURL}/client/:id/`

export const customerTransactionHistory = `${baseURL}/client/:id/transaction_history/`

export const updateCustomerAPI = `${baseURL}/client/:id/`

export const updateContractRepaymentAPI = `${baseURL}/contracts/:id/repayment/`

export const contractOverDue = `${baseURL}/contracts/overdue-contract/`

export const priceAdjustment = `${baseURL}/contracts/price-adjustment/`

export const promotionAPI = `${baseURL}/marketing/promotions/`

export const customerListAPI = `${baseURL}/marketing/customer-list/`

export const uploadCustomerListFileAPI = `${baseURL}/marketing/customer-list/upload-list/`

export const celeryStatusAPI = `${baseURL}/celery/status/`

export const campaignAPI = `${baseURL}/marketing/campaign/`

export const getOrderFromCampaignAPI = `${baseURL}/marketing/campaign/:id/orders/`