const express 	= require("express");
const router 	= express.Router();

const PurchaseEntryController = require('../controllers/PurchaseEntry');

router.post('/post', PurchaseEntryController.insert_purchaseEntry);

router.get('/get/list',PurchaseEntryController.list_purchaseEntry);

router.get('/get/one/:fetchId'       , PurchaseEntryController.fetch_one);

router.patch('/patch/:purchaseID'    , PurchaseEntryController.update_PurchaseEntry);

router.delete('/delete/:purchaseID',PurchaseEntryController.delete_purchaseEntry);

router.get('/get/datewisepurchase/:purchaseDate',PurchaseEntryController.get_datewise_purchaceEntry);
/*
router.get('/get/list/:section_ID',PurchaseEntryController.list_category);

router.get('/get/count',PurchaseEntryController.count_category);

router.post('/get/list',PurchaseEntryController.list_category_with_limits);

router.get('/get/one/:categoryID', PurchaseEntryController.fetch_category);

router.get('/get/:sectionID', PurchaseEntryController.fetch_categories_by_section);

router.post('/searchCategory', PurchaseEntryController.searchCategory);

router.post('/searchCategoryCount', PurchaseEntryController.searchCategoryCount);
*/



 


module.exports = router;