import mongoose from "mongoose";

const teacherSignupStr = mongoose.Schema({
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
    },
    status:{
        type:String,
        default:"offline"
    }, 
    asAdmin:{
        type:String,
        required:true,
        default:"NO"
    },
    AsVerified:{
        type:String,
        required:true,
        default:"NO"
    },
    AsSelected:{
        type:String,
        required:true,
        default:"NO"
    }
},{
    timestamps:true
})

const teacherSignupModel = mongoose.model("teacher", teacherSignupStr);
export default teacherSignupModel
