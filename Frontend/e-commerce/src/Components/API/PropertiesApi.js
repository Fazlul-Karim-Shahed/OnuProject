import axios from 'axios'

export const createFinishingApi = obj => {

    const data = axios.post(process.env.REACT_APP_BACKEND_URL + '/properties/finishing/create', obj)
        .then(data => data.data)
        .catch(err => err)
    return data

}

export const createFinishingColorApi = obj => {

    const data = axios.post(process.env.REACT_APP_BACKEND_URL + '/properties/finishing-color/create', obj)
        .then(data => data.data)
        .catch(err => err)
    return data

}

export const createSizeApi = obj => {

    const data = axios.post(process.env.REACT_APP_BACKEND_URL + '/properties/size/create', obj)
        .then(data => data.data)
        .catch(err => err)
    return data

}

export const createPartsInfoApi = obj => {

    const data = axios.post(process.env.REACT_APP_BACKEND_URL + '/properties/parts-info/create', obj)
        .then(data => data.data)
        .catch(err => err)
    return data

}

export const createCustomApi = obj => {

    // const data = axios.post(process.env.REACT_APP_BACKEND_URL + '/properties/size/create', obj)
    //     .then(data => data.data)
    //     .catch(err => err)
    // return data

}

export const getOneProductAllProperties = id => {

    const data = axios.get(process.env.REACT_APP_BACKEND_URL + '/properties/all-properties/' + id)
        .then(data => data.data)
        .catch(err => err)
    return data

}



export const getAllPropertiesApi = () => {

    const data = axios.get(process.env.REACT_APP_BACKEND_URL + '/properties/all-properties/' )
        .then(data => data.data)
        .catch(err => err)
    return data

}

