import stages from './stages'
import steps from './steps'

import getDefaultStage from '../../../OrderComponents/utils/stage_functions'

const getStage = (step) => {
    const result = getDefaultStage(step)
    if (result === undefined) {
        switch(step) {
            case steps.COLD_LEAD.eng:
                return [
                    stages.VERY_ANNOYED,
                    stages.ANNOYED,
                    stages.NOT_INTERESTED,
                    stages.NOT_CALLED_YET,
                    stages.WRONG_NUMBER,
                    stages.UNABLE_TO_CONTACT,
                    stages.NOT_PICK_UP,
                    stages.CALL_AGAIN_LATER,
                ]
            case steps.WARM_LEAD.eng:
                return [
                    stages.INTERESTED,
                    stages.VERY_INTERESTED,
                    stages.DEMAND_IN_THE_FUTURE,
                    stages.CLOSE_SALE,
                    stages.CHANGE_NUMBER,
                    stages.UNABLE_TO_CONTACT,
                    stages.NOT_PICK_UP,
                    stages.CALL_AGAIN_LATER
                ]
        }
    }
    return result
}

export default getStage
export {getStage}