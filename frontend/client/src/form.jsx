import React, { useState } from 'react'

export default function form() {
    const [data,setData] = useState({username:"",password:""})
    const handlechange = (e)=>{
        setData((e)=>{
            const {username,password} = e.target;
            setData((preval)=>({...preval,[name]:value}))
        })
    }
    const handlesubmit = (e)=>{
        e.preventDefault();
        console.log(data)
        alert("data submitted successfully")
        setData({username:"",password:""})

    }
    
  return (
    <div>
      <form>
  <div class="mb-3">
    <label for="exampleInputEmail1" name="username" value={data.username} onChange={handlechange} class="form-label">Username</label>
    <input class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" name="password" value={data.password} onChange={handlechange} class="form-label">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1"/>
  </div>
  <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
    {/* <label class="form-check-label" for="exampleCheck1">Check me out</label> */}
  </div>
  <button type="submit" onSubmit={handlesubmit} class="btn btn-primary">Submit</button>
</form>
    </div>
  )
}
