const express 	= require("express");
const router 	= express.Router();

const checkAuth     = require('../middlerware/check-auth.js');

const UserController = require('./ControllerUsers.js');

router.patch('/patch/:ID',UserController.user_update_name_mobile);
router.patch('/patch/status/:ID',UserController.user_update_status);
router.patch('/patch/userimg/:ID',UserController.user_update_img);
router.patch('/patch/status',UserController.user_update_many_status);
router.patch('/patch/role/:action/:ID',UserController.user_update_role);
router.post('/get/list/role/:role',UserController.fetch_users_roles);
router.post('/get/list/status/:status',UserController.fetch_users_status);
router.post('/get/searchlist',UserController.search_text);
router.post('/get/list',UserController.fetch_users);
router.get('/get/:ID',UserController.fetch_user_ID);
router.delete('/delete/:ID',UserController.delete_user_ID);

// router.post('/post/login',UserController.user_login); //Working
// router.post('/post/signup/user', UserController.user_signup_user); //Working
// router.post('/post/signup/user/emailotp', UserController.user_signup_user_email_otp); //Working


module.exports = router;