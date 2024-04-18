function validatePassword(password) {
    const minLength = 8;
    const minCapitalLetters = 2;
    const minDigits = 2;
    const minSpecialChars = 2;

    if (password.length < minLength) {
        return false;
    }

    const capitalLetters = password.match(/[A-Z]/g) || [];
    const digits = password.match(/\d/g) || [];
    const specialChars = password.match(/[!@#$%^&*()_+={}\[\]:;<>,.?~]/g) || [];

    return (
        capitalLetters.length >= minCapitalLetters &&
        digits.length >= minDigits &&
        specialChars.length >= minSpecialChars
    );
}

module.exports = { validatePassword };
