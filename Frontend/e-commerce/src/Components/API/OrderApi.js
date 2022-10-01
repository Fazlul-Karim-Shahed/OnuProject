import axios from "axios"

export const getOrdersByIdApi = async (id) => {

    const data = axios.get(process.env.REACT_APP_BACKEND_URL + '/order/' + id)
        .then(data => data.data)
        .catch(err => err)

    return data
}

export const getOrdersApi = async () => {

    const data = axios.get(process.env.REACT_APP_BACKEND_URL + '/order/')
        .then(data => data.data)
        .catch(err => err)

    return data
}

export const updateOrderStatusApi = async (id, obj) => {

    const data = axios.put(process.env.REACT_APP_BACKEND_URL + '/order/' + id, obj)
        .then(data => data.data)
        .catch(err => err)

    return data
}


export const cancelOrderApi = async (id) => {

    const data = axios.delete(process.env.REACT_APP_BACKEND_URL + '/order/' + id)
        .then(data => data.data)
        .catch(err => err)

    return data
}
