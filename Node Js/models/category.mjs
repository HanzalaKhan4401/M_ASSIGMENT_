import mongoose from "mongoose";

// Define The Category Schema
const { Schema } = mongoose;
const categorySchema = new Schema({
    title: {type: String, required: [true, "This Title Is Requied"]},
    description: {true: String}
});

const Category = mongoose.model("Category", categorySchema);
export default Category; 