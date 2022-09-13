
import axios from "axios"

export const createProductPropertiesApi = formData => {

    let data = axios.post(process.env.REACT_APP_BACKEND_URL + '/product-properties', formData)
        .then(data => data.data)
        .catch(err => err)

    return data

}

export const deleteProductPropertiesApi = item => {

    let data = axios.delete(process.env.REACT_APP_BACKEND_URL + '/product-properties', item)
        .then(data => data.data)
        .catch(err => err)

    return data

}