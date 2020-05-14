const mongoose = require('mongoose');

const bookingMasterSchema = mongoose.Schema({
	_id			                : mongoose.Schema.Types.ObjectId,
    // packageTypeId               : { type: mongoose.Schema.Types.ObjectId, ref: 'packagetypemasters' },
    // packageId                   : { type: mongoose.Schema.Types.ObjectId, ref: 'packagemasters' },
    tripType                    : String,
    from                        : {
                                        address        : String,
                                        latitude       : Number,
                                        longitude      : Number,
                                },
    to                          : {
                                        address        : String,
                                        latitude       : Number,
                                        longitude      : Number,
                                },                                 
    pickupDate                  : Date,
    pickupTime                  : String,
    returnDate                  : Date,
    returnTime                  : String,
    specialInstruction          : String,
    purposeOfTravel             : String,
    reasonForSelectingVehicle   : String,
    signature                   : String,
    vehicleCategoryId           : { type: mongoose.Schema.Types.ObjectId, ref: 'vehiclemasters' },
    employeeId                  : { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    corporateId                 : { type: mongoose.Schema.Types.ObjectId, ref: 'masters' },
    managerId                   : { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    intermediateStops           : [{
                                    address     : String,
                                    latitude    : String,
                                    longitude   : String    
                                }],
    status                      : [{
                                    value           : String,
                                    statusBy        : { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
                                    allocatedTo     : { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
                                    statusAt        : Date,
                                    remark          : String,
                                    latitude        : Number,
                                    longitude       : Number,
                                    OTP             : Number,
                                    odometerReading : Number,
                                    proof           : String,  
                                }],
    statusValue                 : String,                                                            
    routeCoordinates            : [{
                                    latitude            : Number,
                                    longitude           : Number,
                                    distanceTravelled   : Number,
                                    stop                : Boolean,
                                }],
    tripExpenses                : Array,
    createdBy                   : { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    createdAt                   : Date,
    updateLog                   : [{
                                    updatedAt           : Date,
                                    updatedBy           : { type: mongoose.Schema.Types.ObjectId, ref: 'users' } 
                                }]
});

module.exports = mongoose.model('bookingmasters',bookingMasterSchema);
