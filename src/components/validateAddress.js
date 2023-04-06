export const validateAddress = (userAddress) => {
    const errors = {};

    if (!userAddress.city.trim()) {
        errors.city = 'City required'
    } else if(userAddress.city.length < 3) {
        errors.city = 'Please enter valid city'
    } else {
        delete errors.city
    }

    if (!userAddress.address) {
        errors.address = 'Address required'
    } else if(userAddress.address.length < 10) {
        errors.address = 'Please enter valid address'
    } else {
        delete errors.address
    }

    if (!userAddress.postalCode) {
        errors.postalCode = 'PostalCode required'
    } else if(userAddress.postalCode.length < 10) {
        errors.postalCode = 'PostalCode need to be 10 character or more'
    } else {
        delete errors.postalCode
    }

    if (!userAddress.phone) {
        errors.phone = 'Phone number required'
    } else if (userAddress.phone.length < 11) {
        errors.phone = 'Please enter valid phone number'
    } else {
        delete errors.phone
    }   
    return errors;
}