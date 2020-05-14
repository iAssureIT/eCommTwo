import React, { Component }     from 'react';
import $                        from 'jquery';
import jQuery                   from 'jquery';
import axios                    from 'axios';
import swal                     from 'sweetalert';
import moment                   from 'moment';
import _                        from 'underscore';
import IAssureTable           from "./IAssureTable.js";


import "./BookingMaster.css";
import 'bootstrap/js/tab.js';

class AllBookings extends Component {
     
    constructor(props) {
        super(props);
        this.state = {
          tabtype       : "Daily",
          todayDate     : '--',
          newDateOne    : '',
          weekdays      : '--',
          monthlyState  : '--',
          fromdate      : '',
          todate        : '',
          currentYear  : moment().format('YYYY'),
          tableHeading:{
            BookingID:"Booking Number",
            Company:"Company",
            EmpIDName:"Employee Name & ID",
            Status:"Status",
            Date:"Travel Date",
            Destination:"Destination",
            EstCost:"Estimated Cost",
            action:"Action"

          },
          RecordsCount:'',
          RecordsTable:[],
          RecordsTableforWeek:[],
          RecordsTableforMonth:[],
          RecordsTableforYear:[],
          RecordsTableforCustom:[],
          tableObjects : {
          paginationApply : false,
          searchApply     : false
      }
        };
        this.handleChange = this.handleChange.bind(this);
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

        this.setState({
          todayDate : today,
        },()=>{this.getDailyData()});

        var weeknumber = moment(today).week();
        if(weeknumber<=9){
          weeknumber="0"+weeknumber;
        }
        var yyyy = moment(today).format("YYYY");
        var weekVal = yyyy+"-W"+weeknumber;
        this.setState({
          weekdays:weekVal,
        },()=>{this.getWeeklyData()});

        var yyyy = moment(today).format("YYYY");
        var monthNum = moment(today).format("MM");
        var currentMonth = yyyy+"-"+monthNum;
        this.setState({
          monthlyState:currentMonth,
        },()=>{this.getMonthlyData()});

        var fromDt = new Date();
        var toDt = new Date(moment(fromDt).add(1,'d'));

        this.setState({
          fromdate : fromDt,
          toDate: toDt
        },()=>{this.getCustomData()})

        var currentYear = moment().format('YYYY');

        this.setState({
          currentYear : currentYear
        },()=>{this.getYearlyData()})

        var yearDateStart = new Date("1/1/" + currentYear);
        var yearDateEnd = new Date (yearDateStart.getFullYear(), 11, 31);
      
    }

    changeTab = (data)=>{
      this.setState({
        tabtype : data,
      })
    }
   handleChange(event) {
        const target = event.target;
        const name = target.name;

        this.setState({
            [name]: event.target.value
        });   
    }

    nextWeek(event){
      event.preventDefault();
      var selectedWeek = $("input#weekpicker").val();
      var newWeekDt = moment(selectedWeek).add(1, 'weeks').format("YYYY-MM-DD");
      var newWeekNumber = moment(newWeekDt).week();
      //Construct the WeekNumber string as '2017-W01'
      if(newWeekNumber <= 9){
        newWeekNumber = '0'+newWeekNumber;
      }
      var yearNum=moment(newWeekDt).format("YYYY");
      var newWeek = yearNum+"-W"+newWeekNumber;
      this.setState({
        weekdays:newWeek,
      },()=>{this.getWeeklyData()});
    }

    previousWeek(event){
      event.preventDefault();
      var selectedWeek = $("input#weekpicker").val();
      var newWeekDt = moment(selectedWeek).subtract(1, 'weeks').format("YYYY-MM-DD");
      var newWeekNumber = moment(newWeekDt).week();
      //Construct the WeekNumber string as '2017-W01'
      if(newWeekNumber <= 9){
        newWeekNumber = '0'+newWeekNumber;
      }else if(newWeekNumber === 53){
        newWeekNumber = 52;
      }
      var yearNum=moment(newWeekDt).format("YYYY");
      var newWeek = yearNum+"-W"+newWeekNumber;
      this.setState({
          weekdays:newWeek,
      },()=>{this.getWeeklyData()});
    }

