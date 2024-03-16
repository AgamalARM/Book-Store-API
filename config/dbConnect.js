const mongoose = require('mongoose');
//  mongodb+srv://<username>:<password>@cluster0.mxsmfkw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
//  mongodb+srv://user13:1234@cluster0.mxsmfkw.mongodb.net/alexstore?retryWrites=true&w=majority
const dbConnect = () => {
  mongoose
  .connect('mongodb+srv://user13:1234@cluster0.mxsmfkw.mongodb.net/bookStore?retryWrites=true&w=majority&appName=Cluster0')
  .then((conn) => {
    console.log(`Database is connected : ${conn.connection.host}`);
  })
  .catch((err) => {
    console.error(`Database Error : ${err}`);
    process.exit(1); // Stop node App
  });
};


module.exports = dbConnect;