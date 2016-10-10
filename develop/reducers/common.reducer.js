import commonTypes from '../actions/types/common.types';

export default (state = {}, action) => {
    switch (action.type) {
        case commonTypes.COMMON_ACTION:
            return {
                ...state,
            };

        case 'SET_ITEMS':{
            const {pokemonsArray} = action;
            return Object.assign({}, state, {
                pokemonsArray
            });
        }

        case 'SET_OFFSET':{
            const {offset} = action;
            return Object.assign({}, state, {
                offset
            });
        }


        default:
            return state;
    }
};
