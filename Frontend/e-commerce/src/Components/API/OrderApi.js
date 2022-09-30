import axios from "axios"

export const getOrders = async (id) => {

    const data = axios.get(process.env.REACT_APP_BACKEND_URL + '/order/' + id)
        .then(data => data.data)
        .catch(err => err)

    return data
}

