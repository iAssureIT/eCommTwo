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

import "./BookingMaster.css";
import 'bootstrap/js/tab.js';
const format = "h:mm a";
var stopArr  = [];

class BookingConfirmation extends Component {
	constructor(props) {
        super(props);
        this.state = {
            option          :"",
            bookingForSelf 	: true,
            empNumber       :"",
            userID     	    : "",
            empName         : ""
        };
    }
	handleChange(event){
        event.preventDefault();
        const target = event.target;
        const name = target.name;

        this.setState({
          [name]: event.target.value
        });
    }

    empNumHandleChange(event){
    	event.preventDefault();
    	const target = event.target;
        const name = target.name;

        this.setState({
          [name]: event.target.value
        });

        axios.get("/api/personmaster/get/UserID/"+event.target.value)
        .then((response) => {
            this.setState({
                userID : response.data.data[0]._id,
                empName: response.data.data[0].firstName+' '+response.data.data[0].lastName,
            })            
        })
        .catch((error) => {
        }) 
    }

    bookingApproval(val,event) {
		this.setState({
			bookingForSelf : val
		})


	}
    getData(){
    	if(this.state.bookingForSelf === false){
			var userID = this.state.userID;
		}else{
			var userID = localStorage.getItem("user_ID");
			
		}
		this.props.history.push('/booking/'+userID);
    }
	render(){
		return(
			 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOPadding">
                        <section className="content">
                            <div className="pageContent col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            	<div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-right">
                                    <h4 className="weighttitle col-lg-11 col-md-11 col-xs-11 col-sm-11 NOpadding-right">Booking For </h4>
                                </div>
                                <section className="Content">
                                	<div className="btn-group btn-group-toggle col-lg-12 nopadding" data-toggle="buttons">
                                		
	                                    <form className="RadioForm effect1">
	                                    	<div className="radioDiv">
			                                    <div className="btn-group btn-group-toggle" data-toggle="buttons">
												<label className={this.state.bookingForSelf === true ? "btn toggleButton customToggleButtonPermission btn-secondary active":"btn toggleButton customToggleButtonPermission btn-secondary"} value={true} onClick={this.bookingApproval.bind(this,true)}>
												<input type="radio"
													name="bookingForSelf" 
													id="Self"
													value={true}
													autoComplete="off"
													checked
													/>Self
												</label>
												<label className={this.state.bookingForSelf === false ? "btn toggleButton customToggleButtonPermission btn-secondary active":"btn toggleButton customToggleButtonPermission btn-secondary"} value={false} onClick={this.bookingApproval.bind(this,false)} >
												<input type="radio" name="bookingForSelf" id="Other"  value={false} autoComplete="off" /> Other
												</label>
											</div>
											{this.state.bookingForSelf === false ?
						                           <div className="empNoform col-lg-12">
						                           <div className="col-lg-6">
						                                <input id="empNumber" value={this.state.empNumber}  data-text="empNumber" onChange={this.empNumHandleChange.bind(this)} type="text" name="empNumber" ref="empNumber" className="form-control" placeholder="Enter Employee Number" />
						                           </div>
						                            <div className="col-lg-6">
						                                <label id="empName" data-text="empName" type="text" name="empName" ref="empName" className="form-control">{this.state.empName}</label>
						                           </div>
						                           </div>
												:
												null
											}
			                                    <div className="col-lg-12 formBtn">
				                                    <button className="col-lg-3 col-md-3 col-sm-12 col-xs-12 btn btn-primary pull-right" onClick={this.getData.bind(this)} >
				                                    Next
				                               	    </button>
				                               	</div>
		                                    </div>
		                                    
	                                    </form>
	                                </div>
                                </section>
                            </div>
                        </section>
                    </div>
                </div>
              </div>
			)
	}
}
export default BookingConfirmation;