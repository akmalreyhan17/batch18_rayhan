import { getData, createData, getDataById, updateData, deleteDataById, getDataByEmail } from "../repositories/customers.js";
import { errorResponse, successResponse, successCreate, successUpdate } from "../utils/response.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import { request, response } from "express";

const SECRET_ACCESS_TOKEN = "kelas.com";
const SECRET_REFRESH_TOKEN = "backend";

export const createCustomer = async (request, response, next) => {
    try {
        let nama = request.body.nama;
        let email = request.body.email;
        let password = request.body.password;
        let nomor_hp = request.body.nomor_hp;
        let alamat = request.body.alamat;
        let saltRound = 10;

        bcrypt.hash(password, saltRound, async (err, hashedPassword) =>{
            const [result] = await createData(nama, email, hashedPassword, nomor_hp, alamat);
            const [users] = await getDataById(result.insertId)
            //const [users1] = await getDataByEmail(email);

            if(users.length > 0) {
                //successResponse(response, "sucess", result.insertId);
                successCreate(response, "success", users[0]);
            } else {
                errorResponse(response, "failed create data")
            }
        })

        
    } catch(error) {
        next(error)
    }
    
}

export const getCustomer = async (request, response, next) => {
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

export const getLoginCustomer = async (request, response, next) => {
    try{
        let email = request.body.email;
        let pass = request.body.password;

        const [users] = await getDataByEmail(email);

        if(users.length > 0) {
            let user = users[0];
            bcrypt.compare(pass, user.password, (err, isValid) => {
                if(isValid) {
                    let payload = {
                        id: user.customer_id,
                        nama: user.nama,
                        email: user.email,
                        nomor_hp: user.nomor_hp,
                        alamat: user.alamat
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

export const validateToken1 = (request, response, next) => {
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

export const getCustomerById = async(request, response, next) => {
    try {
        //console.log(request.claims)
        //console.log(request.claims.customer_id)
        let cust_id = request.claims.id;
        const[result] = await getDataById(cust_id);

        if(result.length > 0){
            successResponse(response, "profil berhasil didapat", result[0])
        } else{
            errorResponse(response, "profil tidak ditemukan", 403)
        }
    } catch(error) {
        next(error);
    }
    
}

export const updateCustomer = async (request, response, next) => {
    try {
        let id = request.claims.id;
        let nama = request.body.nama;
        let email = request.body.email;
        let nomor_hp = request.body.nomor_hp;
        let alamat = request.body.alamat;

        const [result]= await updateData(id, nama, email, nomor_hp, alamat);
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

export const deleteCustomer = async (request, response, next) => {
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

