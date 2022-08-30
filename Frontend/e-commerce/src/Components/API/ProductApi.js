import axios from 'axios'

export const createProductApi = async() => {

    axios.post(process.env.REACT_APP_BACKEND_URL + '/product/create')

    return

}