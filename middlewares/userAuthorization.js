//teacher signup model 
import teacherSignupModel from '../Models/teacher/TeacherSignup.js'
// teacher personal information model 
import TeacherPersonalInformationModel from '../Models/teacher/TeacherInfoModel.js'



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
         checkinUser = await teacherSignupModel.findOne({ _id: idformtoken.id });
         // console.log(checkinUser)
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
         res.redirect("/teacher/personalinformation")
      }
      else {
         // console.log('no cookie ')
         next()
      }

   }
   else {
      // console.log('no cookie ')
      next()
   }
}



// this function is used for when user want to logout from an account 
export const isLogin = async (req, res, next) => {
   try {
      if (req.cookies.MPS && req.cookies.MPS !== "undefiend") {
         next();
      }
      else {
         res.redirect("/teacher/login");
      }
   } catch (error) {
      return res.status(500).render("error.ejs", {
         title: "ERROR IN PAGE",
         error: error
      })
   }
}


export const isUserAuthorizeSecond = async (req, res, next) => {
   /*
   try {
      console.log("from middlewares request paramters is ", req.params)
      if (req.cookies.MPS && req.cookies.MPS !== "undefiend") {
         const token = req.cookies.MPS
         const idFromToken = JWT.verify(token, process.env.SECRET);

         if (req.params.id == idFromToken.id) {
            // checking if user is exists or not 
            // console.log("the id is ", idFromToken.id)
            try {
               const exists = await teacherSignupModel.findOne({ _id: idFromToken.id });
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
   */
}

export const afterSignupAuth = async (req, res, next) => {

   if (req.cookies.MPS && req.cookies.MPS !== "undefiend") {
      // console.log("cookies is founded. from middleware ")
      const token = req.cookies.MPS
      const idFromtoken = JWT.verify(token, process.env.SECRET);


      // checking if user is exists or not 
      let checkinUser
      try {
         checkinUser = await teacherSignupModel.findOne({ _id: idFromtoken.id });
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
         const checkTeacherInfo = await TeacherPersonalInformationModel.findOne({ user: checkinUser._id });

         if (!checkTeacherInfo) {
            // console.log("after signup middleare user personal information is not exits")
            next();
         }
         else {
            // console.log("after signup middleare user personal information is exits to redirect to previus school data ")
            res.redirect("/teacher/status")
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


// this middleware will applied on when user use this route => /teacher/status
export const afterSignupDetails = async (req, res, next) => {

   if (req.cookies.MPS && req.cookies.MPS !== "undefiend") {

      const token = req.cookies.MPS
      const idFromtoken = JWT.verify(token, process.env.SECRET);



      let checkinUser
      try {
         checkinUser = await teacherSignupModel.findOne({ _id: idFromtoken.id });
         // console.log(checkinUser)
      } catch (error) {
         console.log(error);
         return res.status(500).render("error.ejs", {
            title: "ERROR IN PAGE",
            error: error
         })
      }

      if (checkinUser) {
         // console.log('after signup user is valid ok')
         let existTeacherPersnalInfo
         try {
            existTeacherPersnalInfo = await TeacherPersonalInformationModel.findOne({ user: checkinUser._id })
         } catch (error) {
            console.log(error);
            return res.status(500).render("error.ejs", {
               title: "ERROR IN PAGE",
               error: error
            })
         }

         if (existTeacherPersnalInfo) {
            if(checkinUser.asAdmin == "YES"){
               return res.redirect("/teacher/profile")
            }
            else{
               next();
            }
         }
         else {
            return res.redirect("/teacher/personalinformation")
            // console.log("user studnet personal informtion is not exists checked from middlewars")
         }
      }
      else {
         res.redirect("/teacher/create")
      }
   }
   else {
      res.redirect("/teacher/login");
   }

}


// this is for when user use this route = /teacher/profile 
export const teacherClearAll = async (req, res, next) => {
   
   if (req.cookies.MPS && req.cookies.MPS !== "undefiend") {
      const token = req.cookies.MPS
      const idFromtoken = JWT.verify(token, process.env.SECRET)
      const id = idFromtoken.id

      // console.log("profile middleware : cookie is ", token)
      // console.log("profile middleware : tokenId  is ", id)



      let exists
      try {
         exists = await teacherSignupModel.findOne({ _id: idFromtoken.id });
         // console.log("profile middleware : exits user is  ", exists )
      } catch (error) {
         return res.status(500).render("error.ejs", {
            title: "ERROR IN PAGE",
            error: error
         })
      }

      if (exists) {
         // console.log("profile middleware : user is exists")
         let checkTeacherDetails
         try {
            checkTeacherDetails = await TeacherPersonalInformationModel.findOne({ user: exists._id });
            // console.log("profile middleware : stdent Persoan Informatio is ", checkTeacherDetails);
         } catch (error) {
            console.log(error);
            return res.status(500).render("error.ejs", {
               title: "ERROR IN PAGE",
               error: error
            })
         }

         if (checkTeacherDetails) {
            // console.log("profile middleware: sutdent detals is exits");
            if(exists.asAdmin=="YES"){
               req.teacherData = {
                  signupData: exists,
                  personalInfo: checkTeacherDetails,
               }
               next();
            }
            else{
               return res.redirect("/teacher/status")
            }

         }
         else {
            res.redirect("/teacher/signupinformation")
         }




      }
      else {
         return res.redirect("/teacher/create")
      }



   }


   else {
      res.redirect("/teacher/login")
   }
}
