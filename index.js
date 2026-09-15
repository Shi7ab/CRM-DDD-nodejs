const express = require("express");
const routes = require("./src/interfaces/http/routes");
require("dotenv").config();

const app = express();
app.use(express.json());

app.use("/api", routes);

app.use("/test",async (req,res,next)=>{
    res.status(200).send("wellcome at DDD app");
    next();
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`DDD Server running on http://localhost:${PORT}`);
});