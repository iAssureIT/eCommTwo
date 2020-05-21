import React, { Component }     from 'react';
import $                        from 'jquery';
import jQuery                   from 'jquery';
import axios                    from 'axios';
import swal                     from 'sweetalert';
import TimePicker               from 'rc-time-picker';
import BookingForm              from './components/BookingForm.js';
import moment                   from 'moment';
import _                        from 'underscore';
import EditableLabel            from 'react-inline-editing';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

import EmployeeDetails        from './components/EmployeeDetails.js';
import TripDetails            from './components/TripDetails.js';
import CarDetails             from './components/CarDetails.js';


import "./BookingMaster.css";
import 'bootstrap/js/tab.js';
const format = "h:mm a";
var stopArr  = [];


class BookingMaster extends Component {
     
    constructor(props) {
        super(props);
        this.state = {
            showDiv                 :false,
            toggleButtonValue       :"Round Trip",
            bookingType             :"Local",
            pickupDate              :moment(new Date).format("YYYY-MM-DD"),
            returnDate              : moment(new Date).format("YYYY-MM-DD"),
            fromTime                :"",
            from                    :"",
            to                      : "",
            toTime                  :"",
            purposeOfTravel         : "",
            instructions            :"",
            valueOfTab              :"",
            stopArr                 :[],
            packageTypeVal          :[],
            vehicleData             :[],
            userID                  : this.props.match.params ? this.props.match.params.userID :'' ,
            empHomeAddr             : "",
            empWorkAddr             : "",
            radioButtonValue        : "Home",
            address                 : "",
            selectedVehicle         : "",
            fromLatLng              : [],
            toLatLng                : [],
            stopLatLng              : [],
            tripArray               : [],
            vehicleCategoryId       : "",
            fromArea                : "",
            fromCity                : "",
            fromState               : "",
            fromCountry             : "",
            fromPincode             : "",
            toArea                  : "",
            toCity                  : "",
            toState                 : "",
            toCountry               : "",
            toPincode               : "",
            stopArea                  : "",
            stopCity                  : "",
            stopState                 : "",
            stopCountry               : "",
            stopPincode               : ""

        };

      this._handleFocus = this._handleFocus.bind(this);
      this._handleFocusOut = this._handleFocusOut.bind(this);
    }

    componentDidMount() {

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        if(dd<10){
            dd='0'+dd;
        }
        if(mm<10){
            mm='0'+mm;
        }
        var today = yyyy+'-'+mm+'-'+dd;
        var array = {
          returnDate : today,
          from    : this.state.from,
          pickupDate : this.state.pickupDate,
          pickupTime : this.state.fromTime,
          returnDate : this.state.returnDate,
          to         : this.state.to,
          returnTime : this.state.toTime,
          bookingType : "Local",
          purposeOfTravel: this.state.purposeOfTravel,
          instructions  :this.state.instructions ,
          selectedVehicle  :this.state.selectedVehicle ,
          stopArr : this.state.stopArr    }
        this.setState({
          returnDate : today,
          tripArray  : array
        });

     axios.get("/api/packagemaster/get/list")
      .then((response) => {
        // console.log('response===', response.data)
        this.setState({
            packageNames: response.data
        })
      })
      .catch((error) => {

      })

       axios.get("/api/personmaster/get/ID/"+this.props.match.params.userID)
        .then((response) => {
            var UserData = response.data.data[0].address[0];
            var addr = UserData.addressLine1+', '+UserData.area+', '+UserData.city+', '+UserData.district
             geocodeByAddress(addr)
            .then(results => getLatLng(results[0]))
            .then(latLng => this.setState({'fromLatLng': latLng}))
            .catch(error => console.error('Error', error));
            if(this.state.radioButtonValue === 'Home'){
              var array = {
                returnDate : this.state.returnDate,
                from    : addr,
                pickupDate : this.state.pickupDate,
                pickupTime : this.state.fromTime,
                returnDate : this.state.returnDate,
                to         : this.state.to,
                returnTime : this.state.toTime,
                bookingType : "Local",
                purposeOfTravel: this.state.purposeOfTravel,
                instructions  :this.state.instructions,
                selectedVehicle  :this.state.selectedVehicle,
                stopArr : this.state.stopArr
              }
                this.setState({
                    from        : addr,
                    tripArray   : array,
                    fromArea    : UserData.area,
                    fromCity    : UserData.city,
                    fromState   : UserData.state,
                    fromCountry : UserData.country,
                    fromPincode : UserData.pincode
                })   
            }else if(this.state.radioButtonValue === 'Office'){
              var array = {
                returnDate : this.state.returnDate,
                from    : response.data.data[0].workLocation,
                pickupDate : this.state.pickupDate,
                pickupTime : this.state.fromTime,
                returnDate : this.state.returnDate,
                to         : this.state.to,
                returnTime : this.state.toTime,
                bookingType : "Local",
                purposeOfTravel: this.state.purposeOfTravel,
                instructions  :this.state.instructions,
                selectedVehicle  :this.state.selectedVehicle,
                stopArr : this.state.stopArr
              }
                this.setState({
                    from : response.data.data[0].workLocation,
                    tripArray : array
                })  
            }else{
              var array = {
                returnDate : this.state.returnDate,
                from    : "",
                pickupDate : this.state.pickupDate,
                pickupTime : this.state.fromTime,
                returnDate : this.state.returnDate,
                to         : this.state.to,
                returnTime : this.state.toTime,
                bookingType : "Local",
                purposeOfTravel: this.state.purposeOfTravel,
                instructions  :this.state.instructions,
                selectedVehicle  :this.state.selectedVehicle,
                stopArr : this.state.stopArr
              }
                this.setState({
                    from : "",
                    tripArray : array
                })  
            }
                       
        })
        .catch((error) => {
        }) 

        window.scrollTo(0, 0);
        jQuery.validator.setDefaults({
          debug: true,
          success: "valid"
        });
        $("#BasicInfo").validate({
          rules: {
         
            from: {
              required: true
            },
            fromTime: {
              required: true
            },
            toTime: {
              required: true
            },
            to: {
              required: true
            },
            pickupDate: {
              required: true
            },
            returnDate: {
              required: true
            },
            purposeOfTravel:{
              required: true
            }
           
            // contactNumber: {
            //   required: true,
            // },
            // email: {
            //   required: true,
            //   regxEmail :/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$|^$)/,
            // },
          },
          errorPlacement: function (error, element) {
            if (element.attr("name") === "from") {
              error.insertAfter("#from");
            }
            if (element.attr("name") === "to") {
              error.insertAfter("#to");
             }
            if (element.attr("name") === "pickupDate") {
              error.insertAfter("#pickupDate");
            }
            if (element.attr("name") === "returnDate") {
              error.insertAfter("#returnDate");
            }
            if (element.attr("name") === "purposeOfTravel") {
              error.insertAfter("#purposeOfTravel");
            }
          }
        });
        this.getVehicle();
        this.getPackageType();
        this.getVehicleData();
        this.getBtnValue();
        this.getCarData();

    }
    nextDate(event){
      event.preventDefault();
      var selectedDate1 = $("input#returnDate").val();
      var selectedDate = selectedDate1.replace(/-/g, '\/');

      var newDate1 = new Date(selectedDate);
      var newDate2 = new Date(newDate1.getTime() + (24*60*60*1000) );
      var newDate3 = new Date(newDate2);
      var dd = newDate3.getDate();
      var mm = newDate3.getMonth()+1; //January is 0!
      var yyyy = newDate3.getFullYear();
      if(dd<10){
          dd='0'+dd;
      }
      if(mm<10){
          mm='0'+mm;
      }
      var newDate3 = yyyy+'-'+mm+'-'+dd;
      var array = {
          returnDate : newDate3,
          from    : this.state.from,
          pickupDate : this.state.pickupDate,
          pickupTime : this.state.fromTime,
          returnDate : this.state.returnDate,
          to         : this.state.to,
          returnTime : this.state.toTime,
          bookingType : this.state.bookingType,
          purposeOfTravel: this.state.purposeOfTravel,
          instructions  :this.state.instructions,
          selectedVehicle  :this.state.selectedVehicle,
          stopArr : this.state.stopArr
        }
      this.setState({
          returnDate : newDate3,
          tripArray  : array
      });
    }

