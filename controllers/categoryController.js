import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

export const createCategoryController = async (req, res)=>{
    try {
        const {name} = req.body
        if(!name){
            return res.status(401).send({ message:'name is required  ',})
        }
        const existingCategory = await categoryModel.findOne({name})
        if(existingCategory){
            return res.status(200).send(
                { message:'name is required  ',
                success:true
            })
        }
        const category = await new categoryModel({name, slug:slugify(name)}).save()
        res.status(201).send({
            success:true,
            message:'new Category Created',
            category 
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in category',
            error
        })
    }

};

// Update Category 
export const updateCategoryController = async (req, res)=>{
    try {
        const {name} = req.body
        const {id} = req.params
        const category  = await categoryModel.findByIdAndUpdate(id,{name, slug:slugify(name)},{new:true})
        res.status(200).send({
            success:true,
            message:'category updated successfully',
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'error while updating category'
        })
    }

}

// gat all cat
export const categoryController = async(req,res)=>{
    try {
        const category = await categoryModel.find({}) 
        res.status(200).send({
            success:true,
            message:"All Category list",
            category,
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error while geting all category",

        })
    }

}

// for single category

export const singleCategoryController = async (req, res)=>{
    try {
       
        const category = await categoryModel.findOne({slug:req.params.slug})
        res.status(200).send({
            success:true,
            message:'get single category succesfully',
            category
            
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error while geting single category',
            error,
        })
    }

}

//delete category
export const deleteCategoryController = async (req, res) => {
    try {
      const { id } = req.params;
      await categoryModel.findByIdAndDelete(id);
      res.status(200).send({
        success: true,
        message: "Categry Deleted Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "error while deleting category",
        error,
      });
    }
  };