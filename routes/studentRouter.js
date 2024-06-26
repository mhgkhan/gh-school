import express from 'express'
import multersScript from "../middlewares/multerScript.js"


const studentRouter = express.Router()

import studentApiHandler from '../controllers/studentApiHandler.js'



studentRouter.post("/pdata",multersScript("image","images"), studentApiHandler.saveStudentPersonalData)
studentRouter.post("/previousschooldetails",multersScript("certificate","certificates"), studentApiHandler.handlePreviusSchoolDataPost)

// studentRouter.post("/personaldetails", multersScript("image","profiles"), studentApiHandler.HandlePersonalDetailsPost)
// studentRouter.post("/previusschooldata", multersScript("schoolcertificate", "certificates"), studentApiHandler.handlePreviusSchoolDataPost)


// studentRouter.post("/admstatus", studentApiHandler.handleStudentAdmissionform)

export default studentRouter