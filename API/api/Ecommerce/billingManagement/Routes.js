const express 	= require("express");
const router 	= express.Router();

const billController = require('./Controller');

//get product list by category
router.get('/get/listbycategory/:categoryID/:franchiseId',billController.list_products_by_category);

//get product list by section
router.get('/get/list/:sectionID/:franchiseId',billController.list_product_by_section);

//generate bill number
router.get('/get/generateBillNumber/:companyId', billController.generate_bill_number);

//product list by franchise
router.get('/get/list/:franchiseId',billController.list_product);

//get franchise details
router.get('/getCompany/:companyID',billController.getCompany);

module.exports = router;