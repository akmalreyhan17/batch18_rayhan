import dbPool from "../utils/db.js";

const getData = () => {
    const query = "SELECT * FROM checkout";

    return dbPool.query(query)
}

const sortDataByDate = () => {
    const query = "SELECT checkout_id, customer.nama as nama_customer, nomor_hp, alamat, product.nama as nama_produk, harga, jumlah"
                    + " FROM checkout INNER JOIN customer ON checkout.customer_id=customer.customer_id"
                    + " INNER JOIN checkout.product_id=product.product_id ORDER BY created_at DESC";

    return dbPool.query(query)
}

const createData = (product_id, customer_id, jumlah) => {
    let createdAt = new Date();
    const query = "INSERT INTO checkout(product_id, customer_id, jumlah, created_at) VALUES (?,?,?,?)";
    const value = [product_id, customer_id, jumlah, createdAt];

    return dbPool.query(query, value);
}

const getDataById = (id) => {
    const query = "SELECT checkout_id, product_id, customer_id, jumlah, created_at FROM checkout WHERE checkout_id=?";

    return dbPool.query(query,[id]);
}

const updateData = (id, product_id, customer_id, jumlah) => {
    let updatedAt = new Date();
    const query = "UPDATE checkout SET product_id = ?, customer_id = ?, jumlah = ?, updated_at = ? WHERE checkout_id=?";
    const values = [product_id, customer_id, jumlah, updatedAt, id];

    return dbPool.query(query,values);
}

const deleteDataById = (id) => {
    const query = "DELETE FROM checkout WHERE checkout_id=?";

    return dbPool.query(query,[id]);
}

export { createData, getData, getDataById, updateData, deleteDataById, sortDataByDate }
