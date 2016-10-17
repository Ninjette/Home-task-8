import React, { Component, PropTypes } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from "../actions/common.actions";
import Header from '../components/Header.jsx';

class CommonPage extends Component {
	constructor(){
		super()
		this.state = {
			pokemonsArray: [],
			offset: 0,
			limit : 12,
			desiredArray: [],
			elemMask: 'elem_'
		}
	}

	componentDidMount(){
		this.props.loadItems(this.state.limit, this.state.offset, this.state.pokemonsArray);
		this.checkDesired();
	}

	componentWillReceiveProps(nextProps){
		this.setState({
			offset: nextProps.state.common.offset
		})
	}

	loadMore(){
		this.props.loadItems(this.state.limit, this.state.offset, this.state.pokemonsArray);
	}

	addDesired(self, pokemon, e){
		// add pokemon to desired list if there is no such pokemon in Local Storage already
		let lsLength = localStorage.length;
		if (true) { //lsLength > 0
			let similar = false;
			for (var i = 0; i < lsLength; i++) {
				let key = localStorage.key(i);
				let keyId = key.slice(5);
				if (key.indexOf(this.state.elemMask) === 0 && self.id.toString() === keyId) {
					similar = true;
				}
			};
			if (!similar) {
				localStorage.setItem(this.state.elemMask + self.id, JSON.stringify(self));

				console.log(this, 'this');
				console.log(self, 'pokemon - first arg');
				console.log(e.target, 'event.target');
				e.target.classList.add("active");
			};
		}
	}
	checkDesired(){
		console.log('checkDesired');
	}
    render() {
        const { handleCommonAction } = this.props;
        
        return (
        	<div>
        		<Header />
                <div className="container">
                    <div className="row">
                    	{this.state.pokemonsArray.map(function(pokemon, index){
                    		return(
                    			<div className="col-sm-3" key={index}>
                    				<div className="elem">
                    					<div onClick={this.addDesired.bind(this, pokemon, event)} className="elem__icon-wrap icon-">

                    					</div>
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
                    	}.bind(this))}
                    </div>


    
                    <div className="loader">
                    	<img  className="loader__media" src="static/build/img/loader.gif"/>
                    	<p className="loader__text">loading...</p>
                    </div>
                    <button onClick={this.loadMore.bind(this)} className="js-load button btn btn-success">Load more</button>
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
CommonPage.propTypes = {
	handleCommonAction: PropTypes.func,
};

const Common = connect(mapStateToProps, mapDispatchToProps)(CommonPage);

export default Common;


//onClick={this.showDetails.bind(this)}
//this.showDetails(pokemon.id)
//onClick={this.showDetails.bind(this, 'mystring')}
// <i className="icon-heart elem__icon"/>