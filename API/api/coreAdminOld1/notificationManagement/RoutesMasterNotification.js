const express 	= require("express");
const router 	= express.Router();
const checkAuth     = require('../middlerware/check-auth.js');
const MasternotificationController = require('./ControllerMasterNotifications.js');

router.post('/post', MasternotificationController.create_masternotification);
router.get('/get/list', MasternotificationController.list_masternotification);
router.get('/get/:notificationmaster_ID', MasternotificationController.detail_masternotification);
router.put('/put/:ID', MasternotificationController.update_masternotification);
router.delete('/delete/all',MasternotificationController.deleteall_masternotification);
router.delete('/delete/:ID',MasternotificationController.delete_masternotification);

module.exports = router;