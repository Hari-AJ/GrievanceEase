const express=require('express')

const router=express.Router()

const {
    loginDept,
    registerDept
}=require('../controllers/deptController')


router.post('/',loginDept);
router.post('/register',registerDept);

module.exports=router


