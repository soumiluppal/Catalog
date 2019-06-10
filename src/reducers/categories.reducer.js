import catList from '../data/categories';

// Reducer for list of categories

const catReducer = function categories(state = catList, action) {
    switch (action.type) {
        case 'SWITCH_SCROLLED': {
            return state = {
                scrolled: action.scrolled,
                categories: { ...state.categories }
            }
        }
        case 'GET_CATEGORIES': {
            return state = {
                scrolled: state.scrolled,
                categories: action.categories
            };
        }
        default:
            return state;
    }
}

export default catReducer;