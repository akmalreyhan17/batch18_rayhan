export const successResponse = (response, message, data, status=200) => {
    return response.status(status).json({
        status: status,
        message: message, 
        data: data
    });
}

export const successCreate = (response, message, data, name, email, password, status=200) => {
    return response.status(status).json({
        message: message, 
        data: data,
        name: name,
        email: email,
        password: password
    });
}

export const successUpdate = (response, message, data, name, email, password, status=200) => {
    return response.status(status).json({
        message: message, 
        data: data,
        name: name,
        email: email,
        password: password
    });
}

export const errorResponse = (response, message, status=400) => {
    return response.status(status).json({
        status: status,
        message: message,
    });
}