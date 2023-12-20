import { useState } from 'react'  

import styles from './page.module.css'
import useWebSocket from 'react-use-websocket'

export default function Home() {
  const [clientList, setClientList] = useState([])
  const [messages, setMessages] = useState([])
  

  function closeConnection() {
    if (!!ws) {
        ws.close();
    }
  }

  const openWs = () => {
    closeConnection();

    ws = new WebSocket('ws://localhost:4000/api/ws');

    ws.addEventListener('error', () => {
        setMessages([...messages,'WebSocket error']);
    });

    ws.addEventListener('open', () => {
        setMessages([...messages,'WebSocket connection established']);
    });

    ws.addEventListener('close', () => {
        setMessages([...messages,'WebSocket connection closed']);
    });

    ws.addEventListener('message', (msg) => {
        console.log(msg);
        setMessages([...messages, msg])
    })
  }

  const closeWs = () => {
    closeConnection()
    showMessage('No Websocket connection')
  }

  const requestRoomCreation = () => {
   

    const data = {
      name: 'test room'
    }
    //Send message to websocket server to create room.

  }

  const mappedClients = clientList.map((client, index) => {
    return <li key={index}>{client}</li>
  })
  const mappedMessages = messages.map((msg, index) => {
    return <p key={index}>{msg}</p>
  })
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Welcome to the chat!</h1>
      <button onClick={() => requestRoomCreation()}>Create Room</button>
      <button onClick={() => openWs()}>Open Socket</button>
      <button onClick={() => closeWs()}>Close Socket</button>
      <ul>{mappedClients}</ul>
      <div>{mappedMessages}</div>
      
    </main>
  )
}
