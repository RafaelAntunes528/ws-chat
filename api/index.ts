import express from "express"
import { type Request, type Response } from "express"
import { getMessages, insertMessage } from "./data/messages"
const app = express()

app.use(express.json())

app.get("/api/message", (req: Request, res: Response) => {
    const data = getMessages()
    res.json({messages: data})
})

app.post("/api/message", (req: Request, res: Response) => {
    console.log(req.body)
    insertMessage(req.body)
    res.send("Chegou POST")
})

app.listen(3030, () => {
    console.log("API CONNECTE IN http://localhost:3030")
})