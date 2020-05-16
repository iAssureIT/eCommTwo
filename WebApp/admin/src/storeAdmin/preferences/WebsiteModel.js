import React, { Component }   from 'react';
import $                      from 'jquery';
import jQuery                 from 'jquery';
import axios                  from 'axios';
import swal                   from 'sweetalert';
import  './WebsiteModel.css';

class WebsiteModel extends Component {
    constructor(props) {        
        super(props);
        this.state = {
            "editId" : ""
        };
        
    }
    componentDidMount() {
    }  
    
    componentWillReceiveProps(nextProps) {
        
    }
    handleChange(event) {
        // event.preventDefault();
        const target = event.target;
        const name = target.name;
        this.setState({
            [name]: event.target.value
        });  
        console.log("websiteModel:", this.state.websiteModel); 
    }
    submit(event){
        event.preventDefault();    
                var formValues = {
                    "websiteModel" : this.state.websiteModel ,           
                }
                 console.log('formValues', formValues);
                if($("#websiteModelId").valid()){        
                    axios.post('/api/adminpreference/postWebsitemodel', formValues)
                    .then((response)=>{                
                        console.log("response after insert webapp:",response.data.message); 
                        swal({
                            text : response.data.message
                        })               
                        this.setState({
                            WebsiteModel  : ""
                        })
                    })
                    .catch((error)=>{
                        console.log('error', error);
                    })
                }
        
        
    }
        
    render() {
        return (
            <div className="container-fluid col-lg-12 col-md-12 col-xs-12 col-sm-12">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <section className="content">
                        <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 pageContent">
                            <div className="row">
                                <div className="">
                                    <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 paddingZeroo">
                                        <div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-right">
                                            <h4 className="">Website Model</h4>
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                            <br/>
                                            <br/>
                                            <form id="websiteModelId" className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12" >
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 websiteModel NOpadding">
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 websiteTitle">Select Website Model <span><i className="astrick">*</i></span></div>

                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 wedModelInput">
                                                        <input name="websiteModel" type="radio" value="SingleOwner" className="webSitemodelBtn col-lg-1 col-md-1 col-sm-2 col-xs-2"
                                                        onClick={this.handleChange.bind(this)} />
                                                        <span className="col-lg-11 col-md-11 col-sm-10 col-xs-10">Single Owner website</span>
                                                    </div>
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 wedModelInput">
                                                        <input name="websiteModel" type="radio" value="MarketPlace" className=" webSitemodelBtn col-lg-1 col-md-1 col-sm-2 col-xs-2"
                                                        onClick={this.handleChange.bind(this)} />
                                                        <span className="col-lg-11 col-md-11 col-sm-10 col-xs-10">Multi vendor Marketplace</span>
                                                    </div>
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 wedModelInput">
                                                        <input name="websiteModel" type="radio" value="FranchiseModel" className="webSitemodelBtn col-lg-1 col-md-1 col-sm-2 col-xs-2"
                                                        onClick={this.handleChange.bind(this)} />
                                                        <span className="col-lg-11 col-md-11 col-sm-10 col-xs-10">Franchise Model</span>
                                                    </div>                                                                                                   
                                                </div>
                                                <br/> 
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                    {this.state.editId ?
                                                        <button onClick={this.update.bind(this)} className="btn button3 btn-primary pull-right">Update</button>
                                                        :
                                                        <button onClick={this.submit.bind(this)} className="btn button3 btn-primary pull-right">Submit</button>
                                                    }
                                                </div> 
                                            </form>                                            
                                        </div>
                                        <div>                                         
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    </div>
                </div> 
            </div> 
        );
    } 
}
export default WebsiteModel;

