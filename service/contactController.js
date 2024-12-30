import { database } from "../db/db.js";

export const contactAdd = async (contact)=>{
    try {
      const query = `INSERT INTO contact (name, email, contact, message) VALUES (?, ?, ?, ?)`;
      const values = [contact.name,contact.email,contact.contact,contact.message];


      await database.query(query,values);

      return{
        success:true,
        message:"contact add successfully"
      }
    } catch (error) {
        return{
            success:false,
            message:error
        }
    }
}