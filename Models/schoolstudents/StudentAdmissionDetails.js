import mongoose from "mongoose";

const studentAdmDetails = mongoose.Schema({
    admclass: {
        type: String,
        required: true
    },
    admsubject: {
        type: String,
        required: true
    },
    verify: {
        type: String,
        default: "pending"
    },
    user: {//12
        type: mongoose.Schema.Types.ObjectId,
        ref: "Signup_Student"
    }
}, {
    timestamps: true
})

const studentAdmissionform = mongoose.model("Student_Addmission", studentAdmDetails);
export default studentAdmissionform