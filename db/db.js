import mysql from "mysql2/promise.js";

const database = mysql.createPool({
    host:"62.72.56.158",
    user:"devloper",
    password:"root@123",
    database:"diwisein"
});


const checkConnection = async (req,res)=>{
    try {
        const connection = await database.getConnection();
       
        console.log("database connected")
    } catch (error) {
        console.log(error)
    }
}

export {database,checkConnection }