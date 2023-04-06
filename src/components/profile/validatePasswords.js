export const validatePasswords = (dataPass) => {
        const errors = {};

        if (!dataPass.oldPassword) {
            // Enter the previous password
            errors.oldPassword = 'Previous password is required'
        } else if (dataPass.oldPassword.length < 6) {
        errors.oldPassword = 'Password need to be 6 character or more'
        } else {
            delete errors.oldPassword
        }

        if (!dataPass.newPassword) {
            // Enter the previous password
            errors.newPassword = 'New password is required'
        } else if (dataPass.newPassword.length < 6) {
        errors.newPassword = 'Password need to be 6 character or more'
        } else {
            delete errors.newPassword
        }

        return errors;
    }