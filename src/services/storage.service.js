import { Base64 } from 'js-base64'
import { isNullOrUndefined } from 'util'
import store from '../store/store'

const TOKEN_KEY = 'access_token'
const REFRESH_TOKEN_KEY = 'refresh_token'
const PROFILE = 'profile'
const CURRENT_BRANCH = 'current_branch'
const VOIP_ACCOUNT = 'voip_account'
const VOIP_PASSWORD = 'voip_password'
const VOIP_VOLUME = 'voip_volume'

/**
 * Manage the how Access Tokens are being stored and retreived from storage.
 *
 * Current implementation stores to localStorage. Local Storage should always be
 * accessed through window instace.
**/
const TokenService = {
    getToken() {
        return window.$cookies.get(TOKEN_KEY)
    },

    saveToken(accessToken) {
        window.$cookies.set(TOKEN_KEY, accessToken)
    },

    removeToken() {
        window.$cookies.remove(TOKEN_KEY)
    },

    getRefreshToken() {
        return window.$cookies.get(REFRESH_TOKEN_KEY)
    },

    saveRefreshToken(refreshToken) {
        window.$cookies.set(REFRESH_TOKEN_KEY, refreshToken)
    },

    removeRefreshToken() {
        window.$cookies.remove(REFRESH_TOKEN_KEY)
    }

}

const VOIPUserService = {
    isExist() {
        return window.$cookies.isKey(VOIP_ACCOUNT) && window.$cookies.isKey(VOIP_PASSWORD)
    },

    saveUsername(username) {
        window.$cookies.set(VOIP_ACCOUNT, username)
    },

    getUsername() {
        return window.$cookies.get(VOIP_ACCOUNT)
    },

    removeUsername() {
        window.$cookies.remove(VOIP_ACCOUNT);
    },

    savePassword(password) {
        window.$cookies.set(VOIP_PASSWORD, password)
    },

    getPassword() {
        return window.$cookies.get(VOIP_PASSWORD)
    },

    removePassword() {
        window.$cookies.remove(VOIP_PASSWORD);
    },

    getVolume() {
        const value = localStorage.getItem(VOIP_VOLUME)
        if (isNullOrUndefined(value)) {
            return 0.5
        }
        return value
    },

    setVolume(volume) {
        localStorage.setItem(VOIP_VOLUME, volume)
    },
    removeVolume() {
        localStorage.removeItem(VOIP_VOLUME)
    },
}

const ProfileService = {
    saveProfile(profile) {
        localStorage.setItem(PROFILE, Base64.encode(JSON.stringify(profile)))
    },

    getProfile() {
        const encoded = localStorage.getItem(PROFILE)
        try {
            return JSON.parse(Base64.decode(encoded))
        } catch (error) {
            return null
        }
    },

    removeProfile() {
        localStorage.removeItem(PROFILE)
    },

    setName(name) {
        const encoded = localStorage.getItem(PROFILE)
        try {
            const profile = JSON.parse(Base64.decode(encoded))
            profile.name = name
            localStorage.setItem(PROFILE, Base64.encode(JSON.stringify(profile)))
        } catch (error) {
            
        }
    },

    getName() {
        const encoded = localStorage.getItem(PROFILE)
        try {
            const profile = JSON.parse(Base64.decode(encoded))
            return profile ? profile.name : null
        } catch (error) {
            return null
        }
    },

    setID(id) {
        const encoded = localStorage.getItem(PROFILE)
        try {
            const profile = JSON.parse(Base64.decode(encoded))
            profile.id = id
            localStorage.setItem(PROFILE, Base64.encode(JSON.stringify(profile)))
        } catch (error) {
            
        }
    },

    getID() {
        const encoded = localStorage.getItem(PROFILE)
        try {
            const profile = JSON.parse(Base64.decode(encoded))
            return profile ? parseInt(profile.id) : null
        } catch (error) {
            return null
        }
    },

    setBranch(branch) {
        const encoded = localStorage.getItem(PROFILE)
        try {
            const profile = JSON.parse(Base64.decode(encoded))
            profile.branch = branch
            localStorage.setItem(PROFILE, Base64.encode(JSON.stringify(profile)))
        } catch (error) {
            
        }
    },

    getBranch() {
        const encoded = localStorage.getItem(PROFILE)
        try {
            const profile = JSON.parse(Base64.decode(encoded))
            return profile ? profile.branch : null
        } catch (error) {
            return null
        }
    },

    setBranchID(branchID) {
        const encoded = localStorage.getItem(PROFILE)
        try {
            const profile = JSON.parse(Base64.decode(encoded))
            profile.branchID = branchID
            localStorage.setItem(PROFILE, Base64.encode(JSON.stringify(profile)))
        } catch (error) {
            
        }
    },

    getBranchID() {
        const encoded = localStorage.getItem(PROFILE)
        try {
            const profile = JSON.parse(Base64.decode(encoded))
            return profile ? parseInt(profile.branchID) : null
        } catch (error) {
            return null
        }
    },

    setIsStaff(isStaff) {
        const encoded = localStorage.getItem(PROFILE)
        try {
            const profile = JSON.parse(Base64.decode(encoded))
            profile.isStaff = isStaff
            localStorage.setItem(PROFILE, Base64.encode(JSON.stringify(profile)))
        } catch (error) {
            
        }
    },

    getIsStaff() {
        const encoded = localStorage.getItem(PROFILE)
        try {
            const profile = JSON.parse(Base64.decode(encoded))
            if (profile.isStaff !== undefined) {
                return profile.isStaff
            }
            // old localstorage version had no isStaff, should logout to login again
            store.dispatch("auth/logout")
        } catch (error) {
            return null
        }
    },
}

const CurrentBranchService = {
    getCurrentBranch() {
        return JSON.parse(localStorage.getItem(CURRENT_BRANCH));
    },

    saveCurrentBranch(currentBranch) {
        localStorage.setItem(CURRENT_BRANCH, JSON.stringify(currentBranch))
    },
    removeCurrentBranch() {
        localStorage.removeItem(CURRENT_BRANCH);
    },

    getCurrentBranchID() {
        const currentBranch = JSON.parse(localStorage.getItem(CURRENT_BRANCH))
        return currentBranch ? currentBranch.id : null
    },

    saveCurrentBranchID(currentBranchID) {
        try {
            const currentBranch = JSON.parse(localStorage.getItem(CURRENT_BRANCH))
            currentBranch.id = currentBranchID
            localStorage.setItem(CURRENT_BRANCH, JSON.stringify(currentBranch))
        } catch (error) {
            
        }
    },

    getCurrentBranchName() {
        const currentBranch = JSON.parse(localStorage.getItem(CURRENT_BRANCH))
        return currentBranch ? currentBranch.name : null
    },

    saveCurrentBranchName(currentBranchName) {
        try {
            const currentBranch = JSON.parse(localStorage.getItem(CURRENT_BRANCH))
            currentBranch.name = currentBranchName
            localStorage.setItem(CURRENT_BRANCH, JSON.stringify(currentBranch))
        } catch (error) {
            
        }
    },
}

export { TokenService, ProfileService, CurrentBranchService, VOIPUserService }