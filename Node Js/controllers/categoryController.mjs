import Category from "../models/category.mjs";

const getAllCategories = async (req, res) => {
    try{
        const category = await Category.find({});
        if(category.length > 0){
            res.json({msg: "Showing All Categories...!", myCategory: category})
        }else{
            res.status(404).json({msg: "No Category Found...!"})
        }
    }catch(error){
        res.status(500).json({msg:error})
    } 
}

const addCategory = async (req, res) => {
    try {
        // let {title, discription, price} = req.body;
        let newCategory = {
            title: req.body.title,
            description: req.body.description,
            }
            const addCategory = await Category.insertOne(newCategory);
            if(addCategory){
                res.json({msg: "Category Added Successfully...!", addedCategory: addCategory});
            }else{
                res.status(404).json({msg: "Failed To Add Category...!"});
            }
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const categoryController = {
    getAllCategories,
    addCategory,
}
export default categoryController;