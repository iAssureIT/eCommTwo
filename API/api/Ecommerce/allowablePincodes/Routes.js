const express 	= require("express");
const router 	= express.Router();

const allowablePincodeController = require('./Controller');

//route for allowable pincodes
router.post('/post', allowablePincodeController.add_allowablePincodes);

module.exports = router;