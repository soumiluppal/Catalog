import catList from '../data/categories';

// Reducer for list of categories

const catReducer = function categories(state = catList, action) {
    switch (action.type) {
        case 'SWITCH_SCROLLED': {
            return state = {
                scrolled: action.scrolled,
                categories: { ...state.categories },
                auth_token: state.auth_token
            }
        }
        case 'GET_CATEGORIES': {
            return state = {
                scrolled: state.scrolled,
                categories: action.categories,
                auth_token: state.auth_token
            };
        }
        case 'GET_AUTH_TOKEN': {
            return state = {
                scrolled: state.scrolled,
                categories: { ...state.categories },
                auth_token: action.auth_token
            }
        }
        default:
            return state;
    }
}

export default catReducer;