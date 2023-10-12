import mongoose from "mongoose";

const teacherInfoModel = mongoose.Schema({
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

    teacher_cnic: { //1
        type: String,
        max: 15,
        min: 10,
        unique: true
    },

    dob: { //2
        type: String,
        required: true
    },

    father_cnic: { //3
        type: String,
        max: 18,
        min: 7,
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
        required: true,
        default: "pakistan"
    },

    provience: {//7
        type: String,
        required: true,
        default: "KPK"
    },

    city: { type: String, default: "Peshawar" },
    district: { type: String, default: "Khyber" },
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

    user: {//12
        type: mongoose.Schema.Types.ObjectId,
        ref: "teacher"
    }

}, {
    timestamps: true
})

const TeacherPersonalInformationModel = mongoose.model("Teacher_information", teacherInfoModel);
export default TeacherPersonalInformationModel