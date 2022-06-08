import VOIPService from "../../../../services/VoIP.service"
import {VOIPUserService} from '../../../../services/storage.service'
import NotificationService from "../../../../services/notification.service"
import { CallService, CallError } from "../../../../services/call.service"
import moment from 'moment'
import vue from '../../../../main'
import isMissCall from '../../utils/miss_call'
import getIncomingCallContent from '../../utils/outcoming_call_content'
import getClient from '../../utils/imcoming_call_client'
import getOrder from '../../utils/order_for_call'

import {
  SET_ENABLE,

  SESSION,

  OPEN_WINDOW,
  OPEN_CALL_BOX,
  OPEN_DIAL_PAD,

  CLOSE_WINDOW,
  CLOSE_CALL_BOX,
  CLOSE_DIAL_PAD,

  UPDATE_CALL_ID,
  CALL_UPDATING_REQUEST,
  UPDATE_ORDER_ID,
  UPDATE_ORDER_CONTENT,

  OUTCOMING_REQUEST,
  OUTCOMING_CONNECTED,
  OUTCOMING_RESPONSE,
  OUTCOMING_END,
  OUTCOMING_FAIL,

  INCOMING_REQUEST,
  INCOMING_RESPONSE,
  INCOMING_END,
  INCOMING_FAIL,

  SET_VOLUME,

  RESET_DETAIL,
  BY_EMPLOYEE,
} from './types'

const wsUser = process.env.VUE_APP_WS_USER

let audio = null

const toastList = []

