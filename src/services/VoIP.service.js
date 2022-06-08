import vue from '../main'
import JsSIP from 'jssip'
import store from '../store/store'

const ws_uri = process.env.VUE_APP_WS_URI
const ws_user = process.env.VUE_APP_WS_USER

JsSIP.debug.enable('JsSIP:*');

const showNotification = () => {
     // If it's okay let's create a notification
    const notification = new Notification("Bạn có cuộc gọi bên CRM")

    notification.onclick = function(event) {
        if (document.hidden) {
            window.focus()
        }
    }
}

let isDisconnected = true

const VOIPService = {
    socket: new JsSIP.WebSocketInterface(ws_uri),
    telephone: null,
    configuration: null,
    
    setTelephone({user, password}) {
        if (user === 'None'| password === 'None') {
            return
        }

        this.configuration = {
            sockets  : [ this.socket ],
            uri      : ws_user.replace("user", user),
            password : password,
            contact_uri: `sip:${user}@webrtc.icado.vn;transport=ws`
        }
        
        this.telephone =  new JsSIP.UA(this.configuration)

        this.telephone.on('registered', function(e) {
            vue.$notify({
                group: 'foo',
                type: 'success',
                title: "Thông báo",
                text: "Kết nối tổng đài thành công"
            })
            store.dispatch('call/setEnableCall', {enabled: true})
            navigator.mediaDevices.getUserMedia({ audio: true })
            Notification.requestPermission()
            isDisconnected = false
        })
        
        this.telephone.on('registrationFailed', function(e){
            vue.$notify({
                group: 'foo',
                type: 'error',
                title: "Thông báo",
                text: "Kết nối tổng đài thất bại"
            })
        })

        this.telephone.on('disconnected', function(e){
            if (!isDisconnected) {
                vue.$notify({
                    group: 'foo',
                    type: 'error',
                    title: "Thông báo",
                    text: "Mất kết nối tổng đài"
                })
                store.dispatch('call/setEnableCall', {enabled: false})
            }
            isDisconnected = true
        })

        this.telephone.on('newRTCSession', function(data) {
            const session = data.session
            
            if (session.direction === "incoming") {
                //Show Notification if web don't have any call
                if (!store.getters['call/calling']) {
                    store.dispatch('call/incomingRequest',{session})

                    if (Notification.permission === "granted") {
                        showNotification()
                    }
                    // Otherwise, we need to ask the user for permission
                    else if (Notification.permission !== "denied") {
                        Notification.requestPermission().then(function (permission) {
                            // If the user accepts, let's create a notification
                            if (permission === "granted") {
                                showNotification()
                            }
                        })
                    }
                }
            }
            
        })
        this.telephone.start()
    },

    getTelephone() {
        return this.telephone
    },

    disconnect() {
        if (this.telephone !== null) {
            this.telephone.stop()
            this.telephone.unregister()
            this.telephone == null
        }
    }
}

export default VOIPService