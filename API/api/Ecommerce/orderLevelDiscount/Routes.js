const express 	= require("express");
const router 	= express.Router();

const OrderleveldiscountController = require('./Controller');

router.post('/post', OrderleveldiscountController.insert_section);

router.get('/get/list',OrderleveldiscountController.get_sections);

router.get('/get/list-with-limits/:startRange/:limitRange',OrderleveldiscountController.get_sections_with_limits);

router.get('/get/count',OrderleveldiscountController.count_section);

router.get('/get/one/:sectionID',OrderleveldiscountController.get_single_section);

router.patch('/patch', OrderleveldiscountController.update_section);

router.delete('/delete/:sectionID',OrderleveldiscountController.delete_section);

module.exports = router; 