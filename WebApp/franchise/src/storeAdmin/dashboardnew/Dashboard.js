import React,{Component} from 'react';
import { render } from 'react-dom';
import moment     from 'moment';
import axios                  from 'axios';

import Statistics     from './StatisticsBox/Statistics.js'
import PieChart       from './Charts/PieChart.js'
import BarChart       from './Charts/BarChart.js'
import GoogleMapChart from './Charts/GoogleMapChart.js'
import HorizontalBar  from './Charts/HorizontalBarChart.js'
import Report         from './Reports/Report.js'
import ProgressBlock  from './ProgressBlock/ProgressBlock.js'

export default class Dashboard extends Component{
	constructor(props) {
	   super(props);
	    this.state = {
	      monthStart    : "",
	      monthEnd      : "",
	      yearStart     : "",
        yearEnd       : "",
        fromToDateObj : {}, 
        yearObj       : {},
        orderFilterData : {},
        franchiseID    : '',
        franchiseName  : ''
	    }
	}
	   
	componentDidMount(){
    var userDetails = (localStorage.getItem('userDetails'));
    var userData = JSON.parse(userDetails);
    axios.get("/api/entitymaster/get/companyName/"+userData.companyID)
      .then((resdata)=>{
      var orderFilterData= {};
      orderFilterData.franchiseID = resdata.data._id;
      this.setState({
        franchiseID     : resdata.data._id,
        orderFilterData : orderFilterData,
        franchiseName   : resdata.data.companyName
      })
     })
    var yyyy = moment().format("YYYY");
    var monthNum = moment().format("MM");
    var currentMonth = yyyy+"-"+monthNum;

    var monthDateStart = new Date(moment(currentMonth).month("YYYY-MM"));//Find out first day of month with currentMonth
    var monthDateEnd = new Date(moment(currentMonth).add(1,"M"));
    this.setState({
      monthStart:monthDateStart,
      monthEnd:monthDateEnd,
      fromToDateObj : {'startDate':monthDateStart,'endDate':monthDateEnd}
    });

    var currentYear = moment().format('YYYY');
    var yearDateStart = new Date("1/1/" + currentYear);
    var yearDateEnd = new Date (yearDateStart.getFullYear(), 11, 31);
    var startDate = new Date(yearDateStart);
    var endDate = new Date(yearDateEnd);
    var startDateString = moment(startDate).format('YYYY-MM-DD'); // 2016-07-15
    var endDateString = moment(endDate).format('YYYY-MM-DD'); // 2016-07-15

    this.setState({
      yearStart : startDateString,
      yearEnd: endDateString,
      yearObj : {'startDate':yearDateStart,'endDate':yearDateEnd}
    },()=>{
    })
    
  }


