async function getBlogData() {
  let url = "https://127.0.0.1:5000/experience/view";
  let data = [];
  try {
    let response = await fetch(url);
    data = await response.json();
  } catch (error) {
    console.log(error);
  }
  console.log("first", data);
  return data;
}

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
    await getData();
  }

  if (await isAdmin()) {
    document.getElementById("/admin").style.display = "block";
  }
}

startup();

document.getElementById("/logOut").addEventListener("click", function () {
  doLogOut();
});

function doLogOut() {
  const url = "https://127.0.0.1:5000/logout";
  window.location.href = url;
}

const blogHtml = (blog, num, roundData) => `
<div class="card border-secondary mb-3">
<div class="card-header bg-primary text-white border-secondary"><b>${blog.company} on campus experience</b></div>
<div class="card-body bg-light">
    <h6 class="card-title text-secondary">Candidate Name: <b>${blog.first_name} ${blog.last_name}</b></h6>
    <p class="card-text text-danger">Topics: ${blog.tags}.</p>
    <p class="card-text text-success">Status : ${blog.selected} <br> Difficulty: ${blog.level}.</p>
   <button id ="btn-${num}" type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal-${num}   ">View More</button>
   <div class="modal fade scrollable" id="exampleModal-${num}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
        <div class="modal-header">
            <h4 class="modal-title" id="exampleModalLabel"><b>${blog.company} on campus experience</b></h4>
            <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <h5>Candidate Name: ${blog.first_name} ${blog.last_name}</h5>
            <b>Batch of: </b>${blog.batch}<br>
            <script>
                for(let k=0;k<roundData.length;k++){
                    roundData[k]
                }
            </script>
            <b>Round Information: <br></b>${roundData}<br>
            <b>Feedback: </b>${blog.feedback}<br>
            <b>Topics: </b>${blog.tags}<br>
            <b>Status : </b>${blog.selected} <br>
            <b>Difficulty: </b>${blog.level}<br>
        </div>
        </div >
    </div >
    </div >
</div >
</div >
</div >
    `;

function createBlob(blogData, blogNumber) {
  const div = document.createElement("div");
  if (blogData.selected == 0) {
    blogData.selected = "Selected";
  } else {
    blogData.selected = "Rejected";
  }
  if (blogData.level == 0) {
    blogData.level = "easy";
  } else if (blogData.level == 1) {
    blogData.level = "medium";
  } else {
    blogData.level = "hard";
  }
  div.setAttribute("id", "blog_" + blogNumber);
  div.setAttribute("class", "col-lg-12");
  let roundData = [];
  //   let roundCount = blogData.round_data.length;
  //   let roundCount = Object.keys(blogData.round_data).length;
  //   for (let k = 0; k < roundCount; k++) {
  // questionCount = Object.keys(blogData.round_data["round_" + (k + 1)]).length;
  // let text = "Round " + (k + 1) + ": " + `<br>`;
  // for (let l = 0; l < questionCount; l++) {
  //   text += blogData.round_data["round_" + (k + 1)]["question_" + (l + 1)];
  // }
  // roundData.push(text);
  // if (k < questionCount - 1) roundData.push(`<br>`);
  //   }
  roundData = blogData.round_data;
  div.innerHTML = blogHtml(blogData, blogNumber, roundData);
  return div;
}
const getData = async () => {
  let datas = await getBlogData();
  datas = datas.data;
  console.log(datas)
  for (let i = 0; i < datas.length; i++) {
    const ele = document.getElementById("blogs");
    ele.appendChild(createBlob(datas[i], i + 1));
  }
};

//call this after login
