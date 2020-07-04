import React from 'react';
import './CUMap.css';

export default class CUMap extends React.Component {


	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 nopadding">
				<div className="cuMapwrapper"> 
					<div className="bgImageTextonCuMap"> 
						 
						<div className="gmapwrapper">
							<div class="demogmap_canvas ">

								<div class="mapouter" id="mapouter">
									<div class="gmap_canvas">
										<iframe width="100%" height="530" id="gmap_canvas" src="https://maps.google.com/maps?q=iAssureIT%20hadapsar&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
										</iframe>
										
									</div>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
		);
	}
}
