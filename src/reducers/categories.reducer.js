import catList from '../data/categories';

// Reducer for list of categories

const catReducer = function categories(state = catList, action) {
    switch (action.type) {
        // Change navbar color
        case 'SWITCH_SCROLLED': {
            return state = {
                ...state,
                scrolled: action.scrolled
            }
        }
        // Push all categories to state
        case 'GET_CATEGORIES': {
            return state = {
                ...state,
                categories: action.categories
            };
        }
        // Push user authentication token to state
        case 'GET_AUTH_TOKEN': {
            return state = {
                ...state,
                auth_token: action.auth_token,
                user_id: action.user_id
            }
        }
        // Sign out of currently logged in account
        case 'SIGN_OUT': {
            return state = {
                ...state,
                auth_token: null,
                user_id: null
            }
        }
        default:
            return state;
    }
}

export default catReducer;