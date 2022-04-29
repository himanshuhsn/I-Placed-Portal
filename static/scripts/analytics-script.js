async function userLoggedIn() {
    let url = 'https://127.0.0.1:5000/loggedIn';
    let loginStatus = false;
    try {
        let response = await fetch(url)
        loginStatus = (await response.json()).status;
    } catch (error) {
        console.log(error)
    }
    console.log(loginStatus)
    return loginStatus
}


function isAdmin() {
    return true
}

async function startup() {
    if (await userLoggedIn()) {
        document.getElementById("/logOut").style.display = "block"
        makePlots()
    }

    if (isAdmin()) {
        document.getElementById("/admin").style.display = "block"
    }

}
startup()

document.getElementById("/logOut").addEventListener("click", function () {
    doLogOut()
});

function doLogOut() {
    const url = 'https://127.0.0.1:5000/logout'
    window.location.href = url;
}

function makePlots() {
    var trace1 = {
        x: ["DSA", "Linked List", "Arrays", "DP", "hashmap", "hashset", "python", "c++", "set", "oops", "dbms", "strings"],
        y: [10, 15, 13, 17, 10, 15, 13, 17, 10, 15, 13, 17],
        type: 'scatter'
    };


    var data = [trace1];

    Plotly.newPlot('plot-1', data);

    var data = [
        {
            x: ['Paytm', 'LTI', 'Redisys', "Amazon", "ICICI Bank"],
            y: [21, 6, 8, 2, 8],
            type: 'bar'
        }
    ];

    Plotly.newPlot('plot-2', data);

    var data = [
        {
            x: ['Paytm', 'LTI', 'Redisys', "Amazon", "ICICI Bank"],
            y: [8.7, 7.6, 8.1, 9.2, 7.2],
            type: 'bar'
        }
    ];


    Plotly.newPlot('plot-3', data);

    var data = [{
        values: [19, 55, 27],
        labels: ['Easy', 'Medium', 'Hard'],
        type: 'pie'
    }];

    var layout = {
        height: 350,
        width: 500
    };

    Plotly.newPlot('plot-4', data, layout);
}






