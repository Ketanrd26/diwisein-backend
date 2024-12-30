import { database } from "../db/db.js";

export const addUser = async (user) => {
  try {
    const querris = `INSERT INTO users (username,password) VALUES (?,?)`;
    const values = [user.username, user.password];

    await database.query(querris, values);

    return{
        success:true,
        message:"user add successfully"
    }
  } catch (error) {
    return{
        success:false,
        message:error
    }
  }
};
