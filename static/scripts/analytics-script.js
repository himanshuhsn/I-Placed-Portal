var trace1 = {
    x: ["DSA", "Linked List", "Arrays", "DP", "DSA1", "Linked List1", "Arrays1", "DP1", "DSA2", "Linked List2", "Arrays2", "DP2"],
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

