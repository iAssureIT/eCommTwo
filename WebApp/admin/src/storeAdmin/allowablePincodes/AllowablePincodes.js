import React, { Component }   from 'react';
import $                      from 'jquery';
import jQuery                 from 'jquery';
import axios                  from 'axios';
import swal                   from 'sweetalert';
import  './AllowablePincodes.css';

class AllowablePincodes extends Component {
    constructor(props) {        
        super(props);
        this.state = {
            "editId" : "",
            allowablePincodes : {},
            franchiseList : [],
            allowablePincodeList : [],
        };
        
    }
    componentDidMount() {
        // this.getEntityList();
        // this.getAllowablePincode();

    }  
    componentWillMount() {
        this.getEntityList();
        this.getAllowablePincode();
    }
    
    getAllowablePincode(){
        axios.get("/api/allowablepincode/get")
			.then((response) => {
				if(response){
					console.log("allowable pincodes list:",response.data.length);
					this.setState({
						allowablePincodeList  : response.data,												
                    });
                    // this.state.allowablePincodeList.reverse();
                    console.log("get allowablePincodeList list=======",this.state.allowablePincodeList);      
                    console.log("get allowablePincodeList list=======",this.state.allowablePincodeList.length);              
                }
            })			
			.catch((error) => {
                console.log("Error while getting pincodes:",error);
			})
    }

    getEntityList(){
        var entityType = "franchise";
        axios.get("/api/entitymaster/get/"+entityType)

			.then((response) => {
				if(response){
                    console.log("get franchise list response:",response);
                    this.getAllowablePincode();
					this.setState({
						franchiseList  : response.data,	
						
                    });
                    // this.state.franchiseList.reverse();
                    var finalList = [];
                    console.log("franchise list length:",this.state.franchiseList.length);
                    if(this.state.franchiseList){
                        for(let i=0;i<this.state.franchiseList.length;i++){
                            console.log("inside for i loop");
                            // console.log("pincodelist==========",this.state.allowablePincodeList[i].allowablePincodes);
                            if(this.state.allowablePincodeList){
                                for(let k=0;k<this.state.allowablePincodeList.length;k++){
                                    console.log("allowable FID:",this.state.allowablePincodeList[k].franchiseID);
                                    console.log("Franchise FID:",this.state.franchiseList[i]._id);
                                    if(this.state.franchiseList[i]._id === this.state.allowablePincodeList[k].franchiseID){
                                        console.log("Inside for k loop");
                                        finalList[i] = {
                                            "franchiseID"       : this.state.franchiseList[i]._id,
                                            "companyID"         : this.state.franchiseList[i].companyID,
                                            "allowablePincodes" : this.state.allowablePincodeList[k].allowablePincodes ? this.state.allowablePincodeList[k].allowablePincodes:"",
                                            "PincodesID"        : this.state.allowablePincodeList[k]._id ? this.state.allowablePincodeList[k]._id : "",   
                                        }
                                        break;
                                    // }
                                    }
                                }                                
                            }
                            
                        }
                        console.log("final finalList:" ,finalList);
                    }                    
                }
            })            			
			.catch((error) => {
                console.log("error:",error);
			})
    }
    handleChange(event) {
        // event.preventDefault();
        const target = event.target;
        var id  = target.getAttribute('data-fid');
        // console.log("franchise Id :" ,id);
        var allowablePincodes = this.state.allowablePincodes;

        allowablePincodes[id]={
                                "pincodes"    :event.target.value.split(','),
                                "companyID"   :target.getAttribute('data-cid'),
                                "franchiseID" : id,
                              }
       
        console.log("allowablepincods object:",this.state.allowablePincodes);
       
    }
    submit(event){
        event.preventDefault();    
                var formValues = this.state.allowablePincodes         
                
                 console.log('formValues', formValues);
                if($("#allowablePincodeId").valid()){        
                    axios.post('/api/allowablepincode/post', formValues)
                    .then((response)=>{                
                        console.log("response after insert pincode:",response.data.message); 
                        swal({
                            text : response.data.message
                        })               
                        
                    })
                    .catch((error)=>{
                        console.log('error', error);
                    })
                }
        
        
    }
        
