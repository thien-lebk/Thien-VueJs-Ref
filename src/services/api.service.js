import axios from 'axios'
import { TokenService, ProfileService } from './storage.service'
import store from '../store/store'
import { refreshTokenApi } from '../config/backend-api'
import { isNullOrUndefined } from 'util'
import errors from '../config/error-code'

const PREFIX_TOKEN = 'Bearer'

const ApiService = {

    setHeader() {
        axios.defaults.headers.common["Authorization"] = `${PREFIX_TOKEN} ${TokenService.getToken()}`
    },

    get isEnable() {
        // Should get profile in this time, because after login profile updated
        const profile = ProfileService.getProfile()
        const token = TokenService.getToken()

        // User had logged but profile in localstorage had deleted 
        if (!isNullOrUndefined(token) && isNullOrUndefined(profile)) {
            store.dispatch("auth/logout")
            return false
        }

        return true
    },

    removeHeader() {
        axios.defaults.headers.common = {}
    },

    get(resource, config) {
        if (this.isEnable) {
            return axios.get(resource, config)
        }
    },

    post(resource, data) {
        if (this.isEnable) {
            return axios.post(resource, data)
        }
    },

    put(resource, data) {
        if (this.isEnable) {
            return axios.put(resource, data)
        }
    },

    patch(resource, data) {
        if (this.isEnable) {
            return axios.patch(resource, data)
        }
    },

    delete(resource) {
        if (this.isEnable) {
            return axios.delete(resource)
        }
    },

    /**
     * Perform a custom Axios request.
     *
     * data is an object containing the following properties:
     *  - method
     *  - url
     *  - data ... request payload
     *  - auth (optional)
     *    - username
     *    - password
    **/
    customRequest(data) {
        if (this.isEnable) {
            return axios(data)
        }
    },

    // Stores the 403 interceptor position so that it can be later ejected when needed
    _interceptor: null,

    mountInterceptor() {
        this._interceptor = axios.interceptors.response.use(
            (response) => {
                return response
            },
            async (error) => {
                if (error.config.url.includes(refreshTokenApi)) {
                    // Refresh token has failed. Logout the user
                    store.dispatch("auth/logout")
                    return 
                }

                if (error.request.status == 403) {

                    try {
                        //Refresh the access token
                        await store.dispatch("auth/refreshToken")
                        
                        let data = ''
                        if (error.config.data) {
                            data = JSON.parse(error.config.data)
                        }
                        //Retry the original request
                        return this.customRequest({
                            method: error.config.method,
                            url: error.config.url,
                            data: data,
                        })
                    
                    } catch (error) {
                        // Refresh has failed - reject the original request
                        throw error
                    }
                        
                } else if (Object.keys(errors).includes(error.request.status.toString())) {
                    const newError = error
                    newError.response.data = errors[error.request.status][error.response.data.error_code]
                    throw newError
                }
                // If error was not 403 just reject as is
                throw error
            }
        )
    },

    unmountInterceptor() {
        // Eject the interceptor
        axios.interceptors.response.eject(this._403interceptor)
    }
}

export default ApiService