const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');


/**
 * @desc Update user
 * @route /api/users/:id
 * @method PUT
 * @access private
 */
router.put(asyncHandler(async(req,res) => {

}));

module.exports = router;