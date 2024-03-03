const express=require('express')
const router=express.Router();

const {
    setTicket,
    getDeptTickets,
    getUserTickets,
    updateTicket,

}=require('../controllers/ticketController')

const { protectUser,protectDept } = require('../middleware/authMiddleware')

router.route('/set').post(protectUser,setTicket)
router.route('/getuser').get(protectUser,getUserTickets)
router.route('/getdept').get(protectDept,getDeptTickets)
router.route('/update').put(protectDept,updateTicket)

module.exports=router


