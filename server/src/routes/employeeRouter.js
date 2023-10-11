import express from 'express';

const employeeRouter = express.Router();

employeeRouter.get('/test', (req, res) => { 
    res.status(200).json({message: 'test employee router'});
});


export { employeeRouter };
