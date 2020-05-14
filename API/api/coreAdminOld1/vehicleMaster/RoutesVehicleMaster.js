const express 	= require("express");
const router 	= express.Router();

const vehicleMaster = require('./ControllerVehicleMaster.js');

router.post('/post', vehicleMaster.insertVehicle);

router.get('/get/list', vehicleMaster.fetchVehicles);

router.get('/get/count', vehicleMaster.countVehicles);
 
router.get('/get/one/:vehicleID', vehicleMaster.fetchSingleVehicle);

router.get('/search/:str', vehicleMaster.searchVehicle);


router.patch('/patch', vehicleMaster.updateVehicle);

router.post('/post/list/filterVehicles', vehicleMaster.filterVehicles);

router.delete('/delete/:vehicleID', vehicleMaster.deleteVehicle);

router.get('/get/inactive', vehicleMaster.getInactiveVehicles);

module.exports = router;