    nextDate(event){
      event.preventDefault();
      var selectedDate1 = $("input#todayDate").val();
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

      this.setState({
          todayDate : newDate3,
      },()=>{this.getDailyData()});
    }

    previousDate(event){
      event.preventDefault();
      var selectedDate1 = $("input#todayDate").val();
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
      this.setState({
        todayDate : newDate3,
      },()=>{this.getDailyData()});
    }

    nextMonth(event){
      event.preventDefault();
      var selectedMonth = $("input#monthlyValue").val();
      var newMonthDt = moment(selectedMonth).add(1, 'months').format("YYYY-MM-DD");
      var newMonthNumber = moment(newMonthDt).format("MM");
      //Construct the WeekNumber string as 'YYYY-MM'
      var yearNum=moment(newMonthDt).format("YYYY");
      var newMonth = yearNum+"-"+newMonthNumber;
      this.setState({
          monthlyState:newMonth,
      },()=>{this.getMonthlyData()});
    }

    previousMonth(event){
      event.preventDefault();
      var selectedMonth = $("input#monthlyValue").val();

      var newMonthDt = moment(selectedMonth).subtract(1, 'months').format("YYYY-MM-DD");
      var newMonthNumber = moment(newMonthDt).format("MM");
      //Construct the WeekNumber string as 'YYYY-MM'
      var yearNum=moment(newMonthDt).format("YYYY");
      var newMonth = yearNum+"-"+newMonthNumber;
      this.setState({
          monthlyState:newMonth,
      },()=>{this.getMonthlyData()});
    }

    fromdates(event){
      var selectedDate1 = $("input#fromdate").val();
      
      var dd = new Date(selectedDate1).getDate();
      var mm = new Date(selectedDate1).getMonth()+1; //January is 0!
      var yyyy = new Date(selectedDate1).getFullYear();
      if(dd<10){
          dd='0'+dd;
      }
      if(mm<10){
          mm='0'+mm;
      }
      var Fromdate = yyyy+'-'+mm+'-'+dd;
      this.setState({
          fromdate:Fromdate,
      },()=>{this.getCustomData()});
    }
    todates(event){
      var selectedDate2 = $("input#todate").val();
      var dd       = new Date(selectedDate2).getDate();
      var mm       = new Date(selectedDate2).getMonth()+1; //January is 0!
      var yyyy     = new Date(selectedDate2).getFullYear();
      if(dd<10){
          dd='0'+dd;
      }
      if(mm<10){
          mm='0'+mm;
      }
      var Todate = yyyy+'-'+mm+'-'+dd;
     var dateCompare =  moment(Todate).isAfter(this.state.fromdate);
     if(dateCompare === true){
      this.setState({
          todate:Todate,
      },()=>{this.getCustomData()});
     }else{
      swal('From date should not be less than To date')
      this.setState({
        todate:this.state.fromdate
      },()=>{this.getCustomData()})
     }
      
    }

  nextYear(event){
    event.preventDefault();
    var currentYear = this.state.currentYear;
    var newYear = moment(currentYear).add(1,'years').format('YYYY');
    this.setState({currentYear: newYear},()=>{this.getYearlyData()})

  }
  
  previousYear(event){
    event.preventDefault();
    var currentYear = this.state.currentYear;
    var newYear = moment(currentYear).subtract(1,'years').format('YYYY');
    this.setState({currentYear: newYear},()=>{this.getYearlyData()})

  }

