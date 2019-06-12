import catList from '../data/categories';

// Reducer for list of categories

const catReducer = function categories(state = catList, action) {
    switch (action.type) {
        // Change navbar color
        case 'SWITCH_SCROLLED': {
            return state = {
                scrolled: action.scrolled,
                categories: state.categories,
                auth_token: state.auth_token,
                user_id: state.user_id
            }
        }
        // Push all categories to state
        case 'GET_CATEGORIES': {
            return state = {
                scrolled: state.scrolled,
                categories: action.categories,
                auth_token: state.auth_token,
                user_id: state.user_id
            };
        }
        // Push user authentication token to state
        case 'GET_AUTH_TOKEN': {
            return state = {
                scrolled: state.scrolled,
                categories: state.categories,
                auth_token: action.auth_token,
                user_id: action.user_id
            }
        }
        // Sign out of currently logged in account
        case 'SIGN_OUT': {
            return state = {
                scrolled: state.scrolled,
                categories: state.categories,
                auth_token: null,
                user_id: null
            }
        }
        default:
            return state;
    }
}

export default catReducer;