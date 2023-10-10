// studnet signup model 
import studentSignupModel from "../Models/schoolstudents/Studentsignup.js";
// student personal information model 
import studentPersonalInformationModel from "../Models/schoolstudents/StudentsignupDetails.js";
// student previus school model 
import StudentPreviusSchoolDetails from "../Models/schoolstudents/StudentPreviusSchoolData.js";

import JWT from 'jsonwebtoken'

// import {gotoErrorPage} from "../controllers/otherHandlers.js"


export const userAuth = async (req, res, next) => {

   if (req.cookies.MPS) {
      const token = req.cookies.MPS
      // console.log("from user authorization middleware ", token)
      const idformtoken = JWT.verify(token, process.env.SECRET);
      // console.log("from user authorization middleware ", idformtoken);
      let checkinUser
      try {
         checkinUser = await studentSignupModel.findOne({ _id: idformtoken.id });
      } catch (error) {
         return res.status(500).render("error.ejs", {
            title: "ERROR IN PAGE",
            error: error
         })
         // console.log(error);
         // res.status(200).json(error)
      }

      if (checkinUser) {
         // res.redirect("/student/form1");
         res.redirect("/student/signupinformation")
      }
      else {
         next()
      }

   }
   else {
      next()
   }
}



export const isLogin = async (req, res, next) => {
   try {
      if (req.cookies.MPS && req.cookies.MPS !== "undefiend") {
         next();
      }
      else {
         res.redirect("/student/login");
      }
   } catch (error) {
      return res.status(500).render("error.ejs", {
         title: "ERROR IN PAGE",
         error: error
      })
   }
}



export const isUserAuthorizeSecond = async (req, res, next) => {
   try {
      console.log("from middlewares request paramters is ", req.params)
      if (req.cookies.MPS && req.cookies.MPS !== "undefiend") {
         const token = req.cookies.MPS
         const idFromToken = JWT.verify(token, process.env.SECRET);

         if (req.params.id == idFromToken.id) {
            // checking if user is exists or not 
            // console.log("the id is ", idFromToken.id)
            try {
               const exists = await studentSignupModel.findOne({ _id: idFromToken.id });
               // console.log("the user data is ", exists);
               if (exists && idFromToken.id == exists._id) {
                  next();
               }
               else {
                  res.redirect("/student/create/")
               }
            } catch (error) {
               return res.status(500).render("error.ejs", {
                  title: "ERROR IN PAGE",
                  error: error
               })
            }
         }
         else {
            // user is not authorize 
            res.redirect("/student/login")
         }
         //   next();
      }
      else {
         res.redirect("/student/login");
      }
   } catch (error) {
      return res.status(500).render("error.ejs", {
         title: "ERROR IN PAGE",
         error: error
      })
   }
}


export const afterSignupAuth = async (req, res, next) => {

   if (req.cookies.MPS && req.cookies.MPS !== "undefiend") {
      // console.log("cookies is founded. from middleware ")
      const token = req.cookies.MPS
      const idFromtoken = JWT.verify(token, process.env.SECRET);


      // checking if user is exists or not 
      let checkinUser
      try {
         checkinUser = await studentSignupModel.findOne({ _id: idFromtoken.id });
      } catch (error) {
         console.log(error);
         return res.status(500).render("error.ejs", {
            title: "ERROR IN PAGE",
            error: error
         })
      }
      // if user is exists 
      if (checkinUser) {
         // console.log("after signup middleware the user is exits ")
         // pdata = personal data 
         const checkIfPdata = await studentPersonalInformationModel.findOne({ user: checkinUser._id });

         if (!checkIfPdata) {
            // console.log("after signup middleare user personal information is not exits")
            next();
         }
         else {
            // console.log("after signup middleare user personal information is exits to redirect to previus school data ")
            res.redirect("/student/previusschooldata")
         }



      }

      else {
         // console.log("user not exists from middleware")
         res.redirect("/student/create")
      }

   }
   else {
      // console.log("user not authorize ")
      res.redirect("/student/login")
   }
}


