import express from "express";

const app = express();

app.get("/",(res,req)=>{
    res.send("Hiii");
})

app.listen(5000,()=>{
    console.log("Port running on 5000");
})