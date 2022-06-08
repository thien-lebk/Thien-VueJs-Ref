import { TokenService, ProfileService, CurrentBranchService, VOIPUserService } from './storage.service';
import ApiService from '../services/api.service'
import VOIPService from '../services/VoIP.service'
import store from '../store/store'
import { loginApi, refreshTokenApi } from '../config/backend-api'

class AuthenticationError extends Error {
    constructor(errorCode, message) {
        super(message)
        this.name = this.constructor.name
        this.message = message
        this.errorCode = errorCode
    }
}

const UserService = {
    login: async function(username, password) {
        
        const requestData = {
            method: 'post',
            url: loginApi,
            data: {
                username: username,
                password: password
            },
        }
        
        try {
            const response = await ApiService.customRequest(requestData)

            TokenService.saveToken(response.data.access)
            TokenService.saveRefreshToken(response.data.refresh)

            const profile = {
                name: response.data.name,
                id: response.data.id,
                branch: response.data.branch,
                branchID: response.data.branch_id,
                isStaff: response.data.is_staff, 
            }
            ProfileService.saveProfile(profile)

            const username = response.data.sip_username
            const password =  response.data.sip_passwd
            
            VOIPUserService.saveUsername(username)
            VOIPUserService.savePassword(password)

            VOIPService.setTelephone({user: username, password: password})

            ApiService.setHeader()
            ApiService.mountInterceptor()

            return {token: response.data.access, profile: profile}
        } catch (error) {
            if (error.response.data.hasOwnProperty("non_field_errors")) {
                if (error.response.data.non_field_errors == "Invalid username or password") {
                    throw new AuthenticationError(error.response.status, "Tài khoản hoặc mật khẩu không hợp lệ")
                }
            }
            throw new AuthenticationError(error.response.status, error.response.data.detail)
        }
    },

    refreshToken: async function() {
        const refreshToken = TokenService.getRefreshToken()

        const requestData = {
            method: 'post',
            url: refreshTokenApi,
            data: {
                refresh: refreshToken
            },
        }

        try {
            const response = await ApiService.customRequest(requestData)
            TokenService.saveToken(response.data.access)
            ApiService.setHeader()
            return response.data.access
        } catch (error) {
            throw new AuthenticationError(error.response.status, error.response.data.detail)
        }
    },

    logout() {
        TokenService.removeToken()
        ProfileService.removeProfile()
        ApiService.removeHeader()
        ApiService.unmountInterceptor()
        CurrentBranchService.removeCurrentBranch()
        VOIPService.disconnect()
        VOIPUserService.removeUsername()
        VOIPUserService.removePassword()
    },
}

export default UserService

export { UserService, AuthenticationError }