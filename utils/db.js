import mysql from 'mysql2/promise';

const dbPool = mysql.createPool({
    host:"127.0.0.1",
    user: "root", 
    password: "1234",
    database: "batch_18",
    port: 3306
});
export default dbPool;