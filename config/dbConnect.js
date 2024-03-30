const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
//  mongodb+srv://<username>:<password>@cluster0.mxsmfkw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
//  mongodb+srv://user13:1234@cluster0.mxsmfkw.mongodb.net/bookStoreDB?retryWrites=true&w=majority
const dbConnect = () => {
  mongoose
  .connect(process.env.MONGO_DB_URI)
  .then((conn) => {
    console.log(`Mongo Database is connected : ${conn.connection.host}`);
  })
  .catch((err) => {
    console.error(`Database Error : ${err}`);
    process.exit(1); // Stop node App
  });
};


module.exports = dbConnect;