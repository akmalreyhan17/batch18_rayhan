import dbPool from "../utils/db.js";

const getData = () => {
    const query = "SELECT task_id, user_id, task_name, task_description, is_done FROM tasks";

    return dbPool.query(query)
}

const createData = (task_name, task_description, is_done) => {
    const query = "INSERT INTO tasks(task_name, task_description, is_done) VALUES (?,?,?)";
    const value = [task_name, task_description, is_done];

    return dbPool.query(query, value);
}

const getDataById = (id) => {
    const query = "SELECT task_id, user_id, task_name, task_description, is_done FROM tasks where task_id=?";

    return dbPool.query(query,[id]);
}

const updateDataById = (id, task_name, task_description, is_done) => {
    const query = "UPDATE tasks SET task_name = ?, task_description = ?, is_done = ? WHERE task_id = ?";
    const value = [task_name, task_description, is_done, id];

    return dbPool.query(query, value);
}

const deleteDataById = (id) => {
    const query = "DELETE FROM tasks where task_id = ?";

    return dbPool.query(query, [id]);
}

export { createData, getData, getDataById, updateDataById, deleteDataById }
