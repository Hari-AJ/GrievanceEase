const mongoose=require('mongoose')

const deptSchema=mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,'Name']
        },
        authid:{
            type:String,
            required:[true,'id']

        },
        password:{
            type:String,
            required:[true,"Password"]
        }
    },{
        timestamps:true,
    }
)

module.exports=mongoose.model('Dept',deptSchema);   