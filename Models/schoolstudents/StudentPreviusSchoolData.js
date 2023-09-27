import mongoose from "mongoose";

const studentPSDStr = mongoose.Schema({
    schoolname: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    obtmarks: {
        type: String,
        required: true
    },
    totalmarks: {
        type: String,
        required: true,
    },
    schooldistrict: {
        type: String,
        required: true
    },
    lastclassdmc: {
        type: String,
        required: true
    },
    schoolcertificate: {
        type: String,
        required: true
    },
    schoolphone: {
        type: String,
        required: true
    },
    user: {//12
        type: mongoose.Schema.Types.ObjectId,
        ref: "Signup_Student"
    }
},{
    timestamps:true
})

const StudentPreviusSchoolDetails = mongoose.model("PreviousSDetail", studentPSDStr)
export default StudentPreviusSchoolDetails