//teacher signup model 
import teacherSignupModel from '../Models/teacher/TeacherSignup.js'

import studentPersonalInformationModel from '../Models/student/StudentPersonalDetails.js'

import StudentPreviusSchoolDetailsModel from "../Models/student/StudentPreviusSchoolData.js";


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
                  
                    if(req.cookies.GHSSTD && req.cookies.GHSSTD !="undefiend"){

                        const thisStdToken = req.cookies.GHSSTD
                        const verifyicationToken = JWT.verify(thisStdToken,process.env.SECRET);

                        const savedPreviusSchooldata = StudentPreviusSchoolDetailsModel.create({
                            ...req.body,
                            certificate:req.file.filename,
                            student: verifyicationToken.id
                        })

                        const saveCookies = res.cookie("GHSSTDCOMP", savedPreviusSchooldata.student,{
                            httpOnly:true
                        })

                        return res.status(201).render("./teacher/profile/adm/stdresult.ejs", {
                            title:"Student Admission Result",
                            message:"Your appliation is an progress",
                            studentid: savedPreviusSchooldata.student
                        })


                    }
                    else{
                        return res.redirect("/teacher/adm/new")
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




    static saveStudentPersonalData = async (req,res)=>{
        if(req.cookies.GHS && req.cookies.GHS !=="undefiend"){
            const token = req.cookies.GHS 
            const verification = JWT.verify(token,process.env.SECRET)
            const id = verification.id 



            // checking if user is exists or not 

            let exists
            try {
                exists = await teacherSignupModel.findOne({_id:id})

                if(exists){
                    
                    const studentPersonalData = new studentPersonalInformationModel({
                        ...req.body,
                        image:req.file.filename,
                        teacherid:exists._id
                    })
                    const saveStudent = await studentPersonalData.save();

                    // console.log(saveStudent)
                    // console.log("sve studentid is ", saveStudent._id)
                    const data = {
                        id:saveStudent._id
                    }
                    const genToken = JWT.sign(data,process.env.SECRET)
                    res.cookie("GHSSTD", genToken, {
                        httpOnly: true
                    })
                    return res.redirect("/teacher/admission/new/previussd")
                }
                else{
                    return res.redirect("/teacher/signup")
                }


            } catch (error) {
                console.log(error);
                return res.redirect("/teacher/login")
            }

        }
        else{
            return res.redirect('teacher/login')
        }
    }

}



export default studentApiHandler