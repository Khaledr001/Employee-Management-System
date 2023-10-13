import express from 'express';
import { upload } from '../middlewares/imageUpload.js';
import { addEmployee } from '../controllers/employeeController.js';

const employeeRouter = express.Router();

employeeRouter.get('/test', (req, res) => { 
    res.status(200).json({message: 'test employee router'});
});

employeeRouter.post('/add', upload.single("image"), addEmployee);

export { employeeRouter };
