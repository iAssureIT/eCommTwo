const express 	= require("express");
const router 	= express.Router();

const vehicleMaster = require('./ControllerVehicleMaster.js');

router.post('/post', vehicleMaster.insertVehicle);

router.get('/get/list', vehicleMaster.fetchVehicles);


router.get('/get/count', vehicleMaster.countVehicles);
 
router.get('/get/one/:vehicleID', vehicleMaster.fetchSingleVehicle);

router.get('/search/:str/:company_Id', vehicleMaster.searchVehicle);

router.patch('/patch', vehicleMaster.updateVehicle);

router.post('/post/list/filterVehicles', vehicleMaster.filterVehicles);

router.delete('/delete/:vehicleID', vehicleMaster.deleteVehicle);


//Vendor App API (Rushikesh Salunkhe)
router.get('/get/vehicleListMapping/:company_Id', vehicleMaster.vehicleListMapping);

router.get('/get/list/:company_Id', vehicleMaster.getVehicleListForVendor);

router.post('/post/list/vehicleforallocation', vehicleMaster.getVehicleListForAllocation);

router.patch('/patch/temp_delete_vehicle', vehicleMaster.tempDeleteVehicle);


module.exports = router;