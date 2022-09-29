
import axios from "axios"

export const createProductPropertiesApi = formData => {

    let data = axios.post(process.env.REACT_APP_BACKEND_URL + '/product-properties', formData)
        .then(data => data.data)
        .catch(err => err)

    return data

}

export const deleteProductPropertiesApi = item => {
    console.log('Delete fun: ', item);

    let data = axios.delete(process.env.REACT_APP_BACKEND_URL + '/product-properties/' + item._id)
        .then(data => data.data)
        .catch(err => err)

    return data

}

export const getOneProductProperties = id => {

    const data = axios.get(process.env.REACT_APP_BACKEND_URL + '/product-properties/' + id)
        .then(data => data.data)
        .catch(err => err)
    return data

}

export const getAllProductPropertiesApi = id => {

    let data = axios.get(process.env.REACT_APP_BACKEND_URL + '/product-properties/')
        .then(data => data.data)
        .catch(err => err)

    return data

}