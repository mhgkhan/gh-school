const pageRender = (ejsfile, title) => {
    return (req, res) => {
        try {
            res.status(200).render(ejsfile, {title: title})
        } catch (error) {
            return res.status(500).render("error.ejs", {
                title: "ERROR IN PAGE",
                error: error
             })
        }
    }
}

class staticPagesHandler {

    // static pages handler 
    // home (index) page 
    static handleIndex = pageRender("index", "HOME-SMS school management system")
    // for our mission page 
    static handleOurmissionPage = pageRender("ourmission", "Our Mission GHSMS");
    // for our story page 
    static handleOurstory = pageRender("ourstory", "Our Story GHSMS");
    // for our gallery page 
    static handleOurgallery = pageRender("ourgallery", "Our Gallery GHSMS");
    // for our addmission page 
    static handleAdmissionspage = pageRender("addmissions", "Addmissions || GHSMS");
    // for our contactus page 
    static handleContactuspage = pageRender("contactus", "Contactus || GHSMS");









    // teacher pages handler 
    // for our Teacher signup page 
    static hanldeTeacherSignupPage = pageRender("./teacher/create.ejs", "Create Account As A Teacher ")
    // for our Teacher login page
    static hanldeTeacherLoginPage = pageRender("./teacher/login.ejs", "Login Account As A Teacher ")
    // for our Teacher adding personal details informaton 
    static handleAddTeacherPersonalInformation = pageRender("./teacher/personalinfo.ejs", "Peronsal Information Teacher || GHSMS")

    
    // handle teacher profile page 
    static handleTeacherProfilePage = async (req,res)=>{
        try {
        const teacherData = req.teacherData;
        // console.log("the teacher data is " , teacherData)
        return res.status(200).render("./teacher/profile/index.ejs", {
            title:"Teacher Profile",
            signupData:teacherData.signupData,
            personalInfo: teacherData.personalInfo,
        })    
        } catch (error) {
            return res.status(500).render("error.ejs", {
                title: "ERROR IN PAGE",
                error: error
             })
        }
    }

    static handleTeacherStatusPage = pageRender("./teacher/teacherVerificationPending.ejs","Application Pending")
    static handleTeacherSelectedPage = pageRender("./teacher/teacherVerificationPage.ejs","Application Verified")

    static handleTeacherInfoPage = async (req,res)=>{
        const teacherData = req.teacherData
        try {
            res.status(200).render("./teacher/profile/info.ejs",{
                title:"Your Personal Information ",
                signupData:teacherData.signupData,
                personalInfo: teacherData.personalInfo
            })
        } catch (error) {
            console.log(error)
            return res.status(500).render("error.ejs", {
                title: "ERROR IN PAGE",
                error: error
            })
        }
    }
    
    // to chagne personal information of teacher getting page 
    static handleChangeTeacherInfo = async (req,res)=>{
        // const userId = req.userId
        const stdData = req.stdData
        // signupData:exists,
        //                 personalData:checkIfo,
        //                 userId: checkIfo.user 
        try {
            return res.status(200).render("./teacher/profile/edit/editpersonalinfo.ejs", {
                title:"Edit your personal information",
                userId : stdData.userId,
                signupData:stdData.signupData,
                personalData:stdData.personalData
            })
        } catch (error) {
            console.log(error)
            return res.status(500).render("error.ejs", {
                title: "ERROR IN PAGE",
                error: error
            })
        }
    }

    
    
    
    static handleStudentAddmissionNew = pageRender("./teacher/profile/adm/personal.ejs", "Student Personal Information form");
    static handlePrevSchoolData = pageRender("./teacher/profile/adm/prschool.ejs", "Student Previus School Information form")
    static handleStudentAdmREsult = pageRender("./teacher/profile/adm/stdresult.ejs", "Student Admission Result")




    // handle teacher logout route 
    static handleLogout = async (req,res)=>{
        // setting the logout logic 
        res.clearCookie("GHS")
        return res.redirect("/teacher/login")
    }









    // student pages handler 
    static handleCheckStatusPage = pageRender("./student/AdmStatus.ejs", "Please check your admission form status")




}




export default staticPagesHandler
