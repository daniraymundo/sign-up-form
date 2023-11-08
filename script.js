const form = document.querySelector("#form");
const firstName = document.querySelector("#firstname");
const lastName = document.querySelector("#lastname");
const email = document.querySelector("#email");
const phone = document.querySelector("#phone");
const pw = document.querySelector("#pw");
const confirm = document.querySelector("#confirm-pw");
const firstNamePattern = /^[a-zA-Z]+$/;
const lastNamePattern = /^[a-zA-Z]+$/;
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phonePattern = /^\+?\d+$/;
const pwPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).*$/;

form.addEventListener("submit", (e) => {
    e.preventDefault();
    validateInputs();
});

function validateInputs() {
    if (firstName.value.trim().length === 0) {
        makeInvalid(firstName, "First name is required");
    } else if (!isFormatValid(firstName.value, firstNamePattern)) {
        makeInvalid(firstName, "Only letters are allowed");
    } else {
        makeValid(firstName);
    };

    if (lastName.value.trim().length === 0) {
        makeInvalid(lastName, "Last name is required");
    } else if (!isFormatValid(lastName.value, lastNamePattern)) {
        makeInvalid(lastName, "Only letters are allowed");
    } else {
        makeValid(lastName);
    };

    if (email.value.trim().length === 0) {
        makeInvalid(email, "Email is required");
    } else if (!isFormatValid(email.value, emailPattern)) {
        makeInvalid(email, "Please enter a valid email address");
    } else {
        makeValid(email);
    };

    if (phone.value.trim().length === 0) {
        makeInvalid(phone, "Phone number is required");
    } else if (phone.value.trim().length < 4) {
        makeInvalid(phone, "Please enter a valid phone number");
    } else if (!isFormatValid(phone.value, phonePattern)) {
        makeInvalid(phone, "Please enter a valid phone number");
    } else {
        makeValid(phone);
    };

    if (pw.value.trim().length === 0) {
        makeInvalid(pw, "Password is required");
        makeInvalid(confirm, " ");
    } else if (pw.value.trim().length < 8) {
        makeInvalid(pw, "Password must be at least 8 characters");
        makeInvalid(confirm, " ");
    } else if (!isFormatValid(pw.value, pwPattern)) {
        makeInvalid (pw, "Password must contain at least 1 uppercase letter, lowercase letter, digit, and special character");
        makeInvalid(confirm, " ");
    } else if (pw.value.trim() !== confirm.value.trim()) {
        makeInvalid(confirm, "Passwords do not match");
        makeInvalid(pw,"");
    } else {
        makeValid(confirm);
        makeValid(pw);
    };
};

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