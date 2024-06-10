const express = require("express");
const cors = require('cors');
const bodyparser = require('body-parser');
const mongodb = require('./util/database');

const expenseDetails = require('./routes/addexpense');
const signupORDetails = require('./routes/signupORlogin');
const purchasePremium = require('./routes/purchase-mebership');
const premium_leaderBoard = require('./routes/premium');
const password = require('./routes/forgotpassword');
const helmet = require('helmet'); 
const compression = require('compression');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

require("dotenv").config();


const app = express();

app.use(cors());
app.use(bodyparser.json());

//app.use() will be executed for every incoming request.
app.use(expenseDetails);
app.use(signupORDetails);
app.use(purchasePremium);
app.use(premium_leaderBoard);
app.use(password);

const accessLogStream = fs.createWriteStream(path.join(__dirname,"request.log"),{flags:"a"})

app.use(helmet());
app.use(compression());
//morgan package is used to log http request and creating file called "request.log" in order to store the http request
app.use(morgan('combined', {stream:accessLogStream}));

mongodb()
  .then((respose) => {
    console.log(`database is connected to mongodb`);
    app.listen(3000, console.log(`listening on port 3000`));
  })
  .catch((err) => console.log(err));

