import dbPool from "../utils/db.js";

const getData = () => {
    const query = "SELECT * FROM customer";

    return dbPool.query(query)
}

const getDataByEmail = (email) => {
    const query = "SELECT customer_id, nama, email, password, nomor_hp, alamat FROM customer WHERE email = ?";

    return dbPool.query(query, [email])
}

const createData = (nama, email, password, nomor_hp, alamat) => {
    let createdAt = new Date();
    const query = "INSERT INTO customer(nama, email, password, nomor_hp, alamat, created_at) VALUES (?,?,?,?,?,?)";
    const value = [nama, email, password, nomor_hp, alamat, createdAt];

    return dbPool.query(query, value);
}

const getDataById = (id) => {
    const query = "SELECT customer_id, nama, email, password, nomor_hp, alamat, created_at FROM customer WHERE customer_id=?";

    return dbPool.query(query,[id]);
}

const updateData = (id, nama, email, nomor_hp, alamat) => {
    let updatedAt = new Date();
    const query = "UPDATE customer SET nama = ?, email = ?, nomor_hp = ?, alamat = ?, updated_at = ? WHERE customer_id=?";
    const values = [nama, email, nomor_hp, alamat, updatedAt, id];

    return dbPool.query(query,values);
}

const deleteDataById = (id) => {
    const query = "DELETE FROM customer WHERE customer_id=?";

    return dbPool.query(query,[id]);
}

export { createData, getData, getDataById, updateData, deleteDataById, getDataByEmail }
