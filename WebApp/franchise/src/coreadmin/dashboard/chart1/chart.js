import React, { Component }                                  from 'react';
import moment               from 'moment';
import $                                                     from 'jquery';
import axios                                                 from 'axios';
import { render } from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import html2canvas from 'html2canvas';
import Chart from 'chart.js';
import BarChart from './BarChart.js';
import PieChart from './PieChart.js';
import CenterWisePieChart from './CenterWisePieChart.js';
import './Chart.css';
import IAssureTable           from "../../IAssureTable/IAssureTable.jsx";

export default class Charts extends Component{
  
  constructor(props) {
   super(props);
    this.state = {
      'year'                        : "FY 2019 - 2020",
      "years"                       :["FY 2019 - 2020","FY 2020 - 2021","FY 2021 - 2022"],      
      "achievementFamilyUpgradation": [],
      "achievementReach"            : [],
      "annualPlanFamilyUpgradation" : [],
      "annualPlanReach"             : [],
      "sector"                      : [],
      piechartcolor                 : [],
      "tableHeading"                : {
        name                                    : "Sector",
        annualPlan_Reach                        : "annPlan_Reach",
        annualPlan_FamilyUpgradation            : "anPlan_FamilyUpg",    
        achievement_Reach                       : "achie_Reach",
        achievement_FamilyUpgradation           : "achie_FamilyUpg",       
        annualPlan_TotalBudget                  : "annualPlan_TotalBudget"     
               
      },


    }
  }

  componentDidMount(){
    axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem("token");
    this.getAvailableCenters();
    this.getData(this.state.year, this.state.center_ID);
    this.getCenterwiseData(this.state.year, this.state.center_ID);
  }
    componentWillReceiveProps(nextProps){
      this.getAvailableCenters();
      this.getData(this.state.year, this.state.center_ID);
      this.getCenterwiseData(this.state.year, this.state.center_ID);
    }
    handleChange(event){
        event.preventDefault();
        this.setState({
          [event.target.name] : event.target.value
        },()=>{
        });
    }
    getAvailableCenters(){
        axios({
          method: 'get',
          url: '/api/centers/list',
        }).then((response)=> {
          this.setState({
            availableCenters : response.data,
            center           : response.data[0].centerName+'|'+response.data[0]._id
          },()=>{
            var center_ID = this.state.center.split('|')[1];
            this.setState({
              center_ID        : center_ID
            },()=>{
            this.getData(this.state.year, this.state.center_ID);
            this.getCenterwiseData(this.state.year, this.state.center_ID);
            })
          })
        }).catch(function (error) {
        });
    } 
    selectCenter(event){
        var selectedCenter = event.target.value;
        this.setState({
          [event.target.name] : event.target.value,
          selectedCenter : selectedCenter,
        },()=>{
          var center_ID = this.state.selectedCenter.split('|')[1];
          this.setState({
            center_ID :center_ID,            
          },()=>{
            this.getData(this.state.year, this.state.center_ID);
            this.getCenterwiseData(this.state.year, this.state.center_ID);
           })
        });
    } 


