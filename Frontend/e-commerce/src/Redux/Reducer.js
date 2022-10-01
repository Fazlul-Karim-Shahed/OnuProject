import { CHECK_AUTH, DECODE_TOKEN, GET_ALL_PRODUCTS, GET_ALL_PRODUCTS_PROPERTIES, GET_ALL_PROPERTIES, GET_CART, GET_CATALOG, GET_CATEGORY, GET_FINISHING, GET_FINISHING_COLOR, GET_ORDER, GET_PARTS_INFO, GET_SIZE, GET_SUBCATEGORY } from "./ActionTypes"

const initialState = {

    authenticated: false,
    decodedToken: null,
    catalog: [],
    category: [],
    subCategory: [],
    allProducts: [],
    selectedProducts: [],
    productProperties: [],
    finishing: [],
    size: [],
    finishingColor: [],
    partsInfo: [],
    cart: [],
    order: []

}

const reducer = (state = initialState, action) => {


    if (action.type === CHECK_AUTH) {

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

    if (action.type === GET_ALL_PRODUCTS_PROPERTIES) {

        return {
            ...state,
            productProperties: action.value
        }
    }

    if (action.type === GET_ALL_PROPERTIES) {

        return {
            ...state,
            finishing: action.value.finishing,
            finishingColor: action.value.finishingColor,
            partsInfo: action.value.partsInfo,
            size: action.value.size,
        }
    }

    if (action.type === GET_CART) {

        return {
            ...state,
            cart: action.value
        }
    }

    if (action.type === GET_ORDER) {

        return {
            ...state,
            order: action.value
        }
    }



    return state
}

export default reducer