import express from 'express'
const staticPagesRouter = express.Router();

import staticPagesHandler from '../controllers/staticpagesHandler.js';
import { afterSignupAuth, userAuth,afterSignupDetails,afterClearAll,isLogin,isUserAuthorizeSecond } from '../middlewares/userAuthorization.js';



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
// .get("/student/admissionform", userAuth, staticPagesHandler.handleAdmissionFormPage)
// to access profile 
staticPagesRouter.get("/student/profile/", afterClearAll, staticPagesHandler.handleProfilePage);



// for logout 
staticPagesRouter.get("/student/logout/", isLogin, staticPagesHandler.handleLogout);


// ******************************************
// ******************************************
// ******************************************

// to get edit personal information page  
staticPagesRouter.get("/student/edit/personalinfo/:id/", isUserAuthorizeSecond, staticPagesHandler.handlPersonalInfoPage);
// to get edit previus school informatin page  
staticPagesRouter.get("/student/edit/previusschoolinfo/:id/", isUserAuthorizeSecond, staticPagesHandler.handlePrviusSchoolInfoPage);
// to get edit your addmission form page 
staticPagesRouter.get("/student/edit/editadmissionform/:id/", isUserAuthorizeSecond, staticPagesHandler.handleAdmissionFormPage);
// to get edit yoour password page 
staticPagesRouter.get("/student/edit/password/:id/", isUserAuthorizeSecond, staticPagesHandler.handleChangePasswordPage);

// ******************************************
// ******************************************
// ******************************************


export default staticPagesRouter