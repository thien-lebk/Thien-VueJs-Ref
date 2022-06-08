import OrderService from "../../../services/order.service"

const getOrder = async ({phone, orderId}) => {

    if (orderId !== null) {

        try {
            const order = await OrderService.getOrderDetail(orderId)
            return {order, type:'detail'}
        } catch (error) {
            
        }
        
    }

    const order = await OrderService.getFilterOrderList({phone, status: ['Open', 'In Progress']})
    
    return {order, type: 'list'}
}

export default getOrder