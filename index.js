/*
Student Id: 301138662
Student Name: Aishwarya Shrestha

Enterprise Techs-Mobile Pltfms - MAPD 713
Instructor: Viktor Zaytsev 

Date of Submission: 10/1/2021
Assignment: 1
*/

const http = require("http");

//implemented data storage
let Database = [];

//server to handle request and response
var server = http.createServer(async function (request, response) {
   //requests - GET / POST / DELETE
   if (request.url == "/" && request.method == "GET") {
    response.writeHead(200, { "Content-Type": "text/plain" }); 
    response.end("Namaste!");
  }

  //handle  HTTP GET request
  else if (request.url == "/images" && request.method == "GET") {
    if (Database.length == 0) {
      response.writeHead(200, { "Content-Type": "text/plain" }); 
      response.end("Image Array field is empty.");
    } else {
      response.writeHead(200, { "Content-Type": "application/json" }); 
      const responsePayload = { data: Database };
      response.end(JSON.stringify(responsePayload));
    }
  }

  //handle HTTP POST request with JSON Payload
  else if (request.url == "/images" && request.method == "POST") {
    //stores in memory json payload received in POST request
    //Return a list of all images information as a response to GET request
    const loading = [];
    for await (const chunk of request) {
      loading.push(chunk);
    }
    const data = JSON.parse(Buffer.concat(loading).toString());

    Database = [...Database, data];
    response.end("Image is stored in Database.");
  }

  //Implemented method deleting of all records
  else if (request.url == "/images" && request.method == "DELETE") {
    Database = [];
    response.end("Image is cleared from Database.");
  }
      
});

//server is listening at http://127.0.0.1:8000
server.listen(8000);
console.log('Node.js web server at port 8000 is running.');

