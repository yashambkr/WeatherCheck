const { response } = require("express");
const express = require("express");
const { futimesSync } = require("fs");
const { request } = require("http");
const https = require("https");
const bodyParser = require("body-parser");



const app= express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){

    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){
 console.log("Post Request recieved");
     
    const queryCity = req.body.cityName;
    const apikey = "786fd714594913529e69af3034e66b74";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ queryCity +"&appid="+ apikey +"&units="+ units; 

    https.get(url, function(response){
        console.log(response);
        response.on("data", function(data){
            
            const weathrdata= JSON.parse(data)
            

            const temp = weathrdata.main.temp
            const weatherDescription = weathrdata.weather[0].description
            const tempdata = "And current temprature : "+ temp +" degree C";
            const icon = weathrdata.weather[0].icon
            const imageUrl= " http://openweathermap.org/img/wn/" + icon + "@2x.png";

            
            
            
            res.write("<h1>The Weather currently in "+queryCity+ "is "+ weatherDescription+"\n</h1>");
            res.write("<img src="+imageUrl+">");
            res.write("<h2>"+ tempdata +"</h2>");
            res.send()
        })
    }); 
});







app.listen(3000, function(){
    console.log("SErver is up running on port 3000.");
})