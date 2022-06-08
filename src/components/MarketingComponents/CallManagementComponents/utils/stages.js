import { stages as defaultStages } from '../../../OrderComponents/utils/stages'

let stages = {
    ...defaultStages,
    VERY_ANNOYED                    : {eng: "Very annoyed", vi: "Cực kỳ khó chịu", progress: "Failed"},
    ANNOYED                         : {eng: "Annoyed", vi: "Khó chịu", progress: "Failed"},
    NOT_INTERESTED                  : {eng: "Not interested", vi: "Không hứng thú", progress: "Failed"},
    NOT_CALLED_YET                  : {eng: "Not called yet", vi: "Chưa gọi", progress: "In Progress"},
    WRONG_NUMBER                    : {eng: "Wrong number", vi: "Sai số", progress: "Invalid"},
    UNABLE_TO_CONTACT               : {eng: "Unable to contact", vi: "Thuê bao", progress: "Invalid"},
    NOT_PICK_UP                     : {eng: "Not pick-up", vi: "Không bắt máy", progress: "In Progress"},
    INTERESTED                      : {eng: "Interested", vi: "Hứng thú", progress: "In Progress"},
    VERY_INTERESTED                 : {eng: "Very interested", vi: "Cực kỳ hứng thú", progress: "In Progress"},
    DEMAND_IN_THE_FUTURE            : {eng: "Demand in the future", vi: "Có nhu cầu trong tương lai", progress: "In Progress"},
    CLOSE_SALE                      : {eng: "Close sale", vi: "Cần tư vấn thêm", progress: "In Progress"},
    CHANGE_NUMBER                   : {eng: "Change number", vi: "KH đổi số", progress: "Invalid"},
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