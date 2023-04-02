import { useEffect, useState } from 'react';
import './App.css';
import Chat from './Chat';
import io from 'socket.io-client'

const socket = io("server:4000");

function App() {
  const [chats, setChats] = useState([]);
  const [text, setText] = useState("");
  const [isHack, setIsHack] = useState(false)

  useEffect(() => {
    socket.connect();
    return () => socket.disconnect()
  }, [])

  useEffect(() => {
    socket.on('chat', (e) => setChats([e, ...chats]))
  })

  function handleSend() {
    // text && setChats([{isHack, text}, ...chats])
    text && socket.emit('chat', {isHack, text})
    setText("")
  }

  return (
    <div className="App">
      <div className="container" onKeyDown={e => (e.key === 'h') && (e.ctrlKey) ? setIsHack(!isHack) : null}>
        <div className="chat-header">
          Jalito
        </div>
        <div className="chat-container">
          {
            chats.map(chat => <Chat isHack={chat.isHack}>{chat.text}</Chat>)
          }
        </div>
        <div className="chat-input">
          <div id="hack" style={{ backgroundColor: isHack ? "#50FF50" : "transparent" }} onClick={() => setIsHack(!isHack)}/>
          {
            isHack ? (
              <textarea
                id="text-input"
                style={{
                  fontFamily: "monospace",
                  fontSize: "1em",
                  backgroundColor: "black",
                  color: "white",
                  maxHeight: "none",
                  caretShape: "block",
                }}
                rows={15}
                onKeyDown={e => (e.key === 'Enter')&&(e.shiftKey) ? handleSend() : null}
                onChange={e => e.target.value !== '\n' && setText(e.target.value)}
                value={text}
              ></textarea>
            ) : (
              <textarea
                id="text-input"
                rows={1}
                onKeyDown={e => e.key === 'Enter' ? handleSend() : null}
                onChange={e => setText(e.target.value !== '\n' ? e.target.value : "")}
                value={text}
              ></textarea>
            )
          }
          <button id="send-btn" onClick={handleSend}>send</button>
        </div>
      </div>
    </div>
  );
}

export default App;
