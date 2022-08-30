import axios from 'axios'


export const getSubCategoryApi = () => {
    let data = axios.get(process.env.REACT_APP_BACKEND_URL + '/subcategory/')
        .then(data => data.data)
        .catch(err => err)
    return data
}



export const deleteSubCategoryApi = (id) => {
    let data = axios.delete(process.env.REACT_APP_BACKEND_URL + '/subcategory/' + id)
        .then(data => data.data)
        .catch(err => err)
        
    return data
}