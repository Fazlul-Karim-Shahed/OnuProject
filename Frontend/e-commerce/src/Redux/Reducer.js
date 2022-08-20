import { CHECK_AUTH } from "./ActionTypes"

const initialState = {

    authenticated: false,


}

const reducer = (state = initialState, action) => {

    if (action.type === CHECK_AUTH) {
        console.log(action.value);
        return {
            ...state,
            authenticated: action.value
        }
    }
    return state
}

export default reducer