  getDailyData(){
    var todayDateSelected = this.state.todayDate;

    var start = moment(todayDateSelected).startOf('day'); // set to 12:00 am today
    var end = moment(todayDateSelected).endOf('day'); // set to 23:59 pm today
    var values = {
      date : start,
      nextDate : end
    }
    
    axios.post('/api/entitymaster/get/getAllVendors')
    .then((res)=>{
      this.setState({'allVendors':res.data})
    })
    .catch((err)=>{console.log('error: ',err)})
    axios.post('/api/bookingmaster/get/dailyBookingList',values)
    .then((response) => {
      var tableData = response.data.map((a, i)=>{
      var statusVar = a.status
      const names = statusVar.map(el => el.value); 
      var result = names.includes("Allocated To Vendor")
      return{
            BookingID:a.bookingId,
            Company:"Company",
            EmpIDName:a.person[0] ? a.person[0].firstName+' '+a.person[0].lastName+' ('+a.person[0].employeeId+')':'-',
            Status:a.statusValue,
            Date:moment(a.pickupDate).format('DD/MM/YYYY'),
            Destination:a.to.address,
            EstCost:a.estimatedCost,
            status:result,
            id:a._id
      }
    })
        this.setState({RecordsTable:tableData})
    })
    .catch((error) =>{
        console.log("ERROR : ", error); 
    })
  }

  getWeeklyData(){
    var weekData = this.state.weekdays;
    var mondayInWeek = moment(weekData).day("Monday").week(weekData).format();
    var mondayInWeekDt = new Date(mondayInWeek);
    var sundayOfWeek = moment(mondayInWeek).add(7,"days").format();
    var sundayOfWeekDt = new Date(sundayOfWeek);
    var values = {
      sunday : sundayOfWeekDt,
      monday : mondayInWeekDt
    }
    axios.post('/api/entitymaster/get/getAllVendors')
    .then((res)=>{
      this.setState({'allVendorsW':res.data})
    })
    .catch((err)=>{console.log('error: ',err)})
    axios.post('/api/bookingmaster/get/weeklyBookingList',values)
    .then((response) => {
      var tableData = response.data.map((a, i)=>{
      var statusVar = a.status
      const names = statusVar.map(el => el.value); 
      var result = names.includes("Allocated To Vendor")
      return{
            BookingID:a.bookingId,
            Company:"Company",
            EmpIDName:a.person[0] ? a.person[0].firstName+' '+a.person[0].lastName+' ('+a.person[0].employeeId+')':'-',
            Status:a.statusValue,
            Date:moment(a.pickupDate).format('DD/MM/YYYY'),
            Destination:a.to.address,
            EstCost:a.estimatedCost,
            status:result,
            id:a._id
      }
    })
        this.setState({RecordsTableforWeek:tableData})
    })
    .catch((error) =>{
        console.log("ERROR : ", error); 
    })
  }

  getMonthlyData(){
    var selectedMonth = this.state.monthlyState;
    var monthDateStart = new Date(moment(selectedMonth).month("YYYY-MM"));//Find out first day of month with selectedMonth
    var monthDateEnd = new Date(moment(selectedMonth).add(1,"M"));
    var values ={
      start : monthDateStart,
      end   : monthDateEnd
    }
    axios.post('/api/entitymaster/get/getAllVendors')
    .then((res)=>{
      this.setState({'allVendorsM':res.data})
    })
    .catch((err)=>{console.log('error: ',err)})
    axios.post('/api/bookingmaster/get/monthlyBookingList',values)
    .then((response) => {
      var tableData = response.data.map((a, i)=>{
      var statusVar = a.status
      const names = statusVar.map(el => el.value); 
      var result = names.includes("Allocated To Vendor")
      return{
            BookingID:a.bookingId,
            Company:"Company",
            EmpIDName:a.person[0] ? a.person[0].firstName+' '+a.person[0].lastName+' ('+a.person[0].employeeId+')':'-',
            Status:a.statusValue,
            Date:moment(a.pickupDate).format('DD/MM/YYYY'),
            Destination:a.to.address,
            EstCost:a.estimatedCost,
            status:result,
            id:a._id
      }
    })
        this.setState({RecordsTableforMonth:tableData})
    })
    .catch((error) =>{
        console.log("ERROR : ", error); 
    })
  }

