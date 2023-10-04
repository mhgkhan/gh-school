import express from 'express'
import path from 'path'
import multer from 'multer';

const studentRouter = express.Router()

import studentApiHandler from '../controllers/studentApiHandler.js'



// multer middleware 
const upload = multer({
    storage: multer.diskStorage({
        
        destination: (req, file, collback) => {
            collback(null, path.join(process.cwd(),`./public/assets/media/images/students/profiles`))
        },
        filename: (req, file, collback) => {
            collback(null, `GSMS_${file.fieldname}_${Math.floor(Math.random() * 90040E342)}_${Date.now()}_${path.extname(file.originalname)}`)
        }
    })
})


studentRouter.post("/signup", studentApiHandler.handleSignupPost);
studentRouter.post("/login", studentApiHandler.handleLoginPost);
studentRouter.post("/personaldetails", upload.single("image"), studentApiHandler.HandlePersonalDetailsPost)


export default studentRouter