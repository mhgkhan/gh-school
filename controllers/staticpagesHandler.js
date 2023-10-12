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
    

    // handle teacher logout route 
    static handleLogout = async (req,res)=>{
        // setting the logout logic 
        res.clearCookie("MPS")
        return res.redirect("/teacher/login")
    }









    // student pages handler 
    // for our student adding personal details informaton 
    static handleAddstudentPersonalInformation = pageRender("./student/studentinformationform.ejs", "Add Your Personal Information || GHSMS")
    // for our student previus school form 
    static handlePreviusSchooldataForm = pageRender("./student/pschoolInfoform.ejs", "Student Previus School Information Form || GHSMS");
    // for our school student profile 





    
    static handlPersonalInfoPage = pageRender("./student/edit/editpersonalinfo.ejs", "Edit your personal Information");
    static handlePrviusSchoolInfoPage = pageRender("./student/edit/editpreviusschoolinfo.ejs", "Edit Previus School Information");
    static handleAdmissionFormPage = pageRender("./student/edit/editadmissioninfo.ejs", "Edit Your Addmission Form");
    static handleChangePasswordPage = pageRender("./student/edit/changepassword.ejs", "Chagne Your passowrd now");





}




export default staticPagesHandler
