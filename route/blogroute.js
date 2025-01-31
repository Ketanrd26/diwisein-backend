import express from "express";
import multer from "multer";
import { blogadd, deleteBlog, getAllBlog, getBlogById, updateBlog } from "../controller/blogController.js";
import path from "path";
import fs from "fs";

export const blogRoute = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "/var/www/images/diwiseblog"; 
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath); 
  },

  filename: (req, file, cb) => {
    const customFilename = file.originalname.split('.')[0];  // Use the original filename (optional customization)
    cb(null, `${customFilename}_${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage: storage,
});




blogRoute.post("/addBlog", upload.single("image"), blogadd);
blogRoute.get("/getAllBlog", getAllBlog);
blogRoute.get("/getBlogById/:id", getBlogById);
blogRoute.delete("/deleteBlog/:id", deleteBlog);
blogRoute.put("/updateBlog/:id",upload.single("image"), updateBlog);


  
