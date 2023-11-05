import { createData, getDataById, updateData, deleteDataById, sortDataByDate } from "../repositories/purchases.js";
import { errorResponse, successResponse } from "../utils/response.js";


export const createPurchase = async (request, response, next) => {
    try {
        let nama = request.body.nama;
        let deskripsi = request.body.deskripsi;
        let harga = request.body.harga;
        let stok = request.body.stok;

        const [result] = await createData(nama, deskripsi, harga, stok);
        const [users] = await getDataById(result.insertId)

        if(users.length > 0) {
            //successResponse(response, "sucess", result.insertId);
            successResponse(response, "success", users[0]);
        } else {
            errorResponse(response, "failed create data")
        }
        
    } catch(error) {
        next(error)
    }
    
}

export const getAllProduct = async (request, response, next) => {
    try{
        //console.log(request.claims.email)
        let ordering = request.body.ordering
        if(ordering=="ascending") {
            const [result] = await sortDataByPriceASC();
            if(result.length > 0) {
                successResponse(response, "success", result);
            } else {
                errorResponse(response, "data not found", 404);
            }
        } else if(ordering=="descending") {
            const [result] = await sortDataByPriceDESC();
            if(result.length > 0) {
                successResponse(response, "success", result);
            } else {
                errorResponse(response, "data not found", 404);
            }
        }

    } catch(error) {
        next(error);
    }
    
}

export const getProductById = async(request, response, next) => {
    try {
        let prd_id = request.params.id;
        const[result] = await getDataById(prd_id);

        if(result.length > 0){
            successResponse(response, "produk berhasil didapat", result[0])
        } else{
            errorResponse(response, "produk tidak ditemukan", 403)
        }
    } catch(error) {
        next(error);
    }
    
}

export const updateProduct = async (request, response, next) => {
    try {
        let id = request.params.id;
        let nama = request.body.nama;
        let deskripsi = request.body.deskripsi;
        let harga = request.body.harga
        let stok = request.body.stok

        const [result]= await updateData(id, nama, deskripsi, harga, stok);
        const [users] = await getDataById(id)

        if (result.affectedRows > 0){
            successResponse(response, "success", users[0])
        } else {
            errorResponse(response, "product not found!")
        }
    } catch(error) {
        next(error)
    }
}

export const deleteProduct = async (request, response, next) => {
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

