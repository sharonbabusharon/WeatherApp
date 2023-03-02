const express=require("express");
const https=require("https");
const bodyParser=require("body-parser")

const app=express();

app.use(bodyParser.urlencoded({extended:true}))

app.get("/",function(req,res) {
	res.sendFile (__dirname + "/index.html");
});

app.post("/",function(req,res){
	const city=req.body.cityINPUT
	const query=city;
	const appKey="e018dae1b99415b5ae5ffb15932649ab";
	const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appKey+" "
	https.get(url,function(response){
		console.log(response);

		response.on("data",function(data){
			const weatherData=JSON.parse(data)
			
			const temp=weatherData.main.temp;
			const description=weatherData.weather[0].description
			res.write("the wheather is currentyly "+description+" right now\n")
			res.write(" temperature is  " + temp+"")
			res.send()
		})
	})
})

app.listen(3000,function(){
	console.log("server running on port 3000");
})

