/*
    # Tugas Sesi 3
    1. Buat fungsi untuk mengupdate data user berdasarkan id
        - value yang di update adalah name dan email
    2. Buat fungsi untuk menghapus data user berdasarkan id
    3. buat table tasks dengan kolom : 
        - task_id (int)
        - user_id (int)
        - task_name (varchar)
        - task_description (varchar)
        - is_done (int) => isi valuenya 1 atau 0
    4. Buat fungsi Create, Read, update dan delete untuk table tasks diatas;
*/
import * as UserService from './services/user.js';

console.log("jalankan function create data");
await UserService.cerateUser("Rovi", "Rovi@gmail.com", "pass1234")
console.log("jalankan fungsi get data");

await UserService.getUser();

console.log("jalankan fungi get detail");

await UserService.getUserById(3);