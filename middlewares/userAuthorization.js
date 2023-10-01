// studnet signup model 
import studentSignupModel from "../Models/schoolstudents/Studentsignup.js";
// student personal information model 
import studentPersonalInformationModel from "../Models/schoolstudents/StudentsignupDetails.js";

import JWT from 'jsonwebtoken'



export const userAuth = async (req, res, next) => {

   if (req.cookies.MPS) {
      const token = req.cookies.MPS
      console.log(token)
      const idformtoken = JWT.verify(token, process.env.SECRET);
      console.log(idformtoken);
      let checkinUser
      try {
         checkinUser = await studentSignupModel.findOne({ _id: idformtoken.id });
      } catch (error) {
         console.log(error);
         res.status(200).json(error)
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



export const afterSignupAuth = async (req, res, next) => {
   if (req.cookies.MPS && req.cookies.MPS !== "undefiend") {
      console.log("cookies is founded. from middleware ")
      const token = req.cookies.MPS
      const idFromtoken = JWT.verify(token, process.env.SECRET);

      // checking if user is exists or not 
      let checkinUser
      try {
         checkinUser = await studentSignupModel.findOne({ _id: idFromtoken.id });
      } catch (error) {
         console.log(error);
         res.redirect("/student/login")
      }

      // if user is exists 
      if (checkinUser) {
         console.log("user is exists from middleware")
         // checking if user personal informations is exists or not 
         // if exists i will redirect to next form 
         // else next ()

         let existsStudnetPersonalInfor
         try {
            existsStudnetPersonalInfor = await studentPersonalInformationModel.findOne({ user: checkinUser._id })
         } catch (error) {
            console.log(error);
            res.redirect("/student/login")
         }

         if (existsStudnetPersonalInfor) {
            console.log(existsStudnetPersonalInfor);
            console.log("user student personal information is exists  checked from middlewars")
            res.redirect("/")
         }
         else {
            console.log("user studnet personal informtion is not exists checked from middlewars")
            next();
         }

      }

      else {
         console.log("user not exists from middleware")
         res.redirect("/student/create")
      }

   }
   else {
      console.log("user not authorize ")
      res.redirect("/student/login")
   }
}


