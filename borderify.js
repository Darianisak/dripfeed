var url =  document.URL


// This approach is a bit more robust in that it will always 'work' on page load
// Do need to make the extension responsive to pageEvents, though, as navigating
// within the site does not cause the extension to be fired again.
//
function removeNode(selectorTarget, dom)    {
    var node = dom.querySelector(selectorTarget);

    if (node === null) {
        console.log(`${selectorTarget} could not be removed!`)
        return;
    }

    node.remove();
    console.log(`${selectorTarget} was removed.`)
    return
}

//  FIXME : Probably better to do this as a switch func
//
if (url.includes("reddit")) {
    console.log("Applying tweaks to Reddit");
    removeNode('.subgrid-container', document);
    removeNode('.left-sidebar', document);
    // FIXME - it's not attached by default, so need a listener.
    //
    removeNode('.search-dropdown-results-container', document);
    console.log("Tweaks applied.");

}   else {
    document.body.style.border = "5px solid green";
}
