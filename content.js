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
    debugger;
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

                    const theaterBtn = document.querySelector('button[data-priority="9"]');
                    if (theaterBtn && !theaterBtn.getAttribute('data-title-no-tooltip').includes('Default')) theaterBtn.click();

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

// // Click handler for the button
// // button.addEventListener("click", () => {
// //     console.log("Focus button clicked!");
// //     hideShorts();
// // });
// // Button Toogle functionality
// isRunning = false;
// interval = 5000;
// // Observe dynamic changes on the page
// const observer = new MutationObserver(mutations => {
//     if (isRunning) return;

//     isRunning = true;
//     hide();
//     setTimeout(() => {
//         isRunning = false;
//     }, interval);
// });

const throttledHide = throttle(hide, 2000); // runs at most every 2s
const observer = new MutationObserver(() => {
    throttledHide();
});

// Start observing the body for added nodes
observer.observe(document.body, { childList: true, subtree: true });

window.onload = () => {
    hide(); // Initial call to hide elements on page load
};


// throttle function to limit the rate of hide() calls

function throttle(func, limit) {
    let lastCall = 0;
    let timeout = null;
    let lastArgs = null;

    return function (...args) {
        const now = Date.now();

        if (now - lastCall >= limit) {
            lastCall = now;
            func.apply(this, args);
        }else{
            lastArgs = args;
            if (!timeout) {
                const remaining = limit - (now - lastCall);

                timeout = setTimeout(() => {
                    lastCall = Date.now();
                    func.apply(this, lastArgs);
                    timeout = null;
                    lastArgs = null;
                }, remaining);
            }
        }
    };
}