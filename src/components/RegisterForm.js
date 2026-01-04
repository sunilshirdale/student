"use client";
import React, { useState } from "react";
import axios from "axios";
const RegisterForm = () => {
  const [data, setData] = useState({});
  const fnChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setData((prev) => {
        const hobbies = prev.hobbies || [];

        return {
          ...prev,
          hobbies: checked
            ? [...hobbies, value]
            : hobbies.filter((h) => h !== value),
        };
      });
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const fnRegister = async (e) => {
     e.preventDefault();
    try{
      var result = axios.post("http://localhost:2020/std/std-reg",{data:data});
      console.log(result)
    }catch(e){
      console.log("error",e.message)
    }
   
  };

  return (
    <div>
      <form onSubmit={fnRegister}>
      <p>
        <label>UID</label>
        <input name="uid" onChange={fnChange} />
      </p>
        <p>
          <label>Name</label>
          <input name="name" onChange={fnChange} />
        </p>

        <p>
          <label>Password</label>
          <input type="password" name="pwd" onChange={fnChange} />
        </p>

        <p>
          <label>Gender</label>
          <input type="radio" name="gender" value="male" onChange={fnChange} /> Male
          <input type="radio" name="gender" value="female" onChange={fnChange} /> Female
        </p>

        <p>
          <label>Hobbies</label>
          <input type="checkbox" value="Cricket" onChange={fnChange} /> Cricket
          <input type="checkbox" value="Reading Novel" onChange={fnChange} /> Reading Novel
          <input type="checkbox" value="Cooking" onChange={fnChange} /> Cooking
          <input type="checkbox" value="Watching TV" onChange={fnChange} /> Watching TV
        </p>

        <p>
          <label>Country</label>
          <select name="country" onChange={fnChange}>
            <option value="Please Select Country">Please Select Country</option>
            <option value="ind">Ind</option>
            <option value="pak">Pak</option>
            <option value="aus">Aus</option>
            <option value="ban">Ban</option>
          </select>
        </p>

        <p>
          <button type="submit">Register</button>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
