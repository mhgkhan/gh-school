
const pageRender = (ejsfile, title) => {
    return (req, res) => {
        try {
            
            res.status(200).render(ejsfile, {title: title})
        } catch (error) {
            res.status(500).json({ error })
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
        console.log("the req user is " , req.user)
        res.status(200).render("./student/dashboard/index.ejs", {
            title:"Student Dashboard",
            student:{email:"ghazna k44@gmail.com"},
            personal:'hello'
        })

    }
    
}

export default staticPagesHandler
