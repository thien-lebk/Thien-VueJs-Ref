const permission = {
    PROMOTION: {
        general: ['staff'],
        get: ['staff'],
        create: ['staff'],
        update: ['staff'],
        delete: ['staff'],
    },
    CALL_CAMPAIGN: {
        general: ['user','staff'],
        get: ['user','staff'],
        create: ['staff'],
        update: ['staff'],
        delete: ['staff'],
    }
}

export default permission