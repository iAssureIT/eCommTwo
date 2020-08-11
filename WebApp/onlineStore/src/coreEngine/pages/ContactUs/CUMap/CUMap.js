import React from 'react';
// import './CUMap.css';
import  '../../../../sites/currentSite/pages/ContactPage.css';

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
										<iframe width="100%" height="530" id="gmap_canvas" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.2822530606413!2d73.93813731499363!3d18.516142987411595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c221bd423c49%3A0xf10f7a3e57d38045!2sPawar%20Public%20School!5e0!3m2!1sen!2sin!4v1595238889605!5m2!1sen!2sin" frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
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