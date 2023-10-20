//teacher signup model 
import teacherSignupModel from '../Models/teacher/TeacherSignup.js'

import studentPersonalInformationModel from '../Models/student/StudentPersonalDetails.js'

import StudentPreviusSchoolDetails from "../Models/student/StudentPreviusSchoolData.js";


import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken'


// function to handle extra responses that generate from error 
// const handleResponseError = (req,res,message,status) =>{
//     return res.status(status).json(message)
// }

class studentApiHandler {

    



    static HandlePersonalDetailsPost =  async (req, res) => {
        try {
            
            if (req.cookies.GHS && req.cookies.GHS !== "undefiend") {
                // console.log(req.file)
                // console.log(req.body)
                // console.log("cookies is exists ")
                const verfication = JWT.verify(req.cookies.GHS, process.env.SECRET)
                const id = verfication.id
                // console.log(verfication);

                // checking if user is exists or not 
                let exists
                try {
                    exists = await teacherSignupModel.findOne({ _id:id });
                    // console.log(exists);
                } catch (error) {
                    console.log(error);
                    res.status(500).json(error)
                }

                if (exists) {
                    // console.log("user is exists ")
                    // checking if this user data is already exists or not 
                    const existSignupDetails = await studentPersonalInformationModel.findOne({ user: exists._id })

                    if (existSignupDetails) {
                        // console.log("already avalaible data of student personal ")
                        await studentPersonalInformationModel.findOneAndUpdate({
                            user: exists._id
                        }, {
                            $set: {
                                ...req.body
                            }
                        })
                    }

                    else {

                        // console.log("trying to adding new student persoanl data ")
                        // console.log(req.file)
                        if (!req.file) {
                            return res.status(400).render("./student/studentinformationform.ejs",{title: "Please Image is required", errMsg:"Image are required!"})
                        }
                        else {
                            await studentPersonalInformationModel.create({
                                ...req.body,
                                image: req.file.filename,
                                user: exists._id,
                            })
                            // console.log("new student personal data has been added. ")

                            return res.redirect("/student/previusschooldata")
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









    static handlePreviusSchoolDataPost = async (req,res)=>{
        try {
         
            const {schoolname,subject,classname,rollno,obtmarks,totalmarks,schooladdress,schoolphone} = req.body

            if (req.cookies.GHS && req.cookies.GHS !== "undefiend") {
                // console.log(req.file)
                // console.log(req.body)
                // console.log("cookies is exists ")
                const verfication = JWT.verify(req.cookies.GHS, process.env.SECRET)
                const id = verfication.id
                // console.log(verfication);

                // checking if user is exists or not 
                let exists
                try {
                    exists = await teacherSignupModel.findOne({ _id:id });
                    // console.log(exists);
                } catch (error) {
                    console.log(error);
                    return res.status(500).json(error)
                }

                if (exists) {
                    // console.log("user is exists ")
                    // checking if this user data is already exists or not 
                    const existSignupDetails = await studentPersonalInformationModel.findOne({ user: exists._id })

                    if (existSignupDetails) {
                        // console.log("already avalaible data of student personal ")
                        
                      if(!req.file){
                        return res.redirect("/student/previusschooldata");
                      }

                      else{

                          // checking if this user the previus school data is already exists or not 
                        const exitsPreviusSchooldata  = await StudentPreviusSchoolDetails.findOne({user:exists._id})

                        if(exitsPreviusSchooldata){
                            return res.json({
                                user:exists.email,
                                name:exists.fullname,
                                applicationform:"pending",
                                data:"Submited verified processing. ",
                            })

                        }
                        else{

                            const savingPreviusSchoolData = new StudentPreviusSchoolDetails({
                                schoolname,schooladdress,rollno,obtmarks,totalmarks,schoolphone,subject,classname,
                                schoolcertificate:req.file.filename,
                                user:exists._id
                            })

                            const savedPSdata = await savingPreviusSchoolData.save();

                            return res.redirect("/student/profile")

                        }

                      }


                    }

                    else {
                        return res.redirect("/student/signupinformation")
                    }


                }
                else {
                    // console.log("user is not exists  ")
                    return res.redirect("/student/create")
                }


            }
            else {
                // console.log("cookie is not exits user is unothorize. ")
                return res.redirect("/student/login")
            }




        } catch (error) {
            console.log(error)
            return res.status(500).json({error})
        }
    }




    
    static handleStudentAdmissionform = async (req,res) =>{
        try {
            
            const {std_id,phone} = req.body

            if(!std_id || std_id.length<0 || !phone || phone.length<9){
                return res.status(400).json({
                    success:false,
                    error:"Invalid Credientials Passed."
                })
            }
            else{

                try {
                    const checkStudentIsExists = await studentPersonalInformationModel.findOne({std_id:std_id});
                    console.log("studentisexists is ", checkStudentIsExists)
                    if(checkStudentIsExists){

                        if(checkStudentIsExists.asSelected=="YES"){
                            return res.status(200).json({
                                success:true,
                                message:"You are selected.",
                                data:checkStudentIsExists
                            })
                        }
                        else{
                            return res.status(200).json({
                                success:true,
                                message:"Pending! Sorry your admission form is on pending.",
                                data:checkStudentIsExists
                            })
                        }
                    }
                    else{
                        return res.status(200).json({
                            success:false,
                            error:"Student of this id or phone is not avaliable please try again with valid credientials."
                        })
                    }


                } catch (error) {
                    return res.status(400).json({
                        success:false,
                        error:error
                    })
                }




            }


        } catch (error) {
            res.status(500).json({
                success:false,
                error:error
            })
        }
    }

}



export default studentApiHandler