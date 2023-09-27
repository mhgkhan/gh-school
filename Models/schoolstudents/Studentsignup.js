import mongoose from "mongoose";

const studentSignupStr = mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:6
    }
},{
    timestamps:true
})

const studentSignupModel = mongoose.model("Signup_Student", studentSignupStr);
export default studentSignupModel
