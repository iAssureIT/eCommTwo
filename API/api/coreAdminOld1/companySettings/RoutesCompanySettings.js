const express 	= require("express");
const router 	= express.Router();

const CompanySettingController = require('./ControllerCompanySettings.js');

router.post('/', CompanySettingController.create_companysettings);

router.get('/list',CompanySettingController.list_companysettings);

router.get('/', CompanySettingController.detail_companysettings);

router.patch('/information', CompanySettingController.update_companysettinginfo);

router.patch('/addLocation', CompanySettingController.addLocation);

router.get('/singleLocation/:locationID', CompanySettingController.singleLocation);

router.patch('/update_location', CompanySettingController.update_location);

router.patch('/deleteLocation/:companyID/:locationID',CompanySettingController.delete_location);

router.patch('/bankDetails', CompanySettingController.addBankDetails);

router.patch('/updateBankDetails', CompanySettingController.updateBankDetails);

router.patch('/taxSettings', CompanySettingController.addTaxSettings);

router.patch('/taxSettings', CompanySettingController.addTaxSettings);

router.patch('/addPaymentInfo', CompanySettingController.addPaymentInfo);

router.delete('/:companysettingsID',CompanySettingController.delete_companysettings);


module.exports = router;