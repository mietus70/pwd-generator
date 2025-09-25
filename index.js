const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];

class Password {
    pwdLength;
    
    constructor(pwdLength) {
        this.pwdLength = pwdLength
    }
    
    generatePwd() {
        let pwd = ""
        
        for(let i = 0; i < this.pwdLength; i++) {
            pwd += characters[Math.floor(Math.random() * characters.length)]
        }
        return pwd
    }
}

const generatePwdBtnEl = document.querySelector("#generate-pwd-btn").addEventListener("click",generatePwdBtn)
const pwdEl = document.querySelectorAll(".pwd")
const tooltipEl = document.getElementById("myTooltip")

function generatePwdBtn() {
    for(let element of pwdEl) {
        const pwd = new Password(8)
        element.textContent = pwd.generatePwd()
        if (!element.hasCopyListener) {
            element.addEventListener("click", copyToClipboard)
            element.hasCopyListener = true // custom flag to avoid adding multiple listeners
        }
    }
}

function copyToClipboard(event) {
    const text = event.target.textContent
    navigator.clipboard.writeText(text)
        .then(() => console.log(`Copied: ${text}`))
        .catch(err => console.error("Failed to copy:", err))
    tooltipEl.textContent = "Copied: " + text;
    tooltip.style.visibility = "visible";
    setTimeout(() => {
        tooltipEl.style.visibility = "hidden"
        tooltipEl.textContent = "Copy to clipboard"
    }, 2000)
}

