const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");  // for user authentication
const session = require("express-session");
const flash = require("connect-flash");
const params = require("./params/params");

const setupPassport = require("./setupPassport");

const app = express();
mongoose.connect(params.DATABASECONNECTION, { useUnifiedTopology:true, useNewUrlParser:true, useCreateIndex:true });
setupPassport();


app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(session({
    secret:"weiweil7788!!!",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use("/", require("./routes/web"));
app.use("/api", require("./routes/api"));

app.listen(app.get("port"), function(){
    console.log("Server started on port " + app.get("port"));
})
