const express 	= require("express");
const router 	= express.Router();

const paymentController = require('../paymentapi/Controller.js');

router.post('/post',paymentController.insert);




module.exports = router;