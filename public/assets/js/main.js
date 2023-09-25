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

closeMenu.addEventListener("click", e => {
    navMenu.style.height = "0px"
    open = true
})


const increaseValues = (range, index,timing) => {
    let counter = 0
    let surveyValue = document.querySelectorAll(".surveyValue");
    setInterval(() => {
        if (counter >= range) {
            clearInterval();
        }
        else {
            counter = counter  + 88
            surveyValue[index].innerHTML = counter + "+"
        }
    }, timing);
}

increaseValues(6000, 0,300);
increaseValues(16000, 1,100);
increaseValues(4500, 2, 300)





// aos and typed animations libarary works 

var typed = new Typed("#firstHead", {
    strings: ["Education is the passport to the future, for tomorrow belongs to those who prepare for it today."],
    typeSpeed: 120,
})
var typed = new Typed("#courses", {
    strings: ["MATHS", "URDU", "ENGLISH", "ISLAMYAT", "PAK STUDY", "PASHTO", "BIOLOGY", "CHEMISTARY"],
    typeSpeed: 50,
    loop: true,
    cursorChar: "✏️"
})

// AOS.init({
//     duration: 600,
//     once: false,
//     offset: 30
// })
