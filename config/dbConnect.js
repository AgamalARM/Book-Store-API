const mongoose = require('mongoose');

const dbConnect = () => {
  mongoose.connect('mongodb+srv://user13:1234@cluster0.mxsmfkw.mongodb.net/alexstore?retryWrites=true&w=majority')
  .then((conn) => {
    console.log(`Database connected : ${conn.connection.host}`);
  })
  .catch((err) => {
    console.error(`Database Error : ${err}`);
    process.exit(1); // Stop node App
  });
};


module.exports = dbConnect;