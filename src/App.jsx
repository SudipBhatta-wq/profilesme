import { useEffect, useState } from 'react'
import { Amplify } from 'aws-amplify'
import outputs from '../amplify_outputs.json'
import { generateClient } from 'aws-amplify/data'

Amplify.configure(outputs)
const client = generateClient()

export default function App({ signOut, user }) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { data } = await client.models.UserProfile.list()
        setEmail(data?.[0]?.email ?? user?.signInDetails?.loginId ?? '')
      } catch (e) {
        console.error(e)
        setEmail(user?.signInDetails?.loginId ?? '')
      } finally {
        setLoading(false)
      }
    }
    loadProfile()
  }, [user])

  return (
    <div>
      <h1>Profiles App</h1>

      <p>
        Signed in as:{' '}
        <strong>{loading ? 'Loading…' : (email || 'Unknown')}</strong>
      </p>

      <button onClick={signOut}>Sign out</button>
    </div>
  )
}

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
