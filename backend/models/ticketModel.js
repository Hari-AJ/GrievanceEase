const mongoose=require('mongoose')

const ticketSchema=mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'User',
        },
        text:{
            type:String,
            required:true
        },
        dept:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'Dept',
        },
        id:{
            type:Number,
            required:true
        },
        status:{
            type:String,
            default:'pending'

        }

    },
    {
        timestamps:true,
    }
)
module.exports=mongoose.model('Ticket',ticketSchema)