    render() {
        console.log("Array.isArray(this.state.allowablePincodeList)-===",Array.isArray(this.state.allowablePincodeList));
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
                                            <h4 className="">Franchise Allowable Pincodes</h4>
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                            <br/>
                                            <br/>
                                            <form id="allowablePincodeId" className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-12 col-xs-12" >
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 websiteModel NOpadding">                                                    
                                                    <table class="table table-bordered table-striped table-hover allowablePincodeTable">
                                                        <thead>
                                                            <tr>
                                                                <th className="col-lg-1 col-md-1 col-sm-2">Sr. No.</th>
                                                                <th className="col-lg-7 col-md-7 col-sm-6">Franchise Details</th>
                                                                <th className="col-lg-4 col-md-4 col-sm-4">Allowable Pincodes</th>                                                                
                                                            </tr>

                                                        </thead>
                                                        <tbody>                                                              
                                                            {Array.isArray(this.state.franchiseList) && Array.isArray(this.state.allowablePincodeList) &&
                                                                this.state.franchiseList.map((data, index) => {
                                                                    return (
                                                                        <tr className ="pincodesRow">
                                                                            <td>{index +1}</td>
                                                                            <td>
                                                                                {data.companyName},<br/>
                                                                                {data.locations[0] ? data.locations[0].locationType : null},&nbsp;{data.locations[0] ? data.locations[0].addressLine1 : null},<br/>
                                                                                {data.locations.state}
                                                                            </td> 
                                                                            <td>
                                                                                    <input type="text" index id="pincodes-" data-cid={data.companyID} data-fid={data._id} className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12"
                                                                                    ref="pincodes" name="pincodes" defaultValue={this.state.allowablePincodeList.length>0 ? this.state.allowablePincodeList[index]? this.state.allowablePincodeList[index].allowablePincodes : null :null}  onChange={this.handleChange.bind(this)} placeholder="Enter allowable pincodes.."/>
                                                                            </td>                                                                            
                                                                        {/* <td> 
                                                                        {  this.state.allowablePincodeList.map((AllowableData, aIndex) => {
                                                                                return (    
                                                                                    data._id === AllowableData.franchiseID
                                                                                     ?                                                                          
                                                                                        <input type="text" index id="pincodes-" data-cid={data.companyID} data-fid={data._id} className="form-control col-lg-12 col-md-12 col-sm-12 col-xs-12"
                                                                                        ref="pincodes" name="pincodes" defaultValue={AllowableData.allowablePincodes}  onChange={this.handleChange.bind(this)} placeholder="Enter allowable pincodes.."/> 
                                                                                    : 
                                                                                    null
                                                                                                                                                                  
                                                                                );
                                                                            })
                                                                        }
                                                                        </td> */}
                                                                        </tr> 
                                                                    );
                                                                }
                                                                )
                                                            } 
                                                            {this.state.franchiseList.length === 0 
                                                                ?
                                                                <tr className="trAdmin">
                                                                    <td colspan="3" class="noTempData textAlignCenter">No Record Found!</td>
                                                                </tr> 
                                                                :null
                                                            }

                                                        </tbody>
                                                    </table>
                                                                                                                                                     
                                                </div>
                                                <br/> 
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                    {this.state.editId
                                                        ?
                                                        <button onClick={this.update.bind(this)} className="btn button3 btn-primary pull-right">Update</button>
                                                        :
                                                        <button onClick={this.submit.bind(this)} className="btn button3 btn-primary pull-right">Submit</button>
                                                    }
                                                </div> 
                                            </form>                                            
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
export default AllowablePincodes;

