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
										{/* <iframe width="100%" height="530" id="gmap_canvas" src="https://maps.google.com/maps?q=iAssureIT%20hadapsar&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"> */}
										<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.2412935543002!2d73.87655784998626!3d18.517995074025393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c04fbd1ddb6b%3A0xa6f1f9f58491c772!2sAurora%20Towers%2C%20Dr%20Baba%20Saheb%20Ambedkar%20Rd%2C%20Camp%2C%20Pune%2C%20Maharashtra%20411001!5e0!3m2!1sen!2sin!4v1595654875878!5m2!1sen!2sin" width="1500" height="450" frameborder="0" style={{border:"0px"}} allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>

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

