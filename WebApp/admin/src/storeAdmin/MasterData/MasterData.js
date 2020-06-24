import React, {Component} from 'react';
import {render}           from 'react-dom';
import $                  from "jquery";
import jQuery from 'jquery';
import axios              from 'axios';

import Section            from  './sectionManagement/component/SectionManagement.js';
import Category           from  './categoryManagement/component/CategoryManagement.js';
import TaxName            from  './TaxName/TaxName.js';
import TaxRate            from  './TaxRate/TaxRate.js';
import UnitOfMeasurment   from  './UnitOfMeasurment/UnitOfMeasurmentMaster.js';

// import '../../coreadmin/companysetting/css/CompanySetting.css';

 class MasterData extends Component{
    constructor(props) {
		super(props)

		this.state = {
			companyinformation				: "Company Information",
      // profileCreated            : false,
      editType                  : "",
      editId                    : "",
      oneFieldEditId            : ""
		}
	
	}
  componentDidMount() {

    if(this.props.match){
      if(this.props.match.params.editId && this.props.match.params.editId !== 'undefined'){
        // console.log("this.props.match.params.editId = ",this.props.match.params.editId);
        this.setState({editId : this.props.match.params.editId},
                      ()=>{
                        console.log("project componentDidMount editId = ",this.state.editId);
                      });
      }

      if(this.props.match.params.oneFieldEditId && typeof this.props.match.params.oneFieldEditId !== 'undefined'){
        // console.log("this.props.match.params.oneFieldEditId = ",this.props.match.params.oneFieldEditId);
        this.setState({oneFieldEditId : this.props.match.params.oneFieldEditId},
                      ()=>{
                        // console.log("project componentDidMount oneFieldEditId = ",this.state.oneFieldEditId);
                      });

      }
    }


  }
 
  componentDidUpdate(prevProps) {
    if(this.props.match.params.editId !== this.state.editId){
      this.setState({editId : this.props.match.params.editId},
                    ()=>{
                      console.log("global componentDidUpdate editId = ",this.state.editId);
                    });
    }
    if(this.props.match.params.oneFieldEditId !== this.state.oneFieldEditId){
      this.setState({oneFieldEditId : this.props.match.params.oneFieldEditId},
                    ()=>{
                      // console.log("project componentDidUpdate oneFieldEditId = ",this.state.oneFieldEditId);
                    });
    }
  }

  render() {
    return (
      <div className="container-fluid">

          <div className="formWrapper">
            <section className="content">
              <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 pageContent ">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 titleaddcontact NOpadding">
                    <div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-right ">
                        <h4 className="weighttitle col-lg-11 col-md-11 col-xs-11 col-sm-11 NOpadding-right">Master Data</h4>
                    </div>
                  </div>     
                  <div className="boxMinHeight boxMinHeighttab addMarginTop">
                      <div className="col-lg-3 col-md-3 col-xs-12 col-sm-12 noPadding"> 
                        <ul className="nav nav-tabs tabs-left sideways">
                          <li className="active col-lg-12 col-md-12 col-xs-12 col-sm-12"><a className="tabLeft lettersp tablefthr" href="#Section" data-toggle="tab">  Sections         </a></li>
                          <li className="col-lg-12 col-md-12 col-xs-12 col-sm-12"><a className="tabLeft lettersp tablefthr" href="#Category" data-toggle="tab">        Categories       </a></li>
                          {/* <li className="col-lg-12 col-md-12 col-xs-12 col-sm-12"><a className="tabLeft lettersp tablefthr" href="#TaxName" data-toggle="tab">         Tax Name         </a></li>
                          <li className="col-lg-12 col-md-12 col-xs-12 col-sm-12"><a className="tabLeft lettersp tablefthr" href="#TaxRate" data-toggle="tab">         Tax Rate         </a></li> */}
                          <li className="col-lg-12 col-md-12 col-xs-12 col-sm-12"><a className="tabLeft lettersp tablefthr" href="#UnitOfMeasurment" data-toggle="tab">Unit of Measurement </a></li>

                          
                        </ul>   
                      </div>                      
                      <div className="tab-content col-lg-9 col-md-9 col-xs-12 col-sm-12">   
                        <div className="tab-pane active" id="Section">  <Section           editId={this.state.editId}/>  </div>
                        <div className="tab-pane" id="Category">        <Category          editId={this.state.editId}/>  </div>
                        {/* <div className="tab-pane" id="TaxName">         <TaxName           editId={this.state.editId}/>  </div>
                        <div className="tab-pane" id="TaxRate">         <TaxRate           editId={this.state.editId}/>  </div> */}
                        <div className="tab-pane" id="UnitOfMeasurment"><UnitOfMeasurment  editId={this.state.editId}/>  </div>                        
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
export default MasterData;