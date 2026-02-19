import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css' //Boostrap import
import { BrowserRouter } from 'react-router-dom' //react routerhez
import { Routes, Route, Navigate } from 'react-router-dom' //react routerhez

import Register from './pages/Register'
import Login from './pages/Login'
import OwnReceipts from './pages/OwnReceipts'
import AppNavbar from './components/AppNavbar'
import TopList from './pages/TopList'
import Favourites from './pages/Favourites'



import Home from './pages/Home' // Home.jsx import

createRoot(document.getElementById('root')).render(

  <StrictMode>
<BrowserRouter>
    <AppNavbar />
      <Routes>
        <Route path='/' element={<Navigate to='/home' />} />
        <Route path='/home' element={<Home />} />
        <Route path='/ownreceipts' element={<OwnReceipts />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/toplist' element={<TopList />} />
        <Route path='/favourites' element={<Favourites />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
  
)
