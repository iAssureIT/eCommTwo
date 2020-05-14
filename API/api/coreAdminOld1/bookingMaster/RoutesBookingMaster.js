const express 	= require("express");
const router 	= express.Router();

const bookingMaster = require('./ControllerBookingMaster.js');

router.post('/post', bookingMaster.insertBooking);

router.post('/get/list', bookingMaster.fetchBookings);

router.get('/get/list/:status', bookingMaster.getBookings);

router.get('/get/count', bookingMaster.countBookings);

router.get('/get/one/:bookingID', bookingMaster.singleBooking);

router.patch('/patch', bookingMaster.updateBooking);

router.delete('/delete/:bookingID', bookingMaster.deleteBooking);



//Driver App API  - Rushikesh Salunkhe

router.patch('/patch/status', bookingMaster.updateStatus);

router.get('/get/status/:bookingID', bookingMaster.getStatus);

router.patch('/patch/tripExpenses', bookingMaster.insert_trip_expenses);

router.patch('/patch/updateRouteCoordinates', bookingMaster.update_routeCoordinates);

module.exports = router;