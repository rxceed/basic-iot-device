import express from "express";
import app from "./app";
import {db} from "./db"
import "dotenv/config"

const PORT: number = parseInt(process.env.SERVER_PORT as string);

app.get("/", (req, res)=>{
    res.json("Hello world")
})

app.listen(PORT, (err)=>{
    console.log("Server Started");
});

const shutdown = async ()=>{
    try 
    {
        await db.close()
        console.log("Connection to database closed");
        console.log("Server closed");
        process.exit(0);
    } 
    catch(err) 
    {
        console.log("Error closing connection to database: ", err)
        process.exit(1);
    }
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);