import axios from 'axios'

export const createProductApi = async (obj) => {

    const data = axios.post(process.env.REACT_APP_BACKEND_URL + '/product/create', obj)
        .then(data => data.data)
        .catch(err => err)

    return data

}


export const getAllProductsApi = async () => {

    const data = axios.get(process.env.REACT_APP_BACKEND_URL + '/product/')
        .then(data => data.data)
        .catch(err => err)

    return data

}

export const getOneProductApi = async (id) => {

    const data = axios.get(process.env.REACT_APP_BACKEND_URL + '/product/product-details/' + id)
        .then(data => data.data)
        .catch(err => err)

    return data

}


export const updateOneProductApi = async (id, obj, arr) => {

    console.log(obj);
    const data = axios.put(process.env.REACT_APP_BACKEND_URL + '/product/' + id, obj, {
        headers: { arr: arr }
    })
        .then(data => data.data)
        .catch(err => err)
    return data

}


export const deleteProductApi = async (id) => {

    const data = axios.delete(process.env.REACT_APP_BACKEND_URL + '/product/' + id)
        .then(data => data.data)
        .catch(err => err)
    return data

}



