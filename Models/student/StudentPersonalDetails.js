import mongoose from "mongoose";

const singupStudentDetails = mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    fathername:{
        type:String,
        required:true
    },
    gender: {
        type: String,
        required: true,
        default:"male"
    },
    martial_status: {
        type: String,
        required: true,
        default: "unmarried"
    },
    religon: {
        type: String,
        required: true,
        default: "islam",
    },

    student_cnic: { //1
        type: String,
        max: 15,
        min: 10,
        unique: true
    },

    father_cnic: { //2
        type: String,
        max: 15,
        min: 10,
        required: true
    },

    father_phone: { //3
        type: String,
        max: 18,
        min: 7,
    },

    mother_cnic: {//4
        type: String,
        max: 15,
        min: 10,
        // required: true
    },
    
    email:{
        type:String,
        required:true,
        default:"example@example.example",
    },
    blood_group: {//5
        type: String,
        required: true,
        max: 5,
        min: 1,
        default: "A+"
    },

    country: {//6
        type: String,
        required: true,
        default: "pakistan"
    },

    provience: {//7
        type: String,
        required: true,
        default: "khyberpakhtunkhwa"
    },

    city: { type: String, default: "Peshawar" },//8
    district: { type: String, default: "Khyber" },//9
    vallage_name: {
        type: String,
        required: true
    },
    parmanent_address: {
        type: String,
        required: true
    },

    image: {//11
        type: String,
        required: true
    },
    dob:{
        type:String,
        requried:true
    },
    teacherid:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"teacher",
    },

}, {
    timestamps: true
})

const studentPersonalInformationModel = mongoose.model("Student_informaton", singupStudentDetails);
export default studentPersonalInformationModel