const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { Author } = require('../models/Author');

/**
 * @desc Get all authers
 * @route /api/authors
 * @method GET
 * @access public
 */
router.get("/", async(req,res) => {
    try {
        const authorsList = await Author.find().sort({ firstName: -1}).select( "firstName lastName" );
        res.status(200).json(authorsList);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Someting is wrong"});
        
    }
    
})

/**
 * @desc Get auther by id
 * @route /api/authors/:id
 * @method GET
 * @access public
 */
router.get("/:id", (req,res) => {
    const auther = authers.find(a => a.id === parseInt(req.params.id))
    if(auther){
        console.log(auther);
        res.status(200).json(auther);
    }else{
        res.status(404).json( { message: "Author is not found"})
    }
})

/**
 * @desc Create a new auther
 * @route /api/authors
 * @method POST
 * @access public
 */
router.post("/", async(req,res) => {
    // validation of input user using Joi
    const { error } = validateCreateAuther(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message}); // 400 =>Bad Request
    }
    console.log(req.body);
  try {
    const author = new Author({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        nationality: req.body.nationality,
        image: req.body.image
    }); 
    
    const result = await author.save();
    res.status(201).json(result); // 201 post is created Successfully
  } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Some thing is wrong"});
  }
});

    

/**
 * @desc Update an author by id
 * @route /api/authors/:id
 * @method PUT
 * @access public
 */
 router.put("/:id", (req,res) => {
    // validation of input user using Joi
    const { error } = validateUpdateAuther(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message}); // 400 =>Bad Request
    }

    const auther = authers.find(b => b.id === parseInt(req.params.id)); // to convert req.params.id to integer
    if(auther){
        res.status(200).json({ message: "Auther has been updated" });
    }else{
        res.status(404).json({ message: "Auther Not Found" });
    }

})

/**
 * @desc Delete an auther by id
 * @route /api/authors/:id
 * @method DELETE
 * @access public
 */
 router.delete("/:id", (req,res) => {
    const auther = authers.find(a => a.id === parseInt(req.params.id)); // to convert req.params.id to integer
    if(auther){
        res.status(200).json({ message: "Auther has been deleted" });
    }else{
        res.status(404).json({ message: "Auther Not Found" });
    }

})


// function to validate create a Author
function validateCreateAuther(obj) {
    const schema = Joi.object({
        firstName: Joi.string().trim().min(3).max(200).required(),
        lastName:  Joi.string().trim().min(3).max(200).required(),
        nationality:  Joi.string().trim().min(3).max(100).required()
    })
    return schema.validate(obj);
    
}

function validateUpdateAuther(obj) {
    const schema = Joi.object({
        firstName: Joi.string().trim().min(3).max(200),
        lastName:  Joi.string().trim().min(3).max(200)
    })
    return schema.validate(obj);
    
}


module.exports = router;