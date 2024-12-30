import { database } from "../db/db.js";
import { userModel } from "../model/model.js";
import { addUser } from "../service/userService.js";

export const userAdd = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = new userModel({ username, password });

    const response = await addUser(user);

    if (response.success) {
      res.status(200).json({
        status: "success",
        message: "user added successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error,
    });
  }
};

// login

export const login = async (req, res) => {
    try {
      const { username, password } = req.body;
  
     
      const [response] = await database.query(
        `SELECT * FROM users WHERE username=?`,
        [username]
      );
  
   
      if (response.length === 0) {
        return res.status(400).json({
          status: "error",
          message: "Invalid username or password",
        });
      }
  
     
      const user = response[0];
  
   
      res.status(200).json({
        status: "success",
        message: "Login successful",
        response: user,
      });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({
        status: "error",
        message: "An unexpected error occurred",
      });
    }
  };
  
