import app from "./app.js";
import dbConnect from "./dbConnect.js";

dbConnect();

const port = 8000;
app.listen(port, console.log(`Listning on port ${port}`));
