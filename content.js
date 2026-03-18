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
const videoAutoPlay = "ytd-ytp-autonav-endscreen-upnext-button";

async function getToggleStates() {
    const toggleLists = [1, 2, 3, 4, 5];
    const states = {};

    for (const id of toggleLists) {
        const result = await chrome.storage.local.get("toggle" + id);
        states["toggle" + id] = result["toggle" + id] || false;
    }

    return states;
}


// Function to hide all Shorts (ytd-rich-shelf-renderer)
async function hide() {
    const data = await getToggleStates();

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

                    const theaterBtn = document.querySelector('data-title-no-tooltip="Theater mode"]');
                    if (theaterBtn) theaterBtn.click();

                    break;

                case "toggle4":
                    final_string += `${commentsSection}, `;
                    break;

                case "toggle5":
                    const autoplayBtn = document.querySelector('button[aria-label="Cancel autoplay"]');
                    if (autoplayBtn) autoplayBtn.click();
                    break;
            }
        }
    }

    if (final_string) {
        const elements = document.querySelectorAll(final_string.slice(0, -2));
        elements.forEach(el => {
            if (el.style.display !== "none") {
                el.style.display = "none";
            }
        });
    }
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