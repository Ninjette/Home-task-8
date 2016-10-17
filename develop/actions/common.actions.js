import commonTypes from './types/common.types';

export const commonAction = (params) => ({
    type: commonTypes.COMMON_ACTION,
    params,
});


export  function loadItems(limit, offset, pokemons) {
    return dispatch => {
        addLoader();
        fetch('https://pokeapi.co/api/v2/pokemon/?limit=' + limit + '&offset=' + offset)
            .then(function (response) {
                return response.json();
            })
            .then(function (responseInfo) {
                responseInfo.results.map(function (el, index) {
                    pokemons.push(el);
                })
                //get types
                let counter = 0;
                for (let j = offset; j < offset + 12; j++) {
                    fetch('https://pokeapi.co/api/v2/pokemon/' + (j + 1))
                        .then(function (responseInfo) {
                            return responseInfo.json();
                        })
                        .then(function (resultInfo) {
                            pokemons[j].id = resultInfo.id;
                            pokemons[j].types = resultInfo.types;
                            
                            console.log(pokemons[j], j);
                            counter++;
                            console.log(counter, 'counter');
                            if (counter === 12) {
                            	console.log(pokemons);
                                dispatch(setItems(pokemons));
                                dispatch(setOffset(pokemons.length));
                                removeLoader();
                            }
                        })
                        // .catch(alert);
                };
            })
            .catch(alert);
    }
}

export const setItems = (items) => ({
    type: 'SET_ITEMS',
    pokemonsArray: items
});

export const setOffset = (offsetNumber) =>({
    type: 'SET_OFFSET',
    offset: offsetNumber
});

export const setDesired = (desired) =>({
    type: 'SET_DESIRED',
    desiredArray: desired
});

export function loadDesired(desiredArray, mask){
	return dispatch => {
		//get desired pokemons from Local Storage
		let lsLength = localStorage.length;
		if (lsLength > 0) {
			for(let i = 0; i < lsLength; i++) {
				let key = localStorage.key(i);
				if(key.indexOf(mask) == 0) {
					desiredArray.push(JSON.parse(localStorage.getItem(key)));
				}
			}
		};
		dispatch(setDesired(desiredArray))
	}
}


export function addLoader() {
	let loader = document.querySelectorAll('.loader');
	let btnLoadMore = document.querySelectorAll('.js-load');
	
	loader.forEach(function(item, i) {
		loader[i].classList.add("active");
	});
	
	btnLoadMore.forEach(function(item, i) {
		btnLoadMore[i].style.display = 'none';
	});
}
export function removeLoader() {
	let loader = document.querySelectorAll('.loader');
	let btnLoadMore = document.querySelectorAll('.js-load');
	
	loader.forEach(function(item, i) {
		loader[i].classList.remove("active");
	});
	
	btnLoadMore.forEach(function(item, i) {
		btnLoadMore[i].style.display = 'block';
	});
}