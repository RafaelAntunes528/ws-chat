import { Database } from "bun:sqlite";

const db = new Database("../ws-chat.sqlite");


export function insertMessage(message:{m: string, u:string}){
    const query = db.query("INSERT INTO messages (message, user) VALUES ($message, $user)")
    try {
        query.run({ $message: message.m, $user: message.u})
    }catch(e){
        console.log(e)
    }
}

export function getMessages(){
    const query = db.query("SELECT * FROM messages")
    return query.all()
}
