const express=require('express')
const{
    validateUser,
    registerUser,
}=require('../controllers/userController')


const { protect } = require("../middleware/authMiddleware");

const router=express.Router();

router.post('/login',validateUser);
router.post('/register',registerUser)

module.exports=router