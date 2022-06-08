import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT_SUCCESS,
    REFRESH_TOKEN_PROMISE,
    REFRESH_TOKEN_SUCCESS
} from './types'
import router from '../../../../router'
import { UserService, AuthenticationError } from '../../../../services/user.service'

export default {
    async login({commit}, payload) {
        commit(LOGIN_REQUEST)
        try {
            let tokenAndProfile = await UserService.login(payload.username, payload.password)
            commit(LOGIN_SUCCESS, tokenAndProfile)
        } catch (error) {
            if (error instanceof AuthenticationError) {
                commit(LOGIN_ERROR, {errorCode: error.errorCode, errorMessage: error.message})
            } else {
                commit(LOGIN_ERROR, {errorCode: 500, errorMessage: "Internal Server Error"})
            }
            return false
        }
    },

    logout({commit, dispatch}) {
        UserService.logout()
        commit(LOGOUT_SUCCESS)
        router.push('/login')
        //Reset all store
        dispatch('reset', {}, {root:true})
    },

    refreshToken({ commit, state }) {
        // If this is the first time the refreshToken has been called, make a request
        // otherwise return the same promise to the caller
        if (!state.refreshTokenPromise) {

            let p = UserService.refreshToken()
            commit(REFRESH_TOKEN_PROMISE, p)

            // Wait for the UserService.refreshToken() to resolve. On success set the token and clear promise
            // Clear the promise on error as well.
            p.then(
                token => {
                    commit(REFRESH_TOKEN_PROMISE, null)
                    commit(REFRESH_TOKEN_SUCCESS, token)
                },
                error => {
                    commit(REFRESH_TOKEN_PROMISE, null)
                }
            )
        }

        return state.refreshTokenPromise
    }
}