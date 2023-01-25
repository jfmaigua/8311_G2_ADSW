const mongoose = require("mongoose");

const databaseConnection = () => {
  const DB_URI = process.env.DB_URI;
  mongoose.connect(
    DB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (error, res) => {
      if (!error) {
        console.log("CONEXION CORRECTA");
      }else{
        console.log("ERROR");
      }
    }
  );
};

module.exports = databaseConnection;
