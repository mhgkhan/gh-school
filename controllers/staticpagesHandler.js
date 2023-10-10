import { gotoErrorPage } from "./otherHandlers.js"

const pageRender = (ejsfile, title) => {
    return (req, res) => {
        try {
            
            res.status(200).render(ejsfile, {title: title})
        } catch (error) {
            gotoErrorPage(req,res,error,500)
        }
    }
}

class staticPagesHandler {
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
    // for our student signup page 
    static hanldeStudentSignupPage = pageRender("./student/create.ejs", "Create Account Student Addmision ")
    // for our student login page
    static hanldeStudentLoginPage = pageRender("./student/login.ejs", "Login Account Student Addmission ")
    // for our student adding personal details informaton 
    static handleAddstudentPersonalInformation = pageRender("./student/studentinformationform.ejs", "Add Your Personal Information || GHSMS")
    // for our student previus school form 
    static handlePreviusSchooldataForm = pageRender("./student/pschoolInfoform.ejs", "Student Previus School Information Form || GHSMS");
    // for our school student profile 



    static handleProfilePage = async (req,res)=>{
        try {
        const studentData = req.studentData;
        return res.status(200).render("./student/dashboard/index.ejs", {
            title:"Student Profile",
            signupData:studentData.signupData,
            personalInfo: studentData.personalInfo,
            previusSchool:studentData.previusSchool
        })    
        } catch (error) {
            // return res.status(500).json({error})
            gotoErrorPage(req,res,error,500)
        }
    }
    


    static handleLogout = async (req,res)=>{
        // setting the logout logic 
        res.clearCookie("MPS")
        return res.redirect("/student/login")
    }

    
    static handlPersonalInfoPage = pageRender("./student/edit/editpersonalinfo.ejs", "Edit your personal Information");
    static handlePrviusSchoolInfoPage = pageRender("./student/edit/editpreviusschoolinfo.ejs", "Edit Previus School Information");
    static handleAdmissionFormPage = pageRender("./student/edit/editadmissioninfo.ejs", "Edit Your Addmission Form");
    static handleChangePasswordPage = pageRender("./student/edit/changepassword.ejs", "Chagne Your passowrd now");





}




export default staticPagesHandler
