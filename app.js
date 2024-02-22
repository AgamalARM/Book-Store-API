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
app.get("/api/books", (req,res) => {
    res.status(200).json(books);

});

app.get("/api/books/:id", (req,res) => {
    const book = books.find(b => b.id === parseInt(req.params.id)); // to convert req.params.id to integer
    if(book){
        res.status(200).json(book);
    }else{
        res.status(404).json({ message: "Book Not Found" });
    }

});


//Running The server
const PORT = 5000;
app.listen(PORT, () => console.log(`The Server is running on port ${PORT}`))