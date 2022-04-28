document.getElementById("login").addEventListener("click", function () {
    doLogin()
});

function doLogin() {
    document.getElementById("loginScreen").textContent = "Loading";
    document.getElementById("spinner").style.display = "block";
    // add API for login here, do redirect 
    // document.getElementById("loginScreen").style.display = "none";
}