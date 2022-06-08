import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_ERROR,
} from './types'

import {ProductService, ProductError} from '../../../../services/product.service'

export default {
    async getProduct({commit}) {
        commit(PRODUCT_LIST_REQUEST)
        try {
            const products = await ProductService.getProduct()

            const result = {}

            for (let product of products) {
                result[product.productDesc] = {
                    'id': product.id,
                    'productName': product.productName,
                    'repayEvery': product.repayEvery,
                    'interestValue': product.interestValue,
                    'mifosId': product.mifosId,
                }
            }

            commit(PRODUCT_LIST_SUCCESS, {products: result})
        } catch (error) {
            if (error instanceof ProductError) {
                commit(PRODUCT_LIST_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(PRODUCT_LIST_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
        }
    },
}