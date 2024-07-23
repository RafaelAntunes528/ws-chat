import './App.css';
import {useEffect, useState} from "react"
import { useParams } from 'react-router-dom';

function App() {

  const socket = new WebSocket("ws://localhost:4040")

  const [chat, setChat] = useState([])
  const { name } = useParams();
  const [message, setMessage] = useState()

  useEffect(()=>{
   const getChat = async () => {
      const res = await fetch("/api/message", {
        headers: {
          Accept: "application/json" 
        },
        method: "GET"
      })
      const info = await res.json()
      console.log(info)
      setChat([...chat, info.messages.map(e =>  {return {m: e.message, u: e.user}})])
      
    }
    getChat()
  },[])

  socket.addEventListener("open", even => {
    console.log("connection open")
  })

  socket.addEventListener("close", even => {
    console.log("connection closed")
  })

  socket.addEventListener("message", even => {
    console.log("Received: ", even.data)
    const info = JSON.parse(even.data)
    setChat([...chat, info.messages.map(e =>  {return {m: e.message, u: e.user}})])
  })

  const sendMessage = (e) => {
    e.preventDefault();
    socket.send(JSON.stringify({m:message, u:name}))
    setMessage("")
  }

  return (
    <div className="App">
      <form onSubmit={sendMessage}>
        <input value={message} onChange={e => setMessage(e.target.value)}></input>
        <button type='submit'>ENVIAR</button>
      </form>
      {chat.length === 0 ? <div>NO MESSAGES</div> : chat.map(e => (<div>{e.m} FROM {e.u}</div>))}
    </div>
  );
}

export default App;
