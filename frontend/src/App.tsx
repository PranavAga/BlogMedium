import './App.css'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blogs } from './pages/Blogs'
import { Blog } from './pages/Blog'
import { Create } from './pages/Create'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path='/create' element={<Create/>}/>
          <Route path='/create/:id' element={<Create/>}/>
          <Route path="*" element={<Navigate to='/signup'/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
