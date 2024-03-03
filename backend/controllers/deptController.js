const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Dept = require('../models/deptModel')

// @desc    Register new dept
// @route   POST /api/dept/register
// @access  Public
const registerDept = asyncHandler(async (req, res) => {
    const { authid,name, password } = req.body
  
    if (!name || !authid || !password ) {
      res.status(400)
      throw new Error('Please add all fields')
    }
  
    // Check if dept exists
    const deptExists = await Dept.findOne({ name })
  
    if (deptExists) {
      res.status(400)
      throw new Error('Dept already exists')
    }
  
    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
  
    // Create dept
    const dept = await Dept.create({
      name,
      authid,
      password: hashedPassword,
    })
  
    if (dept) {
      res.status(200).json({
        _id: dept.id,
        name: dept.name,
        authid:dept.authid,
        token: generateToken(dept._id),
      })
    } else {
      res.status(400)
      throw new Error('Invalid dept data')
    }
  })
  


// @desc    Authenticate a dept
// @route   POST /api/dept
// @access  Public
const loginDept = asyncHandler(async (req, res) => {
    const { authid, password } = req.body
    const dept = await Dept.findOne({ authid })

    if (dept && (await bcrypt.compare(password, dept.password))) {
        res.json({
            _id: dept.id,
            authid: dept.authid,
            token: generateToken(dept._id),
            name:dept.name,
        })
    }
    else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})


// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports={
    loginDept,
    registerDept
}