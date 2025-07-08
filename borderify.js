
// Wait for the DOM to be loaded before we try and remove nodes.
//
// FIXME : Need a timeout escape here incase page loads take too long.
//      This is shit and will never resolve
//
// while (document.readyState !== "interactive" || document.readyState !== "complete") {
    // async() => {await new Promise(r => setTimeout(r, 800))};
    // console.log("Waiting for DOM to be interactive...");
// 
    // if (document.readyState === "complete") {
        // break;
    // }
// };
// 

var url =  document.URL

//  FIXME : Probably better to do this as a switch func
//
if (url.includes("reddit")) {
    console.log("Applying tweaks to Reddit");

    // Remove the infini-scroll area
    //
    // This ALSO removes post body, so we may need some further rules based on
    // URL.
    //
    document.querySelector('.subgrid-container').remove();

    // Remove the sidebar
    //
    document.querySelector('.left-sidebar').remove();

    console.log("Tweaks applied.");

}   else if (url.includes("instagram")) {
    document.body.style.border = "5px solid yellow";
}   else if (url.includes("linkedin")) {
    document.body.style.border = "5px solid blue";
}   else if (url.includes("facebook")) {
    document.body.style.border = "5px solid purple";
}   else {
    document.body.style.border = "5px solid green";
}
