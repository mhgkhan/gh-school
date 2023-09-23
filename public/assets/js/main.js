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

let surveyValue = document.querySelectorAll(".surveyValue");
let counter1=0,counter2=0,counter3 = 0
setInterval(() => {
    if(counter1 ===5000){
        clearInterval();
    }
    else{
        counter1 = counter1 + 500
        surveyValue[0].innerHTML = counter1+"+"
    }
}, 100);
setInterval(() => {
    if(counter2 ===50000){
        clearInterval();
    }
    else{
        counter2 = counter2 + 200
        surveyValue[1].innerHTML = counter2+"+"
    }
}, 100);

setInterval(() => {
    if(counter3 ===100000){
        clearInterval();
    }
    else{
        counter3 = counter2 + 100
        surveyValue[2].innerHTML = counter3+"+"
    }
}, 100);





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
