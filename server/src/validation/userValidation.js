import { body } from "express-validator";

const validateUserRegistration = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required")
        .isLength({ min: 3, max: 50 })
        .withMessage("Name should be between 3 and 50 characters long"),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please enter a valid email address"),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password should be minimum 6 characters long"),

    body("phoneNumber")
        .notEmpty()
        .withMessage("Phone number is required")
        .isLength({ equalTo: 11 })
        .withMessage("Phone number should be 11 characters long"),
];

export { validateUserRegistration };
