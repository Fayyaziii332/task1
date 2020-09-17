const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/users");
const emp = require("./routes/emp");

const app = express();

//middlewares
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

app.use(passport.initialize());

require("./config/passport")(passport);

// Routes
app.use("/users", users);
app.use("/emp", emp);

// DB Configuration
const db = require("./config/constants").mongoURI;

mongoose.connect(db,{ useNewUrlParser: true , useUnifiedTopology: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

  //Error Middleware
  app.use(function(req,res,next){
    next(createError(404))
  })

  app.use(function(err,req,res,next){
    res.locals.message = err.message
    res.locals.error = req.app.get("env") === "development" ? err : {}
    res.status(err.status || 500)
    res.status(400).json(err)
  })

const port = process.env.PORT || 5000; 
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
