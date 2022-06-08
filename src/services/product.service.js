import ApiService from './api.service'
import { productApi } from '../config/backend-api'

class ProductError extends Error {
    constructor(errorCode, message) {
        super(message)
        this.name = this.constructor.name
        this.message = message
        this.errorCode = errorCode
    }
}

const ProductService = {
    getProduct: async function() {

        try {

            const response = await ApiService.get(productApi)

            const result = this.filterRawProductList(response.data)

            return result

        } catch (error) {

            throw new ProductError(error.response.status, error.response.data)
        }
    },

    filterRawProductList: function(rawData) {
        const data = []
        try {
            for (let item of rawData) {
                data.push({
                    id: item.id,
                    productName: item.product_name,
                    productDesc: item.product_desc,
                    repayEvery: item.repay_every,
                    interestValue: item.interest_value,
                    mifosId: item.mifos_id,
                })
            }
            return data
        } catch (error) {
            console.log(error)
            throw error
        }
    },
}

export default ProductService

export { ProductService, ProductError }