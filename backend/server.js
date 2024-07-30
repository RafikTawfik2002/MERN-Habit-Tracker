//importing everything we need

import express from "express"
import cors from "cors"
import habitRouter from "./routes/habitRoute.js"
//import restaurants from "./api/restaurants.route.js" //route

const app = express() //we use to make the server
app.use(cors())
app.use(express.json())

//app.use("/api/v1/restaurants", restaurants)
app.use('/habit', habitRouter);
app.use("*", (req, res) => res.status(404).json({ error: "not found"}))


export default app //will import app in the file that access the database