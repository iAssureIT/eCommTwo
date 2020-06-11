const express 	= require("express");
const router 	= express.Router();

const contract = require('./ControllerVehicleDriverMapping.js');

router.post('/post', contract.insertVehicleDriverMapping);

router.post('/get/list', contract.fetchVehicleDriverMappings);

router.get('/get/list', contract.getVehicleDriverMappings);

router.get('/get/count', contract.countVehicleDriverMappings);

router.get('/get/join/one/:mappingID', contract.joinVehicleDriver);

router.get('/get/joinlist', contract.joinVehicleDriverList);

router.get('/get/one/:mappingID', contract.fetchSingleVehicleDriverMapping);

router.patch('/patch/unmapdate', contract.updateVehicleDriverMapping);

router.patch('/patch/status', contract.updateVehicleDriverMappingStatus);

router.post('/filter', contract.filterVehicleDriverMapping);

router.get('/search/:str', contract.searchVehicleDriverMapping);

router.delete('/delete/:mappingID', contract.deleteVehicleDriverMapping);

module.exports = router;