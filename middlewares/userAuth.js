

const userAuth = (req,res,next)=>{
   if(req.session.user_id){
      return res.redirect("/student/dashboard")
   }
   else{
      next();
   }
}

export default userAuth