
// arrays for various chart data 
var time = [];
var temp = [];
var feels = [];
var weather = [];
var iconId = [];
var icon = [];

$(document).ready(function() {
    console.log("loading script.js");
    
    const API_KEY = key.MY_KEY; 
    const city_name = 'Marseille';
    $('#city').html(city_name);
    
    // openweathermap.org/forecast5
    // get timestamped data every 3hrs for 5 days, total 8data/day * 5days = 40 entries
    let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city_name}&mode=json&units=metric&appid=${API_KEY}`;
    
    $.getJSON(url).then(res => {
        console.log('suuuuuup',res.list[0]); 
        const data = res.list; 
        const days = []; 
        for (i = 4; i < data.length; i=i+8) {
            days.push(data[i]);
        }
        const temperature = Math.floor(days[0].main.temp);
        const feels_like = Math.floor(days[0].main.feels_like);
        const humidity = Math.floor(days[0].main.humidity);
        const weather = days[0].weather[0].description;
        $('#temperature').html(`${temperature}°`);
        $('#feels_like').html(`${feels_like}°`);
        $('#humidity').html(`${humidity}%`);
        $('#weather').html(weather);
        return data; 
    }).then(data => {
        console.log('push...');
        for (i = 0; i < data.length; i=i+2) {
            const time_f = moment(data[i].dt_txt).format("H[h][; ]dddd Do");
            time.push(time_f);
            temp.push(data[i].main.temp);
            feels.push(data[i].main.feels_like);
            weather.push(data[i].weather[0].description);
            iconId.push(data[i].weather[0].icon);
        }
        return iconId; 
    }).then(iconId => {
        for (i = 0; i < iconId.length; i++) {
            var img = new Image();
            var imgCode = iconId[i];
            img.src = `https://openweathermap.org/img/wn/${imgCode}.png`;
            icon.push(img);
        }
        
        console.log('canvas...');
        var ctx = $('#canvas')[0].getContext('2d');
        window.myLine = new Chart(ctx, configChart);
        
    }); 
    
})



var configChart = {
    type: 'line',
    data: {
        labels: time,
        datasets: [ {
            label: '',
            fill: false,
            pointStyle: icon,
            pointRadius: 15,
            pointHoverRadius: 18,
            data: temp,
        },
        {
            label: 'temperature',
            fill: false,
            borderColor: 'rebeccapurple',
            data: temp,
        },
        {
            label: 'feels like',
            fill: false,
            backgroundColor: 'lightpink',
            borderColor: 'lightpink',
            data: feels,
        }, ]
    },
    options: {
        responsive: false,
        title: {
            display: true,
            text: 'Temperature Prediction in Next Few Days'
        },
        tooltips: {
            mode: 'index',
            intersect: false,
            callbacks: {
                // label: function(tooltipItem) {
                //     return tooltipItem.yLabel + "something... ";
                // }
            }
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            xAxes:[
                {
                    id:'xAxis1',
                    type:"category",
                    ticks:{
                        maxRotation: 0,
                        minRotation: 0,
                        callback:function(label){
                            var time = label.split("; ")[0];
                            return time;
                        }
                    }
                },
                {
                    id:'xAxis2',
                    type:"category",
                    gridLines: {
                        drawOnChartArea: false,
                    },
                    ticks:{
                        maxRotation: 45,
                        minRotation: 0,
                        callback:function(label){
                            var time = label.split("; ")[0];
                            var day = label.split("; ")[1];
                            if(time === "3h" || time === "6h"){
                                return day;
                            }else{
                                return "";
                            }
                        }
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Temperature Celsius°'
                    }
                }]
            }
        }
    };
    