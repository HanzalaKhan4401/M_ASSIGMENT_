import express from 'express';
import categoryController from '../controllers/categoryController.mjs';

const catRoute = express.Router()

catRoute

  //Get Requests
  //Get All Categoryies
  .get("/categories", categoryController.getAllCategories)

  //Post Requests
  //Add New Category
  .post("/addcategory", categoryController.addCategory) 

  export default catRoute