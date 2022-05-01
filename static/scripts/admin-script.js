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

async function getUserId() {
  let url = "https://127.0.0.1:5000/userId";
  let usr_id = ""
  try {
    let response = await fetch(url);
    usr_id = (await response.json()).user_id;
  } catch (error) {
    console.log(error);
  }
  console.log(usr_id);
  return usr_id;
}

async function getBlogData() {
  let url = "https://127.0.0.1:5000/experience/get_unapproved_blogs";
  let data = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "user_id": await getUserId()
    })
  })
  data = await data.json()
  return data
}

async function approveBlog(blog_id) {
  let url = "https://127.0.0.1:5000/experience/approve";
  let data = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "admin_id": await getUserId(),
      "blog_id": blog_id
    })
  })
}

async function denyBlog(blog_id) {
  let url = "https://127.0.0.1:5000/experience/deny";
  let data = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "admin_id": await getUserId(),
      "blog_id": blog_id
    })
  })
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

document.getElementById("/logOut").addEventListener("click", function () {
  doLogOut();
});


document.addEventListener("click", (e) => {
  let element = e.target;
  if (element.tagName = "BUTTON") {
    console.log(element.id)
    if ("approve" == element.id.split(" ")[0]) {
      let ele = document.getElementById("blogs");
      tokens = element.id.split(" ");
      removalElem = document.getElementById("blog_" + tokens[1][4])
      blog_id = removalElem.getAttribute("name")
      // call the approve api
      approveBlog(blog_id)
      console.log(tokens[1])
      ele.removeChild(document.getElementById("blog_" + tokens[1][4]))
    }
    else if ("deny" == element.id.split(" ")[0]) {
      let ele = document.getElementById("blogs");
      tokens = element.id.split(" ");
      removalElem = document.getElementById("blog_" + tokens[1][4])
      blog_id = removalElem.getAttribute("name")
      // call the approve api
      denyBlog(blog_id)
      console.log(tokens[1])
      ele.removeChild(document.getElementById("blog_" + tokens[1][4]))
    }
  }
})



function doLogOut() {
  const url = "https://127.0.0.1:5000/logout";
  window.location.href = url;
}
async function startup() {
  if (await userLoggedIn()) {
    // console.log("ASDAS", userLoggedIn())
    document.getElementById("/logOut").style.display = "block";
    getData();
  }

  if (await isAdmin()) {
    document.getElementById("/admin").style.display = "block";
  }
}



startup();
const blogHtml = (blog, num, roundData) => `
<div class="card border-secondary mb-3">
<div class="card-header bg-primary text-white border-secondary"><b>${blog.company} on campus experience</b></div>
<div class="card-body bg-light">
    <h6 class="card-title text-secondary">Candidate Name: <b>${blog.first_name} ${blog.last_name}</b></h6>
    <p class="card-text text-danger">Topics: ${blog.tags}.</p>
    <p class="card-text text-success">Status : ${blog.selected} <br> Difficulty: ${blog.level}.</p>
   <button name = "btnx" id ="btn-${num}" type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal-${num}   ">View More</button>
   <button name = "btnx" id ="approve btn-${num}" type="button" class="btn btn-success">Approve</button>
   <button name = "btnx" id ="deny btn-${num}" type="button" class="btn btn-danger" ">Deny</button>
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
  if (blogData.selected == 1) {
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
  console.log(blogData.user_blog_id)
  div.setAttribute("id", "blog_" + blogNumber);
  div.setAttribute("name", blogData.user_blog_id)
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
