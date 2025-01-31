import { json } from "express";
import { database } from "../db/db.js";
import { addBlog } from "../service/blogService.js";

export const blogadd = async (req, res) => {
  try {
    const blogData = JSON.parse(req.body.blog);
    const blogImage = req.file?.filename;
    
   
    if (!blogImage) {
      return res.status(400).json({
        status: "error",
        message: "Image is required",
      });
    }

    const { category, title, description, date } = blogData;

    const result = await addBlog(
      { category, title, description, date },
      blogImage
    );

    if (!result.success) {
      return res.status(500).json({
        status: "error",
        message: result.message,
      });
    }

    res.status(201).json({
      status: "success",
      message: "Blog added successfully",
      data: result.response,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message || "An error occurred",
    });
  }
};

export const getAllBlog = async (req, res) => {
  try {
    const [response] = await database.query(
      `SELECT * FROM blog INNER JOIN blogimages ON blog.id = blogimages.blogid`
    );

    res.status(200).json({
      status: "success",
      response,
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    const [response] = await database.query(
      `SELECT * FROM  blog LEFT JOIN blogimages AS bi ON blog.id = bi.id WHERE blog.id=?`,
      [id]
    );

    res.status(200).json({
      message: "successfully",
      response,
    });
  } catch (error) {
    res.status(500).json({
      message: "error",
      error,
    });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const [response] = await database.query(`DELETE FROM blog WHERE id=?`, [
      id,
    ]);

    res.status(200).json({
      status: "success",
      response,
    });
  } catch (err) {
    res.status(500).json({
      message:"error",
      err
    })
  }
};


export const updateBlog = async (req, res) => {
  let connection;
  try {
    const { id } = req.params;

    // Parse blog data safely
    const blogData = JSON.parse(req.body.blog || '{}');
    const { category, title, description, date } = blogData;

    // Get uploaded image filename
    const image = req.file ? req.file.filename : null;

    // Validate input
    if (!category || !title || !description || !date || !id) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    // Connect to database
    connection = await database.getConnection();
    await connection.beginTransaction();

 const blogQuery = `UPDATE blog SET category=?, title=?, description=?, date=? WHERE id=?`;
    const blogValues = [category, title, description, date, id];
    const [blogResponse] = await connection.query(blogQuery, blogValues);

    
    if (image) {
      const blogImageQuery = `UPDATE blogimages SET image=? WHERE blogid=?`;
      const blogImageValues = [image, id];
      const [imageResponse] = await connection.query(blogImageQuery, blogImageValues);

      if (imageResponse.affectedRows === 0) {
       
        const insertImageQuery = `INSERT INTO blogimages (blogid, image) VALUES (?, ?)`;
        await connection.query(insertImageQuery, [id, image]);
      }
    }

    await connection.commit();

    res.status(200).json({
      status: "success",
      message: "Blog updated successfully",
      blogResponse,
    });
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    res.status(500).json({
      status: "error",
      message: "Failed to update blog",
      error: error.message,
    });
  } finally {
    if (connection) connection.release();
  }
};
