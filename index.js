// index.js — Password generator client logic
//
// Responsibilities:
// - Maintain the character set used for password generation.
// - Store runtime settings (password length, min/max, inclusion of numbers/symbols).
// - Provide a simple Password class that builds a random string from the character set.
// - Wire UI controls (length input, plus/minus, symbols toggle) to generator behavior.
// - Implement copy-to-clipboard feedback for generated passwords.
//
// Notes:
// - Uses Math.random() for simplicity; this is sufficient for casual use but
//   is NOT a cryptographically secure random number generator.
// - The `characters` array is intentionally mutable: toggling the symbols/numbers
//   checkbox will add or remove characters from that array at runtime.
// - Keep comments only — no functional code changes were applied.

const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];

// Default runtime settings for the UI / generator
settings = {
    passwordLength: 8,
    includeNumSym: true,
    minLength: 4,
    maxLength: 52
}

/**
 * Password class
 * A minimal class that generates a random password string of a given length
 * using the global `characters` array.
 */
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

// Initialize tooltip text and reflect configured min/max values
document.querySelector(".number-input").querySelector(".tooltiptext").textContent = `Set password length between ${settings.minLength} and ${settings.maxLength}`

// Cache DOM elements and wire primary actions
const generatePwdBtnEl = document.querySelector("#generate-pwd-btn").addEventListener("click",generatePwdBtn)
const pwdEl = document.querySelectorAll(".pwd")
const tooltipEl = document.getElementById("myTooltip")
const pwdLengthInputEl = document.getElementById("pwd-length-input")

// Symbols & numbers toggle control
const symbolsNumbersCheckboxEl = document.getElementById("symbols-numbers")
symbolsNumbersCheckboxEl.checked = settings.includeNumSym
symbolsNumbersCheckboxEl.addEventListener("change", (event) => {
    // Update settings based on checkbox state and add/remove characters
    settings.includeNumSym = event.target.checked
    if (settings.includeNumSym) {
        if (!characters.includes("0")) {
            characters.push("0","1","2","3","4","5","6","7","8","9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/")
        }
    } else {
        for (let i = characters.length - 1; i >= 0; i--) {
            if ("0123456789~`!@#$%^&*()_-+=[]{},|:;<>.?/".includes(characters[i])) {
                characters.splice(i, 1);
            }
        }
    }
    console.log(characters)
})

// Number input control: plus/minus buttons handling
document.querySelectorAll(".number-input").forEach(container => {
  const input = container.querySelector("input")
  const plus = container.querySelector(".plus")
  const minus = container.querySelector(".minus")

  plus.addEventListener("click", () => {
    if (input.value < settings.maxLength)
        settings.passwordLength = input.value = parseInt(input.value) + 1
  })
  minus.addEventListener("click", () => {
    if (input.value > settings.minLength)
        settings.passwordLength = input.value = parseInt(input.value) - 1
  })
})
pwdLengthInputEl.value = settings.passwordLength;

// Keep settings in sync when the user types a value directly
pwdLengthInputEl.addEventListener("input", (event) => {
    let value = parseInt(event.target.value)
    if (isNaN(value) || value === null || value === undefined) {
        // If input is not a number, reset to minimum
        value = settings.minLength
        settings.passwordLength = value
    } else if (value > settings.maxLength) {
        // Clamp values greater than max to the configured maximum
        value = settings.maxLength
        settings.passwordLength = value
        event.target.value = value
    }
})

// On blur, validate and clamp the input to allowed range
pwdLengthInputEl.addEventListener("blur", (event) => {
    let value = parseInt(event.target.value)
    if (value === "" || value === null || value === undefined || isNaN(parseInt(value)) || parseInt(event.target.value) < settings.minLength) {
        event.target.value = settings.minLength
        settings.passwordLength = settings.minLength
    } else if (parseInt(event.target.value) > settings.maxLength) {
        event.target.value = settings.maxLength
        settings.passwordLength = settings.maxLength
    }   else {
        settings.passwordLength = parseInt(event.target.value)
    }
})


// Generate password(s) and attach copy listeners if not already added
function generatePwdBtn() {
    for(let element of pwdEl) {
        const pwd = new Password(settings.passwordLength)
        element.textContent = pwd.generatePwd()
        if (!element.hasCopyListener) {
            element.addEventListener("click", copyToClipboard)
            element.hasCopyListener = true // custom flag to avoid adding multiple listeners
        }
    }
}

// Copy-to-clipboard behavior with visual tooltip feedback
function copyToClipboard(event) {
    const text = event.target.textContent
    navigator.clipboard.writeText(text)
        .then(() => console.log(`Copied: ${text}`))
        .catch(err => console.error("Failed to copy:", err))
    tooltipEl.textContent = "Copied: " + text;
    tooltipEl.style.visibility = "visible";
    setTimeout(() => {
        tooltipEl.style.visibility = "hidden"
        tooltipEl.textContent = "Copy to clipboard"
    }, 2000)
}

