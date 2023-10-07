import mongoose from "mongoose";

const studentPSDStr = mongoose.Schema({
    schoolname: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true,
        default:"Arts"
    },
    classname: {
        type: String,
        required: true,
        default:"Arts"
    },
    rollno: {
        type: String,
        required: true,
        default:"Arts"
    },

    obtmarks: {
        type: String,
        required: true
    },
    totalmarks: {
        type: String,
        required: true,
    },
    schooladdress: {
        type: String,
        required: true
    },
    schoolphone: {
        type: String,
        required: true
    },
    schoolcertificate: {
        type: String,
        required: true
    },

    user: {//12
        type: mongoose.Schema.Types.ObjectId,
        ref: "Signup_Student",
        required:true,
        unique:true
    }
},{
    timestamps:true
})

const StudentPreviusSchoolDetails = mongoose.model("PreviousSDetail", studentPSDStr)
export default StudentPreviusSchoolDetails