const express 	= require("express");
const router 	= express.Router();

const franchisePOController = require('./Controller');

router.post('/post', franchisePOController.insert_franchisePO);

router.get('/get/purchaseorderList/:franchise_id/:orderDate',franchisePOController.list_franchisePO);

router.get('/get/purchaseorderList/:orderDate',franchisePOController.list_allfranchisePO);

router.get('/get/one/purchaseorder/:purchaseorder_id',franchisePOController.one_franchisePO);

router.patch('/patch/purchaseorder', franchisePOController.update_franchisePO);
 
router.patch('/patch/acceptitem', franchisePOController.update_franchisePOitem);

router.patch('/patch/patch/acceptpurchaseorder', franchisePOController.update_franchisePOaccept);

router.delete('/delete/purchaseorder/:purchaseorder_id', franchisePOController.delete_franchisePO);

module.exports = router;