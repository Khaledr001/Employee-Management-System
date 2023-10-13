import bcrypt from 'bcrypt';
import { Employee } from '../models/Employee.js';
import { errorResponse, successResponse } from './responseController.js';
import { defaultImage } from '../secret.js';

const addEmployee = async (req, res) => { 
    try { 
        const { firstName, lastName, email, password, phoneNumber, age, position, address, department, salary, skills, education } = req?.body;
        // const userExists = await User.exists(email);
        const userExists = await Employee.findOne({ email: email });
        if (userExists) {
            throw createError(409, "User already exists");
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const imageName = req?.file?.filename;
        let imagePath = defaultImage; 
        if (imageName) {
            imagePath = `/public/userImage/${imageName}`;
        }
        const employeeObj = {
            firstName,
            lastName,
            age: Number(age),
            position, address,
            department,
            salary: Number(salary),
            skills,
            education,
            email,
            phoneNumber,
            password: hashPassword,
            image: imagePath,
        };

        console.log(employeeObj);
        const saveEmployee = await Employee(employeeObj);
        await saveEmployee.save();

        // console.log(saveEmployee);
        let employee = await saveEmployee.toJSON();
        delete employee.password;

        successResponse(res, {
            statusCode: 200,
            message: "User registered successfully",
            payload: { employee },
        }); 
    }
    catch (err) {
        errorResponse(res, {
            statusCode: 500,
            message: "Something went wrong",
        });
    }
}

export { addEmployee }