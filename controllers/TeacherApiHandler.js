import teacherSignupModel from "../Models/teacher/TeacherSignup.js"
import TeacherPersonalInformationModel from '../Models/teacher/TeacherInfoModel.js'
import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken'


class TeacherApihandler {

    static handleSignupPost = async (req, res) => {
        try {
            const { firstname, lastname, email, phone, password, cpassword } = req.body
            
            if(!firstname || !lastname || !email || !phone || !password || !cpassword){
                return res.status(400).json({ err: "Form not submitted because You leave any blank field (all fields are required) ", success: false })
            }
            else{
               const fullname = `${firstname} ${lastname}`

            if (password === cpassword) {

                // checking if user is exists or not 
                let exists
                try {
                    exists = await teacherSignupModel.findOne({ phone: phone });
                } catch (error) {
                    console.log(error)
                    return res.status(500).json({ err: error, success: false })
                }

                if (!exists) {

                    const passwordToHash = await bcrypt.hash(password, 10);

                    const createUser = new teacherSignupModel({
                        fullname,
                        email,
                        phone,
                        password: passwordToHash
                    })

                    try {
                        const created = await createUser.save()
                        const data = {
                            id: created._id
                        }
                        const token = JWT.sign(data, process.env.SECRET)
                        res.cookie("MPS", token, {
                            httpOnly: true
                        })
                        return res.status(201).json({ token: token, success: true })

                    } catch (error) {
                        console.log(error)
                        return res.status(500).json({ err: error, success: false })
                    }
                }
                else {
                    return res.status(400).json({ err: "User Already Exists Try to login", success: false })
                }



            }
            else {
                return res.status(400).json({ err: "Confirm password not matching..", success: false })
            }



           }

        } catch (error) {
            console.log(error)
            return res.status(500).json({ err: error, success: false })
        }


    }




    static handleLoginPost = async (req, res) => {
        try {
            const { phone, password } = req.body

            if (!phone || !password) {
                return res.status(400).json({ success: false, err: "you leave an blank field please complete it first then submit" })
            }
            else {

                // checking if user is exists or not 
                let exists
                try {
                    exists = await teacherSignupModel.findOne({ phone: phone });
                } catch (error) {
                    console.log(error);
                    return res.status(500).json({ err: error,success:false })
                }

                if (exists) {
                    const comparePassword = await bcrypt.compare(password, exists.password);
                    if (comparePassword) {

                        const data = {
                            id: exists._id
                        }
                        const token = JWT.sign(data, process.env.SECRET)
                        res.cookie("MPS", token, {
                            httpOnly: true
                        })

                        res.status(200).json({ success: true, token: token })
                    }
                    else {
                        res.status(400).json({ success: false, err: "invilid credientials" })
                    }

                }
                else {
                    return res.status(401).json({ success: false, err: "User is not exists try to signup " })
                }

            }



        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, err: error })
        }
    }




    static handlePersonalPost = async (req, res) => {
            try {
                
                if (req.cookies.MPS && req.cookies.MPS !== "undefiend") {
                    // console.log(req.file)
                    // console.log(req.body)
                    // console.log("cookies is exists ")
                    const verfication = JWT.verify(req.cookies.MPS, process.env.SECRET)
                    const id = verfication.id
                    // console.log(verfication);
    
                    // checking if user is exists or not 
                    let exists
                    try {
                        exists = await teacherSignupModel.findOne({ _id:id });
                        // console.log(exists);
                    } catch (error) {
                        console.log(error);
                        return res.status(500).render("error.ejs", {
                            title: "ERROR IN PAGE",
                            error: error
                         })
                    }
    
                    if (exists) {
                        // console.log("user is exists ")
                        // checking if this user data is already exists or not 
                        const existSignupDetails = await TeacherPersonalInformationModel.findOne({ user: exists._id })
    
                        if (existSignupDetails) {
                          res.redirect("/teacher/status")
                        }
    
                        else {
    
                            // console.log("trying to adding new student persoanl data ")
                            // console.log(req.file)
                            if (!req.file) {
                                return res.status(400).render("./student/studentinformationform.ejs",{title: "Please Image is required", errMsg:"Image are required!"})
                            }
                            else {
                                await TeacherPersonalInformationModel.create({
                                    ...req.body,
                                    image: req.file.filename,
                                    user: exists._id,
                                })
                                // console.log("new student personal data has been added. ")
    
                                return res.redirect("/teacher/status/")
                            }
                        }
    
    
                    }
                    else {
                        // console.log("user is not exists  ")
                        res.redirect("/student/create")
                    }
    
    
                }
                else {
                    // console.log("cookie is not exits user is unothorize. ")
                    res.redirect("/student/login")
                }
    
    
    
            } catch (error) {
                console.log(error)
                res.status(500).json({ error: error })
            }
        
    }



    static updatePersonalinfo = async (req,res)=>{
        const userId = req.userId
        
        try {
            const updateInformations = await TeacherPersonalInformationModel.findOneAndUpdate({user:userId},{
                $set:{...req.body}
            })
            return res.status(200).json({
                success:true,
                msg:"Your information is been updated.. "
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({error:error.msg,success:false})
        }
    }







static updatePassword = async (req,res)=>{
    try {
        const userId = req.userId 

        const {prevpassword,newpassword,confirmpassword} = req.body


        if(newpassword == confirmpassword){

            const userData = await teacherSignupModel.findOne({_id:userId})

            if(userData){
    
                const checkPasswordisCorrect = await bcrypt.compare(prevpassword,userData.password);
    
                if(checkPasswordisCorrect){
                    const newEncryptPassword = await bcrypt.hash(confirmpassword,10) 
    
                    // updating the password 
                  try {


                    const updatePassword = await teacherSignupModel.findOneAndUpdate({
                        _id:userData._id
                    },{
                        $set:{
                            password:newEncryptPassword
                        }
                    })

                    console.log(updatePassword)

                    return res.status(200).json({success:true, msg:"Password updated."})


                  } catch (error) {
                    console.log(error)
                      return res.status(400).json({success:false,error:error})
                  }
    

    
                }
                else{
                    return res.status(400).json({success:false,error:"Previus password is not correct"})
                }
    
            }
    
            else{
                return res.status(404).json({error:"User is not exists", success:false})
            }
        }
        else{
            return res.status(404).json({error:"confirm password not matched", success:false})

        }





    } catch (error) {
        console.log(error);
        return res.status(500).json({error:error})
    }
}




}









export default TeacherApihandler