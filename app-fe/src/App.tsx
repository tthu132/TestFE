import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { publicRoutes } from './routes'
import { jwtDecode } from 'jwt-decode'
import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom';

function App() {
  const [user, setUser] = useState<any>(null)
  const [token, setToken] = useState<string | null>(null)

 useEffect(() => {
    const stored = localStorage.getItem('access_token')
    if (stored) {
      try {
        const decoded = jwtDecode<any>(stored)
        setUser({ id: decoded.id, name: decoded.name })
        setToken(stored)
      } catch (e) {

        localStorage.removeItem('access_token')
        setUser(null)
        setToken(null)
      }
    }
  }, [])

  useEffect(() => {
    const stored = localStorage.getItem('access_token')
    if (stored) {
      const decoded = jwtDecode<any>(stored)
      setUser({ id: decoded.id, name: decoded.name })
      setToken(stored)
    }
  }, [])


  const handleLogin = (token: string) => {
    localStorage.setItem('access_token', token)
    const decoded = jwtDecode<any>(token)
    setUser({ id: decoded.id, name: decoded.name })
    setToken(token)
  }

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    setUser(null)
    setToken(null)
  }
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component


            if (route.isPublic ) {
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={<Page handleLogin={handleLogin} />
                }
                />
              )
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  token ? (
                    <Page handleLogout={handleLogout} />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
            )
          })}
        </Routes>
      </div>
    </Router>
  )
}

export default App
