const express = require('express');

//init app
const app = express();

//Middelware
app.use(express.json()); //because express can read json from req.body

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
app.post("/api/books", (req,res) => {
    console.log(req.body);
    book = {
        id: books.length + 1,
        title: req.body.title
    }
    books.push(book);
    res.status(201).json(book); // 201 post is created Successfully
})


//Running The server
const PORT = 5000;
app.listen(PORT, () => console.log(`The Server is running on port ${PORT}`))