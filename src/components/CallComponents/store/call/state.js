import {VOIPUserService} from '../../../../services/storage.service'

export default function initialState() {

    return {
        enabled: false,
        
        windowOpen: false,
        callBox: false,
        dialPad: false,
        
        session: null,
        calling: false,
        ring: false,
        byEmployee: false,
        step: 'rest',
        error: '',
        
        volume: VOIPUserService.getVolume(),
        
        //For update call table
        callUpdating: false,
        callID: null,

        orderId: null,
        customerPhone: '',
        customerName: '',
        customerId: null,
        customerOrderResult: null,
        requestType: '',
    }
}