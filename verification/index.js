/*
###
###
###
###
###
###
###
###
###
###
###
###       PLEASE DO NOT EDIT THIS FILE
###       FOR DevMastery TESTING PURPOSES!
###
###       THIS FILE IS FOR DevMastery TO BE ABLE TO TEST YOUR CODE PROPERLY
###       CHANGING THIS FILE CAN BREAK THE PROCESS OF VERIFICATION

██████╗░███████╗██╗░░░██╗███╗░░░███╗░█████╗░░██████╗████████╗███████╗██████╗░██╗░░░██╗
██╔══██╗██╔════╝██║░░░██║████╗░████║██╔══██╗██╔════╝╚══██╔══╝██╔════╝██╔══██╗╚██╗░██╔╝
██║░░██║█████╗░░╚██╗░██╔╝██╔████╔██║███████║╚█████╗░░░░██║░░░█████╗░░██████╔╝░╚████╔╝░
██║░░██║██╔══╝░░░╚████╔╝░██║╚██╔╝██║██╔══██║░╚═══██╗░░░██║░░░██╔══╝░░██╔══██╗░░╚██╔╝░░
██████╔╝███████╗░░╚██╔╝░░██║░╚═╝░██║██║░░██║██████╔╝░░░██║░░░███████╗██║░░██║░░░██║░░░
╚═════╝░╚══════╝░░░╚═╝░░░╚═╝░░░░░╚═╝╚═╝░░╚═╝╚═════╝░░░░╚═╝░░░╚══════╝╚═╝░░╚═╝░░░╚═╝░░░

###
###
###
###
###
###
###
###
###
###
*/

'use strict';

const fs = require('fs');
const express = require('express');
const app = express();
const cors = require('cors')

app.use(cors());

app.use('/public', express.static(process.cwd() + '/public'));

app.route('/_api/package.json')
  .get(function(req, res, next) {
    console.log('Request received');
    fs.readFile(__dirname + '/../package.json', function(err, data) {
      if(err) return next(err);
      res.type('txt').send(data.toString());
    });
  });
  
app.route('/')
    .get(function(req, res) {
		  res.sendFile(process.cwd() + '/views/index.html');
    })

// Wrong routes
app.use(function(req, res, next){
  res.status(404);
  res.type('txt').send('Not found');
});

// Error Middleware
app.use(function(err, req, res, next) {
  if(err) {
    res.status(err.status || 500)
      .type('txt')
      .send(err.message || 'Internal Server Error');
  }  
})

const PORT = process.env.PORT || 9000;
app.listen(PORT, function () {
    console.log('Server is listening');
});

