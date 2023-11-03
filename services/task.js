import { getData, createData, getDataById, updateDataById, deleteDataById } from "../repositories/tasks.js";

export const cerateTask = async (name, email, password) => {
    const [result] = await createData(name, email, "pass1234")

    if(result.insertId > 0) {
        console.log(`data user berhasil di buat dengan id: ${result.insertId}`)
    } else {
        console.log("data gagal di buat");
    }
}

export const getUser = async () => {
    const [result] = await getData();

    if(result.length > 0) {
        console.log(result);
    } else {
        console.log(`data user tidak ada`)
    }
}

export const getUserById = async(id) => {
    const [result] = await getDataById(id);

    if(result.length > 0) {
        console.log(result[0]);
    } else {
        console.log(`data user tidak di temukan`)
    }
}

export const updateUserById = async(id, name, email) => {
    const [result] = await updateDataById(id, name, email);

    if(result.length > 0) {
        console.log(`data user berhasil diupdate: ${result.affectedRows}`);
    } else {
        console.log(`data user gagal diupdate`)
    }
}

export const deleteUserById = async(id) => {
    const [result] = await deleteDataById(id);

    if(result.length > 0) {
        console.log(`data user gagal dihapus`);
    } else {
        console.log(`data user berhasil dihapus`)
    }
}