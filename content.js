// Create the Focus button
// const button = document.createElement("button");
// button.innerText = "Focus";
// button.style.position = "fixed";
// button.style.top = "100px";
// button.style.right = "20px";
// button.style.zIndex = "9999";
// document.body.appendChild(button);
const shortsElement = "ytd-rich-shelf-renderer";
const videoEndRecommendations = "div.ytp-ce-video";
const sidebarRecommendations = "ytd-watch-next-secondary-results-renderer";
const commentsSection = "ytd-comments";

function getToggleStates(callback) {
    const toggleLists = [1, 2, 3, 4];
    const states = {};
    let count = 0;

    toggleLists.forEach(id => {
        chrome.storage.local.get(["toggle" + id], (result) => {
            states["toggle" + id] = result["toggle" + id] || false;
            count++;
            if (count === toggleLists.length) {
                callback(states);
            }
        });
    });
}


// Function to hide all Shorts (ytd-rich-shelf-renderer)
function hide() {
    getToggleStates(data => {
        let final_string = "";
        for (const [key, value] of Object.entries(data)) {
            if (value) {
                switch (key) {
                    case "toggle1":
                        final_string += `${shortsElement}, `;
                        break;
                    case "toggle2":
                        final_string += `${videoEndRecommendations}, `;
                        break;
                    case "toggle3":
                        final_string += `${sidebarRecommendations}, `;
                        break;
                    case "toggle4":
                        final_string += `${commentsSection}, `;
                        break;
                }
            }
        }
        if (final_string) {
            const elements = document.querySelectorAll(final_string.slice(0, -2)); // Remove trailing comma+space
            elements.forEach(el => {
                el.style.display = "none";
                console.log("Hid element:", el);
            });
        }
    });
}

// Click handler for the button
// button.addEventListener("click", () => {
//     console.log("Focus button clicked!");
//     hideShorts();
// });
// Button Toogle functionality

// Observe dynamic changes on the page
const observer = new MutationObserver(mutations => {
    mutations.forEach(() => {
        hide(); // Hide any new Shorts that appear
    });
});

// Start observing the body for added nodes
observer.observe(document.body, { childList: true, subtree: true });