const incomingOptions = {
  extraHeaders: [ 'X-Foo: foo', 'X-Bar: bar' ],
  mediaConstraints : { audio: true, video: false },
  sessionTimersExpires: '180',
  pcConfig: {
      iceServers: [
        { urls: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302'] }
      ],
      iceTransportPolicy: 'all',
      rtcpMuxPolicy: 'negotiate'
  }
}

export default {
  async setEnableCall({commit}, {enabled}) {
    commit(SET_ENABLE, {enabled})
  },

  async openDialPad({commit}) {
    commit(OPEN_WINDOW)
    commit(OPEN_DIAL_PAD)
  },

  async closeDialPad({commit}) {
    commit(CLOSE_DIAL_PAD)
    commit(CLOSE_WINDOW)
  },

  async openCallBox({commit}) {
    commit(OPEN_WINDOW)
    commit(OPEN_CALL_BOX)
  },

  async closeCallBox({commit}) {
    commit(CLOSE_CALL_BOX)
    commit(CLOSE_WINDOW)
    commit(RESET_DETAIL)
    commit(UPDATE_ORDER_ID, {id: null})
  },

  async terminate({getters, commit}) {
    const session = getters.session
    //Session is exist
    if (session != null) {
      commit(BY_EMPLOYEE, {byEmployee: true})
      session.terminate()
    }
  },

  async closeWindow({commit, getters}) {
    const session = getters.session
    //Session is still exist
    if (session != null) {
      commit(BY_EMPLOYEE, {byEmployee: true})
      await session.terminate()
    }
    commit(CLOSE_DIAL_PAD)
    commit(CLOSE_CALL_BOX)
    commit(CLOSE_WINDOW)
    commit(RESET_DETAIL)
    commit(UPDATE_ORDER_ID, {id: null})
  },

  //For outcoming call
  async call({commit, dispatch, getters}, payload) {

    // Reset if new call before close window
    commit(BY_EMPLOYEE, {byEmployee: false})

    const eventHandlers = {
      //Begin Ring
      'progress': (e) => {
        commit(OUTCOMING_CONNECTED)
      },
      //Begin call
      'confirmed': (e) => {
        commit(OUTCOMING_RESPONSE)
      },
      //End call
      'ended': (e) => {
        commit(OUTCOMING_END, {cause: e.cause})
        commit(SESSION, {session:null})
        audio = null
      },
      //Fail Before call
      'failed': (e) => {
        commit(OUTCOMING_FAIL, {cause: e.cause})
        commit(SESSION, {session:null})
        audio = null
      },
    }

    const options = {
      eventHandlers : eventHandlers,
      extraHeaders: [ 'X-Foo: foo', 'X-Bar: bar' ],
      mediaConstraints : { audio: true, video: false },
      sessionTimersExpires: '180',
      pcConfig: {
          iceServers: [
            { urls: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302'] }
          ]
      }
    }

    const phone = VOIPService.getTelephone()
    const session = phone.call(wsUser.replace("user", payload.phone), options)

    session.connection.addEventListener("addstream",  function (e) {
      audio = document.createElement('audio')
      audio.volume = getters.volume
      audio.autoplay = true
      audio.srcObject = e.stream
    })

    commit(UPDATE_ORDER_ID, {id: payload.orderId})

    commit(SESSION, {session})

    const {clientId, clientName} = await getClient({phone: payload.phone, orderId: payload.orderId})
    commit(OUTCOMING_REQUEST, {customerPhone: payload.phone, customerName: clientName, customerId: clientId})
    
    //Open CallBox show phone ring
    await dispatch("openCallBox")

    try {
      commit(CALL_UPDATING_REQUEST, {requesting: true})
      const data = {
        orderID: payload.orderId,
        callType: 'Call out',
        callStatus: 'connecting',
        startTime: moment().format("YYYY-MM-DD HH:mm:ss")
      }
      const {id} = await CallService.createCall(data)
      commit(UPDATE_CALL_ID, {id})
      commit(CALL_UPDATING_REQUEST, {requesting: false})
    } catch (error) {
      if (error instanceof CallError) {
        console.log(`Code ${error.errorCode}: ${error.message}`)
      }
      console.log('Code 500: Internal Server Error')
    }

    const result = await getOrder({phone: payload.phone, orderId: payload.orderId})
    commit(UPDATE_ORDER_CONTENT, result)
  },

  // For incoming call
  async incomingRequest({commit, dispatch, getters}, {session}) {
    
    const startTime = moment().format("YYYY-MM-DD HH:mm:ss")

    let ringTime = 0
    const ringTimer = setInterval(() => {ringTime++}, 1000)
    
    //Get phone from session
    const phone = session._remote_identity._display_name

    const {clientName, clientId, content} = await getIncomingCallContent(phone)
    
    commit(INCOMING_REQUEST)
    
    session.on('ended', (e) => {
      commit(INCOMING_END, {cause: e.cause})
      commit(SESSION, {session:null})
      audio = null
    })

    //Add events handle for incoming call session, we need clientName and phone
    session.on('confirmed', async (e) => {
      // reset info before new event handle
      commit(BY_EMPLOYEE, {byEmployee: false})

      clearInterval(ringTimer)
      
      audio = document.createElement('audio')
      audio.volume = getters.volume
      audio.autoplay = true
      audio.srcObject = session.connection.getRemoteStreams()[0]

      // Only incoming call, we can get time from session
      const data = {
        orderID: null,
        callType: 'Call in',
        callStatus: 'In call',
        startTime: startTime,
        ringTime: ringTime,
      }
      const {id} = await CallService.createCall(data)
      commit(UPDATE_CALL_ID, {id})
      commit(UPDATE_ORDER_ID, {id: null})
      
      // must run before commit, to start count talk time
      await dispatch("openCallBox")

      // get name and phone user when confirm, except many user call to call center
      commit(INCOMING_RESPONSE, {customerPhone: phone, customerName: clientName, customerId: clientId})
      commit(SESSION, {session})
      
      const result = await getOrder({phone: phone, orderId: null})
      commit(UPDATE_ORDER_CONTENT, result)
    })

    const toast = vue.$snotify.simple(
      content, 
      'Cuộc gọi đến', 
      {
        showProgressBar: false,
        timeout: null,
        closeOnClick: false,
        pauseOnHover: true,
        buttons: [
          {
            text: 'Chấp nhận', 
            // Css from IncomingAudio.vue
            className: 'acceptButton',
            action: async () => {
              session.answer(incomingOptions)
              toastList.forEach(item => vue.$snotify.remove(item.id))
              toastList.length = 0
            }
          },
          {
            text: 'Từ chối', 
            // Css from IncomingAudio.vue
            className: 'denyButton',
            action: (toast) => {
              commit(BY_EMPLOYEE, {byEmployee: true})
              session.terminate()
              vue.$snotify.remove(toast.id)
              toastList.pop(toast)
            }
          },
        ]
      }
    )

    toastList.push(toast)

    session.on('failed', (e) => {
      clearInterval(ringTimer)
      
      vue.$snotify.remove(toast.id)
      toastList.pop(toast)

      commit(INCOMING_FAIL, {cause: e.cause})

      if (getters.byEmployee) {

        // Only incoming call, we can get time from session
        const data = {
          orderID: null,
          callType: 'Call in',
          callStatus: getters.error,
          startTime: startTime,
          ringTime: ringTime,
          endTime: moment().format("YYYY-MM-DD HH:mm:ss"),
        }
        CallService.createCall(data)
        commit(BY_EMPLOYEE, {byEmployee: false})

      } else {

        const request = e.message
        const misscall = isMissCall(request)
        
        if (misscall) {
          NotificationService.createNotification({
            order: null,
            message: `Cuộc gọi nhỡ: ${phone}`,
            type: 'misscall',
          })
        }
      }
      audio = null
      // Finish, reset info
      commit(BY_EMPLOYEE, {byEmployee: false})
    })
  },

  setVolume({commit}, {volume}) {
    commit(SET_VOLUME, {volume})
    if (audio !== null) {
      audio.volume = volume
    }
    VOIPUserService.setVolume(volume)
  },

  async updateCall({getters, commit}, payload) {
    
    const callInfo = {
      callID: getters.callID,
      ...payload
    }

    commit(CALL_UPDATING_REQUEST, {requesting: true})

    try {
      CallService.updateCall(callInfo)
    } catch (error) {
      if (error instanceof CallError) {
        console.log(`Code ${error.errorCode}: ${error.message}`)
      }
      console.log('Code 500: Internal Server Error')
    }
    
    commit(CALL_UPDATING_REQUEST, {requesting: false})

  },

}