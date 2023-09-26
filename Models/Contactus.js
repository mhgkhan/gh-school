import mongoose from "mongoose";

const contactusStr = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Signup_Student"
    }
}, { timestamps: true });

const ContactModel = mongoose.model("Contact", contactusStr);
export default ContactModel
