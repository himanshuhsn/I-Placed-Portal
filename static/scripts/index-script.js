document.getElementById("login").addEventListener("click", function () {
    doLogin()
});

function doLogin() {
    document.getElementById("spinner").style.display = "block";
    // add API for login here, do redirect 
    const url = 'https://127.0.0.1:5000/login'
    fetch(url)
        .then(response => response.json())
        .then(json => {
            console.log(json);
            document.getElementById("demo").innerHTML = JSON.stringify(json)
        })
    document.getElementById("loginScreen").style.display = "none";
}