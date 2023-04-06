export const validateProfData = (profData) => {
    const errors = {};

    if (!profData.firstname.trim()) {
        errors.firstname = 'Please enter new name'
    } else if(profData.firstname.length < 3) {
        errors.firstname = 'Name should be 3charecter or more'
    } else {
        delete errors.firstname
    }

    if (!profData.lastname) {
        errors.lastname = 'Please enter new lastname'
    } else if(profData.lastname.length < 3) {
        errors.lastname = 'Lastname should be 3charecter or more'
    } else {
        delete errors.lastname
    }

    if (!profData.gender) {
        errors.gender = 'Please enter your gender'
    } else if(profData.gender.length < 4) {
        errors.gender = 'Please enter Male Or Female'
    } else {
        delete errors.gender
    }

    if (!profData.age) {
        errors.age = 'Please enter your age'
    } else if (Number(profData.age) <= 15) {
        errors.age = 'You are too young'
    } else {
        delete errors.age
    }  
    
    if (!profData.city.trim()) {
        errors.city = 'Please enter new city'
    } else if(profData.city.length < 3) {
        errors.city = 'Please enter valid city'
    } else {
        delete errors.city
    }
    return errors;
}