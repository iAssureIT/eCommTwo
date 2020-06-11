import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import React, { Component } from 'react';
import { render } from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { createContainer } from 'meteor/react-meteor-data';
import Validation from 'react-validation';
import validator from 'validator';
import {Tracker} from 'meteor/tracker';
import { browserHistory } from 'react-router';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { Orders } from "/imports/StoreManagement/orders/api/orderMaster.js";


// import { UserSubscriptions } from '/imports/website/contactUs/api/SubscriptionMaster.js';

export default class ReportsYearlyList extends TrackerReact(Component){
	constructor(props){
        super(props);
        this.state = {
            "subscribe": Meteor.subscribe("OrdersData"),
            
        }
        this.handleChange = this.handleChange.bind(this);
        
    }

    componentDidMount(){
        this.contactTracker = Tracker.autorun(()=>{
       
        });
        this.handleChange = this.handleChange.bind(this);
        
    }

    handleChange(event){
        event.preventDefault();
       const target = event.target;
       const name = target.name;

       this.setState({
           [name] : event.target.value,
       });
   }


    currentyear(){
		var yearSession = Session.get('selectedYear');
		if(yearSession){
			var currentYear = yearSession;
		}else{
			var today = new Date();
	        var currentYear = today.getFullYear();
			Session.set("selectedYear",currentYear);
		}

		return currentYear;
	}

	previousYear(event){
		event.preventDefault();
		var selectedYear = $(".inputyearlyValue").val();
		var newYear = moment(selectedYear).subtract(1,'years').format('YYYY');
		Session.set('selectedYear', newYear);
	}

	nextYear(event){
		event.preventDefault();
		var selectedYear = $(".inputyearlyValue").val();
		var newYear = moment(selectedYear).add(1,'years').format('YYYY');
		Session.set('selectedYear', newYear);

    }
    

    dataTableList(){
		var yearFromSess = Session.get("selectedYear");
        
        var thisYear = yearFromSess;
        var yearDateStart = new Date("1/1/" + thisYear);
        var yearDateEnd = new Date (yearDateStart.getFullYear(), 11, 31);

		var reportData =  Orders.find({'createdAt':{$gte : yearDateStart, $lt : yearDateEnd },'status' : 'Paid'}, {sort: {'createdAt': -1}}).fetch();
		var reportDataArr = [];
		if(reportData){
			for(var i=0;i<reportData.length;i++){
				reportDataArr.push(
					<tr key={reportData[i]._id}>
						<td>{moment(reportData[i].createdAt).format('LL')}</td>
						<td className="textAlignRight">{reportData[i].OrderId}</td>
						<td>{reportData[i].paymentMethod}</td>
						<td className="textAlignRight">{reportData[i].productLength}</td>
						<td className="textAlignRight">{reportData[i].totalQuantity}</td>
						<td className="textAlignRight">{(parseInt(reportData[i].totalAmount)).toFixed(2)}</td>
					</tr>
				);
			}
        }
        // console.log("reportDataArr: ",reportDataArr);
		return reportDataArr;
    }

   
    render(){
        return( 
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="sales-report-main-class">
                    <div className="reports-select-date-boxmain">
                        <div className="reports-select-date-boxsec">
                            <div className="reports-select-date-Title">Yearly Reports</div>
                            <div className="input-group">
                                <span onClick={this.previousYear.bind(this)} className="commonReportArrowPoiner input-group-addon" id="basic-addon1"><i className="fa fa-chevron-circle-left" aria-hidden="true"></i></span>
                                <input onChange={this.handleChange} value={this.currentyear()} name="inputyearlyValue" type="text" className="inputyearlyValue reportsDateRef form-control" placeholder="" aria-label="Brand" aria-describedby="basic-addon1" ref="inputyearlyValue"  />
                                <span onClick={this.nextYear.bind(this)} className="commonReportArrowPoiner input-group-addon" id="basic-addon1"><i className="fa fa-chevron-circle-right" aria-hidden="true"></i></span>
                            </div>
                        </div>
                    </div>

                    <div className="report-list-downloadMain">
                        {/* <div className="report-list-downloadPdf">
                            <i className="fa fa-file-pdf-o" aria-hidden="true"></i>PDF
                        </div>
                        <div className="report-list-downloadPrint">
                            <i className="fa fa-print" aria-hidden="true"></i>Print
                        </div> */}
                         <ReactHTMLTableToExcel
                            id="test-table-xls-button"
                            className="download-table-xls-button btn report-list-downloadXLXS"
                            table="subscriber-list-outerTable"
                            filename="tablexls"
                            sheet="tablexls"
                            buttonText="Download as XLS"/>
                    </div>
                </div>
            
                <div>
                    <div className="reports-table-main">
                        <table id="subscriber-list-outerTable"  className="table iAssureITtable-bordered table-striped table-hover">
                            <thead className="tempTableHeader">
                            <tr >
                                <th className=" umDynamicHeader srpadd">Date</th>
                                <th className=" umDynamicHeader srpadd">Order No.</th>
                                <th className=" umDynamicHeader srpadd">Transaction Type</th>
                                <th className=" umDynamicHeader srpadd">Product Count</th>
                                <th className=" umDynamicHeader srpadd">Quantity</th>
                                <th className=" umDynamicHeader srpadd">Amount</th>
                            </tr>
                            </thead>
                            <tbody>
                                
                                {this.dataTableList()} 

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
        );
    }
}