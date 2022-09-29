import axios from "axios";

export const saveCartApi = obj => {

    let data = axios.post(process.env.REACT_APP_BACKEND_URL + '/cart/', obj).then(data => data.data)
        .catch(err => err)

    return data

}

export const getCartApi = id => {

    let data = axios.get(process.env.REACT_APP_BACKEND_URL + '/cart/' + id).then(data => data.data)
        .catch(err => err)

    return data

}

export const updateQuantityApi = (type, item) => {

    let newObj

    if (type === 'add') {
        newObj = {
            ...item,
            quantity: Number(item.quantity) + 1,
            total: (Number(item.quantity) + 1) * Number(item.price)
        }
    }
    else {
        newObj = {
            ...item,
            quantity: Number(item.quantity) - 1,
            total: (Number(item.quantity) - 1) * Number(item.price)
        }
    }

    let data = axios.put(process.env.REACT_APP_BACKEND_URL + '/cart/', newObj)
        .then(data => data.data)
        .catch(err => err)

    return data

}

export const deleteCartApi = id => {

    let data = axios.delete(process.env.REACT_APP_BACKEND_URL + '/cart/' + id).then(data => data.data)
        .catch(err => err)

    return data

}