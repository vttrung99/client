import React, { useEffect } from 'react'
import validate from '@utils/validate';
import api from '@api';
import "./../auths/auth.scss"


export default function Login() {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      window.location.href = "/";
    }
  })
  return (
    <div>
      <form className='m-auto mt-5' style={{ width: "500px" }} onSubmit={async (e) => {
        e.preventDefault();
        let data = {
          user_name: e.target.user_name.value,
          password: e.target.password.value,
          type: !validate.isEmail(e.target.user_name.value) // Email false, User Name true
        }

        try {
          alert("ok đã gửi")
          let result = await api.users.login(data);
          if (result.status == 200) {
            if (result.data.token == undefined) {
              alert("Đăng nhập thất bại")
            } else {
              localStorage.setItem("token", result.data.token);
              alert("Đăng nhập Thành Công")
            }


          } else {
            alert(result.data.message)
          }
        } catch { err } {

        }

      }}>
        {/* Email input */}
        <div className="form-outline mb-4">
          <div>Name Product</div>
          <input type="text" name='user_name' className="form-control border" />
        </div>
        {/* Password input */}
        <div className="form-outline mb-4">
          <div>Price</div>
          <input type="password" name='password' className="form-control border" />

        </div>
        {/* 2 column grid layout for inline styling */}
        <div className="row mb-4">
          <div className="col d-flex justify-content-center">
            {/* Checkbox */}
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                defaultValue=""
                id="form1Example3"
                defaultChecked=""
              />
              <label className="form-check-label" htmlFor="form1Example3">
                {" "}
                Remember me{" "}
              </label>
            </div>
          </div>
          <div className="col">
            {/* Simple link */}
            <a href="/register">Register</a>
          </div>
        </div>
        {/* Submit button */}
        <button type="submit" className="btn btn-primary btn-block">
          Sign in
        </button>
       
      </form>
    </div>


  )
}







