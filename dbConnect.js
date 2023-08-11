import mongoose from "mongoose";

const dbConnect = () => {
  const connectionParams = { useNewUrlParser: true };
  mongoose.connect("mongodb://localhost:27017/lbms", connectionParams);

  mongoose.connection.on("connected", () => {
    console.log("Connected to database successfully");
  });

  mongoose.connection.on("error", (err) => {
    console.log("Error while connecting to database: " + err);
  });

  mongoose.connection.on("dissconneted", () => {
    console.log("Mnogodb connetion disconected");
  });
};
export default dbConnect;
