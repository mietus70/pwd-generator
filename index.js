/**
 * Password Generator - index.js
 *
 * Main client-side logic for the password generator app. This file contains
 * a small Password class responsible for generating a random password and
 * UI wiring code that handles user input (length, inclusion of numbers/symbols),
 * button handlers and clipboard copy behavior.
 *
 * Conventions / notes:
 * - `settings` holds runtime configuration used by the UI and generator.
 * - `characters` is a mutable array of allowed characters; toggling the
 *   symbols/numbers option will add/remove those characters.
 * - DOM elements are selected at load time and used by event handlers below.
 */

// Default character set: A-Z, a-z and a minimal set of numbers/symbols.
const characters = [
  "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
  "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",
  "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
  "~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"
];

// Application settings with sensible defaults.
const settings = {
  passwordLength: 12,
  includeNumSym: true,
  minLength: 4,
  maxLength: 52
};

/**
 * Class: Password
 * Simple wrapper that generates a random string using the global `characters`
 * array. The class is intentionally small to keep responsibilities clear.
 *
 * @example
 * const p = new Password(10);
 * const value = p.generatePwd();
 */
class Password {
  pwdLength;

  constructor(pwdLength) {
    this.pwdLength = pwdLength;
  }

  /**
   * generatePwd
   * Produces a random password string with length equal to `this.pwdLength`.
   * Uses Math.random() which is suitable for basic client-side needs but
   * not for cryptographic purposes.
   *
   * @returns {string} random password
   */
  generatePwd() {
    let pwd = "";
    for (let i = 0; i < this.pwdLength; i++) {
      pwd += characters[Math.floor(Math.random() * characters.length)];
    }
    return pwd;
  }
}

// Cache DOM elements used by the UI logic.
const pwdEls = document.querySelectorAll(".pwd");
const tooltipEl = document.getElementById("myTooltip");
const pwdLengthInputEl = document.getElementById("pwd-length-input");
const generatePwdBtn = document.getElementById("generate-pwd-btn");
const symbolsNumbersCheckboxEl = document.getElementById("symbols-numbers");

// Initialize UI state using settings.
document.querySelector(".number-input .tooltiptext").textContent = `Set password length between ${settings.minLength} and ${settings.maxLength}`;
symbolsNumbersCheckboxEl.checked = settings.includeNumSym;
pwdLengthInputEl.value = settings.passwordLength;

// Toggle adding/removing numbers and symbols from the `characters` set.
symbolsNumbersCheckboxEl.addEventListener("change", (event) => {
  settings.includeNumSym = event.target.checked;
  if (settings.includeNumSym) {
    // Ensure numbers and symbols are present only once.
    const extras = "0123456789~`!@#$%^&*()_-+=[]{},|:;<>.?/".split("");
    for (const ch of extras) {
      if (!characters.includes(ch)) characters.push(ch);
    }
  } else {
    // Remove numbers/symbols if the option is disabled.
    for (let i = characters.length - 1; i >= 0; i--) {
      if ("0123456789~`!@#$%^&*()_-+=[]{},|:;<>.?/".includes(characters[i])) {
        characters.splice(i, 1);
      }
    }
  }
  // Small debug output to help during development.
  // console.log(characters);
});

// Number input plus/minus handlers (increase/decrease password length).
document.querySelectorAll(".number-input").forEach(container => {
  const input = container.querySelector("input");
  const plus = container.querySelector(".plus");
  const minus = container.querySelector(".minus");

  plus.addEventListener("click", () => {
    const val = parseInt(input.value, 10);
    if (val < settings.maxLength) {
      settings.passwordLength = input.value = val + 1;
    }
  });

  minus.addEventListener("click", () => {
    const val = parseInt(input.value, 10);
    if (val > settings.minLength) {
      settings.passwordLength = input.value = val - 1;
    }
  });
});

// Keep settings in sync with direct input changes.
pwdLengthInputEl.addEventListener("input", (event) => {
  let value = parseInt(event.target.value, 10);
  if (isNaN(value)) {
    value = settings.minLength;
  }
  if (value < settings.minLength) value = settings.minLength;
  if (value > settings.maxLength) value = settings.maxLength;
  settings.passwordLength = value;
  event.target.value = value;
});

pwdLengthInputEl.addEventListener("blur", (event) => {
  let value = parseInt(event.target.value, 10);
  if (isNaN(value) || value < settings.minLength) {
    value = settings.minLength;
  } else if (value > settings.maxLength) {
    value = settings.maxLength;
  }
  settings.passwordLength = value;
  event.target.value = value;
});

/**
 * generatePwdBtn
 * Generates passwords for all `.pwd` elements and attaches a click
 * listener to enable copy-to-clipboard behavior (listener is only added once).
 */
function generatePwdBtn() {
  for (const element of pwdEls) {
    const pwd = new Password(settings.passwordLength);
    element.textContent = pwd.generatePwd();
    if (!element.hasCopyListener) {
      element.addEventListener("click", copyToClipboard);
      element.hasCopyListener = true; // prevent duplicate listeners
    }
  }
}

/**
 * copyToClipboard
 * Copies clicked password text to the clipboard and briefly shows a tooltip.
 * @param {Event} event click event from a `.pwd` element
 */
function copyToClipboard(event) {
  const text = event.target.textContent;
  navigator.clipboard.writeText(text)
    .then(() => console.log(`Copied: ${text}`))
    .catch(err => console.error("Failed to copy:", err));

  // Show feedback in tooltip for a short time.
  tooltipEl.textContent = `Copied: ${text}`;
  tooltipEl.style.visibility = "visible";
  setTimeout(() => {
    tooltipEl.style.visibility = "hidden";
    tooltipEl.textContent = "Copy to clipboard";
  }, 2000);
}

// Wire up generate button.
generatePwdBtn.addEventListener("click", generatePwdBtn);

