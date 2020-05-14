import React, { Component }     from 'react';
import $                        from 'jquery';
import jQuery                   from 'jquery';
import axios                    from 'axios';
import swal                     from 'sweetalert';
import TimePicker               from 'rc-time-picker';
import moment                   from 'moment';

import _                        from 'underscore';
import 'bootstrap/js/tab.js';
const format = "h:mm a";

class BookingForm extends Component {
   constructor(props) {
        super(props);
        this.state = {
            showDiv                 : false,
            toggleButtonValue       :"Round Trip",
            fromTime                :"",
            toTime                  :"",
            valueOfTab              :"",
        };
    }
    componentDidMount() {
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
            to: {
              required: true
            },
            pickupDate: {
              required: true
            },
            returnDate: {
              required: true
            },
           
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
            // if (element.attr("name") === "email") {
            //   error.insertAfter("#email");
            // }
          }
        });

    }
    handleChange(event)
    {
        event.preventDefault();
        const target = event.target;
        const name = target.name;

        this.setState({
          [name]: event.target.value
        });
    }
    componentWillReceiveProps(nextProps) {
        
    }
    submitData(event)
    {
        event.preventDefault();
      if ($('#BasicInfo').valid()) {
        this.setState({
            showDiv : true,
        })

        var formValues={

                tripType                : this.state.toggleButtonValue,
                from                    : this.state.from,
                to                      : this.state.to,
                pickupDate              : this.state.pickupDate,
                pickupTime              : this.state.fromTime,
                returnDate              : this.state.returnDate,
                returnTime              : this.state.toTime,
        }
        console.log("formValues",formValues);
      }

    }
    getSelectedTrip(val,event) {

        this.setState({
          toggleButtonValue : val
        })
    }
    fromTime(value) {
        this.setState({
          fromTime: value
        })
    }
    toTime(value) {
        this.setState({
          toTime: value
        })
    }
    render() {
        return (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
                  <form className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding" id="BasicInfo">
                        <div class="btn-group btn-group-toggle" data-toggle="buttons">
                         <label class="btn toggleButton customToggleButton btn-secondary active" value="Round Trip" onClick={this.getSelectedTrip.bind(this,"Round Trip")}>
                            <input type="radio"
                             name="options" 
                             id="RoundTrip"
                             value="Round Trip"
                             autocomplete="off"
                             checked
                             /> Round Trip
                          </label>
                          <label class= "btn toggleButton customToggleButton btn-secondary" value="One Way" onClick={this.getSelectedTrip.bind(this,"One Way")} >
                            <input type="radio" name="options" id="OneWay"  value="One Way" autocomplete="off" /> One Way
                          </label>
                        </div>
                        <div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
                            <div className="" >
                                <label className="labelform">From<span className="asterix">*</span></label>
                                <div className="input-group inputBox-main nameParts" id="from">
                                    <div className="input-group-addon inputIcon"><i className="fa fa-map-marker "></i></div>
                                    <input type="text" value={this.state.from} placeholder="Pickup Location" name="from" ref="from" className="form-control"  onChange={this.handleChange.bind(this)}/>
                                </div>
                            </div>
                        </div> 
                        <div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
                            <div className="" >
                                <label className="labelform">To<span className="asterix">*</span></label>
                                <div className="input-group inputBox-main nameParts" id="to">
                                    <div className="input-group-addon inputIcon"><i className="fa fa-map-marker "></i></div>
                                    <input type="text" value={this.state.to} placeholder="Where To" name="to" ref="to" className="form-control" onChange={this.handleChange.bind(this)}/>
                                </div>
                            </div>
                        </div>
                        <div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
                            <div className="col-lg-6 noLeftPadding" >
                                <label className="labelform">Pickup Date<span className="asterix">*</span></label>
                                <div className="input-group inputBox-main nameParts" id="pickupDate">
                                    <div className="input-group-addon inputIcon"><i className="fa fa-calendar "></i></div>
                                    <input type="date" value={this.state.pickupDate} min={moment(new Date).format("YYYY-MM-DD")} placeholder="Where To" name="pickupDate" ref="Category" className="form-control" onChange={this.handleChange.bind(this)}/>
                                </div>
                            </div>
                            <div className="col-lg-6 nopadding" >
                                <label className="labelform">Pickup At<span className="asterix">*</span></label>
                                <div className="input-group inputBox-main nameParts" id="fromTime">
                                    <div className="input-group-addon inputIcon"><i class="fa fa-clock-o"></i></div>
                                        <TimePicker
                                        showSecond={false}
                                        className="col-lg-12 nopadding"
                                        value={this.state.fromTime}
                                        format={format}
                                        name="fromTime"
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
                                <label className="labelform">Return Date<span className="asterix">*</span></label>
                                <div className="input-group inputBox-main nameParts" id="returnDate">
                                    <div className="input-group-addon inputIcon"><i className="fa fa-calendar "></i></div>
                                    <input type="date" value={this.state.returnDate} min={moment(new Date).format("YYYY-MM-DD")} placeholder="Where To" name="returnDate" ref="returnDate" className="form-control" onChange={this.handleChange.bind(this)}/>
                                </div>
                            </div>
                            <div className="col-lg-6 nopadding" >
                                <label className="labelform">Return Time<span className="asterix">*</span></label>
                                <div className="input-group inputBox-main nameParts" id="toTime">
                                    <div className="input-group-addon inputIcon"><i class="fa fa-clock-o"></i></div>
                                        <TimePicker
                                        showSecond={false}
                                        className="col-lg-12 nopadding"
                                        value={this.state.toTime}
                                        format={format}
                                        placeholder="Time"
                                        onChange={this.toTime.bind(this)}
                                        use12Hours
                                        inputReadOnly
                                        />
                                </div>
                            </div>
                        </div>
                        {/*<div className="form-margin col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
                            <div className="col-lg-6 noLeftPadding" >
                                <div className="input-group inputBox-main nameParts" id="Category">
                                    <div className="input-group-addon inputIcon"><i className="fa fa-map-marker "></i></div>
                                    <input type="text" value="" placeholder="Enter Stop" name="Category" ref="Category" className="form-control" />
                                </div>
                            </div>
                            <div className="col-lg-6 nopadding" >
                                  <div className="col-lg-8 col-md-2 col-sm-12 col-xs-12 nopadding addStopDiv" onClick={this.addStop.bind()}>
                                    <i  className="fa fa-plus-circle"></i>&nbsp;&nbsp; Add Stop
                                  </div>
                              
                            </div>
                        
                        </div>*/}
                       
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12  mt40">
                          <button className="col-lg-4 col-md-2 col-sm-12 col-xs-12 btn button3 pull-right" id="btnCheck" onClick={this.submitData.bind(this)} >
                            Submit
                          </button>
                        </div>

                    </form>
                 <div className={this.state.showDiv ? "col-lg-6 col-md-6 col-sm-6 col-xs-6 showDivOnClick": "col-lg-6 col-md-6 col-sm-6 col-xs-6 hideUntilClick"} >
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 pickupType nopadding">
                        <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 customLabelCar nopadding"> Select Car</label>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 premiumCar carContainer nopadding">
                            <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 headCar textAlignCenter"> Premium</label>
                            <h6 className="col-lg-12 col-md-12 col-sm-12 col-xs-12 textAlignCenter">Seat Capacity : 4+1</h6>
                            <img src="/images/premiumCar.png"/>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <button className="col-lg-10 col-lg-offset-1 col-md-2 col-sm-12 col-xs-12 btn button3" id="btnCheck" onClick={this.submitData.bind(this)} >
                                Book Now
                              </button>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 miniCar carContainer nopadding">
                            <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 headCar textAlignCenter"> Mini</label>
                            <h6 className="col-lg-12 col-md-12 col-sm-12 col-xs-12 textAlignCenter">Seat Capacity : 4+1</h6>
                            <img src="/images/premiumCar.png"/>
                             <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <button className="col-lg-10 col-lg-offset-1 col-md-2 col-sm-12 col-xs-12 btn button3" id="btnCheck" onClick={this.submitData.bind(this)} >
                                Book Now
                              </button>
                            </div>

                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 premiumCar carContainer nopadding">
                            <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 headCar textAlignCenter"> SUV</label>
                            <h6 className="col-lg-12 col-md-12 col-sm-12 col-xs-12 textAlignCenter">Seat Capacity : 7+1</h6>
                            <img src="/images/premiumCar.png"/>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <button className="col-lg-10 col-lg-offset-1 col-md-2 col-sm-12 col-xs-12 btn button3" id="btnCheck" onClick={this.submitData.bind(this)} >
                                Book Now
                              </button>
                            </div>

                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 miniCar carContainer nopadding">
                            <label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 headCar textAlignCenter"> Sedan</label>
                            <h6 className="col-lg-12 col-md-12 col-sm-12 col-xs-12 textAlignCenter">Seat Capacity : 4+1</h6>
                            <img src="/images/premiumCar.png"/>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <button className="col-lg-10 col-lg-offset-1 col-md-2 col-sm-12 col-xs-12 btn button3" id="btnCheck" onClick={this.submitData.bind(this)} >
                                Book Now
                              </button>
                            </div>

                        </div>
                    </div>
                </div>
        </div>
        );
    }
}
export default BookingForm;

