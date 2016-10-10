import React, { Component, PropTypes } from 'react';

const limit = 12;

class CommonPage extends Component {
	constructor(){
		super()
		this.state = {
			pokemonsArray: [],
			offset: 0
		}
	}

	loadMore(){
		this.loadItems(this.state.offset);
	}

	loadItems(offset){
		let self = this;
		self.addLoader();
		let pokemons = self.state.pokemonsArray;
		fetch('https://pokeapi.co/api/v2/pokemon/?limit='+limit+'&offset='+offset)
			.then(function(response) {
				return response.json();
			})
			.then(function(responseInfo) {
				responseInfo.results.map(function(el, index){
					pokemons.push(el);
				})

				//get types
				let counter = 0;
				for (let j = offset; j < offset+12; j++) {
					fetch('https://pokeapi.co/api/v2/pokemon/'+(j+1))
						.then(function(responseInfo) {
							return responseInfo.json();
						})
						.then(function(resultInfo) {
							pokemons[j].id = resultInfo.id;
							pokemons[j].types = resultInfo.types;
							counter++;
							// console.log(counter, 'counter');
							if(counter === 12){
								self.setState({
									pokemonsArray: pokemons,
									offset: self.state.offset + 12
								});
								self.removeLoader();
							}
						})
						.catch( alert );
				};
			})
			.catch( alert );
	}

	addLoader(){
		let loader = document.querySelectorAll('.loader');
		let btnLoadMore = document.querySelectorAll('.js-load');

		loader.forEach(function(item, i) {
			loader[i].classList.add("active");
		});

		btnLoadMore.forEach(function(item, i) {
			btnLoadMore[i].style.display = 'none';
		});
	}

	removeLoader(){
		let loader = document.querySelectorAll('.loader');
		let btnLoadMore = document.querySelectorAll('.js-load');

		loader.forEach(function(item, i) {
			loader[i].classList.remove("active");
		});
		btnLoadMore.forEach(function(item, i) {
			btnLoadMore[i].style.display = 'block';
		});
	}

	componentDidMount(){
		this.loadItems(this.state.offset);
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
                <button onClick={this.loadMore.bind(this)} className="js-load button btn btn-success">Load more</button>
            </div>
        );
    }
}

CommonPage.propTypes = {
    handleCommonAction: PropTypes.func,
};

export default CommonPage;
