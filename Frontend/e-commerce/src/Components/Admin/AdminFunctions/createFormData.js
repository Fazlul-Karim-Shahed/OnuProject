

export const createFormData = (obj) => {

    let formData = new FormData()

    for (var i in obj) {

        if (i === 'photo') {
            for (var j in obj[i]) {
                formData.append("photo" + j, obj[i][j]);
            }

        }
        else {
            formData.append(i, obj[i]);
        }
    }

    return formData

}

export const updateProductFormData = (obj) => {

    let formData = new FormData()

    for (var i in obj) {
        
        if (i === 'addedPhoto') {
            for (var j in obj[i]) {
                formData.append("addedPhoto" + j, obj[i][j]);
            }
        }

        else {
            formData.append(i, obj[i]);
        }

    }


    return formData

}