export const afterSignupDetails = async (req, res, next) => {
   if (req.cookies.MPS && req.cookies.MPS !== "undefiend") {

      const token = req.cookies.MPS
      const idFromtoken = JWT.verify(token, process.env.SECRET);



      let checkinUser
      try {
         checkinUser = await studentSignupModel.findOne({ _id: idFromtoken.id });
      } catch (error) {
         console.log(error);
         return res.status(500).render("error.ejs", {
            title: "ERROR IN PAGE",
            error: error
         })
      }

      if (checkinUser) {
         // console.log('after signup user is valid ok')
         let existsStudnetPersonalInfor
         try {
            existsStudnetPersonalInfor = await studentPersonalInformationModel.findOne({ user: checkinUser._id })
            // console.log(existsStudnetPersonalInfor)
         } catch (error) {
            console.log(error);
            return res.status(500).render("error.ejs", {
               title: "ERROR IN PAGE",
               error: error
            })
         }

         if (existsStudnetPersonalInfor) {
            // console.log('after signup personal information is exits ok ')
            // console.log("user student personal information is exists  checked from middlewars")

            try {
               const exitsPreviusSchooldata = await StudentPreviusSchoolDetails.findOne({ user: checkinUser._id })
               // console.log("the user previus school data is : \n",exitsPreviusSchooldata);

               if (exitsPreviusSchooldata) {
                  // console.log("user previus school data  is exits ")
                  return res.redirect("/student/profile");
               }
               else {
                  // console.log("user previus school data  is not avaliable")
                  return next();
               }
            } catch (error) {
               return res.status(500).render("error.ejs", {
                  title: "ERROR IN PAGE",
                  error: error
               })
            }
         }
         else {
            // console.log("user studnet personal informtion is not exists checked from middlewars")
            res.redirect("/student/signupinformation")
         }
      }
      else {
         res.redirect("/student/create")
      }
   }
   else {
      res.redirect("/student/login");
   }
}




export const afterClearAll = async (req, res, next) => {
   if (req.cookies.MPS && req.cookies.MPS !== "undefiend") {
      const token = req.cookies.MPS
      const idFromtoken = JWT.verify(token, process.env.SECRET)
      const id = idFromtoken.id

      // console.log("profile middleware : cookie is ", token)
      // console.log("profile middleware : tokenId  is ", id)



      let exists
      try {
         exists = await studentSignupModel.findOne({ _id: idFromtoken.id });
         // console.log("profile middleware : exits user is  ", exists )
      } catch (error) {
         return res.status(500).render("error.ejs", {
            title: "ERROR IN PAGE",
            error: error
         })
      }

      if (exists) {
         // console.log("profile middleware : user is exists")
         let checkStudentDetails
         try {
            checkStudentDetails = await studentPersonalInformationModel.findOne({ user: exists._id });
            // console.log("profile middleware : stdent Persoan Informatio is ", checkStudentDetails);
         } catch (error) {
            console.log(error);
            return res.status(500).render("error.ejs", {
               title: "ERROR IN PAGE",
               error: error
            })
         }

         if (checkStudentDetails) {
            // console.log("profile middleware: sutdent detals is exits");
            try {
               const checkPreviusSchoolInformation = await StudentPreviusSchoolDetails.findOne({ user: exists._id })
               // console.log("profile middleware previus school informatio is", checkPreviusSchoolInformation)
               if (checkPreviusSchoolInformation) {
                  // console.log("profile middlware: previus school information is exists")
                  // console.log("student previus school informatino is exits")
                  req.studentData = {
                     signupData: exists,
                     personalInfo: checkStudentDetails,
                     previusSchool: checkPreviusSchoolInformation
                  }
                  // console.log("profile middleware is req.send user is ", checkPreviusSchoolInformation.user )
                  next();
               }
               else {
                  // console.log('profiel middleware : spi of school is not exits')
                  res.redirect("/student/previusschooldata/")
               }

            } catch (error) {
               return res.status(500).render("error.ejs", {
                  title: "ERROR IN PAGE",
                  error: error
               })
               // console.log(error);
               // res.json(error)
            }

         }
         else {
            res.redirect("/student/signupinformation")
         }




      }
      else {
         return res.redirect("/student/create")
      }



   }


   else {
      res.redirect("/student/login")
   }
}