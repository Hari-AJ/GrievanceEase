const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User=require('../models/userModel')

// @desc loginuser
//@path POST /api/user/login
//@access public

const validateUser=asyncHandler(async(req,res)=>{
    const {phone,password}=req.body;

    if(!phone || !password){
        res.status(400)
        throw new Error('Please add all fields')

    }

    const user=await User.findOne({ phone })

    if(user && (await bcrypt.compare(password,user.password))){
        res.json({
            _id:user.id,
            phone:user.phone,
            token: generateToken(user._id)

        })
    }
    else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})


// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { password, phone } = req.body
  
    if (!password || !phone) {
      res.status(400)
      throw new Error('Please add all fields')
    }
  
    // Check if user exists
    const userExists = await User.findOne({ phone })
  
    if (userExists) {
      res.status(400)
      throw new Error('User already exists')
    }
  
    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
  
    // Create user
    const user = await User.create({
      phone,
      password: hashedPassword,
    })
  
    if (user) {
      res.status(201).json({
        _id: user.id,
        phone: user.phone,
        token: generateToken(user._id),
      })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
  })
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    })

}

module.exports={
    registerUser,
    validateUser,
}
  
