const initialState = {
    loading: false,
    userData: {},
    error: ''
}

const userReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'FETCH_GETLOGIN_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'FETCH_GETLOGIN_SUCCESS':
            return {
                loading: false,
                userData: action.payload
            }
        case 'FETCH_GETLOGIN_FAILURE':
            return {
                loading: false,
                error: action.payload
            }
        case 'CLEAR_USER_DATA':
            return {
                    loading: false,
                    userData: {},
                    error: ''            
            }
    
        default:
            return state
    }
}

export default userReducer