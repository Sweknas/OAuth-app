import { Dispatch, SetStateAction } from "react"
import { User, UserState } from "../App"

const endpoints = {
  default: {
    home: '',
    secret: 'secret'
  },
  users: {
    register: 'users/register',
    login: 'users/login',
    refresh: 'users/refresh'
  }
}

type Method = 'GET' | 'POST'

interface Response {
  status: 'success' | 'fail',
  data?: User 
  message?: string 
}


const url = (endpoint: string): string => {
  return `${process.env.REACT_APP_BACKEND_URL}${endpoint}`
}

const request = async (
  url: string,
  method: Method = 'GET',
  data: object | null = null,
  auth: boolean = false,
  token: string | null = null
): Promise<Response | undefined> => {

  const headersInit: HeadersInit = {
    'Content-Type': 'application/json',
  };

  // handle authencation
  if(auth && token) {
    headersInit['Authorization'] = `Bearer ${token}`
  }


  const options: RequestInit = {
    method,
    headers: headersInit
  }

  if(data) {
    options.body = JSON.stringify(data)
  }

  try {
    const res = await fetch(
      url,
      options
    )
    const response = await res.json();
    console.log('response', response)
    return response
  } catch (error) {
    console.log('response error', error)
    return undefined
  }
}

// registration

interface RegistrationData {
  fullName: string
  email: string
  password: string
}

async function register(data: RegistrationData, setUser: Dispatch<SetStateAction<UserState>>) {
  const resData = await request(url(endpoints.users.register), 'POST', data)
  if(resData?.status === 'success' && resData.data) {
    setUser(resData.data)
  } else {
    setUser(null)
  }
}

// login

interface LoginData {
  email: string
  password: string
}

async function login(data: LoginData, setUser: Dispatch<SetStateAction<UserState>>) {
  const resData = await request(url(endpoints.users.login), 'POST', data)
  if(resData?.status === 'success' && resData.data) {
    setUser(resData.data)
  } else {
    setUser(null)
  }
}

// refresh auth token

interface RefreshData {
  refreshToken: string
}

async function refresh(data: RefreshData) {
  return await request(url(endpoints.users.refresh), 'POST', data)
}

// secret (requier auth)

async function secret(token: string) {
  return await request(url(endpoints.default.secret), 'GET', null, true, token)
}



export {
  register,
  login,
  refresh,
  secret
}
