const express = require('express');
const router = express.Router();
const Joi = require('joi');

authers = [{
    id: 1,
    firstName: "ahmed",
    lastName: "gamal"
},
{
    id: 2,
    firstName: "reham",
    lastName: "gamal"
}]

/**
 * @desc Get all authers
 * @route /api/authers
 * @method GET
 * @access public
 */
router.get("/", (req,res) => {
    res.status(200).json(authers);
})

/**
 * @desc Get auther by id
 * @route /api/authers/:id
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
 * @desc post a new auther
 * @route /api/authers
 * @method POST
 * @access public
 */
router.post("/", (req,res) => {
    //validate input
    const { error } = validateCreateAuther(req.body);
    if(error) {
        return res.status(400).json({ message: error.details[0].message});
    }
    
    console.log(req.body);
    auther = {
        id: authers.length +1,
        firstName: req.body.firstName,
        lastName:  req.body.lastName
    }
    authers.push(auther);
    res.status(201).json(auther);
})

// function to validate create a book
function validateCreateAuther(obj) {
    const schema = Joi.object({
        firstName: Joi.string().trim().min(3).max(200).required(),
        lastName:  Joi.string().trim().min(3).max(200).required()
    })
    return schema.validate(obj);
    
}


module.exports = router;