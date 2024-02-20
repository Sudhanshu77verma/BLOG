import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import SignIn from './pages/SignIn.jsx'
import Dashboard from './pages/Dashboard.jsx'
import SignUp from './pages/SignUp.jsx'
import Projects from './pages/Projects.jsx'
import About from './pages/About.jsx'
import Header from './components/Header.jsx'
import Footcom from './components/Footcom.jsx'

 
const App = () => {
  return (
   <BrowserRouter>
   <Header></Header>
  <Routes>
    <Route path='/' element={<Home></Home>}></Route>
    <Route path='/about' element={<About></About>}></Route>
    <Route path='/sign-in' element={<SignIn></SignIn>}></Route>
    <Route path='/sign-up' element={<SignUp></SignUp>}></Route>
    <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
    <Route path='/projects' element={<Projects></Projects>}></Route>


  </Routes>

    <Footcom></Footcom>
   </BrowserRouter>
  )
}

export default App
