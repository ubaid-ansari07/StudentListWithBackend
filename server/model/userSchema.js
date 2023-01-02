import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    roll:{
         type:Number
    },
    name:{
        type:String
    },
    age:{
        type:Number
    },
    branch:{
        type:String
    },
    year:{
        type:String
    },
})
const User = mongoose.model('user',userSchema);
export default User