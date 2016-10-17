import React, { Component, PropTypes } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from "../actions/common.actions";
import Header from '../components/Header.jsx';

class DesiredPage extends Component {
	constructor(){
		super()
		this.state = {
			desiredArray: [],
			elemMask: 'elem_'
		}
	}

	componentDidMount(){
		this.props.loadDesired(this.state.desiredArray, this.state.elemMask);
	}

	componentWillReceiveProps(nextProps){
		this.setState({
			desiredArray: nextProps.state.common.desiredArray
		})
		
	}

	loadMore(){
		
	}

	render() {
		const { handleCommonAction } = this.props;
		
		return (
			<div>
				<Header />
				<div className="container">
					<div className="row desired">
						{this.state.desiredArray.map(function(pokemon, index){
							return(
								<div className="col-sm-3" key={index}>
									<div className="elem">
										<div className="elem__media-wrap">
											<img className="elem__media" src={"static/build/img/" + pokemon.name.toLowerCase() + '.jpg'} alt="" />
										</div>
										<div className="elem__name">{pokemon.name}</div>
										<div className="elem__types">
											{pokemon.types.map(function(element, index){
												return(
													<div className={element.type.name} key={index}>{element.type.name}</div>
												)
											})}
										</div>
									</div>
								</div>
							)
						})}
					</div>
				</div>

			</div>
		);
	}
}
function mapDispatchToProps(dispatch) {
	return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
	return {
		state: state
	};
}
DesiredPage.propTypes = {
    handleCommonAction: PropTypes.func,
};

const Desired = connect(mapStateToProps, mapDispatchToProps)(DesiredPage);

export default Desired;
