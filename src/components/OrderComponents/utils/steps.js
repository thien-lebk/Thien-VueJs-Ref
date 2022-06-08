const steps = {
    UNCLAIMED: {
        eng: "Unclaimed",
        vi: "Chưa nhận",
        color: "#c12121"
    },
    PENDING: {
        eng: "Pending",
        vi: "Chờ xử lý",
        color: "#c122b1",
    },
    CONTACT: {
        eng: "Contact",
        vi: "Liên hệ",
        color: "#2b56a9"
    },
    QUOTED: {
        eng: "Quoted",
        vi: "Báo giá",
        color: "#FF8C00"
    },
    APPOINTMENT: {
        eng: "Appointment",
        vi: "Hẹn khách",
        color: "#70cc3b"
    },
    CONTRACT: {
        eng: "Contract",
        vi: "Làm hợp đồng",
        color: "#2b56a9"
    }
}

const translateStepFromEngToVi = (englishStep) => {
    for (let key in steps) {
        if (steps[key].eng == englishStep) {
            return steps[key].vi
        }
    }
}

const translateStepFromViToEng = (vietnameseStep) => {
    for (let key in steps) {
        if (steps[key].vi == vietnameseStep) {
            return steps[key].eng
        }
    }
}

export default steps
export {steps, translateStepFromEngToVi, translateStepFromViToEng}