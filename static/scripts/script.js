// document.getElementById("form").style.display = "none";


function logoutUser() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        console.log("logout ")
    }).catch((error) => {
        // An error happened.
        console.log(error);
    });
}

var companies = ['Amazon', 'Microsoft', 'Flipkart', 'Google', 'Adobe', 'Samsung', 'Accolite', 'MakeMyTrip', 'Snapdeal', 'Paytm', 'Zoho', 'Walmart', 'Morgan Stanley', 'OYO Rooms', 'Goldman Sachs', 'FactSet', 'D-E-Shaw', 'SAP Labs', 'Ola Cabs', 'Hike', 'MAQ Software', 'Oracle', 'VMWare', 'Qualcomm', 'Intuit ', 'Cisco', 'Facebook', 'Visa', 'Directi', 'Linkedin', 'Payu', 'Yahoo', 'Wipro', 'Yatra.com', 'Belzabar', 'Salesforce', 'Housing.com', 'Teradata', 'Synopsys', 'BankBazaar', 'Codenation', 'Citrix', 'Mahindra Comviva', 'TCS', 'InMobi', '24*7 Innovation Labs', 'One97', 'Apple', 'Times Internet', 'Twitter', 'Veritas', 'PayPal', 'Tejas Network', 'Boomerang Commerce', 'Groupon', 'Nutanix', 'Brocade', 'InfoEdge', 'Myntra', 'ABCO', 'CouponDunia', 'Cognizant ', 'Atlassian', 'Lybrate', 'Amdocs', 'IgniteWorld ', 'OATS Systems', 'United Health Group', 'Opera', 'Oxigen Wallet', 'Juniper Networks', 'Nagarro', 'Quikr', 'Rockstand', 'TinyOwl', 'GreyOrange ', 'Streamoid Technologies', 'Infosys', 'MetLife', 'Moonfrog Labs', 'Philips', 'Drishti-Soft', 'GE', 'PropTiger', 'Polycom', 'Kritikal Solutions', 'Media.net ', 'BrowserStack', 'Zillious', 'Fab.com', 'Accenture', 'IBM', 'CarWale', 'Cadence India', 'Epic Systems', 'Grofers', 'Nvidia', 'Wooker', 'Monotype Solutions', 'Arcesium', 'Bloomberg', 'nearbuy', 'Sapient', 'Xome', 'Expedia', 'Tesco', 'Airtel', 'Citicorp', 'eBay', 'Netskope ', 'Kuliza', 'DE Shaw', 'Swiggy', 'Dell', 'Infinera', 'PlaySimple', 'Rivigo', 'Intel', 'Pubmatic', 'Vizury Interactive Solutions', 'Zycus', 'Jabong', 'Informatica', 'Unisys', 'Sprinklr', 'Medlife', 'Dunzo', 'Mobicip', 'Dailyhunt', 'National Instruments', 'Komli Media', 'Target Corporation', 'Junglee Games', 'Taxi4Sure', 'HSBC', 'Service Now', 'HCL', 'FreeCharge', 'Mallow Technologies', 'CGI', 'Zopper', 'redBus', 'KLA Tencor', 'Open Solutions', 'American Express', 'Practo', 'Bidgely', 'Uber', 'Yodlee Infotech', 'Code Brew', 'Cavisson System', 'HunanAsset', 'Motlay', 'Zomato', 'Freshokartz', 'Huawei', 'Knowlarity', 'LTI', 'L&T', 'Infosys', 'Others', 'ICICI Bank', 'Toppr', 'Truminds', 'Radisys'];

var list = document.getElementById('companyName');

companies.forEach(function (item) {
    var option = document.createElement('option');
    option.value = item;
    option.text = item;
    list.appendChild(option);
});

function logoutUser() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        console.log("logout ")
    }).catch((error) => {
        // An error happened.
        console.log(error);
    });
}

document.getElementById("logOut").addEventListener("click", function () {
    logoutUser();
    setTimeout(function () {
    }, 2000);
})

let roundNumber = 1
let questionNumber = 1
let listQuestionByRound = [questionNumber];

document.getElementById('removeRound').addEventListener('click', function () {
    removeRound();
});

document.getElementById('removeQuestion').addEventListener('click', function () {
    removeQuestion();
});

document.getElementById('addRound').addEventListener('click', function () {
    addRound(++roundNumber);
});

document.getElementById('addQuestion').addEventListener('click', function () {
    ++listQuestionByRound[roundNumber - 1];
    addQuestion(roundNumber);
});

