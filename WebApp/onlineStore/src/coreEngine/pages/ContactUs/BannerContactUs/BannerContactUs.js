import React from 'react';
// import './BannerContactUs.css';
import  '../../../../sites/currentSite/pages/ContactPage.css';
import Contact_Background from '../../../../sites/currentSite/images/contact_us.png';

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
								{/* <h5>Home . Contact Us</h5> */}

							</div>

						</div>
					</div>
				</div>

			</div>
		);
	}
}
