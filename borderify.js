// `manageReddit`
//
// Reddit DOM management function. This function selectively applies mutations
// to Reddit's DOM to remove 'infini-scroll' functions, e.g., recommended posts.
//
// Depending on the full document.URL value, different mutations should be
// applied. This is to ensure that articles, etc., recommended from Google
// Search are still usable.
//
function manageReddit(document) {
    function isHomepage(path) { return path.length === 1; };

    var currentPath = window.location.pathname ;
    if (currentPath === null) { return 1; };

    if (isHomepage(currentPath))    {
        const searchInput = document.querySelector(".search-input").parentElement.parentElement ;
        searchInput.remove();

        // Primary content nodes on the Reddit homepage.
        removeNode('.subgrid-container', document, true);
        removeNode('.left-sidebar', document, true);
    }   else {
        console.log(" not homepage ")
    }
}


// `manageDefault`
//
// Default mutation function. This function applies DOM mutations in cases
// whereby we have not defined custom mutations for the site.
//
function manageDefault(document) {
    document.body.style.border = "5px solid green";
}


// `main`
//
// TODO
//
function main(document) {
    const domain = document.domain.split(".")[1];

    // FIXME: Maybe check the netloc against a predefined list and short circuit?

    switch(domain)  {
        case "reddit":
            manageReddit(document);
            break;

        default:
            manageDefault(document);
    }
}

main(document);


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
