import { getData, createData, getDataById, updateData, deleteDataById, getLoginData } from "../repositories/users.js";
import { errorResponse, successResponse, successCreate, successUpdate } from "../utils/response.js";

export const cerateUser = async (request, response, next) => {
    try {
        let name = request.body.name;
        let email = request.body.email;
        let password = request.body.password;

        const [result] = await createData(name, email, password)

        if(result.insertId > 0) {
            //successResponse(response, "sucess", result.insertId);
            successCreate(response, "success", result.insertId, name, email, password)
        } else {
            errorResponse(response, "failed create data")
        }
    } catch(error) {
        next(error)
    }
    
}

export const getUser = async (request, response, next) => {
    try{
        const [result] = await getData();

        if(result.length > 0) {
            successResponse(response, "success", result);
        } else {
            errorResponse(response, "data not found", 404);
        }
    } catch(error) {
        next(error);
    }
    
}

export const getLoginInfo = async (request, response, next) => {
    try{
        let email = request.body.email;
        let password = request.body.password;

        const [result] = await getLoginData(email, password);

        if(result.length > 0) {
            successResponse(response, "Success Login", result[0]);
        } else {
            errorResponse(response, "data not found", 404);
        }
    } catch(error) {
        next(error);
    }
    
}

export const getUserById = async(id) => {
    const [result] = await getDataById(id);

    if(result.length > 0) {
        console.log(result[0]);
    } else {
        console.log(`data user tidak di temukan`)
    }
    
}

export const updateUser = async (request, response, next) => {
    try {
        let id = request.params.id;
        let name = request.body.name;
        let email = request.body.email;
        let password = request.body.password;

        const [result]= await updateData(id, name, email);
        if (result.affectedRows > 0){
            //successResponse(response, "success update data", result.affectedRows);
            successUpdate(response, "success", response.insertId, name, email, password)
        } else {
            errorResponse(response, "user id not found!")
        }
    } catch(error) {
        next(error)
    }
}

export const deleteUser = async (request, response, next) => {
    try {
        let id = request.params.id;

        const [result]= await deleteDataById(id);
        if (result.affectedRows > 0){
            successResponse(response, "success delete data", result.affectedRows);
        } else {
            errorResponse(response, "user id not found!")
        }
    } catch(error) {
        next(error)
    }
}