document.getElementById("submit").addEventListener('click', function () {
    const formele = $('#form')[0]
    let b = true
    for (let i = 0; i < formele.length; i++) {
        if (formele[i].checkValidity() === false) return
    }

    document.getElementById("submit").style.display = "none";
    document.getElementById("spinner").style.display = "block";
    postData()
});

const questionHtml = (questionNumber) => `
        <label for="question_${questionNumber}">Question ${questionNumber}</label>
        <textarea class="form-control"" rows="3" id="data_round_${roundNumber}_question_${listQuestionByRound[roundNumber - 1]}" placeholder="Add question description"></textarea>
        <br>`


const roundHtml = (roundNumber) => `
        <label for="round_${roundNumber}"><h4><b>Round ${roundNumber}</b></h4></label>
        <br>
        <div id="question_${questionNumber}" class="round_${roundNumber}_question_${questionNumber}">
            <label for="question_${questionNumber}">Question ${questionNumber}</label>
            <textarea class="form-control"" rows="3" id="data_round_${roundNumber}_question_${listQuestionByRound[roundNumber - 1]}" placeholder="Add question description"></textarea>
        </div>
        <br>`

const successHtml = `<div class="alert alert-success alert-dismissible fade show" role="alert">
<strong>Thanks!</strong> Your interview experience was added successfully.
<button type="button" class="close" data-dismiss="alert" aria-label="Close">
  <span aria-hidden="true">&times;</span>
</button>
</div>`

function createQuestion(questionNumber) {
    const div = document.createElement('div');
    div.setAttribute("id", "question_" + questionNumber);
    div.setAttribute("class", "round_" + roundNumber + "_question_" + questionNumber)
    div.innerHTML = questionHtml(questionNumber);
    return div;
}

function addQuestion(roundNumber) {
    const ele = document.getElementById('round_' + roundNumber);
    ele.appendChild(createQuestion(listQuestionByRound[roundNumber - 1]));
}

function removeQuestion() {
    if (roundNumber == 1 && listQuestionByRound[0] == 1) {
        console.log("Cant remove first round");
    }
    else {
        if (listQuestionByRound[roundNumber - 1] == 1) {
            removeRound();
        }
        else {
            const ele = document.getElementById('round_' + roundNumber);
            ele.removeChild(ele.lastElementChild);
            listQuestionByRound[roundNumber - 1]--;
        }
    }
}


function createRound(roundNumber) {
    const div = document.createElement('div');
    div.setAttribute("id", "round_" + roundNumber);
    div.innerHTML = roundHtml(roundNumber);
    return div;
}

function addRound(roundNumber) {
    const ele = document.getElementById('round');
    listQuestionByRound.push(1);
    ele.appendChild(createRound(roundNumber));
}

function removeRound() {
    if (roundNumber == 1) {
        console.log("Cant remove first round");
    }
    else {
        const ele = document.getElementById('round');
        ele.removeChild(document.getElementById('round_' + roundNumber));
        listQuestionByRound.pop();
        roundNumber--;
    }
}

function giveJson() {
    firstName = document.getElementById("firstName").value;
    lastName = document.getElementById("lastName").value;
    emailId = document.getElementById("exampleInputEmail1").value;
    batchYear = document.getElementById("batch").value;
    cgpa = document.getElementById("cgpa").value;
    companyName = document.getElementById("companyName").value;
    feedback = document.getElementById("feedback").value
    selectionStatus = document.querySelector('input[name="status"]:checked').value
    difficultLevel = document.querySelector('input[name="difficulty"]:checked').value
    topicTags = [];
    totalTags = document.getElementsByClassName("item").length;
    for (let topics = 0; topics < totalTags; topics++) {
        topicTags.push(document.getElementsByClassName("item")[topics].textContent);
    }
    roundData = {}
    for (let i = 1; i <= roundNumber; i++) {
        questionData = {};
        for (let j = 1; j <= listQuestionByRound[i - 1]; j++) {
            question = document.getElementById("data_round_" + i + "_question_" + j).value;
            questionData["question_" + j] = question;
        }
        roundData["round_" + i] = questionData
    }
    let formData = {
        "firstName": firstName,
        "lastName": lastName,
        "email": emailId,
        "batch": batchYear,
        "cgpa": cgpa,
        "company": companyName,
        "feedback": feedback,
        "status": selectionStatus,
        "level": difficultLevel,
        "tags": topicTags,
        "rounds": roundData
    }
    return formData;
}

const postData = () => {

    //call api addExp on giveJson() functino
    console.log(giveJson());
    console.log("Call addExp api and save to DB :)");
    alert("submitted");
    setTimeout(function () {
        window.location = "index.html";
    }, 2000);
}



    
            