const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateChargeInput(data) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.phone = !isEmpty(data.phone) ? data.phone : '';
    data.city = !isEmpty(data.city) ? data.city : '';
    data.street = !isEmpty(data.street) ? data.street : '';
    data.country = !isEmpty(data.country) ? data.country : '';

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }
    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }
    if (Validator.isEmpty(data.phone)) {
        errors.phone = 'Phone field is required';
    }
    if (Validator.isEmpty(data.city)) {
        errors.city = 'City field is required';
    }
    if (Validator.isEmpty(data.street)) {
        errors.street = 'Street field is required';
    }
    if (Validator.isEmpty(data.country)) {
        errors.country = 'Country field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};