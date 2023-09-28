import studentSignupModel from "../Models/schoolstudents/Studentsignup.js";



const userAuth = async (req, res, next) => {
   if (req.session.user_id) {
      const userid = await req.session.user_id
      const compare = await studentSignupModel.findOne({ _id: userid })
      if (compare) {
         res.redirect("/")
      }
      else {
         next()
      }

   }
   else {
      next();
   }
}

export default userAuth