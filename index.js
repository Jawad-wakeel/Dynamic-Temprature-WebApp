const fs = require("fs");
const http = require("http");
const request = require("requests");



const homeFile = fs.readFileSync("index.html", 'utf-8');
const replaceVal = (file, value) => {
	let temp = file.replace('{%city%}', value.name);
		temp = temp.replace('{%country%}', value.sys.country);
		temp = temp.replace('{%temp%}', value.main.temp);
		temp = temp.replace('{%feel%}', value.main.feels_like);
	    temp = temp.replace('{%min%}', value.main.temp_min);
		temp = temp.replace('{%max%}', value.main.temp_max);
	return temp;
}
const server = http.createServer((req, res) => {
	if(req.url == '/'){
		request("http://api.openweathermap.org/data/2.5/weather?q=Peshawar&units=metric&appid=32b408d6cb924318dfc0e56f3224ce0b")
			.on("data", (chunk) => {
				const  dyData = JSON.parse(chunk);
				// const dynData = dyData.map((cur) => {
				// 	return replaceVal(homeFile, cur);
				// });
				const dynData = replaceVal(homeFile, dyData);

				res.write(dynData)
				// console.log(dynData);

			})
			.on("end", (err) => {
				console.log("Error is : " + err);
				res.end();
			})

	}else{
		res.writeHead(404, {"Content-type":"text/html"});
		res.end("404, Page doesn't Found");
	}
});

server.listen(8000, "127.0.0.1", () => {
	console.log("localehost:8000");
});