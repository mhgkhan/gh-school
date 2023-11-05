import mongoose from "mongoose";

const studentPSDStr = mongoose.Schema({
    schooltype:{ // done
        type:String,
        required:true,
        default:"primary"
    },
    studenttype:{ //done
        type:String,
        required:true,
        default:"Regular"
    },
    classname: { // done
        type: String,
        required: true,
        default:"Arts"
    },
    subject: { // done
        type: String,
        required: true,
        default:"Science"
    },
    rollno: { // done
        type: String,
        required: true
    },
    schoolphone: { // done
        type: String,
        required: true
    },
    schoolname: { //done
        type: String,
        required: true
    },
    schooladdress: { // done
        type: String,
        required: true
    },
    obtmarks: {
        type: String,
        required: true,
        default:"0"
    },
    totalmarks: {
        type: String,
        required: true,
        default:"0"
    },
    certificate: {
        type: String,
        required: true
    },

    student: {//12
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student_informaton",
        required:true,
    }
},{
    timestamps:true
})

const StudentPreviusSchoolDetailsModel = mongoose.model("Student_previus_school_data", studentPSDStr)
export default StudentPreviusSchoolDetailsModel
