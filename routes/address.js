var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection_details = require("../modules/connection_details");
var bcrypt = require('bcrypt');

//Made by Tomas.
//to get signup page.
router.get('/', function(req, res, next) {
  //If the user is not logged into an account while trying to go to this page,
  //they will be taken back to the login page with the following error message.
  if(!req.session.loggedIn === true){
    res.redirect("/login"+"?&error=Please login to view page!");
  }
  var error = req.query.error;
  var message = req.query.message;
  var addressline1 = req.body.addressline1;
  var addressline2 = req.body.addressline2;
  var townOrCity = req.body.townOrCity;
  var county = req.body.county;
  var zipCode = req.body.zipCode;
  var customerID = req.session.userID;
  var connection = mysql.createConnection({
    host: connection_details.host,
    user: connection_details.user,
    password: connection_details.password,
    database: connection_details.database
  });
  var address = connection.query("SELECT * FROM address WHERE customerID ='"+customerID+"';");
  res.render('address', { title: 'address' , error: error, message: message, address: address});
});

//for adding an address.
// The address function is async as we expect more than one user would be using it.
router.post('/create', async function (req, res, next){
  var addressline1 = req.body.addressline1;
  var addressline2 = req.body.addressline2;
  var townOrCity = req.body.townOrCity;
  var county = req.body.county;
  var zipCode = req.body.zipCode;
  var customerID = req.session.userID;
  var connection = mysql.createConnection({
    host: connection_details.host,
    user: connection_details.user,
    password: connection_details.password,
    database: connection_details.database
  });
  connection.query("INSERT INTO address(addressline1, addressline2, townOrCity, county, zipCode, customerID) VALUES (?, ?, ?, ?, ?, ?);", [addressline1, addressline2, townOrCity, county, zipCode, customerID]);
  res.redirect("/address"+"?&message=Address added!");
});

module.exports = router;
