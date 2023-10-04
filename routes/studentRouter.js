import express from 'express'
import path from 'path'
import multer from 'multer';

const studentRouter = express.Router()

import studentApiHandler from '../controllers/studentApiHandler.js'



// multer middleware 
const multersScript = (fieldnameofile,foldernameoffile) =>{
    return multer({
        storage: multer.diskStorage({
            
            destination: (req, file, collback) => {
                collback(null, path.join(process.cwd(),`./public/assets/media/images/students/${foldernameoffile}`))
            },
            filename: (req, file, collback) => {
                collback(null, `GSMS_${file.fieldname}_${Math.floor(Math.random() * 12000230)}_${Date.now()}_${path.extname(file.originalname)}`)
            }
        })
    }).single(fieldnameofile)
}


studentRouter.post("/signup", studentApiHandler.handleSignupPost);
studentRouter.post("/login", studentApiHandler.handleLoginPost);
studentRouter.post("/personaldetails", multersScript("image","profiles"), studentApiHandler.HandlePersonalDetailsPost)
studentRouter.post("/previusschooldata", multersScript("schoolcertificate", "certificates"), studentApiHandler.handlePreviusSchoolDataPost)


export default studentRouter