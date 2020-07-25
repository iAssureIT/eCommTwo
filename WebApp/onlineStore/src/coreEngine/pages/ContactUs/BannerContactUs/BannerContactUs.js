import React from 'react';
import './BannerContactUs.css';
import Contact_Background from '../../../../sites/currentSite/images/checkout.png';

export default class BannerContactUs extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<div className="bannercusweapper"> 
					<div className="bgImageTextonBCUS" style={{'background' : "url("+Contact_Background +")"}}> 
						<div className="margTop5p25per"> 
							<div className="text-center">
								<p className="fs40CU">Contact Us</p>
								<h5 style={{color:"#fff"}}>Home / Contact Us</h5>

							</div>

						</div>
					</div>
				</div>

			</div>
		);
	}
}
