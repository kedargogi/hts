require('dotenv').config()
const express =require('express');
const mongodb = require("./database/database");
const app= express();
app.use(express.json());
const PORT=process.env.PORT||5000;

mongodb.createDbConnection();

// Import Routes
const userRoutes = require("./router/user");


app.use("/api",userRoutes);

app.get("/", (req, res) => {
    res.send("Hello from HTS");
});


app.listen(PORT,()=>{
    console.log(`Server Running on : ${PORT}`);
})