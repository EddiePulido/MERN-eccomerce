const Category = require("../models/category");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if(err || !category){
            return res.status(400).json({
                error: "Category does not exist"
            })
        }
        req.category = category;
        next();
    })
}

exports.create = (req, res) => {
    const category = new Category(req.body);
    category.save((err, data) => {
        if(err){
            return res. status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({ data })
    })
}

exports.delete = (req, res) => {
    let category = req.category
    category.remove((err, deletedcategory) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({ 
            "message" : 'category deleted successfully'
        })
    })
}

exports.read = (req, res) => {
    return res.json(req.category);
}