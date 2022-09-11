import axios from 'axios'

export const createFinishingApi = obj => {

    const data = axios.post(process.env.REACT_APP_BACKEND_URL + '/properties/finishing/create', obj)
        .then(data => data.data)
        .catch(err => err)
    return data

}