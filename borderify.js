// `manageReddit`
//
// Reddit DOM management function. This function selectively applies mutations
// to Reddit's DOM to remove 'infini-scroll' functions, e.g., recommended posts.
//
// Depending on the full document.URL value, different mutations should be
// applied. This is to ensure that articles, etc., recommended from Google
// Search are still usable.
//
function manageReddit(document, window) {
    if (isHomepage(window, window)) {
        // Primary content nodes on the Reddit homepage.
        removeNode('.subgrid-container', document, true);
    }   else {
        var rightSideBar = document.querySelector('#right-sidebar-container');
        if (rightSideBar !== null) { rightSideBar.remove(); }
    };

    // Default removals
    const searchInput = document.querySelector(".search-input").parentElement.parentElement ;
    searchInput.remove();
    removeNode('.left-sidebar', document, true);
}

// `manageInstagram
//
//  Instagram DOM management function.
//
function manageInstagram(document, window) {
    if (isHomepage(window)) {
        var stories = document.querySelector("[data-pagelet=story_tray]");
        if (stories !== null) { stories.remove(); }

        var recommendedProfiles = document.querySelector("a[href='/explore/people/']").parentElement.parentElement;
        if (recommendedProfiles !== null) { recommendedProfiles.remove(); }

    }   else    {
        logMessage("Not Homepage");
    };

    // Default navigation to remove. These all can lead to infiniScroll.
    //
    const removeTabs = ["Reels", "Explore", "Search", "Notifications"];

    removeTabs.forEach(element => {
        var el = document.querySelector(`[aria-label=${element}]`);
        if (el !== null)    {
            var node = el.parentElement.parentElement.parentElement.parentElement;
            if (node !== null) { node.remove(); };
        }
    });

    // This finds the Meta "Messages" widget and removes it. It's visual noise.
    //
    var el = document.querySelector("[aria-label='Direct messages']")
    if (el !== null) {
        var recommendedProfiles = el.parentElement.parentElement.parentElement.parentElement.parentElement;
        if (recommendedProfiles !== null) { recommendedProfiles.remove(); }
    }
};


// `manageDefault`
//
// Default mutation function. This function applies DOM mutations in cases
// whereby we have not defined custom mutations for the site.
//
function manageDefault(document, window) {
    document.body.style.border = "5px solid green";
};


// `main`
//
// TODO
//
function main(document, window) {
    const domain = document.domain.split(".")[1];

    // FIXME: Maybe check the netloc against a predefined list and short circuit?

    switch(domain)  {
        case "reddit":
            manageReddit(document, window);
            break;

        case "instagram":
            manageInstagram(document, window);
            break;

        default:
            manageDefault(document, window);
            break;
    }
};

main(document, window);


// Helper functions
//
// FIXME : These should be imported.
//
function logMessage(message) {
    console.log(message);
}

function removeNode(selectorTarget, dom, debug=false)    {
    var node = dom.querySelector(selectorTarget);

    if (node === null) {
        if (debug) { logMessage(`${selectorTarget} could not be removed!`) };
        return;
    }

    node.remove();
    if (debug) { logMessage(`${selectorTarget} was removed.`) };
    return
}

function isHomepage(window) {
    return window.location.pathname.length === 1;
};
