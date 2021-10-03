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
});

//server is listening at http://127.0.0.1:8000
server.listen(8000);
console.log('Node.js web server at port 8000 is running.');

