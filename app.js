const express = require('express');
const bookPath = require("./routes/books");
const autherPath = require("./routes/authers")
const morgan = require("morgan");
const dbConnect = require('./config/dbConnect');


// db connection
dbConnect();

//init app
const app = express();

//Apply Middleware
app.use(express.json()); //to parsing req.body,because express can read json from req.body
app.use(morgan("dev"));  // morgan middelware for logger

//Routes
app.use("/api/books", bookPath);
app.use("/api/authers", autherPath);



//Running The server
const PORT = 5000;
app.listen(PORT, () => console.log(`The Server is running on port ${PORT}`));