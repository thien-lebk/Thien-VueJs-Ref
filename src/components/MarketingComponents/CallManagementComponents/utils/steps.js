import {steps as defaultSteps} from '../../../OrderComponents/utils/steps'

const steps = {
    ...defaultSteps,
    COLD_LEAD: {
        eng: "Cold lead",
        vi: "Cold lead",
        color: "#70cc3b"
    },
    WARM_LEAD: {
        eng: "Warm lead",
        vi: "Warm lead",
        color: "#2b56a9"
    },
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