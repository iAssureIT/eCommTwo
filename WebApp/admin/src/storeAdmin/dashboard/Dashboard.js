import React,{Component} from 'react';
import { render } from 'react-dom';
import moment     from 'moment';

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
        yearObj       : {}
	    }
	}
	   
	componentDidMount(){

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
  
  // 	           		firstField={{"Field":"Total Franchise","method":"get","path":"/api/entitymaster/get/count/franchise"}} 


  render(){
    return(
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOPadding">
           <section className="content">
           	<div className="row">
	           	<Statistics 
                display={true}
                bgColor="bg-aqua"
                showUnit ={false}
	           		faIcon="fa-user"
                firstField={{"Field":"Total Users","method":"get","path":"/api/users/get/user/count"}}
                secondField={{"Field":"Online Users","method":"get","path":"/api/users/get/onlineUserCount/count"}} 
				      />
            
	           	<Statistics 
                display={true}
                bgColor="bg-red"
                showUnit ={false}
                faIcon="fa-book"
                firstField={{"Field":"Total Categories","method":"get","path":"/api/category/get/count"}}
	           		secondField={{"Field":"Total Products","method":"get","path":"/api/sections/get/count"}}
	           	/>
	           	<Statistics
                display={true}
                bgColor="bg-green"
                showUnit ={false} 
                faIcon="fa-building"
                firstField={{"Field":"Total Franchise","method":"get","path":"/api/entitymaster/get/count/franchise"}} 
                secondField={{"Field":"Total Orders","method":"get","path":"/api/franchisepo/get/count"}}
	           	/>
	           	<Statistics 
                display={true}
                bgColor="bg-yellow"
                showUnit ={true} 
	           		faIcon="fa-hourglass-half"
	           		firstField={{"Field":"Raw Material","method":"get","path":"/api/purchaseEntry/get/totalRawBalance"}}
	           		secondField={{"Field":"Finish Goods","method":"get","path":"/api/finishedGoodsEntry/get/totalFinishBalance"}} 
	            />
           	</div>
            <div className="row">
              <Report
                display={true}
                tableHeading={["OrderId","Item","Franchise","Total Cost","Status"]}
                boxColor="box-primary"
                title="Latest Orders"
                api={{"method":"get","path":"/api/orders/get/list"}}
                redirectlink="/allorders" />
              <ProgressBlock 
                  display={true}
                  bgColor="bg-yellow"
                  faIcon="fa-user"
                  Field={{"FieldName":"Top Franchise Sale","method":"get","path":"/api/orders/get/topFranchiseSale/"}}
                  compairField={{"method":"get","path":"/api/orders/get/totalSale/"}}
              />
            </div>
           	<div className="row">
           		<BarChart
                display={true}
           			boxColor="box-warning"
           			title="Monthwise Sale"
                api={{"method":"post","path":"/api/orders/get/getMonthwiseOrders/" ,"PostData":{"startDate":this.state.yearStart,"endDate":this.state.yearEnd}}}/>
              <PieChart
                display={true}
           			boxColor="box-success"
           			title="Categorywise Sale"
                api={{"method":"get","path":"/api/orders/get/categoryRevenue"}} />
              {/* <BarChart
                display={false}
                boxColor="box-success"
                title="Monthly Booking"
                api={{"method":"get","path":"/api/bookingmaster/get/getCompanyMonthlyBooking/"+this.state.monthStart+"/"+this.state.monthEnd+"/"+localStorage.getItem("company_Id")}} /> */}
           	</div>
             <div className="row">
           		<GoogleMapChart
                display={true}
           			boxColor="box-danger"
                title="Franchise Locations"
                key="AIzaSyD1hOxDqrgk8V82oEYXU6W2p_U0-kvvu38"
                api={{"method":"get","path":"/api/entitymaster/get/franchise"}} />
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




