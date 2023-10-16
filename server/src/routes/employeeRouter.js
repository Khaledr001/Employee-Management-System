import express from 'express';
import { upload } from '../middlewares/imageUpload.js';
import { addEmployee, deleteEmployee, getAllEmployee, updateEmployee } from '../controllers/employeeController.js';
import { validateEmployeeRegistration } from '../validation/employeeValidation.js';
import { runValidation } from '../validation/checkValidation.js';
import { isLoggedIn } from '../middlewares/auth.js';

const employeeRouter = express.Router();

employeeRouter.get('/test', (req, res) => { 
    res.status(200).json({message: 'test employee router'});
});

employeeRouter.post('/add', upload.single("image"), validateEmployeeRegistration, runValidation, addEmployee);

employeeRouter.get('/all', getAllEmployee);

employeeRouter.put('/update/:id', updateEmployee)

employeeRouter.delete('/delete/:id', deleteEmployee)

export { employeeRouter };
