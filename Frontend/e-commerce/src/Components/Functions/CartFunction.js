import { addCartQuantityApi, deleteCartApi, getCartApi, saveCartApi, subtractCartQuantityApi, updateCartApi, updateQuantityApi } from "../API/CartApi"

export const cartSave = async (obj, authenticated, decodedObject) => {

    if (authenticated) {
        obj.userId = decodedObject._id
        let data = saveCartApi(obj).then(data => data)
        return data
    }
    else {
        let cart = await localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_CART_NAME)

        if (!cart) {
            let arr = []
            arr.push(obj)
            await localStorage.setItem(process.env.REACT_APP_LOCAL_STORAGE_CART_NAME, JSON.stringify(arr))
            return { message: 'Item added to cart successfully', error: false }
        }
        else {
            let arr = [...JSON.parse(cart)]

            for (let item of arr) {

                if (obj.productId === item.productId && obj.finishingId === item.finishingId && obj.finishingColorId === item.finishingColorId && obj.sizeId === item.sizeId && obj.partsInfoId === item.partsInfoId) {

                    item.quantity = Number(item.quantity) + Number(obj.quantity)
                    item.total = Number(item.price) * Number(item.quantity)
                    await localStorage.setItem(process.env.REACT_APP_LOCAL_STORAGE_CART_NAME, JSON.stringify(arr))
                    return { message: 'Item added to cart successfully', error: false }
                }
            }

            arr.push(obj)
            await localStorage.setItem(process.env.REACT_APP_LOCAL_STORAGE_CART_NAME, JSON.stringify(arr))
            return { message: 'Item added to cart successfully', error: false }


        }
    }

}

export const getCart = async (authenticated, decodedObject) => {

    if (authenticated) {
        let data = getCartApi(decodedObject._id).then(data => data)
        return data
    }
    else {
        let cart = await localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_CART_NAME)
        if (cart) return { message: 'All cart item', error: false, value: JSON.parse(cart) }

        return { message: 'No item found', error: true }

    }


}


export const updateQuantity = async (type, authenticated, decodedObject, item, index) => {

    if (authenticated) {
        let data = updateQuantityApi(type, item).then(data => getCart(authenticated, decodedObject).then(data => data.value))
        return data
    }

    else {

        let updatedCart = await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_CART_NAME))
        if (type === 'add') {
            updatedCart[index].quantity = Number(updatedCart[index].quantity) + 1
            updatedCart[index].total = Number(updatedCart[index].quantity) * Number(updatedCart[index].price)

            await localStorage.setItem(process.env.REACT_APP_LOCAL_STORAGE_CART_NAME, JSON.stringify(updatedCart))
            return updatedCart
        }

        else {
            updatedCart[index].quantity = Number(updatedCart[index].quantity) - 1
            updatedCart[index].total = Number(updatedCart[index].quantity) * Number(updatedCart[index].price)

            await localStorage.setItem(process.env.REACT_APP_LOCAL_STORAGE_CART_NAME, JSON.stringify(updatedCart))
            return updatedCart
        }

    }


}


export const deleteCart = async (authenticated, decodedObject, item, index) => {

    if (authenticated) {
        let data = await deleteCartApi(item._id).then(data => getCartApi(decodedObject._id).then(data => data.value))
        return data
    }
    else {
        let cart = await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_CART_NAME))

        cart.splice(index, 1)

        await localStorage.setItem(process.env.REACT_APP_LOCAL_STORAGE_CART_NAME, JSON.stringify(cart))
        return cart

    }


}


export const createCartItemArray = (array) => {

    let newArr = array.map(item => item._id)
    return newArr

}

export const uploadCartItems = async (decodedObject) => {

    const cart = localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE_CART_NAME)
    if (cart) {
        let arr = JSON.parse(cart)
        arr.forEach(item => {

            let obj = {
                ...item,
                userId: decodedObject._id
            }
            saveCartApi(obj).then(data => data)

        })
    }

}



