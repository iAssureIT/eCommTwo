	const express 						= require ('express');
	const app 						    = express();
	const morgan 						= require('morgan');// morgan call next function if problem occure
	const bodyParser 					= require('body-parser');// this package use to formate json data 
	const mongoose 						= require ('mongoose');
	var   nodeMailer					= require('nodemailer');
	const globalVariable			    = require('./nodemon.js');
	const fs 							= require('fs');

// Routes - CMS
/*const blockRoutes 					= require('./api/cms/routes/blocks.js');
const pageRoutes 					= require('./api/cms/routes/pages.js');*/
const blockRoutes 					= require('./api/cms/blocks/routes.js');
const pageRoutes 					= require('./api/cms/pages/routes.js');
const blogRoutes 					= require('./api/cms/blogs/routes.js');

// console.log("globalVariable.dbname",dbname);
	mongoose.connect('mongodb://localhost/'+globalVariable.dbname,{
	// mongoose.connect('mongodb://localhost/'+dbname,{
		useNewUrlParser: true,
		useUnifiedTopology : true
	})
	mongoose.promise = global.Promise;

	app.use(morgan("dev"));
	app.use('/uploads', express.static('uploads'));
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());
	// const cors = require('cors');
	// app.use(cors());
	app.use((req, res, next) => {
		res.header("Access-Control-Allow-Origin", "*");
		res.header(
			"Access-Control-Allow-Headers",
			"Origin, X-Requested-With, Content-Type, Accept, Authorization"
		);
		if (req.method === "OPTIONS") {
			res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
			return res.status(200).json({});
		}
		next();
	});

	// Routes which should handle requests
	//========== Core Admin ===================

	const systemRoutes			   	    = require("./api/coreAdmin/systemSecurity/RoutesSystemSecurity.js");
	const usersRoutes			   				= require("./api/coreAdmin/userManagement/RoutesUsers.js");
	const rolesRoutes			   				= require("./api/coreAdmin/rolesManagement/RoutesRoles.js");
	const companySettingRoutes	 		= require("./api/coreAdmin/companySettings/RoutesCompanySettings.js");
	const notificationRoutes	   		= require("./api/coreAdmin/notificationManagement/RoutesMasterNotification.js");
	const projectSettingsurl 	   		= require("./api/coreAdmin/projectSettings/RoutesProjectSettings.js");
	// const preferenceurl 		   = require("./api/coreAdmin/routes/preference");
	const locationTypeMasterRoutes 	= require("./api/coreAdmin/locationTypeMaster/RoutesLocationTypeMaster.js");
	// const EventTokenRoutes	= require("./coreAdmin/EventTokenMaster/RoutesEventTokenMaster.js");
	const EventTokenRoutes		= require("./api/coreAdmin/EventTokenMaster/RoutesEventTokenMaster.js");
	//========== eCommerce Operations ===========
	const eCommUsersRoutes    = require("./api/Ecommerce/eCommSystemSecurity/Routes");
	const productsRoutes			= require("./api/Ecommerce/products/Routes"); 
	const categoryRoutes			= require("./api/Ecommerce/categories/Routes"); 
	const ordersRoutes				= require("./api/Ecommerce/orders/Routes"); 
	const cartsRoutes					= require("./api/Ecommerce/cart/Routes"); 
	const wishlistRoutes			= require("./api/Ecommerce/wishlist/Routes"); 
	
	const SectionRoutes			  = require("./api/Ecommerce/sections/Routes"); 
	const ShippingRoutes			= require("./api/Ecommerce/ShippingManagement/Routes"); 
	const TimingRoutes			  = require("./api/Ecommerce/TimeManagement/Routes"); 
	const taxSetting          = require("./api/Ecommerce/taxManagement/Routes");
	const ReturnedProductsRoutes  = require("./api/Ecommerce/returnedProducts/Routes"); 
	const BulkUploadTemplate	= require("./api/Ecommerce/bulkUploadTemplate/Routes"); 
	const adminPreference     = require("./api/Ecommerce/adminPreference/Routes");

	// const unitOfMeasurment       = require("./api/Ecommerce/unitOfMeasurement/RoutesUnitOfMeasurment");
	const unitOfMeasurment    = require("./api/Ecommerce/departmentMaster/RoutesUnitofmeasurment");

	//=========== Global master ===============
	const departmentRoute           = require("./api/coreAdmin/departmentMaster/RoutesDepartmentMaster");
	const taxmaster                 = require("./api/coreAdmin/taxNameMaster/RoutesTaxNameMaster");

	//=========== Entity master ===============
	const entityRoutes			    = require("./api/coreAdmin/entityMaster/RoutesEntityMaster.js");
	
	//=========== Allowable Pincode ============
	const pincodesRoute             = require("./api/Ecommerce/allowablePincodes/Routes.js");

	//========== Vendor, BA, Customer Management ===========
	const vendorsRoutes			    = require("./api/Ecommerce/vendors/Routes"); 
	const vendorCategoryRoutes	    = require("./api/Ecommerce/vendorCategory/Routes"); 
	const vendorLocationTypeRoutes  = require("./api/Ecommerce/vendorLocationType/Routes"); 
	const BARoutes				    = require("./api/Ecommerce/businessAssociate/Routes"); 
	const customerQueryRoutes		= require("./api/Ecommerce/customerQuery/Routes"); 
	const customerReviewRoutes		= require("./api/Ecommerce/customerReview/Routes"); 


	//========== Franchise Model ===========
	const PurchaseEntry       			= require("./api/Ecommerce/PurchaseManagement/routes/PurchaseEntry");
	const FinishedGoodsEntry   			= require("./api/Ecommerce/PurchaseManagement/routes/FinishedGoodsEntry");
	const FranchisePORoutes				= require("./api/Ecommerce/Franchise/franchisePurOrder/Routes.js");
	const FranchiseGoods       			= require("./api/Ecommerce/distributionManagement/Routes.js");
    const FranchiseDeliveryRoutes		= require("./api/Ecommerce/distributionManagement/franchiseDelivery/Routes.js");


	const AdminPORoutes					= require("./api/Ecommerce/adminShoppingList/Routes.js");



   /*WreHouse Master*/
   const WareHouseRoutes					= require("./api/Ecommerce/warehouseMaster/RoutesWareHouseMaster.js");

   // Billing management
   const BillingEntry					= require("./api/Ecommerce/billingManagement/Routes.js");

	app.use("/api/users",systemRoutes);
	app.use("/api/auth",systemRoutes);

	app.use("/api/users",usersRoutes);	
	app.use("/api/ecommusers",eCommUsersRoutes);
	app.use("/api/users",eCommUsersRoutes);
	app.use("/api/roles",rolesRoutes);
	app.use("/api/projectSettings",projectSettingsurl);
	app.use("/api/companysettings",companySettingRoutes);
	app.use("/api/taxsettings",taxSetting);

	app.use("/api/masternotifications",notificationRoutes);
	app.use("/api/locationtypemaster",locationTypeMasterRoutes);
	
	// app.use("/api/preference",preferenceurl);
	// app.use("/api/notifications",notificationRoutes);
	
	app.use("/api/products", productsRoutes);
	app.use("/api/category", categoryRoutes);
	app.use("/api/orders", ordersRoutes);
	app.use("/api/wishlist", wishlistRoutes);
	app.use("/api/vendors", vendorsRoutes);
	app.use("/api/vendorCategory", vendorCategoryRoutes);
	app.use("/api/vendorLocationType", vendorLocationTypeRoutes);
	app.use("/api/carts", cartsRoutes);
	app.use("/api/businessassociates", BARoutes);
	app.use("/api/customerQuery", customerQueryRoutes);
	app.use("/api/customerReview", customerReviewRoutes);
	app.use("/api/preference", taxSetting);
	app.use("/api/adminpreference", adminPreference);
	app.use("/api/sections", SectionRoutes);
	app.use("/api/shipping", ShippingRoutes);
	app.use("/api/time", TimingRoutes);
	app.use("/api/returnedProducts", ReturnedProductsRoutes);
	app.use("/api/bulkUploadTemplate", BulkUploadTemplate);
	// app.use("/api/unitofmeasurmentmaster",unitOfMeasurment);
	app.use("/api/unitofmeasurmentmaster",unitOfMeasurment);

	app.use("/api/EventToken", 		EventTokenRoutes);
	//=========== Franchisemaster ==============
	app.use("/api/purchaseentry", PurchaseEntry);
	app.use("/api/finishedGoodsEntry", FinishedGoodsEntry);
	app.use("/api/franchisepo", FranchisePORoutes);
	app.use("/api/franchisegoods", FranchiseGoods);
	app.use("/api/franchiseDelivery", FranchiseDeliveryRoutes);

	app.use("/api/warehousemaster",WareHouseRoutes);


	//=========== admin Shopping List ==============
	app.use("/api/adminpo", AdminPORoutes);

	//=========== global master ============	
	app.use("/api/departmentmaster", departmentRoute);
	app.use("api/globalmaster",taxmaster);

	//=========== Entitymaster ==============
	app.use("/api/entitymaster", entityRoutes);
	
	// ========== Allowable pincodes ==========
	app.use("/api/allowablepincode", pincodesRoute);
	//================ CMS ==================
	app.use("/api/blocks",blockRoutes);
	app.use("/api/pages",pageRoutes);
	app.use('/api/blogs',blogRoutes);

	//=========== Billing Management =========
	app.use("/api/billingmaster", BillingEntry);

	app.post('/send-email', (req, res)=> {
	console.log("inside app.js req:");
	let transporter = nodeMailer.createTransport({
		host: globalVariable.emailHost,
		port: globalVariable.emailPort,
		auth: {
			user: globalVariable.user,
			pass: globalVariable.pass
		}
	});
	console.log("transporter",transporter);
	console.log("globalVariable.user:",globalVariable.user);
	let mailOptions = {
		from   : globalVariable.project+'<'+globalVariable.user+'>', // sender address
		to     : req.body.email, // list of receivers
		subject: req.body.subject, // Subject line
		text   : req.body.text, // plain text body
		html   : req.body.mail // html body
	};	
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {			
			return "Failed";
		}
		if(info){
			res.status(200).json({ 
				message: "Success",
			});
		}else{
			res.status(401).json({ 
				message: "Failed",
			});
		}
		res.render('index');
	});
});


	app.use((req, res, next) => {
		const error = new Error("This Page Is Not Found");
		error.status = 404;
		next(error);
	});


	app.use((error, req, res, next) => {

		fs.readFile('./index.html', function (err, html) {
	    if (err) {
	        throw err; 
	    }      
			// res.writeHeader(200, {"Content-Type": "text/html"});  
	    // res.write(html);  

			res.status(error.status || 500);
			res.json({
					error: {
					message: error.message
					}
				});
	    res.end();  
	  });

	});

	module.exports = app;