    previousDate(event){
      event.preventDefault();
      var selectedDate1 = $("input#returnDate").val();
      var selectedDate = selectedDate1.replace(/-/g, '\/');
      var newDate1 = new Date(selectedDate);
      var newDate2 = new Date(newDate1.getTime() - (24*60*60*1000) );
      // Session.set('newDate', newDate2);
      var newDate3 = new Date(newDate2);
      var dd = newDate3.getDate();
      var mm = newDate3.getMonth()+1; //January is 0!
      var yyyy = newDate3.getFullYear();
      if(dd<10){
          dd='0'+dd;
      }
      if(mm<10){
          mm='0'+mm;
      }
      var newDate3 = yyyy+'-'+mm+'-'+dd;
      var array = {
          returnDate : newDate3,
          from    : this.state.from,
          pickupDate : this.state.pickupDate,
          pickupTime : this.state.fromTime,
          returnDate : this.state.returnDate,
          to         : this.state.to,
          returnTime : this.state.toTime,
          bookingType : this.state.bookingType,
          purposeOfTravel: this.state.purposeOfTravel,
          instructions  :this.state.instructions,
          selectedVehicle  :this.state.selectedVehicle,
          stopArr : this.state.stopArr
        }
      this.setState({
        returnDate : newDate3,
        tripArray  : array
      });
    }

    handleChange(event){
        event.preventDefault();
        const target = event.target;
        const name = target.name;

        this.setState({
          [name]: event.target.value
        });
        var array = {
          returnDate : this.state.returnDate,
          from    : this.state.from,
          pickupDate : this.state.pickupDate,
          pickupTime : this.state.fromTime,
          returnDate : this.state.returnDate,
          to         : this.state.to,
          returnTime : this.state.toTime,
          bookingType : this.state.bookingType,
          purposeOfTravel: this.state.purposeOfTravel,
          instructions  :this.state.instructions,
          selectedVehicle  :this.state.selectedVehicle,
          stopArr : this.state.stopArr
        }

        this.setState({
          tripArray : array
        })
    }
    handleChangePlaces = address => {
      var array = {
          returnDate : this.state.returnDate,
          from    : address,
          pickupDate : this.state.pickupDate,
          pickupTime : this.state.fromTime,
          returnDate : this.state.returnDate,
          to         : this.state.to,
          returnTime : this.state.toTime,
          bookingType : this.state.bookingType,
          purposeOfTravel: this.state.purposeOfTravel,
          instructions  :this.state.instructions,
          selectedVehicle  :this.state.selectedVehicle,
          stopArr : this.state.stopArr
        }
    this.setState({ from : address, tripArray : array });
  };

