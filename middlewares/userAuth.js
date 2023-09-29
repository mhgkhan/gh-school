import studentSignupModel from "../Models/schoolstudents/Studentsignup.js";
import JWT from 'jsonwebtoken'



const userAuth = async (req, res, next) => {

   if (req.cookies.MPS) {
      const token = req.cookies.MPS 
      // console.log(token)
      const idformtoken = JWT.verify(token, process.env.SECRET);
      // console.log(idformtoken);
      let checkinUser 
      try {
         checkinUser = await studentSignupModel.findOne({_id:idformtoken.id});
      } catch (error) {
         console.log(error);
         res.status(200).json(error)
      }

      if(checkinUser){
         // res.redirect("/student/form1");
         res.redirect("/")
      }
      else{
         // res.redirect("/student/login")
         next()
      }

   }
   else {
      next()
   }
}

export default userAuth