	const express 						= require ('express');
	const app 							= express();
	const morgan 						= require('morgan');// morgan call next function if problem occure
	const bodyParser 					= require('body-parser');// this package use to formate json data 
	const mongoose 						= require ('mongoose');
	var nodeMailer						= require('nodemailer');
	const globalVariable				= require('./nodemon.js');

// Routes - CMS
const blockRoutes 					= require('./api/cms/routes/blocks.js');
const pageRoutes 					= require('./api/cms/routes/pages.js');


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

	
	const systemRoutes				= require("./api/coreAdmin/systemSecurity/RoutesSystemSecurity.js");
	const usersRoutes				= require("./api/coreAdmin/userManagement/RoutesUsers.js");
	const rolesRoutes				= require("./api/coreAdmin/rolesManagement/RoutesRoles.js");
	const companySettingRoutes		= require("./api/coreAdmin/companySettings/RoutesCompanySettings.js");
	const notificationRoutes		= require("./api/coreAdmin/notificationManagement/RoutesMasterNotification.js");
	const projectSettingsurl 		= require("./api/coreAdmin/projectSettings/RoutesProjectSettings.js");
	// const preferenceurl 			= require("./api/coreAdmin/routes/preference");

	const productsRoutes			= require("./api/Ecommerce/routes/products"); 
	const categoryRoutes			= require("./api/Ecommerce/routes/categories"); 
	const ordersRoutes				= require("./api/Ecommerce/routes/orders"); 
	const vendorsRoutes				= require("./api/Ecommerce/routes/vendors"); 
	const vendorCategoryRoutes		= require("./api/Ecommerce/routes/vendorCategory"); 
	const vendorLocationTypeRoutes  = require("./api/Ecommerce/routes/vendorLocationType"); 
	const cartsRoutes				= require("./api/Ecommerce/routes/cart"); 
	const wishlistRoutes			= require("./api/Ecommerce/routes/wishlist"); 
	const BARoutes					= require("./api/Ecommerce/routes/businessAssociate"); 
	const customerQueryRoutes		= require("./api/Ecommerce/routes/customerQuery"); 
	const customerReviewRoutes		= require("./api/Ecommerce/routes/customerReview"); 
	const SectionRoutes			    = require("./api/Ecommerce/routes/sections"); 
	const taxSetting                = require("./api/Ecommerce/routes/taxManagement");
	const ReturnedProductsRoutes	= require("./api/Ecommerce/routes/returnedProducts"); 
	const BulkUploadTemplate		= require("./api/Ecommerce/routes/bulkUploadTemplate"); 
	const PurchaseEntry       		= require("./api/Ecommerce/PurchaseManagement/routes/PurchaseEntry");
	const FinishedGoodsEntry   		= require("./api/Ecommerce/PurchaseManagement/routes/FinishedGoodsEntry");

	app.use("/api/users",systemRoutes);
	app.use("/api/auth",systemRoutes);

	app.use("/api/users",usersRoutes);	
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
	app.use("/api/sections", SectionRoutes);
	app.use("/api/returnedProducts", ReturnedProductsRoutes);
	app.use("/api/bulkUploadTemplate", BulkUploadTemplate);
	app.use("/api/purchaseentry", PurchaseEntry);
	app.use("/api/FinishedGoodsEntry", FinishedGoodsEntry);


//CMS
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
		from   : '"AnasHandicraft" <'+globalVariable.user+'>', // sender address
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
		const error = new Error("Not found");
		error.status = 404;
		next(error);
	});

	app.use((error, req, res, next) => {
		res.status(error.status || 500);
		res.json({
				error: {
				message: error.message
				}
			});
	});

	module.exports = app;