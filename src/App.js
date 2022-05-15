import React from 'react'
import "./App.css"
import {Route,BrowserRouter,Switch} from "react-router-dom"
import {Dashboard,Login,Signup,Create,Project }from "./Pages/index"
import Navbar from './Components/NavBar/Navbar'
import Sidebar from './Components/Sidebar/Sidebar'

function App() {
  return (
    <div className='App '>
      <BrowserRouter>
        <Sidebar />
        <div className='container'>
          <Navbar />

          <Switch>
            <Route path='/' exact>
              <Dashboard />
            </Route>
            <Route path='/login'>
              <Login />
            </Route>
            <Route path='/signup'>
              <Signup />
            </Route>
            <Route path='/projects/:id'>
              <Project />
            </Route>
            <Route path='/create'>
              <Create />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );

}

export default App 