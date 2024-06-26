//teacher signup model 
import teacherSignupModel from '../Models/teacher/TeacherSignup.js'
// teacher personal information model 
import TeacherPersonalInformationModel from '../Models/teacher/TeacherInfoModel.js'



import JWT from 'jsonwebtoken'
import studentPersonalInformationModel from '../Models/student/StudentPersonalDetails.js'

// import {gotoErrorPage} from "../controllers/otherHandlers.js"


export const userAuth = async (req, res, next) => {

   if (req.cookies.GHS) {
      const token = req.cookies.GHS
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
      if (req.cookies.GHS && req.cookies.GHS !== "undefiend") {
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

   try {
      // console.log("from middlewares request paramters is ", req.params)
      if (req.cookies.GHS && req.cookies.GHS !== "undefiend") {
         const token = req.cookies.GHS
         const idFromToken = JWT.verify(token, process.env.SECRET);

         // checking if user is exists or not 
         // console.log("the id is ", idFromToken.id)
         try {
            const exists = await teacherSignupModel.findOne({ _id: idFromToken.id });
            // console.log("the user data is ", exists);
            if (exists && idFromToken.id == exists._id) {
               // checking the user personal information is completed or not 
               if(req.params.id == idFromToken.id && req.params.id == exists._id){
                  const checkIfo = await TeacherPersonalInformationModel.findOne({user:exists._id})
                  // console.log('the user data from isuserauthorizedsecond middlware is ', checkIfo);
                  // console.log(exists._id)
                  if(checkIfo){
                     // console.log("from auth second middleware the user is verified")
                     req.stdData = {
                        signupData:exists,
                        personalData:checkIfo,
                        userId: checkIfo.user 
                     }
                     next();
                  }
                  else{
                     // console.log("from auth second middleware the user is not completed the personal ifnormatio ")
                     return res.redirect("/teacher/personalinformation")
                  }
               }
               else{
                  return res.redirect("/teacher/login")
               }
            }
            else {
               res.redirect("/teacher/create/")
            }
         } catch (error) {
            return res.status(500).render("error.ejs", {
               title: "ERROR IN PAGE",
               error: error
            })
         }

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

   if (req.cookies.GHS && req.cookies.GHS !== "undefiend") {
      // console.log("cookies is founded. from middleware ")
      const token = req.cookies.GHS
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
         res.redirect("/teacher/create")
      }

   }
   else {
      // console.log("user not authorize ")
      res.redirect("/student/login")
   }

}


// this middleware will applied on when user use this route => /teacher/status
export const afterSignupDetails = async (req, res, next) => {

   if (req.cookies.GHS && req.cookies.GHS !== "undefiend") {

      const token = req.cookies.GHS
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
            if (checkinUser.AsVerified == "YES" && checkinUser.AsSelected == "YES") {
               return res.redirect("/teacher/profile")
            }
            if (checkinUser.AsSelected == "YES" && checkinUser.AsVerified != "YES") {
               return res.redirect("/teacher/selected")
            }
            else {
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

export const checkisSelectedOrNot = async (req, res, next) => {
   if (req.cookies.GHS && req.cookies.GHS !== "undefiend") {

      const token = req.cookies.GHS
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

            if (checkinUser.AsVerified == "YES" && checkinUser.AsSelected == "YES") {
               return res.redirect("/teacher/profile")
            }

            if (checkinUser.AsSelected == "YES" && checkinUser.AsVerified != "YES") {
               next()
            }

            else {
               return res.redirect("/teacher/status")
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

   if (req.cookies.GHS && req.cookies.GHS !== "undefiend") {
      const token = req.cookies.GHS
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
            if (exists.AsSelected == "YES" && exists.AsVerified == "YES") {
               req.teacherData = {
                  signupData: exists,
                  personalInfo: checkTeacherDetails
               }
               return next()
            }

            if (exists.AsSelected == "YES" && exists.isVerified != "YES") {
               return res.redirect("/teacher/selected")
            }

            else {
               return res.redirect("/teacher/status")
            }

         }
         else {
            return res.redirect("/teacher/signupinformation")
         }




      }
      else {
         return res.redirect("/teacher/create")
      }



   }


   else {
      return res.redirect("/teacher/login")
   }
}



export const idFromToken = async (req,res,next)=>{
   if (req.cookies.GHS && req.cookies.GHS !== "undefiend") {
      const token = req.cookies.GHS
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
            req.userId = exists._id
            next();
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


export const authorizeTeacher = async (req,res,next)=>{
   if(req.cookies.GHS && req.cookies.GHS !=="undefiend"){
      const token = req.cookies.GHS 
      const validateToken = JWT.verify(token, process.env.SECRET);
      const id = validateToken.id
      let exists
      try {
         exists = await teacherSignupModel.findOne({_id:id});
      } catch (error) {
         return res.status(500).render("error.ejs", {
            title: "ERROR IN PAGE",
            error: error
         })
      }


      if(exists){

         if(exists.AsSelected == "YES" && exists.AsVerified == "YES"){
            return next()
         }
         
         if (exists.AsSelected == "YES" && exists.isVerified != "YES") {
            return res.redirect("/teacher/selected")
         }

         else {
            return res.redirect("/teacher/status")
         }

      }
      else{
         return res.redirect("/teacher/create")
      }

   }
   else
   {
      return res.redirect("/teacher/login")
   }
}






export const authorizeTeacherWithAuthorizeStudentExits = async (req,res,next)=>{
   if(req.cookies.GHS && req.cookies.GHS !=="undefiend"){
      const token = req.cookies.GHS 
      const validateToken = JWT.verify(token, process.env.SECRET);
      const id = validateToken.id
      let exists
      try {
         exists = await teacherSignupModel.findOne({_id:id});
      } catch (error) {
         return res.status(500).render("error.ejs", {
            title: "ERROR IN PAGE",
            error: error
         })
      }


      if(exists){

         if(exists.AsSelected == "YES" && exists.AsVerified == "YES"){
            if(req.cookies.GHSSTD && req.cookies.GHSSTD !== "undefiend"){

               const token = req.cookies.GHSSTD
               const verifyToken = JWT.verify(token,process.env.SECRET)
               console.log(verifyToken)
               const Stdid = verifyToken.id 
               console.log("the id is ", Stdid)
               
               try {

                  const existStd = await studentPersonalInformationModel.findOne({_id:Stdid})
                  console.log("the student id is ", existStd.teacherid)
                  console.log("the teacher id is ", exists._id)
                  console.log(existStd.teacherid === exists._id )
                     // checking if student id is same with teacher id 
                   if(existStd){
                     console.log("student is verified")
                     // if(exists._id == existStd.teacherid){
                     //    return next();
                     // }
                     // else{
                     //    return res.redirect("/teacher/login")
                     // }
                     return next();
                  }
                  else{
                      return res.redirect("/teacher/admission/new/")
                   }

               } catch (error) {
                  return res.status(500).render("error.ejs", {
                     title: "ERROR IN PAGE",
                     error: error
                  })
               }


            }
            else{
               return res.redirect("/teacher/admission/new/")
            }


         }
         
         if (exists.AsSelected == "YES" && exists.isVerified != "YES") {
            return res.redirect("/teacher/selected")
         }

         else {
            return res.redirect("/teacher/status")
         }

      }
      else{
         return res.redirect("/teacher/create")
      }

   }
   else
   {
      return res.redirect("/teacher/login")
   }
}



