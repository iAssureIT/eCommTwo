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

router.get('/:userID',UserController.user_details);
// router.patch('/:userID',UserController.update_user);
router.delete('/:userID',UserController.delete_user);
router.patch('/userdetails/:userID',UserController.update_user_details); 
router.patch('/useraddress',UserController.add_user_address);
router.patch('/patch/address',UserController.add_delivery_address);

 
router.post('/ba', UserController.ba_signupadmin); 
router.post('/vendor', UserController.vendor_signup);  
router.post('/userslist',UserController.users_fetch); 
router.get('get/list', UserController.users_list);

// router.patch('/delete/address',UserController.delete_delivery_address); 
// router.post('/', UserController.user_signupadmin);
// router.post('/login',UserController.user_login); 
// router.get('/vendorlist', UserController.vendor_list);  
// router.get('/userslist', UserController.users_directlist); 
// router.get('/get/count', UserController.users_count); 
// router.get('/get/activeuserscount', UserController.active_users_count);
// router.put('/resetpwd/:userID',UserController.update_user_resetpassword);  
// router.post('/searchValue',UserController.user_search);
// router.post('/searchValueCount',UserController.searchValueCount); 
// router.post('/officesearchValue',UserController.search_user_office); 
// router.post('/statusaction',UserController.account_status); 
// router.post('/roleadd',UserController.account_role_add); 
// router.post('/roledelete',UserController.account_role_remove); 
// router.delete('/',UserController.deleteall_user);  
// router.put('/otpverification', UserController.confirm_otps);
// router.get('/resendotp/:userID', UserController.resendotp);
// router.patch('/:rolestatus',UserController.user_change_role); 
// router.patch('/perform/action',UserController.user_performaction); 
// router.post('/sendlink',UserController.send_link);  
// router.get('/get/checkUserExists/:emailID', UserController.check_user_exists);
// router.post('/filterUser', UserController.filterUser); 
// router.post('/filterUserCount', UserController.filterUserCount); 

module.exports = router;