import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from'react-router-dom'
import Home from './Components/Home/Home.jsx'
import './index.css'
import App from './App.jsx'
import About from './Components/About/About.jsx'
import Contact from './Components/Contact/Contact.jsx'
import Github from './Components/Github/Github.jsx'

const router = createBrowserRouter(
   createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='' element={<Home/>}/>
      <Route path='about' element={<About/>}/>
      <Route path='contact' element={<Contact/>}/>
      <Route path='github' element={<Github/>}/>
      
    </Route>
   )
)

createRoot(document.getElementById('root')).render(
    <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)
