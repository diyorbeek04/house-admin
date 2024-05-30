import React, { useState } from "react";
import './login.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";
function LogInPage() {
   const navigate = useNavigate()
   const [errorState, ErrorUseState] = useState()
   console.log(errorState?.message);
   const HandleSubmit = async(e) => {
      e.preventDefault();

      try {
         const body = {
            email : e.target.email.value,
            password : e.target.password.value
         }
         const data =  await axios.post("https://x8ki-letl-twmt.n7.xano.io/api:ppU6UM1w/auth/login", body)
     if (data.status == 200) {
      navigate('/main')
      window.location.reload();
     }
window.localStorage.setItem('AuthToken' , data.data.authToken)
      } catch (error) {
         ErrorUseState(error)
      }
   }
   return(
<>
<div className="login-box">
  <h2>Login</h2>
  <form onSubmit={HandleSubmit}>
    <div className="user-box">
      <input type="text" name="email" required />
      <label>Username</label>
    </div>
    <div className="user-box">
      <input type="text" name="password" required />
      <label>Password</label>
    </div>
    {errorState?.message == `Request failed with status code 403` && 
    <p style={{color:'red'}}>Email yoki Login xato</p>
    }
    <a href="#">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <button type="submit" className="but">
         Submit
      </button>
    </a>
  </form>
</div>
</>
   )
}

export default LogInPage