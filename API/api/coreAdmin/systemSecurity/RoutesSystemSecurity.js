const express 	= require("express");
const router 	= express.Router();

const checkAuth     = require('../middlerware/check-auth.js');
const UserController = require('./ControllerSystemSecurity.js');

router.post('/post/signup/user', UserController.user_signup_user); //Working
router.post('/post/signup/user/emailotp', UserController.user_signup_user_email_otp); //Working
router.get('/get/checkemailotp/usingID/:ID/:emailotp',UserController.check_userID_EmailOTP);
router.get('/get/checkemailotp/usingUsername/:username/:emailotp',UserController.check_username_EmailOTP);
router.post('/post/login',UserController.user_login); //Working
router.patch('/patch/change_password_withoutotp/id/:ID',UserController.user_update_password_withoutotp_ID);
router.patch('/patch/change_password_withoutotp/username/:username',UserController.user_update_password_withoutotp_username);
router.patch('/patch/setsendemailotpusingID/:ID',UserController.set_send_emailotp_usingID);
router.patch('/patch/setsendemailotpusingEmail/:emailId',UserController.set_send_emailotp_usingEmail);
// router.patch('/:userID',UserController.update_user);

router.get('/:userID',UserController.user_details);
router.delete('/:userID',UserController.delete_user);
router.patch('/userdetails/:userID',UserController.update_user_details); 
router.patch('/updateuseraddress',UserController.add_user_address);
router.patch('/patch/address',UserController.add_delivery_address);
router.patch('/delete/address',UserController.delete_delivery_address);
// router.patch('/patch/address',UserController.add_user_address);

 
// router.post('/ba', UserController.ba_signupadmin); 
// router.post('/vendor', UserController.vendor_signup);  
// router.post('/userslist',UserController.users_fetch); 
// router.get('get/list', UserController.users_list);

module.exports = router;