
export function switchScrolled(scrolled) {
    return {
        type: 'SWITCH_SCROLLED',
        scrolled
    }
}

export function getCategories(categories) {
    return {
        type: 'GET_CATEGORIES',
        categories
    }
}