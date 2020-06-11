const express 	= require("express");
const router 	= express.Router();

const ExpenseTypeMasterContoller = require('./ControllerExpenseTypeMaster.js');

router.patch('/insertExpenseType', ExpenseTypeMasterContoller.insertExpenseType);

router.get('/showAllData', ExpenseTypeMasterContoller.showAllData);

router.get('/getSingleData/:id', ExpenseTypeMasterContoller.getSingleData);

router.get('/getDataByType/:type', ExpenseTypeMasterContoller.getDataByType);

router.patch('/updateExpenseType', ExpenseTypeMasterContoller.updateExpenseType);

router.delete('/delete/:fieldID', ExpenseTypeMasterContoller.deleteExpenseType);

module.exports = router;


