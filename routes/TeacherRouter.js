import express from 'express'
const teacherRouter = express.Router()

import TeacherApihandler from '../controllers/TeacherApiHandler.js'
import multersScript from '../middlewares/multerScript.js'

teacherRouter.post("/signin", TeacherApihandler.handleLoginPost);
teacherRouter.post("/signup", TeacherApihandler.handleSignupPost);
teacherRouter.post("/pdata",multersScript("image","profiles"), TeacherApihandler.handlePersonalPost)



export default teacherRouter