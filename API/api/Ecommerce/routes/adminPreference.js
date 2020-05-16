const express 	= require("express");
const router 	= express.Router();

const adminPreferenceController = require('../controllers/adminPreference');

//route for website model
router.post('/postWebsitemodel', adminPreferenceController.add_websiteModel);

module.exports = router;