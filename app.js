const express = require('express');
const bookPath = require("./routes/books");
const authorPath = require("./routes/authors")
const authPath = require('./routes/auth');
const morgan = require("morgan");
const dbConnect = require('./config/dbConnect');
const dotenv = require('dotenv');
dotenv.config();
const logger = require('./middlewares/logger');
const { notFound, errorHandler } = require('./middlewares/errors');


// db connection
dbConnect();

//init app
const app = express();

//Apply Middleware
app.use(express.json()); //to parsing req.body,because express can read json from req.body
app.use(morgan("dev"));  // morgan middelware for logger
app.use(logger);  //custom middleware I make it

//Routes
app.use("/api/books", bookPath);
app.use("/api/authors", authorPath);
app.use("/api/auth",authPath);

// NOT Found Middleware
app.use(notFound);
// Error Handler Middleware
app.use(errorHandler);


//Running The server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`The Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`));