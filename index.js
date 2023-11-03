/*
    # Tugas Sesi 4
    1. Buat api delete user.
    2. Modifikasi api create user, update user
        - response yang di berikan adalah data user detail yang di create / update.
    3. buat Api login dengan sepesifikasi berikut :
       - path yang dibuat /login
       - method post
       - request body yang diberikan email dan password.
       - jika cocok email dan password maka berikan response data user tersebut.
       - bila tidak cocok maka berikan response dengan message "email atau password salah".
    3. buat table tasks dengan kolom : 
        - task_id (int)
        - user_id (int)
        - task_name (varchar)
        - task_description (varchar)
        - is_done (int) => isi valuenya 1 atau 0
    4. Buat fungsi Create, Read, update dan delete untuk table tasks diatas;
*/
import * as UserService from './services/user.js';
import express from 'express';

const host = "127.0.0.1";
const port = 8080;
const app = express();
app.use(express.json());
app.get("/users", UserService.getUser);
app.post("/users", UserService.cerateUser);
app.put("/users/:id", UserService.updateUser);
app.delete("/users/:id", UserService.deleteUser);
app.post("/login", UserService.getLoginInfo);

app.listen(port, host, () => {
    console.log(`server berjalan di http://${host}:${port}`);
});