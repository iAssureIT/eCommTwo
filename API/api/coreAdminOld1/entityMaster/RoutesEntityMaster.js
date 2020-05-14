const express 	= require("express");
const router 	= express.Router();

const entityMaster = require('./ControllerEntityMaster');

router.post('/post', entityMaster.insertEntity);

router.get('/get/:entityType',entityMaster.listEntity);

router.get('/get/count/:entityType',entityMaster.countEntity);

router.post('/get/filterEntities',entityMaster.filterEntities);

router.get('/get/one/:entityID', entityMaster.singleEntity);

router.patch('/patch', entityMaster.updateEntity);

router.patch('/patch/addLocation', entityMaster.addLocation);
 
router.post('/post/singleLocation',entityMaster.singleLocation);

router.patch('/patch/updateSingleLocation', entityMaster.updateSingleLocation);

router.patch('/patch/addContact', entityMaster.addContact);

router.post('/post/singleContact',entityMaster.singleContact);

router.patch('/patch/updateSingleContact', entityMaster.updateSingleContact);

// router.get('/get/checkBAExists/:emailID', baController.check_ba_exists);

router.delete('/delete/:entityID',entityMaster.deleteEntity);

router.delete('/deleteLocation/:entityID/:locationID',entityMaster.deleteLocation);

router.delete('/deleteContact/:entityID/:contactID',entityMaster.deleteContact);

module.exports = router;