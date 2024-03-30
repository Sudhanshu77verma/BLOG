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
import { Privateroute } from './components/Privateroute.jsx'
import { OnlyAdminPrivateRoute } from './components/OnlyAdminPrivateRoute.jsx'
import CreatePost from './pages/CreatePost.jsx'
import UpdatePost from './pages/UpdatePost.jsx'
import PostPage from './pages/PostPage.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import Search from './pages/Search.jsx'

 
const App = () => {
  return (
   <BrowserRouter>
   <ScrollToTop></ScrollToTop>
   <Header></Header>
  <Routes>
    <Route path='/' element={<Home></Home>}></Route>
    <Route path='/about' element={<About></About>}></Route>
    <Route path='/sign-in' element={<SignIn></SignIn>}></Route>
    <Route path='/sign-up' element={<SignUp></SignUp>}></Route>
    <Route path='/search' element={<Search></Search>}></Route>
    <Route element={<Privateroute></Privateroute>}>
    <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
    </Route>

    <Route element={<OnlyAdminPrivateRoute></OnlyAdminPrivateRoute>}>
      <Route  path='/create-post' element={<CreatePost></CreatePost>}></Route>
      <Route  path='/update-post/:postId' element={<UpdatePost></UpdatePost>}></Route>

    </Route>
    <Route path='/projects' element={<Projects></Projects>}></Route>
     <Route path='/post/:postslug' element={<PostPage></PostPage>}></Route>
    

  </Routes>

    <Footcom></Footcom>
   </BrowserRouter>
  )
}

export default App
