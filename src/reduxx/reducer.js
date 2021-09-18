export const authReducer = (
    state = {
        isLoggedIn: (localStorage.token ? true : false) && true
    }, action
) => {
    switch (action.type) {
        case "LOGIN": {
            state = { ...state }
            state.isLoggedIn = true
            return state
        }
        default: return state


    }
}