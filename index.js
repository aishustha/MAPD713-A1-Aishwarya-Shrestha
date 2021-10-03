/*
Student Id: 301138662
Student Name: Aishwarya Shrestha

Enterprise Techs-Mobile Pltfms - MAPD 713
Instructor: Viktor Zaytsev 

Date of Submission: 10/3/2021
Assignment: 1
To develop Node.js http server to store, retrieve and delete information 
about images using HTTP GET, POST and DELETE requests and JSON data format.
*/

const http = require("http");

//implemented data storage
let Database = [];

//2 request counters
let getIncrement = 0;
let postIncrement = 0;

//server to handle request and response
var server = http.createServer(async function (request, response) {
   //requests - GET / POST / DELETE
   //request counter for GET requests
   getIncrement = getIncrement + 1;
   if (request.url == "/" && request.method == "GET") {
    response.writeHead(200, { "Content-Type": "text/plain" }); 
    response.end("Namaste!");
  }

  //handle  HTTP GET request
  else if (request.url == "/images" && request.method == "GET") {
    //request counter for GET requests
    getIncrement = getIncrement + 1;
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
    //request counter for POST requests
    postIncrement = postIncrement + 1;
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
      
  //log request counters values every request
  console.log(`Processed Request Count --> Get: ${getIncrement}, Post: ${postIncrement}`);

});

//server is listening at http://127.0.0.1:5000
server.listen(5000);
console.log('Server is listening at http://127.0.0.1:5000');
console.log( `Endpoints:`);
console.log(`127.0.0.1:5000/method:GET`);
console.log(`127.0.0.1:5000/images method:GET, POST, DELETE`);