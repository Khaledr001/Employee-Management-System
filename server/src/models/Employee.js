import mongoose from "mongoose";
import { educationSchema } from "./Education.js";
import { defaultImage } from '../secret.js';

const validateEmail = function (email) {
    let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

const EmployeeSchema = new mongoose.Schema({
    firstName: {
        type: "string",
        required: true,
        trim: true,
        minlength: [3, "Minimun length of first name should be 3 characters"],
        maxlength: [30, "Maximun length first name should be 50 characters"],
    },
    lastName: {
        type: "string",
        required: true,
        trim: true,
        minlength: [3, "Minimun length of last name should be 3 characters"],
        maxlength: [30, "Maximun length of last name should be 50 characters"],
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "Please enter minumum 6 length password"],
    },
    dateOfBirth: {
        type: Date,
        required: [true, "Please enter employee Date of Birth"],
    },
    position: {
        type: String,
        required: [true, "Please enter employee position"],
        minlength: [3, "Minimun length of position should be 3 characters"],
        maxlength: [50, "Maximun length should be 50 characters"],
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate: [validateEmail, "Please enter a valid email address"],
    },
    phoneNumber: {
        type: String,
        required: [true, "Please enter your phone number"],
        trim: true,
    },
    address: {
        type: String,
        trim: true,
        required: [true, "Please provide employee address"],
    },
    image: {
        type: String,
        default: defaultImage,
    },
    department: {
        type: String,
        trim: true,
        required: [true, "Please provide employee department"],
    },
    joiningDate: {
        type: Date,
        default: new Date(),
    },
    salary: {
        type: Number,
        trim: true,
        required: [true, "Please provide employee salary"],
    },
    skills: [{
        type: String,
        trim: true
    }],
    education: [educationSchema],
},
    {
        timestamps: true,
    }
);


const Employee = mongoose.model("Employee", EmployeeSchema);

export { Employee };