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



module.exports = router;