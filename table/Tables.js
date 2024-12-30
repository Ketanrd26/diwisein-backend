import { database } from "../db/db.js";

const userTable = `CREATE TABLE IF NOT EXISTS users (
id INT AUTO_INCREMENT PRIMARY KEY,
username VARCHAR(255) NOT NULL,
password VARCHAR(255) NOT NULL
)`;

const contactTable = `CREATE TABLE IF NOT EXISTS contact (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255) NOT NULL,
email VARCHAR(255),
contact VARCHAR(255) NOT NULL,
message VARCHAR(255)
)`;

const blogTable = `CREATE TABLE IF NOT EXISTS blog (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(200) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    date VARCHAR(20) NOT NULL
  )`;
  
  const blogImages = `CREATE TABLE IF NOT EXISTS blogimages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    blogid INT NOT NULL,
    FOREIGN KEY (blogid) REFERENCES blog(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
    image VARCHAR(255) NOT NULL
  )`;
  

const createTable = async (table, query) => {
  try {
    await database.query(query);
  } catch (error) {
    console.log(error);
  }
};

const createAlltable = async () => {
  try {
    await createTable("usertable", userTable);
    await createTable("contactTable", contactTable);
    await createTable("blogTable", blogTable);
    await createTable("blogImages", blogImages);

    console.log("table created successfully");
  } catch (error) {}
};

export default createAlltable;
