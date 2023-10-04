import express from 'express'
const staticPagesRouter = express.Router();

import staticPagesHandler from '../controllers/staticpagesHandler.js';
import { afterSignupAuth, userAuth,afterSignupDetails } from '../middlewares/userAuthorization.js';



staticPagesRouter.get("/", staticPagesHandler.handleIndex)
    .get("/ourmission", staticPagesHandler.handleOurmissionPage)
    .get("/ourstory", staticPagesHandler.handleOurstory)
    .get("/ourgallery", staticPagesHandler.handleOurgallery)
    .get("/addmissions", staticPagesHandler.handleAdmissionspage)
    .get("/contactus", staticPagesHandler.handleContactuspage)

    // to get student create form 
staticPagesRouter.get("/student/create",userAuth, staticPagesHandler.hanldeStudentSignupPage)
.get("/student/login", userAuth, staticPagesHandler.hanldeStudentLoginPage)
.get("/student/signupinformation",afterSignupAuth,staticPagesHandler.handleAddstudentPersonalInformation)
.get("/student/previusschooldata",afterSignupDetails, staticPagesHandler.handlePreviusSchooldataForm)


export default staticPagesRouter