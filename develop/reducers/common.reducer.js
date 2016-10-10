import commonTypes from '../actions/types/common.types';

export default (state = {}, action) => {
    switch (action.type) {
        case commonTypes.COMMON_ACTION:
            return {
                ...state,
            };

        default:
            return state;
    }
};
