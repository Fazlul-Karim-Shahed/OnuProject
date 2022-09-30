
import axios from "axios";

export const createPaymentApi = async (obj) => {

    let data = axios.post(process.env.REACT_APP_BACKEND_URL + '/payment/create', obj)
        .then(data => {
            return data.data
        })
        .catch(err => err)

    return data

}