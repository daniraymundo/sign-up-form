const form = document.querySelector("#form");
const firstName = document.querySelector("#firstname");
const lastName = document.querySelector("#lastname");
const email = document.querySelector("#email");
const phone = document.querySelector("#phone");
const pw = document.querySelector("#pw");
const confirmpw = document.querySelector("#confirm-pw");

const firstNamePattern = /^[a-zA-Z]+$/;
const lastNamePattern = /^[a-zA-Z]+$/;
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
const phonePattern = /^\+?\d{4,}$/;
const pwPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).*$/;

form.addEventListener("submit", (e) => {
    e.preventDefault();
    validateInputs();
});

//Field event listeners to validate inputs for each field as the user is typing on them

firstName.addEventListener("input", () => {
    validateField(firstName, firstNamePattern);
});

lastName.addEventListener("input", () => {
    validateField(lastName, lastNamePattern);
});

email.addEventListener("input", () => {
    validateField(email, emailPattern);
});

phone.addEventListener("input", () => {
    validateField(phone, phonePattern);
});

pw.addEventListener("input", () => {
    validatePasswordField();
});

confirmpw.addEventListener("input", () => {
    validatePasswordField();
});

function validateField(field, pattern) {
    let errorMessage = "";

    if (field === firstName || field === lastName) {
        errorMessage = "Only letters are allowed"
    } else if (field === email || field === phone) {
        errorMessage = `Please enter a valid ${field.previousElementSibling.textContent}`;
    };

    if (field.value.trim().length ===  0) {
        makeInvalid(field, `Please enter your ${field.previousElementSibling.textContent}`);
        return false;
    } else if (!isFormatValid(field.value, pattern)) {
        makeInvalid(field, errorMessage);
        return false;
    } else {
        makeValid(field);
        return true;
    };
};

function validatePasswordField() {
    if (pw.value.trim().length === 0) {
        makeInvalid(pw, "Please enter your password");
        makeInvalid(confirmpw, " ");
        return false;
    } else if (pw.value.trim().length < 8) {
        makeInvalid(pw, "Password must be at least 8 characters");
        makeInvalid(confirmpw, " ");
        return false;
    } else if (!isFormatValid(pw.value, pwPattern)) {
        makeInvalid (pw, "Password must contain at least 1 uppercase letter, lowercase letter, \r\ndigit, and special character");
        makeInvalid(confirmpw, " ");
        return false;
    } else if (pw.value.trim().length > 0 && 
                pw.value.trim().length >= 8 && 
                isFormatValid(pw.value, pwPattern) && 
                confirmpw.value.trim().length === 0) {
        makeValid(pw);
        makeInvalid(confirmpw, "Please retype your password")
        return false;
    } else if (pw.value.trim() !== confirmpw.value.trim()) {
        makeInvalid(confirmpw, "Passwords do not match");
        makeInvalid(pw,"");
        return false;
    } else {
        makeValid(confirmpw);
        makeValid(pw);
        return true;
    };
};

function validateInputs() { 
    
    //The validateField function is called on each field when submitting the form to validate all fields and display all applicable error messages at once  

    validateField(firstName, firstNamePattern)
    validateField(lastName, lastNamePattern)
    validateField(email, emailPattern)
    validateField(phone, phonePattern)
    validatePasswordField()

    if (
        validateField(firstName, firstNamePattern) &&
        validateField(lastName, lastNamePattern) &&
        validateField(email, emailPattern) &&
        validateField(phone, phonePattern) &&
        validatePasswordField()
    )
        form.submit();
}

function isFormatValid(input, pattern) {
    return pattern.test(input);
};

function makeInvalid(input, message) {
    const formRow = input.parentElement;
    const error = formRow.querySelector(".error");
    error.textContent = message;
    formRow.className = ("form-row invalid");
};

function makeValid(input) {
    const formRow = input.parentElement;
    const error = formRow.querySelector(".error");
    formRow.className = ("form-row valid");
    error.textContent = " ";
};