import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn.jsx'
import Dashboard from './pages/Dashboard.jsx'
import SignUp from './pages/SignUp.jsx'
import Projects from './pages/Projects.jsx'
import About from './pages/About.jsx'
const App = () => {
  return (
   <BrowserRouter>
  <Routes>
    <Route path='/' element={<Home></Home>}></Route>
    <Route path='/about' element={<About></About>}></Route>
    <Route path='/sign-in' element={<SignIn></SignIn>}></Route>
    <Route path='/sign-up' element={<SignUp></SignUp>}></Route>
    <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
    <Route path='/projects' element={<Projects></Projects>}></Route>


  </Routes>
   </BrowserRouter>
  )
}

export default App
