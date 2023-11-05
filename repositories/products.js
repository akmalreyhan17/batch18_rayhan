import dbPool from "../utils/db.js";

const getData = () => {
    const query = "SELECT * FROM product";

    return dbPool.query(query)
}

const sortDataByPriceASC = () => {
    const query = "SELECT product_id, nama, deskripsi, harga, stok FROM product ORDER BY harga ASC";

    return dbPool.query(query)
}

const sortDataByPriceDESC = () => {
    const query = "SELECT product_id, nama, deskripsi, harga, stok FROM product ORDER BY harga DESC";

    return dbPool.query(query)
}

const createData = (nama, deskripsi, harga, stok) => {
    let createdAt = new Date();
    const query = "INSERT INTO product(nama, deskripsi, harga, stok, created_at) VALUES (?,?,?,?,?)";
    const value = [nama, deskripsi, harga, stok, createdAt];

    return dbPool.query(query, value);
}

const getDataById = (id) => {
    const query = "SELECT product_id, nama, deskripsi, harga, stok, created_at FROM product WHERE product_id=?";

    return dbPool.query(query,[id]);
}

const updateData = (id, nama, deskripsi, harga, stok) => {
    let updatedAt = new Date();
    const query = "UPDATE product SET nama = ?, deskripsi = ?, harga = ?, stok = ?, updated_at = ? WHERE product_id=?";
    const values = [nama, deskripsi, harga, stok, updatedAt, id];

    return dbPool.query(query,values);
}

const deleteDataById = (id) => {
    const query = "DELETE FROM product WHERE product_id=?";

    return dbPool.query(query,[id]);
}

export { createData, getData, getDataById, updateData, deleteDataById, sortDataByPriceASC, sortDataByPriceDESC }
