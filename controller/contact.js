import { database } from "../db/db.js";
import { contactModel } from "../model/model.js";
import { contactAdd } from "../service/contactController.js";

export const contact = async (req, res) => {
  try {
    const { name, email, contact, message } = req.body;

    const response = new contactModel({ name, email, contact, message });

    const result = await contactAdd(response);

    if (result.success) {
      res.status(201).json({
        status: "success",
        message: "contact add successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "error",
      error: result.error,
    });
  }
};

// get all contact
export const getAllContact = async (req, res) => {
  try {
    const [response] = await database.query(`SELECT * FROM contact`);

    res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      status: error,
    });
  }
};

// update conatct

export const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, contact, message } = req.body;
    
    const [response] = await database.query(
      `UPDATE contact SET name=?,email=?,contact=?,message=? WHERE id=?`,
      [name,email,contact,message,id]
    );

 
    
    res.status(201).json({
      status: "success",
      message:"contact update successfully",
      
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err,
    });
    console.log(err);
  }
};



export const deleteContact = async (req,res)=>{
    try {
        const {id} = req.params;
        const [response] = await database.query(`DELETE  FROM contact WHERE id=?`,[id]);

        res.status(200).json({
            status:"success",
            message:"delete contact successfully"
        })

    } catch (error) {
        res.status(500).json({
            status:"error"
        })
    }
} 
