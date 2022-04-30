async function userLoggedIn() {
  let url = "https://127.0.0.1:5000/loggedIn";
  let loginStatus = false;
  try {
    let response = await fetch(url);
    loginStatus = (await response.json()).status;
  } catch (error) {
    console.log(error);
  }
  console.log(loginStatus);
  return loginStatus;
}

async function isAdmin() {
  let url = "https://127.0.0.1:5000/isAdmin";
  let status = false;
  try {
    let response = await fetch(url);
    status = (await response.json()).isAdmin;
  } catch (error) {
    console.log(error);
  }
  console.log(status);
  return status;
}

async function startup() {
  if (await userLoggedIn()) {
    // console.log("ASDAS", userLoggedIn())
    document.getElementById("/logOut").style.display = "block";
    document.getElementById("notlogin").style.display = "none";
    document.getElementById("logon").style.display = "block";
  }

  if (await isAdmin()) {
    document.getElementById("/admin").style.display = "block";
  }
}

startup();

document.getElementById("login").addEventListener("click", function () {
  doLogin();
});

function doLogin() {
  document.getElementById("spinner").style.display = "block";
  // add API for login here, do redirect
  const url = "https://127.0.0.1:5000/login";
  window.location.href = url;
}

document.getElementById("/logOut").addEventListener("click", function () {
  doLogOut();
});

function doLogOut() {
  const url = "https://127.0.0.1:5000/logout";
  window.location.href = url;
}
