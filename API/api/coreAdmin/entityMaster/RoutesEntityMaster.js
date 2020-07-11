const express 	= require("express");
const router 	= express.Router();
const checkAuth = require('../middlerware/check-auth.js');


const entityMaster = require('./ControllerEntityMaster');

router.post('/post', entityMaster.insertEntity);

router.get('/get/:entityType',entityMaster.listEntity);

router.get('/get/one/:entityType/:franchiseid',entityMaster.listEntity_franchise);

router.get('/get/count/:entityType',entityMaster.countEntity);

router.post('/get/filterEntities',entityMaster.filterEntities);

router.post('/get/gridfilterEntities',entityMaster.filterEntities_grid);

router.get('/get/getAllVendors/:city',entityMaster.getAllVendors);

router.post('/get/getAdminCompany',entityMaster.getAdminCompany);

router.get('/get/one/:entityID', entityMaster.singleEntity);

router.get('/get/one/entity/:userID', entityMaster.entityDetails);

// router.get('/get/one/companyName/:companyID', entityMaster.companyName);

router.get('/get/companyName/:companyID', entityMaster.companyName);

router.post('/get/one/comapanyDetail', entityMaster.companyDetail);

router.get('/get/singlelocation/:entityID/:branchCode',entityMaster.branchCodeLocation);

router.patch('/patch', entityMaster.updateEntity);

router.patch('/patch/profileStatus', entityMaster.updateProfileStatus);

router.patch('/patch/addLocation', entityMaster.addLocation);
 
router.post('/post/singleLocation',entityMaster.singleLocation);

router.post('/getAll',entityMaster.fetchEntities);

router.get('/getAllcompany',entityMaster.CompanyfromEntities);

router.post('/getAllLocation',entityMaster.fetchLocationEntities);

router.patch('/patch/updateSingleLocation', entityMaster.updateSingleLocation);

router.patch('/patch/addContact', entityMaster.addContact);

router.post('/post/singleContact',entityMaster.singleContact);

router.patch('/patch/updateSingleContact', entityMaster.updateSingleContact);

// router.get('/get/checkBAExists/:emailID', baController.check_ba_exists);

router.delete('/delete/:entityID',entityMaster.deleteEntity);

router.delete('/deleteLocation/:entityID/:locationID',entityMaster.deleteLocation);

router.delete('/deleteContact/:entityID/:contactID',entityMaster.deleteContact);

module.exports = router;