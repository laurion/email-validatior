// 'use strict'
//alex
var express = require('express')
var compression = require('compression');
const EmailValidator = require('email-deep-validator');
var bodyParser = require('body-parser');
const emailValidator = new EmailValidator();
var app = express()
app.use(compression());
// app.use(express.urlencoded()); app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var port = 2022
var proxiesList = [];
var stopVerify = false;
app.set('port', (process.env.PORT || port))
app.use(express.static(__dirname + '/public'))


async function verifyObject(data){
    return new Promise(async resolve => {
      var obj = {
        status: false,
        body: data
      };

      const { wellFormed, validDomain, validMailbox } = await emailValidator.verify(data.public_email);
   
       if(wellFormed == true && validDomain == true && validMailbox == true ){
         obj.status = true;
       } else {
         obj.status = false;
      
       }
       resolve(obj);
     });
}
app.listen(app.get('port'), async function() {
  var verifyResult = await verifyObject({username: "alx.dobrin", public_email: "alxsdsgs.dobrin@gmail.com"})
  console.log(verifyResult);
})

