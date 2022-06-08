import ApiService from './api.service'
import {ProfileService} from './storage.service'
import { callAPI, orderCallAPI } from '../config/backend-api'
import moment from 'moment'
import {getVietnameseError} from '../components/CallComponents/utils/call_errors'
const has = Object.prototype.hasOwnProperty

class CallError extends Error {
    constructor(errorCode, message) {
        super(message)
        this.name = this.constructor.name
        this.message = message
        this.errorCode = errorCode
    }
}

const CallService = {
    createCall: async function(newCall) {
        const data = {
            order: newCall.orderID,
            agent: ProfileService.getID(),
            call_type: newCall.callType,
            call_status: newCall.callStatus,
            start_time: newCall.startTime,
        }

        if (has.call(newCall, 'ringTime')) {
            data.ring_time = newCall.ringTime
        }

        try {
            const response = await ApiService.post(callAPI, data)
            return response.data
        } catch (error) {
            throw new CallError(error.response.status, error.response.data)
        }
    },

    updateCall: async function(callInfo) {

        const data = {
            call_status: callInfo.callStatus
        }

        const callID = callInfo.callID

        if (has.call(callInfo, 'talkTime')) {
            data.talk_time = callInfo.talkTime
        }

        if (has.call(callInfo, 'ringTime')) {
            data.ring_time = callInfo.ringTime
        }

        if (has.call(callInfo, 'endTime')) {
            data.end_time = callInfo.endTime
        }

        const url = `${callAPI}${callID}/`

        try {
            const response = await ApiService.patch(url, data)
            return response.data
        } catch (error) {
            throw new CallError(error.response.status, error.response.data)
        }
    },

    getCallByOrder: async function(orderID) {

        const url = orderCallAPI.replace(":id", orderID)

        try {

            const response = await ApiService.get(url)

            const result = this.filterRawCallList(response.data.data.reverse())

            return result

        } catch (error) {

            throw new CallError(error.response.status, error.response.data)
        }
    },

    filterRawCallList: function(rawData) {
        const data = []

        try {

            for (let item of rawData) {
                //Example start_time: "2019-05-31T14:16:03.932314+07:00"
                const startTime = new moment(item.start_time.substring(0, 16), "YYYY-MM-DD[T]HH:mm").format("DD-MM-YYYY HH:mm")

                let endTime = null
                if (item.end_time !== null) {
                    endTime = new moment(item.end_time.substring(0, 16), "YYYY-MM-DD[T]HH:mm").format("DD-MM-YYYY HH:mm")
                }

                

                data.push({
                    id: item.id,
                    orderID: item.order,
                    agentName: item.agent_name,
                    startTime: startTime,
                    endTime: endTime,
                    callType: item.call_type == 'Call out' ? 'Cuộc gọi đi' : 'Cuộc gọi đến',
                    callStatus: getVietnameseError(item.call_status),
                    ringTime: this.convertTime(item.ring_time),
                    talkTime: this.convertTime(item.talk_time),
                })
            }
            return data

        } catch (error) {
            console.log(error)
            throw new CallError(error.response.status, error.response.data)
        }
    },
    convertTime: function(time) {
        const minutes = this.padTime(Math.floor(time / 60))
        const seconds = this.padTime(time - (minutes * 60))
        return `${minutes}:${seconds}`
    },
    padTime: function(time) {
        return (time < 10 ? '0' : '') + time;
    }
}

export default CallService
export { CallService, CallError }