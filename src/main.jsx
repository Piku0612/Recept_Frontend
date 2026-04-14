import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route, Navigate } from 'react-router-dom'

import Register from './pages/Register'
import Login from './pages/Login'
import OwnReceipts from './pages/OwnReceipts'
import TopList from './pages/TopList'
import Favourites from './pages/Favourites'
import Footer from './components/Footer'
import AddRecipe from './pages/AddRecipe'
import Admin from './pages/Admin'
<<<<<<< HEAD



import Home from './pages/Home' // Home.jsx import

=======
import Home from './pages/Home'
import { AuthProvider } from './context/AuthContext'
>>>>>>> 2cce4a4 (new version)

createRoot(document.getElementById('root')).render(
  <StrictMode>
<<<<<<< HEAD
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <main className="flex-fill">
          <Routes>
            <Route path='/' element={<Navigate to='/home' />} />
            <Route path='/home' element={<Home />} />
            <Route path='/ownreceipts' element={<OwnReceipts />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/toplist' element={<TopList />} />
            <Route path='/favourites' element={<Favourites />} />
            <Route path='/add-recipe' element={<AddRecipe/>}/>
            <Route path='/admin' element={<Admin/>}/>
          </Routes>
        </main>
=======
    <AuthProvider>
      <BrowserRouter>
        <div className="d-flex flex-column min-vh-100">
          <main className="flex-fill">
            <Routes>
              <Route path='/' element={<Navigate to='/home' />} />
              <Route path='/home' element={<Home />} />
              <Route path='/ownreceipts' element={<OwnReceipts />} />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/toplist' element={<TopList />} />
              <Route path='/favourites' element={<Favourites />} />
              <Route path='/add-recipe' element={<AddRecipe />} />
              <Route path='/admin' element={<Admin />} />
            </Routes>
          </main>
>>>>>>> 2cce4a4 (new version)

          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
)