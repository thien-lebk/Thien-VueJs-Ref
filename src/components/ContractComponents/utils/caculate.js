function getPrincipal(approvedAmount, interestRate, productName) {
    if (productName.includes('Prepaid Interest')) {
        return (approvedAmount * 1000 - (approvedAmount * interestRate / 100 ) * 1000) / 1000
    }
    return parseFloat(approvedAmount)
}

export function getCost(approvedAmount, interestRate, productName) {
    const principal = getPrincipal(approvedAmount, interestRate, productName)
    return Math.floor(principal * 1000) / 1000
}

export function getRoundFee(approvedAmount, interestRate, productName) {
    const principal = getPrincipal(approvedAmount, interestRate, productName)

    const upperPrincipal = Math.round(principal * 1000) 

    const downPrincipal = Math.floor(principal * 1000)
    
    if (upperPrincipal - downPrincipal == 1) {
        return 0.001
    }
    return 0
}

export function getInterestValue(approvedAmount, productName, cost=null, interestRate=null) {
    if (productName.includes('Prepaid Interest')) {
        return Math.round(approvedAmount * 1000000 - cost * 1000000) / 1000000
    } else {
        return Math.round(approvedAmount * 1000 * interestRate / 100) / 1000
    }
}

export function getInterestDiscountValue({approvedAmount, interestValue, interestDiscount, maxDiscount, minDiscount, minPayout}) {
    try {
        if (minPayout <= approvedAmount) {
            const interestDiscountValue = interestValue * interestDiscount / 100

            if (interestDiscountValue > maxDiscount) {
                return maxDiscount
            }

            if (interestDiscountValue < minDiscount) {
                return minDiscount
            }

            return interestDiscountValue
        }
    } catch (error) {
        
    }
    return 0
}