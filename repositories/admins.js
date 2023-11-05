import dbPool from "../utils/db.js";

const getData = () => {
    const query = "SELECT * FROM toko";

    return dbPool.query(query)
}

const getDataByEmail = (email) => {
    const query = "SELECT admin_id, nama, email, password, nomor_pegawai FROM toko WHERE email = ?";

    return dbPool.query(query, [email])
}

const createData = (nama, email, password, nomor_pegawai) => {
    let createdAt = new Date();
    const query = "INSERT INTO toko(nama, email, password, nomor_pegawai, created_at) VALUES (?,?,?,?,?)";
    const value = [nama, email, password, nomor_pegawai, createdAt];

    return dbPool.query(query, value);
}

const getDataById = (id) => {
    const query = "SELECT admin_id, nama, email, password, nomor_pegawai, created_at FROM toko WHERE admin_id=?";

    return dbPool.query(query,[id]);
}

const updateData = (id, nama, email, nomor_pegawai) => {
    let updatedAt = new Date();
    const query = "UPDATE toko SET nama = ?, email = ?, nomor_pegawai = ?, updated_at = ? WHERE admin_id=?";
    const values = [nama, email, nomor_pegawai, updatedAt, id];

    return dbPool.query(query,values);
}

const deleteDataById = (id) => {
    const query = "DELETE FROM toko WHERE admin_id=?";

    return dbPool.query(query,[id]);
}

export { createData, getData, getDataById, updateData, deleteDataById, getDataByEmail }
