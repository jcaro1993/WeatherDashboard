var today = new Date();
var date = today.getDate();
var month = today.getMonth() + 1;
var year = today.getFullYear();
$(document).ready(() => {
    function weatherInfo() {
        var city = $("#city-input").val()
        var apiQuery = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=caf932346b78dde952075fa3fc6aed80"
        console.log(city)

        $.ajax({
            url: apiQuery,
            method: "GET"
        }).then(function(res) {
            $(".city-name").text(res.city.name)
            $('#temperature').text("Temperature: " + res.list[0].main.temp)
            $('#wind-speed').text("wind-speed:" + res.list[0].wind.speed)
            $('#humidity').text("humidity:" + res.list[0].main.humidity)
            var lati = res.city.coord.lat
            var longt = res.city.coord.lon
            console.log(res)
            console.log(longt)
            console.log(lati)

            var apiQuery2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lati + "&lon=" + longt + "&units=imperial&appid=caf932346b78dde952075fa3fc6aed80"
            $.ajax({
                url: apiQuery2,
                method: "GET"
            }).then(function(res2) {
                console.log(res2)
                for (i = 1; i < 6; i++) {
                    var days = $("<div class='col forecast bg-primary text-white ml-3 mb-3 rounded'>")
                    var date5 = date++ + 1
                    var forecaste = $("<h5>").text(" (" + month + "/" + date5 + "/" + year + ")")
                    var temp = $("<p>").text("Temp: " + Math.round(res2.daily[i].temp.day) + "F")
                    var conds = $("<p>").text("Conditions: " + res2.daily[i].weather[0].main)
                    var humi = $("<p>").text("Humidity: " + res2.daily[i].humidity + "%")
                    $(".5day").append(days)
                    $(days).append(forecaste, temp, conds, humi)

                }

            })
        })
    }
    $("#search-button").on("click", weatherInfo)

})