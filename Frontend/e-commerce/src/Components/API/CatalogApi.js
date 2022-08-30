import axios from 'axios';

export const getCatalogApi = async () => {

    const data = axios.get(process.env.REACT_APP_BACKEND_URL + '/catalog/')
        .then(data => data.data)
        .catch(err => err)

    return data
}