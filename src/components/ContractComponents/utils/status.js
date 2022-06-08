const status = {
    NEW: {
        eng: "New",
        vi: "Mới",
        color: "#c12121"
    },
    RENEWAL: {
        eng: "Renewal",
        vi: "Gia hạn",
        color: "#c122b1",
    },
    RETURN: {
        eng: "Return",
        vi: "Khách hàng cũ",
        color: "#2b56a9"
    },
    CLOSING: {
        eng: "Closing",
        vi: "Đóng",
        color: "#FF8C00"
    },
    LATE: {
        eng: "Late",
        vi: "Trễ hạn",
        color: "#70cc3b"
    },
}

const translateStatusFromEngToVi = (englishStatus) => {
    for (let key in status) {
        if (status[key].eng == englishStatus) {
            return status[key].vi
        }
    }
}

const translateStatusFromViToEng = (vietnameseStatus) => {
    for (let key in steps) {
        if (steps[key].vi == vietnameseStatus) {
            return steps[key].eng
        }
    }
}

export default status
export {status, translateStatusFromEngToVi, translateStatusFromViToEng}