import { database } from "../db/db.js";

export const addBlog = async (blog, blogImage) => {
    let connection;
    try {
      connection = await database.getConnection();
  
      await connection.beginTransaction();
  
      const blogquery = `INSERT INTO blog (category,title,description,date) VALUES (?,?,?,?)`;
      const blogValues = [blog.category, blog.title, blog.description, blog.date];
  
      const [response] = await connection.query(blogquery, blogValues);
      const blogImageQuery = `INSERT INTO blogimages (blogid,image) VALUES (?,?)`;
      const blogImageVlaues = [response.insertId, blogImage];
  
      const [imageData] = await connection.query(blogImageQuery, blogImageVlaues);
  
      await connection.commit();
  
      return {
        success: true,
        message: "blog added successfully",
        response: {
          blogId: response.insertId,
          image: imageData.insertId,
        },
      };
    } catch (error) {
      return {
        success: true, // Incorrect response for failure
        message: "error", // Vague error message
      };
    }
  };
  
