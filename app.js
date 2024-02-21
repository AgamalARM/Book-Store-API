const express = require('express');

//init app
const app = express();

const books = [
    {
        id:1,
        title:"The greatest ISLAM",
    },
    {
        id:2,
        title:"The greatest MOHAMMED",
    }
];

// HTTP Methods/Verbs
app.get("/", (req,res) => {
    res.send("Welcome To ALLAH");

});
app.get("/api/books", (req,res) => {
    res.json(books);

});

//Running The server
const PORT = 5000;
app.listen(PORT, () => console.log(`The Server is running on port ${PORT}`))