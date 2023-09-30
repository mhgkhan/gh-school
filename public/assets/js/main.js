const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");
const closeMenu = document.getElementById("closeMenu")


let open = true
menuBtn.addEventListener("click", e => {

    if (!open) {
        navMenu.style.height = "0px"
        open = true
    }
    else {
        navMenu.style.height = "auto"
        open = false
    }
})

closeMenu.addEventListener("click", () => {
    navMenu.style.height = "0px"
    open = true
})


// psba = profile sidebar button active 
let psba = false
const openProfileSidebar = () => {
    console.log('clicked');
    const profileSidebar = document.getElementById("profile-sidebar");
    if (!psba) {
        profileSidebar.style.transform = "translateX(0px)"
        console.log(profileSidebar);
        psba = true
    }
    else {
        profileSidebar.style.transform = "translateX(-175px)"
        console.log(profileSidebar);
        psba = false
    }
}
