import { body } from "express-validator";

const validateEmployeeRegistration = [
    body("firstName")
        .trim()
        .notEmpty()
        .withMessage("First Name is required")
        .isLength({ min: 3, max: 50 })
        .withMessage("First Name should be between 3 and 50 characters long"),
    
    body("lastName")
        .trim()
        .notEmpty()
        .withMessage("Last Name is required")
        .isLength({ min: 3, max: 50 })
        .withMessage("Last Name should be between 3 and 50 characters long"),
    
    body("position")
        .trim()
        .notEmpty()
        .withMessage("Employee position is required")
        .isLength({ min: 3, max: 50 })
        .withMessage("Employee position should be between 3 and 50 characters long"),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Employee Email is required")
        .isEmail()
        .withMessage("Please enter a valid email address"),

    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password should be minimum 6 characters long"),

    body("phoneNumber")
        .trim()
        .notEmpty()
        .withMessage("Phone number is required")
        .isLength({ equalTo: 11 })
        .withMessage("Phone number should be 11 characters long"),
    
    body("address")
        .trim()
        .notEmpty()
        .withMessage("Employee address is required"),
    
    body("department")
        .trim()
        .notEmpty()
        .withMessage("Employee Department is required")
        .isLength({ min: 3, max: 50 })
        .withMessage("Employee department should be between 3 and 50 characters long"),
    
    body("salary")
        .trim()
        .notEmpty()
        .withMessage("Employee salary is required")
        .isInt({ min: 0 })
        .withMessage("Employee salary must be a positive number"),
        
    body("dateOfBirth")
        .trim()
        .notEmpty()
        .withMessage("Employee date of birth is required")
        .isDate()
        .withMessage("Must be a valid date"),

    body('skills')
        .isArray()
        .withMessage('Skills must be an array'),

];
 
export { validateEmployeeRegistration };