  render(){
    //console.log("franchiseID",this.state.franchiseID);
    return(
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOPadding">
           <section className="content">
           	<div className="row">
	           	<Statistics 
                display={true}
	           		bgColor="bg-aqua"
	           		faIcon="fa-user"
                firstField={{"Field":"Total Users","method":"get","path":"/api/billingmaster/get/count/contactPersons/"+this.state.franchiseID}}
                secondField={{"Field":"Total Customers","method":"get","path":"/api/billingmaster/get/customersCount/"+this.state.franchiseID}} 
				      />
            
	           	<Statistics 
                display={true}
	           		bgColor="bg-red"
                faIcon="fa-book"
                firstField={{"Field":"Total Categories","method":"get","path":"/api/category/get/count"}}
	           		secondField={{"Field":"Total Products","method":"get","path":"/api/sections/get/count"}}
	           	/>
	           	<Statistics
                display={true}
	           		bgColor="bg-green"
                faIcon="fa fa-building"
                firstField={{"Field":"Total Orders","method":"get","path":"/api/orders/get/ytdorders/"+this.state.franchiseID}}
                secondField={{"Field":"Total Bills","method":"get","path":"/api/orders/get/billCounts/"+this.state.franchiseID}} 
	           	/>
	           	<Statistics 
                display={true}
	           		bgColor="bg-yellow"
	           		faIcon="fa-file"
	           		firstField={{"Field":"Total PO","method":"get","path":"/api/franchisepo/get/count/"+this.state.franchiseID}}
	           		secondField={{"Field":"Total Stock","method":"get","path":"/api/franchisegoods/get/totalFranchiseStock/"+this.state.franchiseID,"showUnit":true}} 
	            />
           	</div>
           
           	<div className="row">
           		{/* <PieChart
                display={true}
           			boxColor="box-success"
           			title="Car Category-wise Booking"
                api={{"method":"get","path":"/api/bookingmaster/get/categorywiseBookingForVendor/"+this.state.yearStart+"/"+this.state.yearEnd+"/"+localStorage.getItem("company_Id")}} />
           		<PieChart
                display={true}
           			boxColor="box-default"
           			title="Corporate-wise Booking" 
                api={{"method":"get","path":"/api/bookingmaster/get/corporatewiseBookingForvendor/"+this.state.yearStart+"/"+this.state.yearEnd+"/"+localStorage.getItem("company_Id")}} /> */}
           	</div>
            <div className="row">
              <Report
                display={true}
                tableHeading={["OrderId","Item","Status"]}
                boxColor="box-primary"
                title="Latest Orders"
                api={{"method":"post","path":"/api/orders/get/get_orders","PostData":this.state.orderFilterData}}
                redirectlink="/allorders" />
              <div className="row">
                <ProgressBlock 
                  display={true}
                  bgColor="bg-yellow"
                  faIcon="fa-shopping-bag"
                  Field={{"FieldName":"New Orders","method":"get","path":"/api/orders/get/neworderscount"}}
                  compairField={{"method":"get","path":"/api/orders/get/count"}}
                />
                <ProgressBlock 
                  display={true}
                  bgColor="bg-green"
                  faIcon="fa-undo"
                  Field={{"FieldName":"Return Products","method":"get","path":"/api/returnedProducts/get/PendingCount"}}
                  compairField={{"method":"get","path":"/api/returnedProducts/get/count"}}
                />
                <ProgressBlock 
                  display={true}
                  bgColor="bg-red"
                  faIcon="fas fa-ban"
                  Field={{"FieldName":"Out of Stock","method":"get","path":"/api/products/get/outofstockproducts"}}
                  compairField={{"method":"get","path":"/api/products/get/count"}}
                />
                <ProgressBlock 
                  display={true}
                  bgColor="bg-aqua"
                  faIcon="fa-envelope"
                  Field={{"FieldName":"Reviews","method":"get","path":"/api/customerReview/get/UnpublishedCount"}}
                  compairField={{"method":"get","path":"/api/customerReview/get/count"}}
                />
              </div>
            </div>
           	<div className="row">
           	  <BarChart
                display={true}
           			boxColor="box-warning"
           			title="Month-wise Sale"
                 api={{"method":"post","path":"/api/orders/get/getMonthwiseOrders/" ,"PostData":{"startDate":this.state.yearStart,"endDate":this.state.yearEnd,"franchiseID":this.state.franchiseID}}}/>
              <PieChart
                display={true}
           			boxColor="box-success"
           			title="Category-wise Sale"
                api={{"method":"get","path":"/api/orders/get/franchiseCategoryRevenue/"+this.state.franchiseID}} />
           	</div>
             <div className="row">
           		<GoogleMapChart
                display={true}
           			boxColor="box-danger"
                title={this.state.franchiseName+" Location"}
                key="AIzaSyD1hOxDqrgk8V82oEYXU6W2p_U0-kvvu38"
                api={{"method":"get","path":"/api/entityMaster/get/one/franchise/"+this.state.franchiseID}} />
              <HorizontalBar
                display={true}
           			boxColor="box-success"
           			title="Franchisewise Number of orders"
                api={{"method":"get","path":"/api/orders/get/franchisewisecount"}} />
           	</div>
           </section>
        </div>
   );
  }
}




