
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

export function getToken(auth_token, user_id) {
    return {
        type: 'GET_AUTH_TOKEN',
        auth_token,
        user_id
    }
}

export function signOut() {
    return {
        type: 'SIGN_OUT'
    }
}