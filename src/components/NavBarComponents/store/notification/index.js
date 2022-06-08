import initialState from './state'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'

const state = initialState()

export const moduleNotification = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations: {
        ...mutations,

        reset (state) {
            // acquire initial state
            const s = initialState()
            Object.keys(s).forEach(key => {
              state[key] = s[key]
            })
        }
    }
}