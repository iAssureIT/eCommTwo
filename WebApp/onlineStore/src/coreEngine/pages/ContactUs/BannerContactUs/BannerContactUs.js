import React from 'react';
import './BannerContactUs.css';

export default class BannerContactUs extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<div className="bannercusweapper"> 
					<div className="bgImageTextonBCUS"> 
						<div className="margTop5p25per"> 
							<div className="text-center">
								<p className="fs40CU">Contact Us</p>
								<h5>Home . Contact Us</h5>

							</div>

						</div>
					</div>
				</div>

			</div>
		);
	}
}
