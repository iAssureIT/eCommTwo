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
        event.preventDefault();
        const target = event.target;
        const name = target.name;
        this.setState({
            [name]: event.target.value
        });   
    }
    submit(event){
        event.preventDefault();
        var formValues = {
            "preferenceID" : this.state.taxData && this.state.taxData.length>0? this.state.taxData[0]._id : 'Tax',
            
        }
        // console.log('formValues', formValues);
        if($("#taxRateMaster").valid()){
            axios.patch('/api/preference/postrate', formValues)
            .then((response)=>{
                this.getData(this.state.startRange, this.state.limitRange);
                swal(response.data.message);
                this.setState({
                    taxName         : "",
                    taxRate         : "",                    
                    effectiveTo     : ""
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
                                            <h4 className="">Tax Rate Master</h4>
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                            <br/>
                                            <br/>
                                            <form className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12" id="taxRateMaster">
                                                
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

