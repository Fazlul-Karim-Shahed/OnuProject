import { CHECK_AUTH, DECODE_TOKEN, GET_ALL_PRODUCTS, GET_CATALOG, GET_CATEGORY, GET_SUBCATEGORY } from "./ActionTypes"

const initialState = {

    authenticated: false,
    decodedToken: null,
    catalog: [],
    category: [],
    subCategory: [],
    allProducts: [],
    selectedProducts: []

}

const reducer = (state = initialState, action) => {

    if (action.type === CHECK_AUTH) {
        // console.log(action.value);
        return {
            ...state,
            authenticated: action.value
        }
    }

    if (action.type === DECODE_TOKEN) {
        // console.log(action.value);
        return {
            ...state,
            decodedToken: action.value
        }
    }

    if (action.type === GET_CATALOG) {

        return {
            ...state,
            catalog: action.value
        }
    }

    if (action.type === GET_CATEGORY) {

        return {
            ...state,
            category: action.value
        }
    }

    if (action.type === GET_SUBCATEGORY) {

        return {
            ...state,
            subCategory: action.value
        }
    }

    if (action.type === GET_ALL_PRODUCTS) {

        return {
            ...state,
            allProducts: action.value
        }
    }



    return state
}

export default reducer