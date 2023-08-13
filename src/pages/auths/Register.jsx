import React from 'react';
import api from '@api';

export default function Register() {
  return (
    <div >
      <div style={{textAlign:'center'}}>Register</div>
      
      <form className='m-auto mt-5' style={{ width: "500px" }} onSubmit={async (e) => {
        e.preventDefault();

        let newUser = {
          user_name: e.target.user_name.value,
          email: e.target.email.value,
          first_name: e.target.first_name.value,
          last_name: e.target.last_name.value,
          password: e.target.password.value,
        }


          let result = await api.users.register(newUser)

          if (result.status != 200) {
            alert(result.response.data.message)
          }else {
            alert(result.data != undefined ? result.data.message : result.message)
          }
        

      }}>
       
          <div className="form-outline mb-4">
          <div>User Name</div>
          <input type="text" name='user_name' className="form-control border" />
        </div>
          
          <div className="form-outline mb-4">
          <div>Email</div>
          <input type="text" name='email' className="form-control border" />
        </div>
          
          <div className="form-outline mb-4">
          <div>First Name</div>
          <input type="text" name='first_name' className="form-control border" />
        </div>
          
          <div className="form-outline mb-4">
          <div>Last Name</div>
          <input type="text" name='last_name' className="form-control border" />
        </div>
        <div className="form-outline mb-4">
          <div> Password </div>
          <input type="text" name='password' className="form-control border" />
        </div>
        <a href="/login">Login</a>
          <button type='submit' className="btn btn-primary btn-block">Register</button>
          
      </form>
    </div>
  )
}
