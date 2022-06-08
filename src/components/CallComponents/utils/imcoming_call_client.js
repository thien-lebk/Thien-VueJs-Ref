import OrderService from "../../../services/order.service"
import ClientService from "../../../services/client.service"

const getClient = async ({phone, orderId}) => {

    const result = await ClientService.getClientByPhone(phone)

    if (result.status) {
        return {clientId: result.data[0].id, clientName: result.data[0].fullName}
    }

    if (orderId !== null) {

        const result = OrderService.getFilterOrderList({phone: phone, status: ['Open', 'In Progress']})
        
        if (result.length > 0) {
            const clientName =  result[result.length-1].name !== null ? result[result.length-1].name : 'Khách lạ'
            return {clientId: null, clientName}
        }
    }

    return {clientId: null, clientName: 'Khách lạ'}
}

export default getClient