  getYearlyData(){
    var selectedYear = this.state.currentYear;
    var yearDateStart = new Date("1/1/" + selectedYear);
    var yearDateEnd = new Date (yearDateStart.getFullYear(), 11, 31);
    var values ={
      start : yearDateStart,
      end : yearDateEnd
    }
    axios.post('/api/entitymaster/get/getAllVendors')
    .then((res)=>{
      this.setState({'allVendorsY':res.data})
    })
    .catch((err)=>{console.log('error: ',err)})
    axios.post('/api/bookingmaster/get/yearlyBookingList',values)
    .then((response) => {
      var tableData = response.data.map((a, i)=>{
      var statusVar = a.status
      const names = statusVar.map(el => el.value); 
      var result = names.includes("Allocated To Vendor")
      return{
            BookingID:a.bookingId,
            Company:"Company",
            EmpIDName:a.person[0] ? a.person[0].firstName+' '+a.person[0].lastName+' ('+a.person[0].employeeId+')':'-',
            Status:a.statusValue,
            Date:moment(a.pickupDate).format('DD/MM/YYYY'),
            Destination:a.to.address,
            EstCost:a.estimatedCost,
            status:result,
            id:a._id
      }
    })
        this.setState({RecordsTableforYear:tableData})
    })
    .catch((error) =>{
        console.log("ERROR : ", error); 
    })
  }

  getCustomData(){
    var fromDate = this.state.fromdate;
    var todate    = this.state.todate;
    var values ={
      from : new Date(fromDate),
      to:new Date(todate)
    }
    axios.post('/api/entitymaster/get/getAllVendors')
    .then((res)=>{
      this.setState({'allVendorsC':res.data})
    })
    .catch((err)=>{console.log('error: ',err)})
    axios.post('/api/bookingmaster/get/customBookingList',values)
    .then((response) => {
      var tableData = response.data.map((a, i)=>{
      var statusVar = a.status
      const names = statusVar.map(el => el.value); 
      var result = names.includes("Allocated To Vendor")
      return{
            BookingID:a.bookingId,
            Company:"Company",
            EmpIDName:a.person[0] ? a.person[0].firstName+' '+a.person[0].lastName+' ('+a.person[0].employeeId+')':'-',
            Status:a.statusValue,
            Date:moment(a.pickupDate).format('DD/MM/YYYY'),
            Destination:a.to.address,
            EstCost:a.estimatedCost,
            status:result,
            id:a._id
      }
    })
        this.setState({RecordsTableforCustom:tableData})
    })
    .catch((error) =>{
        console.log("ERROR : ", error); 
    })
  }


