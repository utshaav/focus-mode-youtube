 // Save toggle state to chrome.storage
document.querySelectorAll(".settings-input").forEach(input => {
    input.addEventListener("change", () => {
    chrome.storage.local.set({ [input.id]: input.checked });
    });
});

// Load toggle state from chrome.storage
function setToggle() {
    chrome.storage.local.get(["toggle1", "toggle2", "toggle3", "toggle4"], (result) => {
    document.getElementById("toggle1").checked = result.toggle1 || false;
    document.getElementById("toggle2").checked = result.toggle2 || false;
    document.getElementById("toggle3").checked = result.toggle3 || false;
    document.getElementById("toggle4").checked = result.toggle4 || false;
    });
}

function getToggleStates() {
    var toggleLists = [1,2,3,4];
    var states = {};
    toggleLists.forEach(id => {
        chrome.storage.local.get(["toggle"+id], (result) => {
            states["toggle"+id] = result["toggle"+id] || false;
        });
    });
    return states;
}

document.addEventListener("DOMContentLoaded", setToggle);