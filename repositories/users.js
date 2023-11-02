import dbPool from "../utils/db.js";

const getData = () => {
    const query = "SELECT user_id, name, email, password, created_at FROM users";

    return dbPool.query(query)
}

const createData = (name, email, password) => {
    let createdAt = new Date();
    const query = "INSERT INTO users(name, email, password, created_at) VALUES (?,?,?,?)";
    const value = [name, email, password, createdAt];

    return dbPool.query(query, value);
}

const getDataById = (id) => {
    const query = "SELECT user_id, name, email, password, created_at FROM users where user_id=?";

    return dbPool.query(query,[id]);
}

const updateDataById = (id, name, email) => {
    const query = "UPDATE users SET name = ?, email = ? WHERE user_id = ?";
    const value = [name, email, id];

    return dbPool.query(query, value);
}

const deleteDataById = (id) => {
    const query = "DELETE FROM users where user_id = ?";

    return dbPool.query(query, [id]);
}

export { createData, getData, getDataById, updateDataById, deleteDataById }
