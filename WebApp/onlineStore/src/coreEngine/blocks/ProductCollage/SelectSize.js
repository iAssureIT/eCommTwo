import React, { Component } from 'react';

import "../../../../sites/currentSite/blocks/ProductCollageView.css";

class FreshFoodBlock extends Component{
    constructor(props){
        super(props);
        this.state={}
    }
    render(){
        return(
            <div className="selectSizeBox">                                                
                <span className=" col-lg-12 col-md-12 col-sm-12 col-xs-12 pull-left Nopadding">Select Size</span>
                <select class="form-control selectdropdown valid availablesize" currPro={data._id} mainSize={data.size} unit={data.unit} availableQuantity={a.availableQuantity} onClick={this.submitCart.bind(this)} id={a._id} name="size" aria-invalid="false">
                    { Array.isArray(data.availableSizes) && data.availableSizes.map((size, index) => {
                        return(
                            size === 1000?
                            <option className="" value={size}>{size}KG</option>
                            :
                            data.unit === "Box" || data.unit === "Wrap" || data.unit === "Pack" || data.unit==="pounch" ?
                            <option className="" value={size}>{data.unit}&nbsp;of&nbsp;{size}</option>
                            :
                            <option className="" value={size}>{size}{data.unit}</option>
                        
                        )
                        
                    })
                    }
                </select>
                <div className="col-lg-12 col-md-12 col-sm-12 pull-left Nopadding prodName">{data.productName}</div>
                {data.discountedPrice === data.originalPrice ?
                    <div class="col-lg-12 col-md-12 col-sm-12 price Nopadding"><i class="fa fa-inr"></i>&nbsp;{data.originalPrice} &nbsp;                                                    
                    </div>
                :
                    <div class="col-lg-12 col-md-12 col-sm-12 price Nopadding"><i class="fa fa-inr"></i>&nbsp;{data.discountedPrice} &nbsp;
                    <span className="discountedPrice">Rs.{data.originalPrice}</span>&nbsp;
                    <span className="disscountedPer">({data.discountPercent}% Off)</span>
                    </div>
                }
                </div> 
        )
    }

}

export default FreshFoodBlock;