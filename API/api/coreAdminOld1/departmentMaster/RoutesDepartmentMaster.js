const express 	= require("express");
const router 	= express.Router();

const departmentMaster = require('./ControllerDepartmentMaster.js');

router.post('/post', departmentMaster.insertDepartment);

router.post('/get/list', departmentMaster.fetchDepartments);

router.get('/get/list', departmentMaster.getAllDepartments);

router.get('/get/count', departmentMaster.countDepartments);

router.get('/get/one/:fieldID', departmentMaster.fetchSingleDepartment);

router.get('/search/:str', departmentMaster.searchDepartment);

router.patch('/patch', departmentMaster.updateDepartment);

router.delete('/delete/:fieldID', departmentMaster.deleteDepartment);

module.exports = router;