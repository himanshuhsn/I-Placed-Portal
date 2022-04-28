function logoutUser() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        console.log("logout ")
    }).catch((error) => {
        // An error happened.
        console.log(error);
    });
}





const blogHtml = (blog, num, roundData) => `
<div class="card border-secondary mb-3">
<div class="card-header bg-primary text-white border-secondary"><b>${blog.company} on campus experience</b></div>
<div class="card-body bg-light">
    <h6 class="card-title text-secondary">Candidate Name: <b>${blog.firstName} ${blog.lastName}</b></h6>
    <p class="card-text text-danger">Topics: ${blog.tags}.</p>
    <p class="card-text text-success">Status : ${blog.status} <br> Difficulty: ${blog.level}.</p>
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
            <h5>Candidate Name: ${blog.firstName} ${blog.lastName}</h5>
            <b>Batch of: </b>${blog.batch}<br>
            <script>
                for(let k=0;k<roundData.length;k++){
                    roundData[k]
                }
            </script>
            <b>Round Information: <br></b>${roundData}<br>
            <b>Feedback: </b>${blog.feedback}<br>
            <b>Topics: </b>${blog.tags}<br>
            <b>Status : </b>${blog.status} <br>
            <b>Difficulty: </b>${blog.level}<br>
        </div>
        </div >
    </div >
    </div >
</div >
</div >
</div >
    `



function createBlob(blogData, blogNumber) {
    const div = document.createElement('div');
    div.setAttribute("id", "blog_" + blogNumber);
    div.setAttribute("class", "col-lg-12")
    let roundData = []
    let roundCount = Object.keys(blogData.rounds).length
    for (let k = 0; k < roundCount; k++) {
        questionCount = Object.keys(blogData.rounds['round_' + (k + 1)]).length;
        let text = "Round " + (k + 1) + ": " + `<br>`;
        for (let l = 0; l < questionCount; l++) {
            text += blogData.rounds['round_' + (k + 1)]["question_" + (l + 1)]
        }
        roundData.push(text);
        if (k < questionCount - 1)
            roundData.push(`<br>`);
    }
    div.innerHTML = blogHtml(blogData, blogNumber, roundData);
    return div;
}


let datas = []

const getData = () => {
    // db.collection("experienceBlog").get().then(qs => {
    //     qs.forEach(doc => datas.push(doc.data()))
    //     for (let i = 0; i < datas.length; i++) {
    //         const ele = document.getElementById('blogs');
    //         ele.appendChild(createBlob(datas[i], i + 1));
    //         // console.log(ele.innerHTML)
    //     }
    // })
    // call from viewExp()

    url ='https://127.0.0.1:5000/experience/view';
    fetch(url)
        .then(response => response.json())
        .then(data => console.log(data));

    datas = [{ "email": "gagan@j.com", "level": "medium", "rounds": { "round_1": { "question_1": "very ez" } }, "lastName": "Singh", "batch": "2018", "feedback": "very ez", "status": "selected", "company": "Paytm", "tags": ["Hash", "Linked List", "palindrome"], "cgpa": "8.9", "firstName": "Gagandeep" }, { "tags": [], "feedback": "They generally asked medium leetcode questions. Please be through with the leetcode medium level questions.", "cgpa": "8.10", "lastName": "Nayak", "rounds": { "round_1": { "question_2": "Select SQL command that uses group by command.", "question_1": "How to add two numbers without using + operator ?" } }, "firstName": "Himanshu Sekhar", "level": "easy", "batch": "2018", "email": "himanshun@iitbhilai.ac.in", "status": "selected", "company": "MAQ Software" }, { "email": "x@m.c", "feedback": "", "level": "easy", "rounds": { "round_1": { "question_1": "" } }, "lastName": "Pushkar", "cgpa": "1", "company": "MAQ Software", "batch": "2018", "firstName": "Saransh", "status": "selected", "tags": ["Recursion"] }, { "batch": "2018", "feedback": "good experience.", "tags": ["palindrome"], "cgpa": "7", "level": "easy", "rounds": { "round_2": { "question_1": "Basic interaction." }, "round_1": { "question_2": "Hr question.", "question_1": "question on palindrome." } }, "firstName": "Test ", "email": "test@user.com", "lastName": "User", "status": "selected", "company": "Amazon" }, { "cgpa": "8", "tags": [], "status": "selected", "firstName": "Devansh", "company": "Others", "email": "d@c.c", "level": "easy", "batch": "2018", "lastName": "Chaudhary", "rounds": { "round_1": { "question_1": "Basic interactive questions." } }, "feedback": "good" }, { "firstName": "Swapnil", "cgpa": "8.1", "tags": ["Arrays", "Linked List"], "rounds": { "round_2": { "question_1": "HR round questions." }, "round_1": { "question_2": "question on linked list.", "question_1": "Question on arrays." } }, "batch": "2018", "email": "swapnilnarad2000@gmail.com", "feedback": "Good experience.", "lastName": "Narad", "level": "easy", "company": "LTI", "status": "selected" }, { "rounds": { "round_1": { "question_1": "Height of tree" } }, "status": "selected", "cgpa": "8.8", "firstName": "Vivek", "tags": ["Tree", "Binary Search Tree"], "batch": "2018", "feedback": "", "lastName": "Singh", "email": "viveks@iitbhilai.ac.in", "company": "OYO Rooms", "level": "medium" }, { "email": "himanshu000666@gmail.com", "feedback": "good.", "firstName": "Himanshu", "status": "selected", "company": "Flipkart", "batch": "2018", "lastName": "Nayak", "tags": ["AVL-Tree", "Strings"], "rounds": { "round_1": { "question_1": "question on strings.", "question_2": "question on arrays." } }, "level": "easy", "cgpa": "8" }, { "status": "selected", "email": "chirap@iitbhilai.ac.in", "lastName": "Poonia", "rounds": { "round_1": { "question_3": "Tree question for 3rd largest element", "question_2": "Sliding window", "question_1": "2 pointer" } }, "cgpa": "8.5", "tags": ["Tree", "two-pointer-algorithm", "sliding-window"], "batch": "2018", "feedback": "", "level": "medium", "firstName": "Chirag", "company": "Paytm" }, { "batch": "2018", "feedback": "afafaf", "email": "siram@123.com", "tags": ["Hash"], "company": "Microsoft", "rounds": { "round_1": { "question_1": "dscac" } }, "status": "selected", "level": "easy", "lastName": "nikhil", "firstName": "siram", "cgpa": "10" }, { "firstName": "Faizan", "status": "selected", "lastName": "Rakin", "feedback": "ez", "cgpa": "7.1", "email": "f@r.c", "rounds": { "round_1": { "question_1": "ez" } }, "level": "easy", "batch": "2018", "company": "ICICI Bank", "tags": ["python"] }, { "email": "test@user.com", "status": "selected", "firstName": "test", "level": "easy", "feedback": "test", "cgpa": "8", "tags": ["Binary Search", "Matrix"], "batch": "2018", "company": "VMWare", "lastName": "user 3", "rounds": { "round_1": { "question_1": "test" } } }, { "level": "hard", "status": "not_selected", "lastName": "User-2", "cgpa": "8", "email": "test@user.com", "feedback": "test", "tags": ["Dynamic Programming"], "company": "Others", "batch": "2018", "rounds": { "round_1": { "question_1": "test" } }, "firstName": "Test" }]
    for (let i = 0; i < datas.length; i++) {
        const ele = document.getElementById('blogs');
        ele.appendChild(createBlob(datas[i], i + 1));
    }
}

//call this after login 
getData()