import axios from 'axios';

export const getCategoryApi = async () => {

    const data = axios.get(process.env.REACT_APP_BACKEND_URL + '/category/')
        .then(data => data.data)
        .catch(err => err)

    return data
}

export const getCategoryByCatalogApi = async (id) => {

    const data = axios.get(process.env.REACT_APP_BACKEND_URL + '/category/id/' + id)
        .then(data => data.data)
        .catch(err => err)

    return data
}

export const getSubCategoryFilterApi = async (catalogId, categoryId) => {

    const data = axios.get(process.env.REACT_APP_BACKEND_URL + `/subcategory/filter/${catalogId}/${categoryId}`)
        .then(data => data.data)
        .catch(err => err)

    return data
}