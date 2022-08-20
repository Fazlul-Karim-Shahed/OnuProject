
import jwtDecode from "jwt-decode"

export const saveToken = async (value) => {

    const token = localStorage.getItem('token')
    if (token) {
        localStorage.removeItem('token')
        localStorage.setItem('token', value)
    }
    else {
        localStorage.setItem('token', value)
    }

}

export const checkAuth = async () => {

    const token = localStorage.getItem('token')
    if (token) {
        let data = await jwtDecode(token)
        if (data) {
            let time = new Date().getTime()
            if (time < new Date(data.exp * 1000)) return true;
            else return false
        }
        else return false
    }
    else return false

}