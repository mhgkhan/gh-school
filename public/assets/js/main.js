const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");
const closeMenu = document.getElementById("closeMenu")


let open = true
menuBtn.addEventListener("click", e => {
    if (!open) {
        navMenu.style.transform = "translateY(-500px)"
        open = true
    }
    else {
        navMenu.style.transform = "translateY(0px)"
        open = false
    }
})

closeMenu.addEventListener("click", e=>{
    navMenu.style.transform = "translateY(-500px)"
    open = true
})






// aos and typed animations libarary works 

var typed = new Typed("#firstHead", {
    strings: ["Our Aim To Educate The Nation "],
    typeSpeed: 120,
})
var typed = new Typed("#courses", {
    strings: ["MATHS", "URDU", "ENGLISH", "ISLAMYAT", "PAK STUDY", "PASHTO", "BIOLOGY", "CHEMISTARY"],
    typeSpeed: 50,
    loop:true,
    cursorChar:"✏️"
})

AOS.init({
    duration:600,
    once:false,
    offset:30
})
