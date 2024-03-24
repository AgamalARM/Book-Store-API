const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { Author, validateCreateAuther, validateUpdateAuther  } = require('../models/Author');


/**
 * @desc Get all authers
 * @route /api/authors
 * @method GET
 * @access public
 */
router.get("/", asyncHandler(
    async(req,res) => {
            const authorsList = await Author.find().sort({ firstName: -1}).select( "firstName lastName" );
            res.status(200).json(authorsList);
    }
))

/**
 * @desc Get auther by id
 * @route /api/authors/:id
 * @method GET
 * @access public
 */
router.get("/:id", asyncHandler(async(req,res) => {
    
    const auther = await Author.findById(req.params.id)
    if(auther){
        res.status(200).json(auther);
    }else{
        res.status(404).json( { message: "Author is not found"})
    }
   
}))

/**
 * @desc Create a new auther
 * @route /api/authors
 * @method POST
 * @access public
 */
router.post("/", asyncHandler(async(req,res) => {
    // validation of input user using Joi
    const { error } = validateCreateAuther(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message}); // 400 =>Bad Request
    }
    console.log(req.body);

    const author = new Author({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        nationality: req.body.nationality,
        image: req.body.image
    }); 
    
    const result = await author.save();
    res.status(201).json(result); // 201 post is created Successfully
 
}));

    

/**
 * @desc Update an author by id
 * @route /api/authors/:id
 * @method PUT
 * @access public
 */
 router.put("/:id", asyncHandler(async(req,res) => {
    // validation of input user using Joi
    const { error } = validateUpdateAuther(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message}); // 400 =>Bad Request
    }
    
        const author = await Author.findByIdAndUpdate(req.params.id,{
            $set: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                nationality: req.body.nationality,
                image: req.body.image
    
            }
        }, { new: true});
        res.status(200).json(author);
    
    
}))

/**
 * @desc Delete an auther by id
 * @route /api/authors/:id
 * @method DELETE
 * @access public
 */
 router.delete("/:id", asyncHandler(async(req,res) => {
   
        const author = await Author.findById(req.params.id);
    if (author) {
        await Author.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: " Author has been Deleted"});;
        
    } else {

        res.status(404).json({ message: " Author Not found"})
    }
    

}))


module.exports = router;