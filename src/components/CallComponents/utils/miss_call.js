export default (request) => {
    if (request.constructor.name === 'IncomingRequest') {
        const data = request.data
        if (/text="Call completed elsewhere"/.test(data)) {
            return false
        }
    }
    return true
}