  handleChangeToPlaces = to => {
    var array = {
          returnDate : this.state.returnDate,
          from    : this.state.from,
          pickupDate : this.state.pickupDate,
          pickupTime : this.state.fromTime,
          returnDate : this.state.returnDate,
          to         : to,
          returnTime : this.state.toTime,
          bookingType : this.state.bookingType,
          purposeOfTravel: this.state.purposeOfTravel,
          instructions  :this.state.instructions,
          selectedVehicle  :this.state.selectedVehicle,
          stopArr : this.state.stopArr
        }
    this.setState({ to : to , tripArray : array });
  };

  handleChangeStopPlaces = stops => {
    var array = {
          returnDate : this.state.returnDate,
          from    : this.state.from,
          pickupDate : this.state.pickupDate,
          pickupTime : this.state.fromTime,
          returnDate : this.state.returnDate,
          stops         : stops,
          returnTime : this.state.toTime,
          bookingType : this.state.bookingType,
          purposeOfTravel: this.state.purposeOfTravel,
          instructions  :this.state.instructions,
          selectedVehicle  :this.state.selectedVehicle,
          stopArr : this.state.stopArr
        }
    this.setState({ stops : stops , tripArray : array });
  };
 
  handleSelect = address => {

    geocodeByAddress(address)
     .then((results) =>{ 

      for (var i = 0; i < results[0].address_components.length; i++) {
          for (var b = 0; b < results[0].address_components[i].types.length; b++) {
              switch (results[0].address_components[i].types[b]) {
                  case 'sublocality_level_2':
                      var area = results[0].address_components[i].long_name;
                      break;
                  case 'locality':
                      var city = results[0].address_components[i].long_name;
                      break;
                  case 'administrative_area_level_1':
                      var state = results[0].address_components[i].long_name;
                      break;
                  case 'country':
                     var country = results[0].address_components[i].long_name;
                      break;
                  case 'postal_code':
                     var pincode = results[0].address_components[i].long_name;
                      break;
              }
          }
      }

      this.setState({
        fromArea : area,
        fromCity : city,
        fromState: state,
        fromCountry:country,
        fromPincode: pincode
      })
        // for (var i=0; i<results[0].address_components.length; i++){
        //   if (results[0].address_components[i].types[0] === "sublocality_level_2" || results[0].address_components[i].types[2] === "sublocality_level_2" || results[0].address_components[i].types[3] === "sublocality_level_2" || results[0].address_components[i].types[3] === "sublocality_level_1") {
        //     var area = results[0].address_components[i];
        //   }else{
        //     var area =""
        //   }
        //   if (results[0].address_components[i].types[0] === "locality" || results[0].address_components[i].types[1] === "locality" || results[0].address_components[i].types[2] === "locality") {
        //     var city = results[0].address_components[i];
        //   }else{
        //     var city=""
        //   }
        //   if (results[0].address_components[i].types[0] === "administrative_area_level_1" || results[0].address_components[i].types[1] === "administrative_area_level_1" || results[0].address_components[i].types[2] === "administrative_area_level_1") {
        //     var state = results[0].address_components[i];
        //   }else{
        //     var state=""
        //   }
        //   if (results[0].address_components[i].types[0] === "country" || results[0].address_components[i].types[1] === "country" || results[0].address_components[i].types[2] === "country") {
        //     var country = results[0].address_components[i];
        //   }else{
        //     var country=""
        //   }
        //   if (results[0].address_components[i].types[0] === "postal_code") {
        //     var pincode = results[0].address_components[i];
        //   }else{
        //     var pincode=""
        //   }
        // }

        //     //city data
        //     alert(pincode.long_name + " || " + city.long_name + " || " + state.long_name + " || " + country.long_name + "||"+ area.long_name)

        })
     
      .catch(error => console.error('Error', error));

      geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.setState({'fromLatLng': latLng}))
      .catch(error => console.error('Error', error));
      var array = {
          returnDate : this.state.returnDate,
          from    : address,
          pickupDate : this.state.pickupDate,
          pickupTime : this.state.fromTime,
          returnDate : this.state.returnDate,
          to         : this.state.to,
          returnTime : this.state.toTime,
          bookingType : this.state.bookingType,
          purposeOfTravel: this.state.purposeOfTravel,
          instructions  :this.state.instructions,
          selectedVehicle  :this.state.selectedVehicle,
          stopArr : this.state.stopArr
        }
      this.setState({ from : address , tripArray : array });
  };

  handleSelectToAddr = to => {
    geocodeByAddress(to)
      .then((results) =>{ 

      for (var i = 0; i < results[0].address_components.length; i++) {
          for (var b = 0; b < results[0].address_components[i].types.length; b++) {
              switch (results[0].address_components[i].types[b]) {
                  case 'sublocality_level_2':
                      var area = results[0].address_components[i].long_name;
                      break;
                  case 'locality':
                      var city = results[0].address_components[i].long_name;
                      break;
                  case 'administrative_area_level_1':
                      var state = results[0].address_components[i].long_name;
                      break;
                  case 'country':
                     var country = results[0].address_components[i].long_name;
                      break;
                  case 'postal_code':
                     var pincode = results[0].address_components[i].long_name;
                      break;
              }
          }
      }

      this.setState({
        toArea : area,
        toCity : city,
        toState: state,
        toCountry:country,
        toPincode: pincode
      })
       
        })
      .catch(error => console.error('Error', error));

      geocodeByAddress(to)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.setState({'toLatLng': latLng}))
      .catch(error => console.error('Error', error));
      var array = {
          returnDate : this.state.returnDate,
          from    : this.state.from,
          pickupDate : this.state.pickupDate,
          pickupTime : this.state.fromTime,
          returnDate : this.state.returnDate,
          to         : to,
          returnTime : this.state.toTime,
          bookingType : this.state.bookingType,
          purposeOfTravel: this.state.purposeOfTravel,
          instructions  :this.state.instructions,
          selectedVehicle  :this.state.selectedVehicle,
          stopArr : this.state.stopArr
        }
      this.setState({ to : to , tripArray : array });
  };

  handleSelectStopAddr = stops => {
      geocodeByAddress(stops)
      .then((results) =>{ 

      for (var i = 0; i < results[0].address_components.length; i++) {
          for (var b = 0; b < results[0].address_components[i].types.length; b++) {
              switch (results[0].address_components[i].types[b]) {
                  case 'sublocality_level_2':
                      var area = results[0].address_components[i].long_name;
                      break;
                  case 'locality':
                      var city = results[0].address_components[i].long_name;
                      break;
                  case 'administrative_area_level_1':
                      var state = results[0].address_components[i].long_name;
                      break;
                  case 'country':
                     var country = results[0].address_components[i].long_name;
                      break;
                  case 'postal_code':
                     var pincode = results[0].address_components[i].long_name;
                      break;
              }
          }
      }

      this.setState({
        stopArea : area,
        stopCity : city,
        stopState: state,
        stopCountry:country,
        stopPincode: pincode,
        stops : stops
      })
       
        })
      .catch(error => console.error('Error', error));

      geocodeByAddress(stops)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.setState({'stopLatLng': latLng}))
      .catch(error => console.error('Error', error));
      
  };

    componentWillReceiveProps(nextProps) {
        
    }
    _handleFocus(text) {
        console.log('Focused with text: ' + text);
    }
 
    _handleFocusOut(text) {
        console.log('Left editor with text: ' + text);
        
    }

    getCarData(val,event){
      var data = val;
      var array = {
          returnDate : this.state.returnDate,
          from    : this.state.from,
          pickupDate : this.state.pickupDate,
          pickupTime : this.state.fromTime,
          returnDate : this.state.returnDate,
          to         : this.state.to,
          returnTime : this.state.toTime,
          bookingType : this.state.bookingType,
          purposeOfTravel: this.state.purposeOfTravel,
          instructions  :this.state.instructions,
          selectedVehicle  :data,
          stopArr : this.state.stopArr
      }

      this.setState({
        selectedVehicle : data,
        tripArray : array
      })

    }
    
    getData(event){
    event.preventDefault();
      if ($('#BasicInfo').valid()) {
        
        var formValues={
            packageTypeId           : "packageTypeId",
            packageId               : "packageId",
            tripType                : this.state.toggleButtonValue,
            from                    : {
                                        address        : this.state.from,
                                        area           : this.state.fromArea,
                                        city           : this.state.fromCity,
                                        state          : this.state.fromState,
                                        country        : this.state.fromCountry,
                                        pincode        : this.state.fromPincode, 
                                        latitude       : this.state.fromLatLng.lat,
                                        longitude      : this.state.fromLatLng.lng,
                                      },
            to                      : {
                                        address        : this.state.to,
                                        area           : this.state.toArea,
                                        city           : this.state.toCity,
                                        state          : this.state.toState,
                                        country        : this.state.toCountry,
                                        pincode        : this.state.toPincode,
                                        latitude       : this.state.toLatLng.lat,
                                        longitude      : this.state.toLatLng.lng,
                                      },
            pickupDate              : this.state.pickupDate,
            pickupTime              : moment(this.state.fromTime).format('LT'),
            returnDate              : this.state.returnDate,
            returnTime              : moment(this.state.toTime).format('LT'),
            intermediateStops       : this.state.stopArr,
            employeeId              : "",
            corporateId             : this.state.userID,
            managerId               : "",
            status                  : [],
            createdBy               : localStorage.getItem("user_ID"),
            purposeOfTravel         : this.state.purposeOfTravel,
            specialInstruction      :this.state.instructions,
            selectedVehicle         :this.state.selectedVehicle,
            vehicleCategoryId       : this.state.vehicleCategoryId
        }


          console.log('formValues: ',formValues)
          axios.post('/api/bookingmaster/post' , formValues)
          .then((response)=>{
            console.log('loc', response.data);
             this.setState({
                returnDate : "",
                from    : this.state.from,
                pickupDate : this.state.pickupDate,
                pickupTime : "",
                returnDate : this.state.returnDate,
                to         : "",
                returnTime : "",
                bookingType : "",
                purposeOfTravel: "",
                instructions  :"",
                selectedVehicle  :"",
                stopArr : [],
                fromArea                : "",
                fromCity                : "",
                fromState               : "",
                fromCountry             : "",
                fromPincode             : "",
                fromLatLng              : [],
                toLatLng                : [],
                stopLatLng              : [],
                toArea                  : "",
                toCity                  : "",
                toState                 : "",
                toCountry               : "",
                toPincode               : "",
                stopArea                  : "",
                stopCity                  : "",
                stopState                 : "",
                stopCountry               : "",
                stopPincode               : ""
              })
          })
          .catch((error)=>{console.log('error: ',error)})
      }

    }
    addStop(event)
    {
        event.preventDefault();
        if(this.state.stops !== "")
        {
            if(this.state.stops !== undefined)
            {
                // stopArr.push(this.state.stops);
                stopArr.push({
                  address        : this.state.stops,
                  area           : this.state.stopArea,
                  city           : this.state.stopCity,
                  state          : this.state.stopState,
                  country        : this.state.stopCountry,
                  pincode        : this.state.stopPincode, 
                  latitude       : this.state.stopLatLng.lat,
                  longitude      : this.state.stopLatLng.lng,
                });
            }

            var array = {
              returnDate : this.state.returnDate,
              from    : this.state.from,
              pickupDate : this.state.pickupDate,
              pickupTime : this.state.fromTime,
              returnDate : this.state.returnDate,
              to         : this.state.to,
              returnTime : this.state.toTime,
              bookingType : this.state.bookingType,
              purposeOfTravel: this.state.purposeOfTravel,
              instructions  :this.state.instructions,
              selectedVehicle  :this.state.selectedVehicle,
              stopArr : stopArr
            }
            this.setState({
                stopArr : stopArr,
                stops   : "",
                display : true,
                stopArea   : "",
                stopCity   : "",
                stopState  : "",
                stopCountry: "",
                stopPincode: "",
                stopLatLng : [],
                tripArray:array
            })
        }
      
    }

    getSelectedOption(val,event) {
        var array = {
                  returnDate : this.state.returnDate,
                  from    : this.state.from,
                  pickupDate : this.state.pickupDate,
                  pickupTime : this.state.fromTime,
                  returnDate : this.state.returnDate,
                  to         : this.state.to,
                  returnTime : this.state.toTime,
                  bookingType : this.state.bookingType,
                  purposeOfTravel: this.state.purposeOfTravel,
                  instructions  :this.state.instructions,
                  selectedVehicle  :this.state.selectedVehicle,
                  stopArr : this.state.stopArr
                }
        this.setState({
          radioButtonValue : val,
          tripArray :array
        })
        axios.get("/api/personmaster/get/ID/"+this.props.match.params.userID)
        .then((response) => {
            var UserData = response.data.data[0].address[0];
            var addr = UserData.addressLine1+', '+UserData.area+', '+UserData.city+', '+UserData.district
             geocodeByAddress(addr)
            .then(results => getLatLng(results[0]))
            .then(latLng => this.setState({'fromLatLng': latLng}))
            .catch(error => console.error('Error', error));
            if(val === 'Home'){
                var array = {
                  returnDate : this.state.returnDate,
                  from    : addr,
                  pickupDate : this.state.pickupDate,
                  pickupTime : this.state.fromTime,
                  returnDate : this.state.returnDate,
                  to         : this.state.to,
                  returnTime : this.state.toTime,
                  bookingType : this.state.bookingType,
                  purposeOfTravel: this.state.purposeOfTravel,
                  instructions  :this.state.instructions,
                  selectedVehicle  :this.state.selectedVehicle,
                  stopArr : this.state.stopArr
                }
                this.setState({
                    from : addr,
                    fromArea    : UserData.area,
                    fromCity    : UserData.city,
                    fromState   : UserData.state,
                    fromCountry : UserData.country,
                    fromPincode : UserData.pincode,
                    tripArray : array
                })   
            }else if(val === 'Office'){
                var array = {
                  returnDate : this.state.returnDate,
                  from    : response.data.data[0].workLocation,
                  pickupDate : this.state.pickupDate,
                  pickupTime : this.state.fromTime,
                  returnDate : this.state.returnDate,
                  to         : this.state.to,
                  returnTime : this.state.toTime,
                  bookingType : this.state.bookingType,
                  purposeOfTravel: this.state.purposeOfTravel,
                  instructions  :this.state.instructions,
                  selectedVehicle  :this.state.selectedVehicle,
                  stopArr : this.state.stopArr
                }
                this.setState({
                    from : response.data.data[0].workLocation,
                    tripArray : array
                })  
            }else{
                var array = {
                  returnDate : this.state.returnDate,
                  from    : "",
                  pickupDate : this.state.pickupDate,
                  pickupTime : this.state.fromTime,
                  returnDate : this.state.returnDate,
                  to         : this.state.to,
                  returnTime : this.state.toTime,
                  bookingType : this.state.bookingType,
                  purposeOfTravel: this.state.purposeOfTravel,
                  instructions  :this.state.instructions,
                  selectedVehicle  :this.state.selectedVehicle,
                  stopArr : this.state.stopArr
                }
                this.setState({
                    from : "",
                    tripArray : array
                })  
            }
                       
        })
        .catch((error) => {
        })
    }

    getBtnValue(val,event){
        var array = {
          returnDate : this.state.returnDate,
          from    : this.state.from,
          pickupDate : this.state.pickupDate,
          pickupTime : this.state.fromTime,
          returnDate : this.state.returnDate,
          to         : this.state.to,
          returnTime : this.state.toTime,
          bookingType : val,
          purposeOfTravel: this.state.purposeOfTravel,
          instructions  :this.state.instructions,
          selectedVehicle  :this.state.selectedVehicle,
          stopArr : this.state.stopArr
        }
        this.setState({
            bookingType : val,
            tripArray : array
        })
    }

    getVehicle()
    {
    axios.get("/api/vehiclemaster/get/list")
        .then((response) => {
            this.setState({
                vehicleDetails : response.data
            })
            var vehicleDetails = _.uniq(this.state.vehicleDetails);
        })
        .catch((error) => {
        })
    }
    getSelectedTrip(val,event) {

        this.setState({
          toggleButtonValue : val
        })
    }
    fromTime(value) {
        var array = {
          returnDate : this.state.returnDate,
          from    : this.state.from,
          pickupDate : this.state.pickupDate,
          pickupTime : value,
          returnDate : this.state.returnDate,
          to         : this.state.to,
          returnTime : this.state.toTime,
          bookingType : this.state.bookingType,
          purposeOfTravel: this.state.purposeOfTravel,
          instructions  :this.state.instructions,
          selectedVehicle  :this.state.selectedVehicle,
          stopArr : this.state.stopArr
        }
        this.setState({
          fromTime: value,
          tripArray:array
        })
    }
    toTime(value) {
      var array = {
          returnDate : this.state.returnDate,
          from    : this.state.from,
          pickupDate : this.state.pickupDate,
          pickupTime : this.state.fromTime,
          returnDate : this.state.returnDate,
          to         : this.state.to,
          returnTime : value,
          bookingType : this.state.bookingType,
          purposeOfTravel: this.state.purposeOfTravel,
          instructions  :this.state.instructions,
          selectedVehicle  :this.state.selectedVehicle,
          stopArr : this.state.stopArr
        }
        this.setState({
          toTime: value,
          tripArray:array
        })
    }
    deleteStop(event)
    {
        var stopArr = this.state.stopArr;
        const indexToDelete = event.target.getAttribute("idIndex");

        var index = parseInt(indexToDelete)

        if (index > -1) {
            stopArr.splice(index, 1);
        }

        // let newArray = stopArr.filter( (item, index) => {
        //   console.log(index,parseInt(indexToDelete))
        //      if(index !== parseInt(indexToDelete)){
        //       console.log('item: ',item)
        //           return item;
        //      }
        // });


        var array = {
          returnDate : this.state.returnDate,
          from    : this.state.from,
          pickupDate : this.state.pickupDate,
          pickupTime : this.state.fromTime,
          returnDate : this.state.returnDate,
          to         : this.state.to,
          returnTime : this.state.toTime,
          bookingType : this.state.bookingType,
          purposeOfTravel: this.state.purposeOfTravel,
          instructions  :this.state.instructions,
          selectedVehicle  :this.state.selectedVehicle,
          stopArr : stopArr
        }
        this.setState({
            stopArr: stopArr,
            tripArray:array
        })
    }
    getPackageType(){
      axios.get("/api/packagetypemaster/get/list")
        .then((response) => {
            this.setState({
                packageTypeVal : response.data
            })            
        })
        .catch((error) => {
        })  
    }

    getVehicleData(){
        axios.get("/api/categorymaster/get/list")
        .then((response) => {
            this.setState({
                vehicleData : response.data
            })            
        })
        .catch((error) => {
        }) 
    }

    render() {
        return (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 bookingMasterContainer">
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pickupType nopadding">
                        <ul className="nav nav-tabs customNavBM col-lg-12 nopadding">
                        {this.state.packageTypeVal && 
                            this.state.packageTypeVal.length > 0 ?
                              this.state.packageTypeVal.map((data, index) => {
                                return (
                                  <li key={index} className="active col-lg-4 nopadding"><button className="btn btn-primary col-lg-12 btnTabColor btnValue" id={data.packageType} value={this.state.bookingType} onClick={this.getBtnValue.bind(this,data.packageType)}>
                                  <i className=
                                        {data.packageType && (data.packageType).trim().toLowerCase() === 'outstation'?"fa fa-car"
                                            :(data.packageType).trim().toLowerCase() === 'local'?"fa fa-map-marker"
                                            :"fa fa-plane"} aria-hidden="true"></i>&nbsp;{data.packageType}</button></li>
                                )
                              })
                              :
                              
                            null
                          }
                         
                        </ul>

                        <div className="tab-content customTabContent col-lg-12">
                          <div id="home" className="tab-pane fade in active">
                            <form className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding" id="BasicInfo">
                                <label className="labelform">Picking From<span className="asterix">*</span></label>
                                <div className="btn-group btn-group-toggle col-lg-12 nopadding" data-toggle="buttons">
                                    <div className="col-lg-3 nopadding">
                                        <input type="radio" name="Home" id="Home"  value="Home" autoComplete="off" 
                                        onClick={this.getSelectedOption.bind(this,"Home")}
                                         checked={this.state.radioButtonValue === "Home" ? true : false }/> &nbsp;Home
                                    </div>
                                    <div className="col-lg-3 nopadding">
                                        <input type="radio" name="Office" id="Office"  value="Office" autoComplete="off" 
                                        onClick={this.getSelectedOption.bind(this,"Office")}
                                         checked={this.state.radioButtonValue === "Office" ? true : false } />&nbsp;Office
                                    </div>
                                    <div className="col-lg-3 nopadding">
                                        <input type="radio" name="Others" id="Others"  value="Others" autoComplete="off" 
                                        onClick={this.getSelectedOption.bind(this,"Others")}
                                         checked={this.state.radioButtonValue === "Others" ? true : false } />&nbsp;Others
                                    </div>
                                </div>
                                <div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
                                    {this.state.radioButtonValue === "Others" ? 
                                      <PlacesAutocomplete
                                        value={this.state.from}
                                        onChange={this.handleChangePlaces}
                                        onSelect={this.handleSelect}
                                      >
                                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                          <div>
                                            <input
                                              {...getInputProps({
                                                placeholder: 'Search Places ...',
                                                className: 'location-search-input col-lg-12 form-control',
                                              })}
                                            />
                                            <div className="autocomplete-dropdown-container">
                                              {loading && <div>Loading...</div>}
                                              {suggestions.map(suggestion => {
                                                const className = suggestion.active
                                                  ? 'suggestion-item--active'
                                                  : 'suggestion-item';
                                                // inline style for demonstration purpose
                                                const style = suggestion.active
                                                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                                return (
                                                  <div
                                                    {...getSuggestionItemProps(suggestion, {
                                                      className,
                                                      style,
                                                    })}
                                                  >
                                                    <span>{suggestion.description}</span>
                                                  </div>
                                                );
                                              })}
                                            </div>
                                          </div>
                                        )}
                                      </PlacesAutocomplete>
                                    :
                                    <div className="" >
                                        
                                        <div className="input-group inputBox-main nameParts" id="from">
                                            <div className="input-group-addon inputIcon"><i className="fa fa-map-marker "></i></div>
                                            <input type="text" value={this.state.from} placeholder="Pickup Location" name="from" ref="from" className="form-control"  onChange={this.handleChange.bind(this)}/>
                                        </div>
                                    </div>
                                    }
                                </div> 
                                <div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
                                    <div className="" >
                                        <label className="labelform">To<span className="asterix">*</span></label>
                                        <div className="input-group inputBox-main nameParts" id="to">
                                            <div className="input-group-addon inputIcon"><i className="fa fa-map-marker "></i></div>
                                            {/*<input type="text" value={this.state.to} placeholder="Where To" name="to" ref="to" className="form-control" onChange={this.handleChange.bind(this)}/>*/}
                                            <PlacesAutocomplete
                                            value={this.state.to}
                                            onChange={this.handleChangeToPlaces}
                                            onSelect={this.handleSelectToAddr}
                                          >
                                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                              <div>
                                                <input
                                                  {...getInputProps({
                                                    placeholder: 'Search Drop Location ...',
                                                    id:"to",
                                                    className: 'location-search-input col-lg-12 form-control',
                                                  })}
                                                />
                                                <div className="autocomplete-dropdown-container">
                                                  {loading && <div>Loading...</div>}
                                                  {suggestions.map(suggestion => {
                                                    const className = suggestion.active
                                                      ? 'suggestion-item--active'
                                                      : 'suggestion-item';
                                                    // inline style for demonstration purpose
                                                    const style = suggestion.active
                                                      ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                                      : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                                    return (
                                                      <div
                                                        {...getSuggestionItemProps(suggestion, {
                                                          className,
                                                          style,
                                                        })}
                                                      >
                                                        <span>{suggestion.description}</span>
                                                      </div>
                                                    );
                                                  })}
                                                </div>
                                              </div>
                                            )}
                                          </PlacesAutocomplete>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
                                    <div className="col-lg-6 noLeftPadding" >
                                        <label className="labelform">Pickup Date<span className="asterix">*</span></label>
                                        <div className="input-group inputBox-main nameParts" id="pickupDate">
                                            <div className="input-group-addon inputIcon"><i className="fa fa-calendar "></i></div>
                                            <input type="date" value={this.state.pickupDate} min={moment(new Date).format("YYYY-MM-DD")} placeholder="Where To" name="pickupDate" id="pickupDate" ref="pickupDate" className="form-control" onChange={this.handleChange.bind(this)}/>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 nopadding" >
                                        <label className="labelform">Pickup At<span className="asterix">*</span></label>
                                        <div className="input-group inputBox-main nameParts" id="fromTime">
                                            <div className="input-group-addon inputIcon"><i className="fa fa-clock-o"></i></div>
                                                <TimePicker
                                                showSecond={false}
                                                className="col-lg-12 nopadding"
                                                value={this.state.fromTime}
                                                format={format}
                                                name="fromTime"
                                                id="fromTime"
                                                placeholder="Time"
                                                onChange={this.fromTime.bind(this)}
                                                use12Hours
                                                inputReadOnly
                                                />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
                                    <div className="col-lg-6 noLeftPadding" >
                                        <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12">Return Date<span className="asterix">*</span></label>
                                        
                                            <div className="input-group-addon HRMSAddon col-lg-2 col-md-2 col-sm-2 col-xs-2" id="previousDate" onClick={this.previousDate.bind(this)}>
                                              <span className="fa fa-caret-left nextarrow"></span>
                                            </div>          
                                            <input type="date" min={moment(new Date).format("YYYY-MM-DD")} className="todaysdate HRMSAddon col-lg-8 col-md-8 col-sm-8 col-xs-8" name="returnDate" id="returnDate" value={this.state.returnDate}/>

                                            <div className="input-group-addon HRMSAddon nextAddon col-lg-2 col-md-2 col-sm-2 col-xs-2" id="nextDate" onClick={this.nextDate.bind(this)}>
                                              <span className="fa fa-caret-right nextarrow"></span>
                                            </div>
                                        {/*<div className="input-group inputBox-main nameParts" id="returnDate">
                                            <div className="input-group-addon inputIcon"><i className="fa fa-calendar "></i></div>
                                            <input type="date" value={this.state.returnDate} min={moment(new Date).format("YYYY-MM-DD")} placeholder="Where To" name="returnDate" ref="returnDate" className="form-control" onChange={this.handleChange.bind(this)}/>
                                        </div>*/}
                                    </div>
                                    <div className="col-lg-6 nopadding" >
                                        <label className="labelform">Return Time<span className="asterix">*</span></label>
                                        <div className="input-group inputBox-main nameParts" id="toTime">
                                            <div className="input-group-addon inputIcon"><i className="fa fa-clock-o"></i></div>
                                                <TimePicker
                                                showSecond={false}
                                                className="col-lg-12 nopadding"
                                                value={this.state.toTime}
                                                format={format}
                                                placeholder="Time"
                                                name="toTime"
                                                id="toTime"
                                                onChange={this.toTime.bind(this)}
                                                use12Hours
                                                inputReadOnly
                                                />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
                                    <div className="col-lg-12 nopadding" >
                                        <label className="labelform col-lg-11">Add Stops</label>
                                        <div className=" col-lg-12 input-group inputBox-main nameParts" id="stops">
                                            <div className="input-group-addon inputIcon"><i className="fa fa-map-marker "></i></div>
                                            <PlacesAutocomplete
                                            value={this.state.stops}
                                            onChange={this.handleChangeStopPlaces}
                                            onSelect={this.handleSelectStopAddr}
                                          >
                                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                              <div>
                                                <input
                                                  {...getInputProps({
                                                    placeholder: 'Search Stop Location ...',
                                                    id:"stops",
                                                    className: 'location-search-input col-lg-12 form-control',
                                                  })}
                                                />
                                                <div className="autocomplete-dropdown-container">
                                                  {loading && <div>Loading...</div>}
                                                  {suggestions.map(suggestion => {
                                                    const className = suggestion.active
                                                      ? 'suggestion-item--active'
                                                      : 'suggestion-item';
                                                    // inline style for demonstration purpose
                                                    const style = suggestion.active
                                                      ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                                      : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                                    return (
                                                      <div
                                                        {...getSuggestionItemProps(suggestion, {
                                                          className,
                                                          style,
                                                        })}
                                                      >
                                                        <span>{suggestion.description}</span>
                                                      </div>
                                                    );
                                                  })}
                                                </div>
                                              </div>
                                            )}
                                          </PlacesAutocomplete>
                                            {/*<input type="text" value={this.state.stops} placeholder="Enter Stop" name="stops" ref="stops" id="stops" className="form-control" onChange={this.handleChange.bind(this)} />*/}
                                            <div className="input-group-addon inputIcon plusIconBooking" onClick={this.addStop.bind(this)}><i className="fa fa-plus "></i></div>
                                        </div>
                                    </div>
                                </div>
                               {
                                this.state.stopArr && this.state.stopArr!="" ?
                                    this.state.stopArr.length > 0 ?
                                      this.state.stopArr.map((data, index) => {
                                        return (
                                          <div className=" col-lg-12 row customInputInline " key={index}>
                                            <div className=" col-lg-10 borderBottomBM nopadding">
                                              {/*  <input type="text" value={data} placeholder="" name={"stop"+index} ref="stops" className="customInputField" onChange={this.handleChange.bind(this)} />*/}
                                             <EditableLabel text={data.address}
                                                labelClassName='myLabelClass'
                                                inputClassName='myInputClass'
                                                inputWidth='195px'
                                                inputHeight='22px'
                                                inputMaxLength='50'
                                                labelFontWeight='bold'
                                                inputFontWeight='bold'
                                                onFocus={this._handleFocus}
                                                onFocusOut={this._handleFocusOut}
                                            />
                                            </div>
                                            <i className="fa fa-times crossButton" aria-hidden="true" idIndex={index} onClick={this.deleteStop.bind(this)}></i>
                                          </div>
                                        )
                                      })
                                      :
                                      <div >

                                      </div>
                                    :
                                    null
                                  }
                                  <div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
                                    <div id="purposeOfTravel" >
                                        <label className="labelform col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding-left">Purpose of Travel<span className="asterix">*</span></label>
                                        <input type="text" value={this.state.purposeOfTravel} placeholder="Purpose of Travel" name="purposeOfTravel" ref="purposeOfTravel" id="purposeOfTravel" className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12" onChange={this.handleChange.bind(this)} required/>
                                    </div>
                                  </div>
                                  <div className="form-margin nopadding col-lg-12 col-md-12 col-sm-12 col-xs-12  ">
                                        <textarea rows="4" className="customTextArea col-lg-12 col-md-12 col-sm-12 col-xs-12" name="instructions" ref="instructions" onChange={this.handleChange.bind(this)} placeholder="Special Instructions here"></textarea> 
                                    </div>
                                  <div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
                                    {this.state.vehicleData && this.state.vehicleData.length > 0? 
                                        this.state.vehicleData.map((data,ind)=>{
                                            return(
                                                <button className="col-lg-3 innerCarContainer" key={ind} onClick={this.getCarData.bind(this,data.category)} id={data.category}>
                                                    <span className="premiumHead">{data.category}</span>
                                                    <img src="/images/desire.jpg"/>
                                                </button>  
                                            )
                                        })
                                        : null
                                    }
                                    
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 hideBtn nopadding mt40">
                                  <button className="col-lg-4 col-md-2 col-sm-12 col-xs-12 btn bookButton pull-right" id="btnCheck" onClick={this.getData.bind(this)} >
                                    Submit
                                  </button>
                                </div>
                            </form>
                          </div>

                        </div>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pickupType nopadding" >
                   <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
                   <EmployeeDetails personID={this.state.userID} />                   
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding" >
                    <TripDetails personID={this.state.userID} tripData={this.state.tripArray} />                    
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding" >
                    <CarDetails personID={this.state.userID} tripData={this.state.tripArray}/>                    
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 btnMargin">
                    <button className="col-lg-4 col-md-2 col-sm-12 col-xs-12 btn bookButton pull-right" id="btnCheck" onClick={this.getData.bind(this)} >
                      Confirm
                    </button>
                  </div>
                </div>
            </div>
        );
    }
}
export default BookingMaster;

