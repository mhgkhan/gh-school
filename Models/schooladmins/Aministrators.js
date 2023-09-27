import mongoose from "mongoose";

const addministrators = mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    password: { type: String, required: true },
    image: { type: String, required: true },
    success:{type:String, default:"pending"}
}, {
    timestamps: true
})

const adminSchoolWeb = mongoose.model("Admin", addministrators);
export default adminSchoolWeb
