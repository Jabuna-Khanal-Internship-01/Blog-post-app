import React from 'react'
import Homepage from './components/HomePage'
import "./App.css"
import NavBar from './components/Navbar'

const App = () => {
  return (
    <div className ="app">
      <NavBar />
      <Homepage />
    </div>
  )
}

export default App

