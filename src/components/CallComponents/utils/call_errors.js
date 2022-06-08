import JsSIP from 'jssip'

const formatError = (cause, byEmployee) => {
    return byEmployee ? `${cause} by Employee` : `${cause} by Customer`
}
const getError = (cause, byEmployee) => {
    switch (cause) {
        case JsSIP.C.causes.CANCELED:
        case JsSIP.C.causes.BYE:
            return formatError(cause, byEmployee)
        default:
            return cause
    }
}

const getVietnameseError = (cause) => {
    switch (cause) {
        case "Connecting":
            return "Đang thiết lập cuộc gọi"
        case "Ring":
            return "Đang chờ"
        case "In call":
            return "Đang trò chuyện"
        case JsSIP.C.causes.CONNECTION_ERROR:
            return "Không thể kết nối đến tổng đài"
        case JsSIP.C.causes.REQUEST_TIMEOUT:
            return "Yêu cầu quá thời hạn chờ"
        case JsSIP.C.causes.SIP_FAILURE_CODE:
            return "Lỗi lạ chưa xác định được"
        case JsSIP.C.causes.INTERNAL_ERROR:
            return "Không xác định nguyên nhân"
        case JsSIP.C.causes.BUSY:
            return "Khách từ chối"
        case JsSIP.C.causes.REJECTED:
            return "Nhân viên Từ chối"
        case JsSIP.C.causes.REDIRECTED:
            return "Đã chuyển hướng"
        case JsSIP.C.causes.UNAVAILABLE:
            return "Khách không bắt máy"
        case JsSIP.C.causes.NOT_FOUND:
            return "Không tìm thấy"
        case JsSIP.C.causes.ADDRESS_INCOMPLETE:
            return "Địa chỉ không hợp lệ"
        case JsSIP.C.causes.INCOMPATIBLE_SDP:
            return "SDP không hợp lệ"
        case JsSIP.C.causes.MISSING_SDP:
            return "Không có SDP"
        case JsSIP.C.causes.AUTHENTICATION_ERROR:
            return "Chưa xác thực đến tổng đài"
        case `${JsSIP.C.causes.CANCELED} by Employee`:
            return "Nhân viên huỷ cuộc gọi"
        case `${JsSIP.C.causes.CANCELED} by Customer`:
            return "Cuộc gọi nhỡ"
        case `${JsSIP.C.causes.BYE} by Employee`:
            return "Nhân viên tắt cuộc gọi"
        case `${JsSIP.C.causes.BYE} by Customer`:
            return "Khách hàng tắt cuộc gọi"
        case JsSIP.C.causes.NO_ANSWER:
            return "Không có ai trả lời khách"
        // Incoming call contains a Expires header and 
        // local user did not answer within the time given in the header. 
        case JsSIP.C.causes.EXPIRES:
            return "Nội dung hết hạn"
        //An incoming INVITE was replied with 2XX status code
        //but no ACK was received.
        case JsSIP.C.causes.NO_ACK:
            return "Máy khách không thể kết nối tổng đài"
        //An in-dialog request received a 408 or 481 SIP error.
        case JsSIP.C.causes.DIALOG_ERROR:
            return "Hiện tại không thể kết nối tổng đài"
        //Local user denied media access when prompted for audio/video devices.
        case JsSIP.C.causes.USER_DENIED_MEDIA_ACCESS:
            return "Nhân viên không mở microphone"
        case JsSIP.C.causes.BAD_MEDIA_DESCRIPTION:
            return "Nhận âm thanh lỗi"
        case JsSIP.C.causes.WEBRTC_ERROR:
            return "Trình duyệt không hỗ trợ"
        case JsSIP.C.causes.RTP_TIMEOUT:
            return "Kết thúc do mất tín hiệu"
    }
}

export {getError, getVietnameseError}