  getData(year, center_ID){
    var startDate = year.substring(3, 7)+"-04-01";
    var endDate = year.substring(10, 15)+"-03-31";
    if(startDate, endDate, center_ID){
        axios.get('/api/report/sector/'+startDate+'/'+endDate+'/all')
        .then((response)=>{

          var sector = [];
          var annualPlanReach = [];
          var annualPlanFamilyUpgradation = [];
          var achievementReach = [];
          var achievementFamilyUpgradation = [];
          var annualPlanTotalBudget = [];
          var piechartcolor =[];
         if(response.data&&response.data.length >0){
            response.data.map((data,index)=>{
              sector.push(data.name);
              annualPlanReach.push(data.annualPlan_Reach);
              annualPlanFamilyUpgradation.push(data.annualPlan_FamilyUpgradation);
              achievementReach.push(data.achievement_Reach);
              achievementFamilyUpgradation.push(data.achievement_FamilyUpgradation);
              annualPlanTotalBudget.push(data.annualPlan_TotalBudget);
              piechartcolor.push(this.getRandomColor());
            })

          this.setState({
            "sector" : sector.splice(-2),
            "annualPlanReach1" : annualPlanReach.splice(-2),
            "annualPlanFamilyUpgradation1" : annualPlanFamilyUpgradation.splice(-2),
            "achievementReach1" : achievementReach.splice(-2),
            "achievementFamilyUpgradation1" : achievementFamilyUpgradation.splice(-2),
            "annualPlan_TotalBudget1" : annualPlanTotalBudget.splice(-2),
          },()=>{
             this.setState({
              "sector"                       : sector,
              "annualPlanReach"              : annualPlanReach,
              "annualPlanFamilyUpgradation"  : annualPlanFamilyUpgradation,
              "achievementReach"             : achievementReach,
              "achievementFamilyUpgradation" : achievementFamilyUpgradation,
              "annualPlanTotalBudget"       : annualPlanTotalBudget,
              piechartcolor                 : piechartcolor
            },()=>{
                    
            });
          
          })
        }    
          var tableData = response.data.map((a, i)=>{
            return {
                name                                    : a.name,
                annualPlan_Reach                        : a.annualPlan_Reach,
                annualPlan_FamilyUpgradation            : a.annualPlan_FamilyUpgradation, 
                achievement_Reach                       : a.achievement_Reach,
                achievement_FamilyUpgradation           : a.achievement_FamilyUpgradation,            
                annualPlan_TotalBudget                  : a.annualPlan_TotalBudget,            
            } 
        })  
        this.setState({
          tableData : tableData
        },()=>{
        })
      })
      .catch(function(error){        
      });
    }
  }

  getCenterwiseData(year, center_ID){
   
  }
  getRandomColor(){
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  render(){ 

    return(
      <div>
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 marginTop11">
            <div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <label className="formLable">Center</label><span className="asterix"></span>
                <div className="col-lg-12 col-sm-12 col-xs-12 input-group inputBox-main" id="center" >
                    <select className="custom-select form-control inputBox" ref="center" name="center" value={this.state.center} onChange={this.selectCenter.bind(this)} >
                        <option className="hidden" >-- Select --</option>
                        {
                          this.state.availableCenters && this.state.availableCenters.length >0 ?
                          this.state.availableCenters.map((data, index)=>{
                            return(
                              <option key={data._id} value={data.centerName+'|'+data._id}>{data.centerName}</option>
                            );
                          })
                          :
                          null
                        }
                    </select>
                </div>
            </div>
            <div className=" col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <label className="formLable">Year</label><span className="asterix"></span>
              <div className="col-lg-12 col-sm-12 col-xs-12 input-group inputBox-main" id="year" >
                <select className="custom-select form-control inputBox" ref="year" name="year" value={this.state.year}  onChange={this.handleChange.bind(this)} >
                 <option className="hidden" >-- Select Year --</option>
                 {
                  this.state.years.map((data, i)=>{
                    return <option key={i}>{data}</option>
                  })
                 }
                </select>
              </div>
            </div>  
        </div>  
        <div className="col-lg-6">
          <BarChart annualPlanReach={this.state.annualPlanReach} sector={this.state.sector} annualPlanFamilyUpgradation={this.state.annualPlanFamilyUpgradation} achievementReach={this.state.achievementReach} achievementFamilyUpgradation={this.state.achievementFamilyUpgradation}/>
        </div>
        <div className="col-lg-6">
          <h3>Sector wise Budget</h3>
          <PieChart annualPlanTotalBudget={this.state.annualPlanTotalBudget} piechartcolor={this.state.piechartcolor}  sector={this.state.sector}/>
        </div>
      </div>  
        <br/>
        
      </div>
      );
  }
}
