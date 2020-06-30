const express 	= require("express");
const router 	= express.Router();

const franchiseDeliveryController = require('./Controller');

// console.log("abc");

router.post('/post', franchiseDeliveryController.insert_franchise_delivery);
router.get('/get/franchiseDeliveryChallan/:id', franchiseDeliveryController.get_delivery_challan);
router.put('/attribute', franchiseDeliveryController.update_delivery_attribute);

module.exports = router; 