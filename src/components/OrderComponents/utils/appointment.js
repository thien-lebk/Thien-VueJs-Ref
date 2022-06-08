const haveAppointment = function(vietnameseStage) {
    if (/Khách hẹn lên #/.test(vietnameseStage)) {
        return true
    } else if (vietnameseStage === 'Gọi lại cho khách hàng') {
        return true
    } return false
}

export default haveAppointment