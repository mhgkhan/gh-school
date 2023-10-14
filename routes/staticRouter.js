import express from "express";
const staticPagesRouter = express.Router();

import staticPagesHandler from "../controllers/staticpagesHandler.js";
import {
  afterSignupAuth,
  userAuth,
  afterSignupDetails,
  teacherClearAll,
  isLogin,
  isUserAuthorizeSecond,
  checkisSelectedOrNot
} from "../middlewares/userAuthorization.js";

// static page serving
staticPagesRouter
  .get("/", staticPagesHandler.handleIndex)
  .get("/ourmission", staticPagesHandler.handleOurmissionPage)
  .get("/ourstory", staticPagesHandler.handleOurstory)
  .get("/ourgallery", staticPagesHandler.handleOurgallery)
  .get("/addmissions", staticPagesHandler.handleAdmissionspage)
  .get("/contactus", staticPagesHandler.handleContactuspage);









// ******************************************
// ******************************************
// ******************************************
// for teacher
//  to acces the page of create an account,   login  and personalInformation
staticPagesRouter.get("/teacher/status", afterSignupDetails, staticPagesHandler.handleTeacherStatusPage);
staticPagesRouter.get("/teacher/selected/", checkisSelectedOrNot, staticPagesHandler.handleTeacherSelectedPage)
  .get("/teacher/create",userAuth, staticPagesHandler.hanldeTeacherSignupPage)
  .get("/teacher/login", userAuth, staticPagesHandler.hanldeTeacherLoginPage)
  .get(
    "/teacher/personalinformation",
    afterSignupAuth,
    staticPagesHandler.handleAddTeacherPersonalInformation
  )
  .get("/teacher/logout", isLogin, staticPagesHandler.handleLogout)
  .get(
  "/teacher/profile/",
  teacherClearAll,
  staticPagesHandler.handleTeacherProfilePage
)
.get("/teacher/account/info", teacherClearAll, staticPagesHandler.handleTeacherInfoPage )
.get(
    "/teacher/edit/personalInfo/:id",
    isUserAuthorizeSecond,
    staticPagesHandler.handleChangeTeacherInfo
  )
.get(
  "/teacher/edit/password/:id",
  isUserAuthorizeSecond,
  staticPagesHandler.handleChangePasswordPage
)
// // for teacher edit the student data 
// // to get edit personal information page
// staticPagesRouter.get(
//     "/teacher/edit/student/personalinfo/:id/",
//     isUserAuthorizeSecond,
//     staticPagesHandler.handlPersonalInfoPage
//   );
//   // to get edit previus school informatin page
//   staticPagesRouter.get(
//     "/teacher/edit/student/previusschoolinfo/:id/",
//     isUserAuthorizeSecond,
//     staticPagesHandler.handlePrviusSchoolInfoPage
//   );
//   // to get edit your addmission form page
//   staticPagesRouter.get(
//     "/teacher/edit/student/editadmissionform/:id/",
//     isUserAuthorizeSecond,
//     staticPagesHandler.handleAdmissionFormPage
//   );





  
// ******************************************
// ******************************************
// ******************************************
// for student 
  // for student admission pages
  staticPagesRouter.get(
    "/student/signupinformation",
    afterSignupAuth,
    staticPagesHandler.handleAddstudentPersonalInformation
  )
  .get(
    "/student/previusschooldata",
    afterSignupDetails,
    staticPagesHandler.handlePreviusSchooldataForm
  );
// .get("/student/admissionform", userAuth, staticPagesHandler.handleAdmissionFormPage)


export default staticPagesRouter;
