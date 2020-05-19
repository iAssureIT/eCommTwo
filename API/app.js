	const express 						= require ('express');
	const app 								= express();
	const morgan 							= require('morgan');// morgan call next function if problem occure
	const bodyParser 					= require('body-parser');// this package use to formate json data 
	const mongoose 						= require ('mongoose');
	var   nodeMailer					= require('nodemailer');
	const globalVariable			= require('./nodemon.js');
	const fs 									= require('fs');

// Routes - CMS
const blockRoutes 					= require('./api/cms/routes/blocks.js');
const pageRoutes 						= require('./api/cms/routes/pages.js');


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
	const systemRoutes				= require("./api/coreAdmin/systemSecurity/RoutesSystemSecurity.js");
	const usersRoutes				= require("./api/coreAdmin/userManagement/RoutesUsers.js");
	const rolesRoutes				= require("./api/coreAdmin/rolesManagement/RoutesRoles.js");
	const companySettingRoutes	    = require("./api/coreAdmin/companySettings/RoutesCompanySettings.js");
	const notificationRoutes		= require("./api/coreAdmin/notificationManagement/RoutesMasterNotification.js");
	const projectSettingsurl 		= require("./api/coreAdmin/projectSettings/RoutesProjectSettings.js");
	// const preferenceurl 			= require("./api/coreAdmin/routes/preference");
	const eCommUsersRoutes          = require("./api/Ecommerce/routes/eCommSystemSecurity.js");

	//========== eCommerce Operations ===========
	const productsRoutes			= require("./api/Ecommerce/products/Routes"); 
	const categoryRoutes			= require("./api/Ecommerce/categories/Routes"); 
	const ordersRoutes				= require("./api/Ecommerce/orders/Routes"); 
	const cartsRoutes				= require("./api/Ecommerce/cart/Routes"); 
	const wishlistRoutes			= require("./api/Ecommerce/wishlist/Routes"); 
	const SectionRoutes			    = require("./api/Ecommerce/sections/Routes"); 
	const taxSetting                = require("./api/Ecommerce/taxManagement/Routes");
	const adminPreference           = require("./api/Ecommerce/adminPreference/Routes");
	const ReturnedProductsRoutes    = require("./api/Ecommerce/returnedProducts/Routes"); 
	const BulkUploadTemplate		= require("./api/Ecommerce/bulkUploadTemplate/Routes"); 

	//=========== Entity master ===============
	const entityRoutes				= require("./api/coreAdmin/entityMaster/RoutesEntityMaster.js");

	//========== Vendor, BA, Customer Management ===========
	const vendorsRoutes				= require("./api/Ecommerce/vendors/Routes"); 
	const vendorCategoryRoutes		= require("./api/Ecommerce/vendorCategory/Routes"); 
	const vendorLocationTypeRoutes  = require("./api/Ecommerce/vendorLocationType/Routes"); 
	const BARoutes					= require("./api/Ecommerce/businessAssociate/Routes"); 
	const customerQueryRoutes		= require("./api/Ecommerce/customerQuery/Routes"); 
	const customerReviewRoutes		= require("./api/Ecommerce/customerReview/Routes"); 


	//========== Franchise Model ===========
	const PurchaseEntry       		= require("./api/Ecommerce/PurchaseManagement/routes/PurchaseEntry");
	const FinishedGoodsEntry   		= require("./api/Ecommerce/PurchaseManagement/routes/FinishedGoodsEntry");



	app.use("/api/users",systemRoutes);
	app.use("/api/auth",systemRoutes);

	app.use("/api/users",usersRoutes);	
	app.use("/api/ecommusers",eCommUsersRoutes);	
	app.use("/api/roles",rolesRoutes);
	app.use("/api/projectSettings",projectSettingsurl);
	app.use("/api/companysettings",companySettingRoutes);
	app.use("/api/masternotifications",notificationRoutes);
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
	app.use("/api/returnedProducts", ReturnedProductsRoutes);
	app.use("/api/bulkUploadTemplate", BulkUploadTemplate);
	app.use("/api/purchaseentry", PurchaseEntry);
	app.use("/api/FinishedGoodsEntry", FinishedGoodsEntry);

	//=========== Entitymaster ==============
	app.use("/api/entitymaster", entityRoutes);
	
	//================ CMS ==================
	app.use("/api/blocks",blockRoutes);
	app.use("/api/pages",pageRoutes);


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
			res.writeHeader(200, {"Content-Type": "text/html"});  
	    res.write(html);  

			res.status(error.status || 500);
			// res.json({
			// 		error: {
			// 		message: error.message
			// 		}
			// 	});
	    res.end();  
	  });

	});

	module.exports = app;