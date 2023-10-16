import bcrypt from 'bcrypt';
import { Employee } from '../models/Employee.js';
import { defaultImage } from '../secret.js';
import { errorResponse, successResponse } from './responseController.js';

const addEmployee = async (req, res) => { 
    try { 
        const { firstName, lastName, email, password, phoneNumber, age, position, address, department, salary, skills, education } = req?.body;
        // const userExists = await User.exists(email);
        const userExists = await Employee.findOne({ email: email });
        if (userExists) {
            return res.status(409).json({message: `Employee already exists with this email ${email}`});
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const imageName = req?.file?.filename;
        let imagePath = defaultImage; 
        if (imageName) {
            imagePath = `/public/employeeImage/${imageName}`;
        }
        const employeeObj = {
            firstName,
            lastName,
            age: Number(age),
            position,
            address,
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

const getAllEmployee = async (req, res) => { 
    try {
        const search = req?.query?.search || '';

        const searchRegExp = new RegExp('.*' + search + '.*', 'i');
        const filter = {
            $or: [
                { firstName: { $regex: searchRegExp } },
                { lasttName: { $regex: searchRegExp } },
                { email: { $regex: searchRegExp } },
                { phoneNumber: { $regex: searchRegExp } },
                { department: { $regex: searchRegExp } },
                { position: { $regex: searchRegExp } },
            ]
        }

        const employees= await Employee.find(filter);
        if (!employees) {
            return errorResponse(res, {
                statusCode: 404,
                message: "No users found",
            });
        }

        successResponse(res, {
            statusCode: 200,
            message: "Employee found",
            payload: { employees },
        });

    } catch (error) {
        errorResponse(res, {
            statusCode: 500,
            message: "Something went wrong",
        });
    }
}

const updateEmployee = async (req, res, next) => {
    try {
        const imageName = req?.file?.filename;
        let imagePath;
        if (imageName) {
            imagePath = `/public/employeeImage/${imageName}`;
        }

        if (!imagePath)
            req.body.image = imagePath;

        const employeeObj = await Employee.findByIdAndUpdate(req?.params?.id, req?.body, {
            new: true,
            runValidators: true,
        });
        if (!employeeObj) {
            errorResponse(res, {
                statusCode: 404,
                message: `Employee does not found with id ${req?.params.id}`,
            });
        } else {
            successResponse(res, {
                statusCode: 200,
                message: `Employee ${employeeObj.firstName} ${employeeObj.lastName} updated successfully`,
                payload: { employeeObj },
            });
        }
    } catch (error) {
        errorResponse(res, {
            statusCode: 500,
            message: "Something went wrong",
        });
    }
};

const deleteEmployee = async (req, res, next) => {
    try {
        const employeeObj = await Employee.findByIdAndDelete(req?.params.id);
        if (!employeeObj) {
            errorResponse(res, { 
                statusCode: 404,
                message: `Employee does not found with id ${req.params.id}`,
            });
        } else {
            successResponse(res, {
                statusCode: 200,
                message: `Employee ${employeeObj.firstName} ${employeeObj.lastName} deleted successfully`,
                payload: { employeeObj },
            });
        }
    } catch (error) {
        errorResponse(res, {
            statusCode: 500,
            message: "Something went wrong",
        });
    }
};

export { addEmployee, deleteEmployee, getAllEmployee, updateEmployee };
