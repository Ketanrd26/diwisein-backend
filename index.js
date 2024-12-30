import express from "express";
import cors from "cors";
import { checkConnection } from "./db/db.js";
import createAlltable from "./table/Tables.js";
import { userRoute } from "./route/userRoute.js";
import { contactRoute } from "./route/contactRoute.js";
import { blogRoute } from "./route/blogroute.js";
import path from "path";



const app = express();

app.use(express.json());
app.use(cors());


app.use("/user", userRoute);
app.use("/contact", contactRoute);
app.use("/blog", blogRoute)

app.get("/", (req,res)=>{
    res.send("hello i am develoepr")
});

const imageDirectory = "C:\\git\\gitproject\\images";
app.use("/", express.static(imageDirectory));


app.get("/image/:filename", (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(imageDirectory, filename);
    res.sendFile(filePath, (err) => {
      if (err) {
        res.status(404).send("Image not found");
      }
    });
  });
  

try {
    app.listen(5000,()=>{
        console.log("backned is running")
    });

    await checkConnection();

    await createAlltable()
} catch (error) {
    console.log(error)
}