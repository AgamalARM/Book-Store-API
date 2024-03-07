const express = require('express');
const bookPath = require("./routes/books");
const autherPath = require("./routes/authers")

//init app
const app = express();

//Apply Middleware
app.use(express.json()); //because express can read json from req.body

//Routes
app.use("/api/books", bookPath);
app.use("/api/authers", autherPath);



//Running The server
const PORT = 5000;
app.listen(PORT, () => console.log(`The Server is running on port ${PORT}`))