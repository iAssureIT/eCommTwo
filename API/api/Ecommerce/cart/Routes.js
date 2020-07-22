const express 	= require("express");
const router 	= express.Router();

const cartController = require('./Controller');

router.post('/post', cartController.insert_cartid);

router.get('/get/list/:user_ID', cartController.list_cart);

router.get('/get/cartproductlist/:user_ID', cartController.list_cart_product);

router.get('/get/list', cartController.all_list_cart);

router.get('/get/one/:user_ID', cartController.user_cart);

router.get('/get/count/:user_ID', cartController.count_cart);

router.patch('/remove', cartController.remove_cart_items);

router.patch('/quantity', cartController.change_cart_item_quantity);

router.patch('/address', cartController.add_address_to_cart);

router.patch('/payment', cartController.add_paymentmethod_to_cart);

//code by madhuri ghute

router.patch('/updateCart', cartController.update_cart_item);


module.exports = router;