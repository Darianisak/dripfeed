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
    var pathname_fragments = window.location.pathname.split('/')

    if (isHomepage(window, window)) {
        // Primary content nodes on the Reddit homepage.
        removeNode('.subgrid-container', document, true);
    }   else if (pathname_fragments[1] === 'r'){
        var rightSideBar = document.querySelector('#right-sidebar-container');
        if (rightSideBar !== null) { rightSideBar.remove(); }
        var highlights = document.querySelector(["community-highlight-carousel"])
        if (highlights !== null) { highlights.remove(); }
        if (pathname_fragments[3] === 'comments') {
            var subRedditCredit = document.querySelector('#pdp-credit-bar');
            if (subRedditCredit !== null) { subRedditCredit.remove(); }
        }
    };
    // Default removals
    const searchInput = document.querySelector(".search-input").parentElement.parentElement ;
    if (searchInput !== null) { searchInput.remove(); }
    searchInput.remove();
    removeNode('.left-sidebar', document, true);
}

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

        default:
            manageDefault(document, window);
            break;
    }
};

// This is our 'hacky' way to intercept navigation events and reapply page customizations.
//
window.addEventListener('click', async (event) => {
    await new Promise(r => setTimeout(r, 3000));
    main(document, window)
});

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
