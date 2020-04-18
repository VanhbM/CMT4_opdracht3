const express = require("express");
const app = express();
const port = 3000;

app.set("views", "views");
app.set("view engine", "ejs");

app.use(express.static("public"));

const museumItem = require('./data/museum.json');

app.get("/", function(request, response){
  response.render("home");
});

app.get("/exhibitions", function(request, response){
  response.render("exhibitions", { posts: museumItem.museum});
});

app.get('/museum/:postid', function(req,res){
  res.render('detail', {
    post: museumItem.museum[req.params.postid]
  });
});

app.get("/contact", function(request, response){
  response.render("contact");
});

app.get("/exhibitions", function(request, response){
  response.render("exhibitions");
});


// eroku poort instellingen
app.set('port', (process.env.PORT || 3000));
 app.listen(app.get('port'));
