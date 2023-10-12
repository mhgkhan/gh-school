import express from 'express'
import multersScript from "../middlewares/multerScript.js"


const studentRouter = express.Router()

import studentApiHandler from '../controllers/studentApiHandler.js'


studentRouter.post("/personaldetails", multersScript("image","profiles"), studentApiHandler.HandlePersonalDetailsPost)
studentRouter.post("/previusschooldata", multersScript("schoolcertificate", "certificates"), studentApiHandler.handlePreviusSchoolDataPost)


export default studentRouter