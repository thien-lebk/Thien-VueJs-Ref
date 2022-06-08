import OrderService from "../../../services/order.service"
import ClientService from "../../../services/client.service"

export default async (phone) => {
    const [result1, result2] = await Promise.all([ClientService.getClientByPhone(phone), OrderService.getFilterOrderList({phone: phone, status: ['Open', 'In Progress']})])

    let clientName = 'Khách lạ'
    let clientId = null

    // Get client name from api client
    if (result1.status) {
        clientName = result1.data[0].fullName
        clientId = result1.data[0].id
    // Get client name from order api
    } else if (result2.length > 0) {
        const name = result2[result2.length-1].name
        if (name !== null) {
            clientName = name
        }
    }

    let content = `${clientName} (${phone})`

    // Show order detail if is exist
    if (result2.length > 0) {
        const orderId = result2[result2.length-1].orderID
        const assetDescription = result2[result2.length-1].assetDescription
        content = `${content} ${'order: ' + orderId} : ${assetDescription}`
    }

    return {clientName, clientId, content}
}