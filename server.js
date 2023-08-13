import app from "./app.js";
import dbConnect from "./dbConnect.js";

dbConnect();

const port = process.env.PORT;
app.listen(port, console.log(`Listning on port ${port}`));
