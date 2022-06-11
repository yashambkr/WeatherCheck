const { response } = require("express");
const express = require("express");
const { futimesSync } = require("fs");
const { request } = require("http");
const https = require("https");
const app= express();

app.get("/", function(req, res){


    const url = "https://api.openweathermap.org/data/2.5/weather?q=Nagpur&appid=786fd714594913529e69af3034e66b74&units=metric"; 
    var temp;
    https.get(url, function(response){
        console.log(response);
        response.on("data", function(data){
            //console.log(data); 
            const weathrdata= JSON.parse(data)
            //console.log(weathrdata);

            temp = weathrdata.main.temp
            const weatherDescription = weathrdata.weather[0].description
            const tempdata = "temprature : "+ temp +"°C";
            const icon = weathrdata.weather[0].icon
            const imageUrl= " http://openweathermap.org/img/wn/" + icon + "@2x.png";

            
            
            res.write("<h1>"+ tempdata +"</h1>");
            res.write("<img src="+imageUrl+">");
            res.write("<p>The Weather currently is "+ weatherDescription+"</p>");
            res.send()
        })
    });
    
    

    
})







app.listen(3000, function(){
    console.log("SErver is up running on port 3000.");
})