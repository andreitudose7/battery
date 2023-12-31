import { useState, useEffect, useMemo } from 'react'
import Head from 'next/head'
import { Inter } from 'next/font/google'
import { Fireworks } from 'fireworks-js'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [sessionNumber, setSessionNumber] = useState(1);

  const sessions = [1, 2, 3, 4];

  const [messages, setMessages] = useState([]);

  const handleKeyPress = (event) => {
    if(event.key === 'Enter' && event.target.value){
      const newMsg = event.target.value;
      event.target.value = '';
      setMessages(oldMessages => ([...oldMessages, { id: new Date().getTime(), text: newMsg }]))
    }
  }

  const shouldRenderFireworks = () => sessionNumber === 4 && messages.length > 3

  useEffect(() => {
    if(shouldRenderFireworks()) {
      const container = document.querySelector('#fireworks-container')
      const fireworks = new Fireworks(container, { traceLength: 7.95, particles: 139 })
      fireworks.start()
    }
  }, [sessionNumber, messages])

  return (
    <>
      <Head>
        <title>Cu Bateria Incarcata</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="app-container">
          <div className="battery-container">
            <div className={`battery battery_${sessionNumber}_${Math.min(messages.length, 6)}`}></div>
            <div className='sessions-wrapper'>
              {sessions.map(session => (
                <div
                  key={session}
                  className={`session-btn ${sessionNumber === session ? 'active' : ''}`}
                  onClick={() => setSessionNumber(session)}
                >
                  Sesiune <br /> - {session} -
                </div>
              ))}
            </div>
          </div>
          <div className="chat-container">
            <div className='conversation'>
              <ul>
                {messages.map(msg => (
                  <li key={msg.id}> {msg.text} </li>
                ))}
              </ul>
            </div>
            <div className='chat-input'>
              <input type='text' onKeyDown={handleKeyPress} />
            </div>
          </div>
        </div>
        <div id='fireworks-container' style={{ display: shouldRenderFireworks() ? 'block' : 'none' , position: 'fixed', top:0, left: 0, right: 0, bottom: 0, zIndex: 9999 }}></div>
      </main>
    </>
  )
}
