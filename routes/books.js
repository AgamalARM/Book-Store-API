const express = require('express');
const Joi = require('joi'); // for validation
const router = express.Router();

const books = [
    {
        id:1,
        title:"The greatest ISLAM",
        price: 13
    },
    {
        id:2,
        title:"The greatest MOHAMMED",
        price: 17
    }
];

// HTTP Methods/Verbs
/**
 * @desc Get all books
 * @route /api/books
 * @method GET
 * @access public
 */
router.get("/", (req,res) => {
    res.status(200).json(books);

});

/**
 * @desc Get book by id
 * @route /api/books/:id
 * @method GET
 * @access public
 */

router.get("/:id", (req,res) => {
    const book = books.find(b => b.id === parseInt(req.params.id)); // to convert req.params.id to integer
    if(book){
        res.status(200).json(book);
    }else{
        res.status(404).json({ message: "Book Not Found" });
    }

});

/**
 * @desc Create a new book
 * @route /api/books
 * @method POST
 * @access public
 */
router.post("/", (req,res) => {
    // validation of input user using Joi
    const { error } = validateCreateBook(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message}); // 400 =>Bad Request
    }
    console.log(req.body);
    book = {
        id: books.length + 1,
        title: req.body.title,
        price: req.body.price
    }
    books.push(book);
    res.status(201).json(book); // 201 post is created Successfully
});

function validateCreateBook(obj) {
    const schema = Joi.object({
        title: Joi.string().trim().min(3).max(200).required(),
        price: Joi.number().min(0).required()
    })
    return schema.validate(obj);
    
}

module.exports = router;