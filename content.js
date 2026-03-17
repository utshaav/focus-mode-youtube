// Create the Focus button
// const button = document.createElement("button");
// button.innerText = "Focus";
// button.style.position = "fixed";
// button.style.top = "100px";
// button.style.right = "20px";
// button.style.zIndex = "9999";
// document.body.appendChild(button);

// Function to hide all Shorts (ytd-rich-shelf-renderer)
function hideShorts() {
    const elements = document.querySelectorAll("ytd-rich-shelf-renderer");
    elements.forEach(el => {
        el.style.display = "none";
        console.log("Hid element:", el);
    });
}

// Click handler for the button
// button.addEventListener("click", () => {
//     console.log("Focus button clicked!");
//     hideShorts();
// });

// Observe dynamic changes on the page
const observer = new MutationObserver(mutations => {
    mutations.forEach(() => {
        hideShorts(); // Hide any new Shorts that appear
    });
});

// Start observing the body for added nodes
observer.observe(document.body, { childList: true, subtree: true });