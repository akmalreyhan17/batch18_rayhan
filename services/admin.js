import { getData, createData, getDataById, updateData, deleteDataById, getDataByEmail } from "../repositories/admins.js";
import { getData as getCostumerData } from "../repositories/customers.js";
import { getDataById as getCostumerDataByID } from "../repositories/customers.js";
import { errorResponse, successResponse } from "../utils/response.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import { request, response } from "express";

const SECRET_ACCESS_TOKEN = "admin";
const SECRET_REFRESH_TOKEN = "admin123";

export const createAdmin = async (request, response, next) => {
    try {
        let nama = request.body.nama;
        let email = request.body.email;
        let password = request.body.password;
        let nomor_pegawai = request.body.nomor_pegawai;
        let saltRound = 10;

        bcrypt.hash(password, saltRound, async (err, hashedPassword) =>{
            const [result] = await createData(nama, email, hashedPassword, nomor_pegawai);
            const [users] = await getDataById(result.insertId)

            if(users.length > 0) {
                //successResponse(response, "sucess", result.insertId);
                successResponse(response, "success", users[0]);
            } else {
                errorResponse(response, "failed create data")
            }
        })

        
    } catch(error) {
        next(error)
    }
    
}

export const getAllAdmin = async (request, response, next) => {
    try{
        //console.log(request.claims.email)
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

export const getAllCostumer = async (request, response, next) => {
    try{
        //console.log(request.claims.email)
        const [result] = await getCostumerData();

        if(result.length > 0) {
            successResponse(response, "success", result);
        } else {
            errorResponse(response, "data not found", 404);
        }
    } catch(error) {
        next(error);
    }
    
}

export const getLoginAdmin = async (request, response, next) => {
    try{
        let email = request.body.email;
        let pass = request.body.password;

        const [users] = await getDataByEmail(email);

        if(users.length > 0) {
            let user = users[0];
            bcrypt.compare(pass, user.password, (err, isValid) => {
                if(isValid) {
                    let payload = {
                        id: user.admin_id,
                        nama: user.nama,
                        email: user.email,
                        nomor_pegawai: user.nomor_pegawai
                    };
                    let accessToken = jwt.sign(payload, SECRET_ACCESS_TOKEN, {expiresIn:"15m"});
                    let refreshToken = jwt.sign(payload, SECRET_REFRESH_TOKEN, { expiresIn:"30m"});
                    let data = {
                        access_token : accessToken, 
                        refresh_token : refreshToken,
                    }
                    successResponse(response, "success", data);
                } else {
                    errorResponse(response, "email atau password salah",401);
                }
            })
        }
    } catch(error) {
        next(error);
    }
    
}

export const validateToken2 = (request, response, next) => {
    try {
        let authToken = request.headers.authorization;
        let accessToken = authToken && authToken.split(' ')[1]; // Bearer accessToken
        
        jwt.verify(accessToken, SECRET_ACCESS_TOKEN, (error, payload) => {
            if (!error) {
                request.claims = payload;
                next()
            } else {
                errorResponse(response, error.message, 403);
            }
        })
    } catch(error) {
        next(error);
    }
}

export const getAdminById = async(request, response, next) => {
    try {
        let adm_id = request.params.id;
        const[result] = await getDataById(adm_id);

        if(result.length > 0){
            successResponse(response, "profil berhasil didapat", result[0])
        } else{
            errorResponse(response, "profil tidak ditemukan", 403)
        }
    } catch(error) {
        next(error);
    }
    
}

export const getCustomerById = async(request, response, next) => {
    try {
        let cst_id = request.params.id;
        const[result] = await getCostumerDataByID(cst_id);

        if(result.length > 0){
            successResponse(response, "profil berhasil didapat", result[0])
        } else{
            errorResponse(response, "profil tidak ditemukan", 403)
        }
    } catch(error) {
        next(error);
    }
    
}

export const getAdminSelf = async(request, response, next) => {
    try {
        let adm_id = request.claims.id;
        const[result] = await getDataById(adm_id);

        if(result.length > 0){
            successResponse(response, "profil berhasil didapat", result[0])
        } else{
            errorResponse(response, "profil tidak ditemukan", 403)
        }
    } catch(error) {
        next(error);
    }
    
}

export const updateAdmin = async (request, response, next) => {
    try {
        let id = request.claims.id;
        let nama = request.body.nama;
        let email = request.body.email;
        let nomor_pegawai = request.body.nomor_pegawai

        const [result]= await updateData(id, nama, email, nomor_pegawai);
        const [users] = await getDataById(id)

        if (result.affectedRows > 0){
            successResponse(response, "success", users[0])
        } else {
            errorResponse(response, "user id not found!")
        }
    } catch(error) {
        next(error)
    }
}

export const deleteAdmin = async (request, response, next) => {
    try {
        let id = request.claims.id;

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

