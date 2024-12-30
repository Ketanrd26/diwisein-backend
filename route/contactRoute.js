import express from "express";
import { contact, deleteContact, getAllContact, updateContact } from "../controller/contact.js";

export const contactRoute = express.Router();

contactRoute.post("/addContact" , contact);
contactRoute.get("/getAllContact" , getAllContact);
contactRoute.put("/updateContact/:id" , updateContact);
contactRoute.delete("/deleteContact/:id" , deleteContact);