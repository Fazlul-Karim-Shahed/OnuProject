import { Buffer } from 'buffer'

export const idealObject = obj => {

    let newObj = {}
    for (let i in obj) {

        if (obj[i] === '')
            continue
        else {
            newObj[i] = obj[i]
        }

    }

    return newObj

}

export const base64StringFun = async (buff) => {

    // let data = await btoa(String.fromCharCode(...new Uint8Array(buff)))
    let data = await Buffer.from(buff, 'base64');
    console.log(data);
    return data

}