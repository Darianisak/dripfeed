
var url =  document.URL

if (url.includes("reddit")) {
    document.body.style.border = "5px solid red";
}   else if (url.includes("instagram")) {
    document.body.style.border = "5px solid yellow";
}   else if (url.includes("linkedin")) {
    document.body.style.border = "5px solid blue";
}   else if (url.includes("facebook")) {
    document.body.style.border = "5px solid purple";
}   else {
    document.body.style.border = "5px solid green";
}
