const express = require ("express");
const bodyParser = require ("body-parser");
const request = require ("request");
//require hhtp only when to use on the internet  else simple get and post works
const https=require("https");

const app= express();

//Created instace of express s6tfsaQaQi3JNciBH6shVqEDvhGut0SUXr31ag8Pd8BBbVVlcGfWhpPmEOoM6RJ5TFhbypvf5yyRw

//use static pages create static folder to manage it
//In order to use methods add more code
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/" , function (req,res)
{

res.sendFile(__dirname + "/signup.html");




});


app.post("/", function(req,res)
{

const firstName=req.body.fName;
const lastName=req.body.lName;
const email =req.body.email;

console.log(firstName,lastName,email);

const data ={

members: [
{
email_address: email,
status:"subscribed",
merge_fields:{
FNAME: firstName,
LNAME: lastName

}}
]
}


const jsonData=JSON.stringify(data);

const url="https://us1.api.mailchimp.com/3.0/lists/54d2b6d4eb"

const options= {
method : "POST",
auth:"rkhanna:0401734fe7ad7810a270b761efb01ea2-us1"


}


const request=https.request(url,options,function(response)
{
     if (response.statusCode===200)
     {
res.sendFile(__dirname + "/success.html");
     }
    else {
      res.sendFile(__dirname + "/failure.html");
    }



response.on("data",function(data)
{
console.log(JSON.parse(data));

})

}
)
request.write(jsonData);
request.end();

});

app.post("/failure" , function (req,res)
{

res.redirect( "/");


//console.log(req1);

});


//'{"name":"","contact":{"company":"","address1":"","address2":"","city":"","state":"","zip":"","country":"","phone":""},"permission_reminder":"","use_archive_bar":false,"campaign_defaults":{"from_name":"","from_email":"","subject":"","language":""},"notify_on_subscribe":"","notify_on_unsubscribe":"","email_type_option":false,"double_optin":false,"marketing_permissions":false}'
//Create javascript object then convert to JSON


app.listen(3000,function()
  {

console.log("server is running on port 3000");

  }
);
//API key
//0401734fe7ad7810a270b761efb01ea2-us1
//54d2b6d4eb
