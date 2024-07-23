import { Database } from "bun:sqlite";

const db = new Database("../../ws-chat.sqlite");

createDb()

function createDb(){
    db.run("CREATE TABLE messages (id INTEGER PRIMARY KEY, message TEXT, user TEXT)")
}

