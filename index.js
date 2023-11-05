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
import * as CustomerService from './services/customer.js';
import * as AdminService from './services/admin.js';
import * as ProductService from './services/product.js';
import express from 'express';

const host = "127.0.0.1";
const port = 8080;
const app = express();
app.use(express.json());
app.get("/users", UserService.validateToken, UserService.getUser);
app.post("/users", UserService.cerateUser);
app.put("/users/:id", UserService.updateUser);
app.delete("/users/:id", UserService.deleteUser);
app.post("/login", UserService.getLoginInfo);

app.post("/customers", CustomerService.createCustomer);
app.post("/logincustomer", CustomerService.getLoginCustomer);
app.get("/profile", CustomerService.validateToken1, CustomerService.getCustomerById);
app.put("/profile", CustomerService.validateToken1, CustomerService.updateCustomer);
app.delete("/profile", CustomerService.validateToken1, CustomerService.deleteCustomer);

app.post("/admins", AdminService.createAdmin);
app.post("/loginadmin", AdminService.getLoginAdmin);
app.get("/admins", AdminService.validateToken2, AdminService.getAllAdmin);
app.get("/admins/:id", AdminService.validateToken2, AdminService.getAdminById);
app.get("/adminprofile", AdminService.validateToken2, AdminService.getAdminSelf);
app.put("/adminprofile", AdminService.validateToken2, AdminService.updateAdmin);
app.delete("/adminprofile", AdminService.validateToken2, AdminService.deleteAdmin);
app.get("/customers", AdminService.validateToken2, AdminService.getAllCostumer);
app.get("/customers/:id", AdminService.validateToken2, AdminService.getCustomerById);

app.get("/products", ProductService.getAllProduct);
app.post("/products", AdminService.validateToken2, ProductService.createProduct);
app.put("/products/:id", AdminService.validateToken2, ProductService.updateProduct);
app.delete("/products/:id", AdminService.validateToken2, ProductService.deleteProduct);
//rest

app.listen(port, host, () => {
    console.log(`server berjalan di http://${host}:${port}`);
});