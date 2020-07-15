import React,{Component} from 'react';
import { render } from 'react-dom';
import moment                   from 'moment';

import Statistics from './StatisticsBox/Statistics.js'
import PieChart from './Charts/PieChart.js'
import BarChart from './Charts/BarChart.js'
import Report from './Reports/Report.js'

export default class Dashboard extends Component{
	constructor(props) {
	   super(props);
	    this.state = {
	      monthStart:"",
	      monthEnd:"",
	      yearStart:"",
	      yearEnd:""
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
          monthEnd:monthDateEnd
        });

        
        var currentYear = moment().format('YYYY');
        var yearDateStart = new Date("1/1/" + currentYear);
        var yearDateEnd = new Date (yearDateStart.getFullYear(), 11, 31);

        this.setState({
          yearStart : yearDateStart,
          yearEnd: yearDateEnd
        })
	}

  render(){
    return(
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOPadding">
           <section className="content">
           	<div className="row">
	           	<Statistics 
	           		bgColor="bg-aqua"
	           		faIcon="fa-building"
	           		firstField={{"Field":"Total Corporate","method":"get","path":"/api/entitymaster/get/count/corporate"}} 
	           		secondField={{"Field":"Total Employees","method":"get","path":"/api/entitymaster/countContacts/corporate"}}
				      />
	           	<Statistics 
	           		bgColor="bg-red"
	           		faIcon="fa-handshake-o"
	           		firstField={{"Field":"Total Vendor","method":"get","path":"/api/entitymaster/get/count/vendor"}}
	           		secondField={{"Field":"Total Cars","method":"get","path":"/api/vehiclemaster/get/count"}}
	           	/>
	           	<Statistics
	           		bgColor="bg-green"
	           		faIcon="fa-car"
	           		firstField={{"Field":"YTD Booking","method":"get","path":"/api/bookingmaster/get/countDateRangeBookings/"+this.state.yearStart+"/"+this.state.yearEnd}}
	           		secondField={{"Field":"MTD Booking","method":"get","path":"/api/bookingmaster/get/countDateRangeBookings/"+this.state.monthStart+"/"+this.state.monthEnd}}
	           	/>
	           	<Statistics 
	           		bgColor="bg-yellow"
	           		faIcon="fa-file"
	           		firstField={{"Field":"Total Invoice"}}
	           		secondField={{"Field":"Unpaid Invoice"}}
	            />
           	</div>
           	<div className="row">
           		<PieChart
           			boxColor="box-success"
           			// title="Car Category-wise Booking"
                // api={{"method":"get","path":"/api/bookingmaster/get/categorywiseBooking/"+this.state.yearStart+"/"+this.state.yearEnd}} 
                />
           		<PieChart
           			boxColor="box-default"
           			// title="Corporate-wise Booking" 
                api={{"method":"get","path":"/api/bookingmaster/get/corporatewiseBooking/"+this.state.yearStart+"/"+this.state.yearEnd}} />
           	</div>
           	<div className="row">
           		<BarChart
           			boxColor="box-warning"
           			// title="Month-wise Booking"
                api={{"method":"get","path":"/api/bookingmaster/get/monthwiseBooking/"+this.state.monthStart+"/"+this.state.monthEnd}} />
           		<Report
           			boxColor="box-primary"
           			// title="Latest Allocate to Vendor"
                api={{"method":"get","path":"/api/bookingmaster/get/latestAllocatedToVendorBookings"}}
                redirectlink="/All_Bookings" />
           	</div>
           </section>
        </div>
   );
  }
}




