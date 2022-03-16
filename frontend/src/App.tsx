import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import LoginForm from './components/main/LoginForm'
import RegisterForm from './components/main/RegisterForm'
import { useState } from 'react'
import Secret from './components/main/Secret'

interface User {
  authToken: string,
  email: string,
  fullName: string,
  id: string,
  refreshToken: string,
  updatedAt: string,
}

type UserState = User | null

function App() {
  const [user, setUser] = useState<UserState>(null)
  return (
    <div>
      {/*<TopBar/>*/}
      <div>
        <Routes>
          <Route path='/' element={
            user
              ? <Navigate to='/secret'/>
              : <LoginForm setUser={setUser}/>

          }/>
          <Route path='/register' element={
            user
              ? <Navigate to='/secret'/>
              : <RegisterForm setUser={setUser}/>
          } />
          <Route path='/secret' element={
            user
              ? <Secret user={user} setUser={setUser}/>
              : <Navigate to='/'/>
          } />
        </Routes>
      </div>
    </div>
  )
}

export default App

export type {
  UserState,
  User
}
