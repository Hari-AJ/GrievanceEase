const mongoose=require('mongoose');

const userSchema=mongoose.Schema(
    {
        phone:{
            type:String,
            required:[true,'Please add phone']
        },
        password:{
            type:String,
            required:true
        }
    },{
        timestamps:true,
    }
)

module.exports=mongoose.model("User",userSchema);
