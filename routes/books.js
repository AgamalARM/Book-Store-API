const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { Book, validateCreateBook, validateUpdateBook} = require("../models/Book");


// HTTP Methods/Verbs
/**
 * @desc Get all books
 * @route /api/books
 * @method GET
 * @access public
 */
router.get("/", asyncHandler(async(req,res) => {

        const bookList = await Book.find().populate("author",["firstName","_id"]);// to get more info about author collection
        res.status(200).json(bookList);
        

}));

/**
 * @desc Get book by id
 * @route /api/books/:id
 * @method GET
 * @access public
 */

router.get("/:id", asyncHandler(async(req,res) => {
    const book = await Book.findById(req.params.id).populate("author")
    if(book){
        res.status(200).json(book);
    }else{
        res.status(404).json({ message: "Book Not Found" });
    }

}));

/**
 * @desc Create a new book
 * @route /api/books
 * @method POST
 * @access public
 */
router.post("/", asyncHandler(async(req,res) => {
    // validation of input user using Joi
    const { error } = validateCreateBook(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message}); // 400 =>Bad Request
    }
    console.log(req.body);
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        price: req.body.price,
        cover: req.body.cover
    });
    const result = await book.save();
    res.status(201).json(result); // 201 post is created Successfully
}));

/**
 * @desc Update a book
 * @route /api/books/:id
 * @method PUT
 * @access public
 */
router.put("/:id", asyncHandler(async(req,res) => {
    // validation of input user using Joi
    const { error } = validateUpdateBook(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message}); // 400 =>Bad Request
    }

    const updatedBook = await Book.findByIdAndUpdate(req.params.id,{
        $set: {
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            price: req.body.price,
            cover: req.body.cover
        }
    }, {new: true}) ;
    res.status(200).json(updatedBook);
}));

/** 
 * @desc Delete a book by id
 * @route /api/books/:id
 * @method DELETE
 * @access public
 */
 router.delete("/:id", asyncHandler(async(req,res) => {
    const book = await Book.findById(req.params.id);
    if(book){
        await Book.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Book has been deleted" });
    }else{
        res.status(404).json({ message: "Book Not Found" });
    }

}))

module.exports = router;