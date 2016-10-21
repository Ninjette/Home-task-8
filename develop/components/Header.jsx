import React, { Component, PropTypes } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from "../actions/common.actions";

class Header extends Component {
	render() {
		const { handleCommonAction } = this.props;
		
		return (
			<div>
				<div className="header clearfix">
					<div className="container">
						<h2 className="header__title">Welcome to pokemon-app</h2>
						<div className="header__links">
							<a className="header__link" href="/#/common">listing</a>
							<a className="header__link" href="/#/desired">favourites</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Header;
