import React, { Component, PropTypes } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from "../actions/common.actions";

class CommonPage extends Component {
	constructor(){
		super()
		this.state = {
			pokemonsArray: [],
			offset: 0,
			limit : 12
		}
	}

	componentDidMount(){
		this.props.loadItems(this.state.limit, this.state.offset, this.state.pokemonsArray);
	}

	componentWillReceiveProps(nextProps){
		this.setState({
			pokemonsArray: nextProps.state.common.pokemonsArray,
			offset: nextProps.state.common.offset
		})
	}

	loadMore(){
		this.props.loadItems(this.state.limit, this.state.offset, this.state.pokemonsArray);
	}

    render() {
        const { handleCommonAction } = this.props;
        
        return (
            <div className="container" onClick={handleCommonAction} >
                <div className="search-wrap">
                    <form action="" className="search">
                    	<input type="text" className="search__input" />
                    	<button type="submit" className="search__submit" value="submit"> submit </button>
                    </form>
                </div>
                <div className="row">
                	{this.state.pokemonsArray.map(function(pokemon, index){
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
                <div className="loader">
                	<img  className="loader__media" src="static/build/img/loader.gif"/>
                	<p className="loader__text">loading...</p>
                </div>
                <button onClick={this.loadMore.bind(this)}className="js-load button btn btn-success">Load more</button>
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
