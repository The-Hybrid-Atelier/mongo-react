
import './App.css';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const localaddress = "https://cearto-fictional-space-bassoon-gxrgqxp456fvvpq-4000.preview.app.github.dev"
function App() {

  const [name, setName] = useState("")
  const [role, setRole] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`${localaddress}/insert`)
    Axios.post(`${localaddress}/insert`, {
      firstName: name,
      companyRole:role
    })
  }

  return (
    <div className="App">
      <header className="App-header">      
        <div className="logIn-form">
            <form onSubmit={handleSubmit}>
                <p>First Name</p>
                  <input
                  className = "Name" 
                  type="text" 
                  name="name" 
                  placeholder="First name ..."
                  onChange={(e) => {setName(e.target.value)}}
                  />

                <p> Company Role</p>
                  <input 
                  className = "Role"
                  type="text" 
                  name ="Role" 
                  placeholder = "Role...." 
                  onChange={(e) => {setRole(e.target.value)}}
                  />
                  <button type="submit">Submit</button>
            </form>
        </div>
      </header>
    </div>
  );
}

export default App;
