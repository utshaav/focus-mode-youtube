 // Save toggle state to chrome.storage
document.querySelectorAll(".settings-input").forEach(input => {
    input.addEventListener("change", () => {
    chrome.storage.local.set({ [input.id]: input.checked });
    });
});

// Load toggle state from chrome.storage
function setToggle() {
    chrome.storage.local.get(["toggle1", "toggle2", "toggle3", "toggle4", "toggle5"], (result) => {
        document.getElementById("toggle1").checked = result.toggle1 || false;
        document.getElementById("toggle2").checked = result.toggle2 || false;
        document.getElementById("toggle3").checked = result.toggle3 || false;
        document.getElementById("toggle4").checked = result.toggle4 || false;
        document.getElementById("toggle5").checked = result.toggle5 || false;
    });
}


document.addEventListener("DOMContentLoaded", setToggle);