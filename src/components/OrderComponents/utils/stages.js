const stages = {
    NOT_ELIGIBLE                    : {eng: "Not eligible", vi: "Không đủ điều kiện yêu cầu", status: "Failed"},
    NOT_IN_SERVICE_REGION           : {eng: "Not in service region", vi: "Tỉnh/thành chưa có dịch vụ", status: "Failed"},
    NO_PICK_UP                      : {eng: "No Pick-up", vi: "Không liên lạc được KH", status: "Failed"},
    WINDOW_SHOPPING                 : {eng: "Window shopping", vi: "KH thử dịch vụ", status: "Invalid"},
    UNABLE_TO_APPRAISE_LIQUIDATED   : {eng: "Unable to Appraise/Liquidated", vi: "Không có nơi thanh lý/thẩm định", status: "Failed"},
    DUPLICATE                       : {eng: "Duplicate", vi: "Trùng", status: "Invalid"},
    RATE_DISAGREEMENT               : {eng: "Rate Disagreement", vi: "Không thống nhất về giá", status: "Failed"},
    NO_SHOW                         : {eng: "No Show", vi: "Khách hẹn nhưng không lên", status: "Failed"},
    MONEY_FROM_DIFFERENT_CHANNEL    : {eng: "Money from different channel", vi: "KH đã xoay được tiền từ nguồn khác", status: "Failed"},
    TERMS_DISAGREEMENT              : {eng: "Terms Disagreement", vi: "Không thống nhất về thủ tục", status: "Failed"},
    SPAM                            : {eng: "Spam", vi: "Spam dịch vụ", status: "Invalid"},
    CALL_AGAIN_LATER                : {eng: "Call Again Later", vi: "Gọi lại cho khách hàng", status: "In Progress"},
    WAITING_FOR_MORE_INFO           : {eng: "Waiting for more info", vi: "Chờ cung cấp thêm thông tin", status: "In Progress"},
    CONSIDERING                     : {eng: "Considering", vi: "KH đang cân nhắc", status: "In Progress"},
    ORDER_CLAIMED                   : {eng: "Order Claimed", vi: "Yêu cầu đã được tiếp nhận", status: "In Progress"},
    WAITING_FOR_RATE                : {eng: "Waiting for Rate", vi: "Chờ báo giá", status: "In Progress"},
    APPOINTMENT_1                   : {eng: "Appointment #1", vi: "Khách hẹn lên #1", status: "In Progress"},
    APPOINTMENT_2                   : {eng: "Appointment #2", vi: "Khách hẹn lên #2", status: "In Progress"},
    APPOINTMENT_3                   : {eng: "Appointment #3", vi: "Khách hẹn lên #3", status: "In Progress"},
    APPOINTMENT_4                   : {eng: "Appointment #4", vi: "Khách hẹn lên #4", status: "In Progress"},
    UNCLAIMED                       : {eng: "Unclaimed", vi: "Yêu cầu chưa được tiếp nhận", status: "In Progress"},
    FRAUD                           : {eng: "Fraud", vi: "Gian lận/lừa đảo", status: "Failed"},
    ACTIVE_CONTRACT                 : {eng: "Active Contract", vi: "Hợp đồng", status: "Success"},
}

const translateStageFromEngToVi = (englishStage) => {
    for (let key in stages) {
        if (stages[key].eng == englishStage) {
            return stages[key].vi
        }
    }
}

const translateStageFromViToEng = (vietnameseStage) => {
    for (let key in stages) {
        if (stages[key].vi == vietnameseStage) {
            return stages[key].eng
        }
    }
}

const getStatus = (inputStage) => {
    for (let key in stages){
        if (stages[key].vi == inputStage)  {
            return stages[key].status
        }
    }
}



export default stages

export {stages, translateStageFromEngToVi, translateStageFromViToEng, getStatus}