    render() {
        return (
          <div>
          <div className="content-wrapper">
               <section className="content viewContent">
                    <div className="row">
                         <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                              <div className="bookingContentWrapper col-lg-12 col-md-12 col-xs-12 col-sm-12">
                                   <div className="">
                                        <div className="box-header with-border manageLocationTitle">
                                             <h4 className="">All Bookings</h4>
                                        </div>
                                         
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                             <div className="reportWrapper col-lg-12 nopadding">
                                                  <div className="nav-center col-lg-10 col-lg-offset-2 col-md-12 col-sm-12 col-xs-12">
                                                       <ul className="nav nav-pills nav_pills">
                                                            <li className="active col-lg-2 col-md-2 col-sm-12 col-xs-12">
                                                                <a href="#Daily" data-toggle="tab" className="TabName" onClick={()=>this.changeTab('Daily')} >
                                                                  Daily
                                                                </a>
                                                            </li>
                                                            <li className="col-lg-2 col-md-2 col-sm-12 col-xs-12">
                                                                <a href="#Weekly" data-toggle="tab" className="TabName" onClick={()=>this.changeTab('Weekly')}>
                                                                  Weekly
                                                                </a>
                                                            </li>
                                                            <li className="col-lg-2 col-md-2 col-sm-12 col-xs-12">
                                                                <a href="#Monthly" data-toggle="tab" className="TabName"  onClick={()=>this.changeTab('Monthly')} >
                                                                  Monthly
                                                                </a>
                                                            </li>
                                                            <li className="col-lg-2 col-md-2 col-sm-12 col-xs-12">
                                                                <a href="#Yearly" data-toggle="tab" className="TabName" onClick={()=>this.changeTab('Yearly')} >
                                                                  Yearly
                                                                </a>
                                                            </li>
                                                             <li className="col-lg-2 col-md-2 col-sm-12 col-xs-12">
                                                                <a href="#Custom" data-toggle="tab" className="TabName"  onClick={()=>this.changeTab('Custom')} >
                                                                  Custom
                                                                </a>
                                                            </li>
                                          
                                                       </ul>
                                                  </div>
                                                    <div className="tab-content col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <div className="tab-pane active" id="Daily">
                                                          <div className="marginStyle col-lg-12 nopadding">
                                                            <div className="col-lg-6 col-lg-offset-4 col-md-6 col-sm-12 col-xs-12 searchBoxBugt margintopReport">
                                                              <div className="input-group-addon col-lg-2 col-md-2 col-sm-2 col-xs-2" id="previousDate" onClick={this.previousDate.bind(this)}>
                                                                <span className="fa fa-caret-left nextarrow"></span>
                                                              </div>          
                                                              <input type="date" className="todaysdate col-lg-8 col-md-8 col-sm-8 col-xs-8" name="todayDate" id="todayDate" value={this.state.todayDate}/>

                                                              <div className="input-group-addon nextAddon col-lg-2 col-md-2 col-sm-2 col-xs-2" id="nextDate" onClick={this.nextDate.bind(this)}>
                                                                <span className="fa fa-caret-right nextarrow"></span>
                                                              </div>
                                                            </div>
                                                          </div>
                                                          <IAssureTable 
                                                          tableHeading={this.state.tableHeading}
                                                          dataCount={this.state.RecordsCount}
                                                          tableData={this.state.RecordsTable}
                                                          tableObjects={this.state.tableObjects}
                                                          vendorData={this.state.allVendors}
                                                          />
                                                        </div>
                                                        <div className="tab-pane" id="Weekly">
                                                          <div className="marginStyle col-lg-12 nopadding">
                                                            <div className="col-lg-6 col-lg-offset-4 col-md-6 col-sm-12 col-xs-12 searchBoxBugt margintopReport">
                                                              <div className="input-group-addon HRMSAddon col-lg-2 col-md-2 col-sm-2 col-xs-2" id="previousDate" onClick={this.previousWeek.bind(this)}>
                                                                <span className="fa fa-caret-left nextarrow"></span>
                                                              </div>
                                                              
                                                              <input type="week" className="todaysdate col-lg-8 col-md-8 col-sm-8 col-xs-8"  name="weekdays" id="weekpicker" value={this.state.weekdays} />
                                                              
                                                              <div className="input-group-addon HRMSAddon nextAddon col-lg-2 col-md-2 col-sm-2 col-xs-2" id="nextDate" onClick={this.nextWeek.bind(this)}>
                                                                <span className="fa fa-caret-right nextarrow"></span>
                                                              </div>
                                                            </div>
                                                          </div>
                                                          <IAssureTable 
                                                          tableHeading={this.state.tableHeading}
                                                          dataCount={this.state.RecordsCount}
                                                          tableData={this.state.RecordsTableforWeek}
                                                          tableObjects={this.state.tableObjects}
                                                          vendorData={this.state.allVendorsW}
                                                          />
                                                        </div>
                                                        <div className="tab-pane" id="Monthly">
                                                          <div className="marginStyle col-lg-12 nopadding">
                                                          <div className="col-lg-6 col-lg-offset-4 col-md-6 col-sm-12 col-xs-12  searchBoxBugt  margintopReport">
                                                            <div className="input-group-addon HRMSAddon col-lg-2 col-md-2 col-sm-2 col-xs-2" id="previousDate" onClick={this.previousMonth.bind(this)}>
                                                              <span className="fa fa-caret-left nextarrow"></span>
                                                            </div>
                                                            
                                                            <input type="month" className="todaysdate col-lg-8 col-md-8 col-sm-8 col-xs-8" name="monthlyValue" id="monthlyValue" value={this.state.monthlyState} />
                                                            
                                                            <div className="input-group-addon HRMSAddon nextAddon col-lg-2 col-md-2 col-sm-2 col-xs-2" id="nextDate" onClick={this.nextMonth.bind(this)}>
                                                              <span className="fa fa-caret-right nextarrow"></span>
                                                            </div>
                                                          </div>
                                                          </div>
                                                          <IAssureTable 
                                                          tableHeading={this.state.tableHeading}
                                                          dataCount={this.state.RecordsCount}
                                                          tableData={this.state.RecordsTableforMonth}
                                                          tableObjects={this.state.tableObjects}
                                                          vendorData={this.state.allVendorsM}
                                                          />
                                                        </div>
                                                        <div className="tab-pane" id="Yearly">
                                                          <div className="marginStyle col-lg-12 nopadding">
                                                            <div className="form-group HRMSform-head-group col-lg-4 col-lg-offset-4">

                                                            <div className="input-group yearlySalesInput">
                                                              <div className="input-group-addon HRMSAddon" id="previousYear" onClick={this.previousYear.bind(this)}>
                                                                <span className="fa fa-caret-left nextarrow"></span>
                                                              </div>
                                                              <input type="text" className="form-control yearlyValue" name="currentYear" id="currentYear" value={this.state.currentYear}/>
                                                              <div className="input-group-addon HRMSAddon nextAddon" id="nextYear" onClick={this.nextYear.bind(this)}>
                                                                <span className="fa fa-caret-right nextarrow"></span>
                                                              </div>
                                                            </div>

                                                          </div>
                                                          </div>
                                                          <IAssureTable 
                                                          tableHeading={this.state.tableHeading}
                                                          dataCount={this.state.RecordsCount}
                                                          tableData={this.state.RecordsTableforYear}
                                                          tableObjects={this.state.tableObjects}
                                                          vendorData={this.state.allVendorsY}
                                                          />
                                                        </div>
                                                        
                                                        <div className="tab-pane" id="Custom">
                                                          <div className="marginStyle col-lg-12 nopadding">
                                                            <div className="col-lg-12 col-md-6 col-sm-12 col-xs-12  searchBoxBugt pull-right margintopReport">
                                                              <label className="col-lg-6 col-md-4 col-sm-12 col-xs-12">From
                                                                <input className="form-control" type="date" name="fromDate" id="fromdate" onChange={this.fromdates.bind(this)}/>
                                                              </label>
                                                              <label className="col-lg-6 col-md-4 col-sm-12 col-xs-12">To
                                                                <input className="form-control" type="date" name="toDate" id="todate" onChange={this.todates.bind(this)}/>
                                                              </label>
                                                            </div>

                                                          </div>
                                                          <IAssureTable 
                                                          tableHeading={this.state.tableHeading}
                                                          dataCount={this.state.RecordsCount}
                                                          tableData={this.state.RecordsTableforCustom}
                                                          tableObjects={this.state.tableObjects}
                                                          vendorData={this.state.allVendorsC}
                                                          />  
                                                        </div>
                                                
                                                      
                                                    </div>
                                                    
                                             </div>
                                        </div>
                                    
                                   </div>
                              </div>
                         </div>
                    </div>
               </section>
          </div>
      </div>

        );
    }
}
export default AllBookings;

