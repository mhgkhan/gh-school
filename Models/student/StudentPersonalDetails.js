import mongoose from "mongoose";

const singupStudentDetails = mongoose.Schema({
    gender: {
        type: String,
        required: true
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
        required: true
    },

    mother_cnic: {//4
        type: String,
        max: 15,
        min: 10,
        // required: true
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
    }

}, {
    timestamps: true
})

const studentPersonalInformationModel = mongoose.model("Student_informaton", singupStudentDetails);
export default studentPersonalInformationModel