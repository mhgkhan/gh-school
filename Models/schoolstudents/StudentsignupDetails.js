import mongoose from "mongoose";

const singupStudentDetails = mongoose.Schema({
    student_cnic: { //1
        type: String,
        max: 15,
        min: 10,
        required: true,
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
        required: true
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
        required: true
    },

    provience: {//7
        type: String,
        required: true
    },

    city: String,//8
    district: String,//9

    postal_address: {//10
        type: String,
        trim: true,
        required: true
    },

    image: {//11
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