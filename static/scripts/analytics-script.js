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


async function getData1() {
    let url = 'https://127.0.0.1:5000/analytics/topic_frequency';
    let data = [];
    try {
        let response = await fetch(url)
        data = (await response.json());
    } catch (error) {
        console.log(error)
    }
    console.log("Data incoming plot 1 ", data)
    return data
}

async function getData2() {
    let url = 'https://127.0.0.1:5000/analytics/company_frequency';
    let data = [];
    try {
        let response = await fetch(url)
        data = (await response.json());
    } catch (error) {
        console.log(error)
    }
    console.log("Data incoming plot 2 ", data)
    return data
}


async function getData3() {
    let url = 'https://127.0.0.1:5000/analytics/cgpa_company';
    let data = [];
    try {
        let response = await fetch(url)
        data = (await response.json());
    } catch (error) {
        console.log(error)
    }
    console.log("Data incoming plot 3 ", data)
    return data
}


async function getData4() {
    let url = 'https://127.0.0.1:5000/analytics/difficulty_level';
    let data = [];
    try {
        let response = await fetch(url)
        data = (await response.json());
    } catch (error) {
        console.log(error)
    }
    console.log("Data incoming plot 4 ", data)
    return data
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

async function makePlots() {
    let data_plot1 = await getData1()
    let x = [], y = [];
    for (let i = 0; i < data_plot1.length; i++) {
        x.push(data_plot1[i].topic);
        y.push(data_plot1[i].frequency);
    }
    var trace1 = {
        x: x,
        y: y,
        type: 'scatter'
    };


    var data = [trace1];

    Plotly.newPlot('plot-1', data);

    let data_plot2 = await getData2()
    x = [], y = [];
    for (let i = 0; i < data_plot2.length; i++) {
        x.push(data_plot2[i].company_name);
        y.push(data_plot2[i].frequency);
    }
    var trace2 = {
        x: x,
        y: y,
        type: 'scatter'
    };


    var data = [trace2];

    Plotly.newPlot('plot-2', data);

    let data_plot3 = await getData3()
    x = [], y = [];
    for (let i = 0; i < data_plot3.length; i++) {
        x.push(data_plot3[i].company_name);
        y.push(data_plot3[i].avg_cgpa);
    }
    var trace3 = {
        x: x,
        y: y,
        type: 'bar'
    };


    var data = [trace3];

    Plotly.newPlot('plot-3', data);

    let data_plot4 = await getData4()
    x = [], y = [];
    for (let i = 0; i < data_plot4.length; i++) {
        x.push(data_plot4[i].frequency);
    }
    var data = [{
        values: x,
        labels: ['Easy', 'Medium', 'Hard'],
        type: 'pie'
    }];

    var layout = {
        height: 300,
        width: 500
    };

    Plotly.newPlot('plot-4', data, layout);
}






