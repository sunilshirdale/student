"use client";
import React, { useState } from "react";
import axios from "axios";

const RegisterForm = ({ fnGetStudent }) => {
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
    try {
      const result = await axios.post(
        "https://student-server-three.vercel.app/std/std-reg",
        data
      );

      const { acknowledged, insertID } = result.data;

      if (acknowledged && insertID) {
        fnGetStudent(); // ✅ refresh table
      }
    } catch (e) {
      console.log("error", e.message);
    }
  };

  return (
    <form onSubmit={fnRegister}>
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
        <input type="checkbox" value="Reading Novel" onChange={fnChange} /> Reading
        <input type="checkbox" value="Cooking" onChange={fnChange} /> Cooking
      </p>

      <p>
        <label>Country</label>
        <select name="country" onChange={fnChange}>
          <option value="">Select</option>
          <option value="ind">Ind</option>
          <option value="pak">Pak</option>
          <option value="aus">Aus</option>
        </select>
      </p>

      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
