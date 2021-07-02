import React from 'react'
import Homepage from './components/HomePage'
import "./App.css"
import NavBar from './components/Navbar'
import { selectSignedIn } from './features/userSlice';
import { useSelector } from 'react-redux';
import Blogs from './components/Blogs';

const App = () => {

  const isSignedIn = useSelector(selectSignedIn)
  return (
    <div className ="app">
      <NavBar />
      <Homepage />
      {isSignedIn  && <Blogs />}
    </div>
  )
}

export default App

