const asyncHandler = require('express-async-handler')
const http = require('http');
const axios = require('axios');
const request = require('request');


const Ticket = require('../models/ticketModel')
const Dept = require('../models/deptModel')







//@desc setTicket
//@route post /api/ticket/set
//@access private
const setTicket = asyncHandler(async (req, res) => {
    console.log(req.body);
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add text')

    }
    if (!req.body.id) {
        res.status(400)
        throw new Error('Please add id')

    }


    const data = req.body.text;
    const requestOptions = {
        url: 'http://127.0.0.1:8000/post',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message: data,
        }),
    };


    request(requestOptions,async (error, response, body) => {
        if (error) {
            console.log(error);
            res.status(400).send("error")
            return;

        } else{

            const deptName = 'Home affairs'
            const dept = await Dept.findOne({ name: deptName });
            try {
                if (dept) {

                    const ticket = await Ticket.create({
                        text: req.body.text,
                        id: req.body.id,
                        user: req.user.id,
                        dept: dept._id,
                    })

                    if (ticket) {
                        res.status(200).json({ ticket: ticket })
                        return;

                    }

                    else {
                        res.status(400)
                        throw new Error('Error in creating ticket');
                    }
                


                }
                else {
                    res.status(400)
                    throw new Error('Error in finding  department')

                }
            }
            catch {
                res.status(400)
                .send("error in database");
                return;



            }
        }
    });



})

//@desc getDeptTickets
//@route GET api/ticket/getdept
//@access Private

const getDeptTickets = asyncHandler(async (req, res) => {

    const tickets = await Ticket.find({ dept: req.dept.id })


    try {
        if (tickets) {
            res.status(200).send(tickets);
        }
        else {
            res.status(400)
            throw new error("Error fetching tickets");
        }

    }
    catch {
        res.status(400)
        throw new Error("Error in database");


    }

})

// @desc  getUserTickets
// @route GET /api/ticket/getuser
// @access Private

const getUserTickets = asyncHandler(async (req, res) => {
    const tickets = await Ticket.find({ user: req.user.id }).populate("dept", "name")



    try {
        if (tickets) {
            res.status(200).send(tickets);
        }
        else {
            res.status(400)
            throw new Error("Error fetching tickets");
        }

    }
    catch {
        res.status(400)
        throw new Error("Error in database");


    }

});

// @desc  updateTicket
//@route PUT /api/ticket/update
//@access Private

const updateTicket = asyncHandler(async (req, res) => {
    if (!req.body.status || !req.body.id) {
        res.status(400).send("Data not acquired");
    }


    const status = req.body.status

    const ticket = await Ticket.findById(req.body.id);


    if (!ticket) {
        res.status(400)
        throw new Error('Ticket not found')

    }

    if (!req.dept) {
        res.status(401)
        throw new Error('User not found')
    }

    if (ticket.dept.toString() !== req.dept.id) {
        res.status(401)
        throw new Error('User not auth')
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(req.body.id, { status: status }, { new: true })
    res.status(200).send(updatedTicket)









})


module.exports = {
    setTicket,
    updateTicket,
    getDeptTickets,
    getUserTickets,
}