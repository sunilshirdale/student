"use client";
import React, { useState } from "react";
import axios from "axios";

const RegisterForm = ({ fnGetStudent }) => {
  const initialState = {
    name: "aaa",
  pwd: "pwd",
  gender: "female",
  hobbies: ["Cricket"],   // ✅ ARRAY
  country: "ind"
};
  const [data, setData] = useState(initialState);

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
      const res = await axios.post(
        "https://student-server-three.vercel.app/std/std-reg",
        data
      );
      if (res.data?.acknowledged) {
        fnGetStudent(); // refresh table
        setData(initialState); // 🔥 RESET FORM
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <form onSubmit={fnRegister}>
      <p>
        <label>Name</label>
        <input name="name" onChange={fnChange} value={data.name} />
      </p>

      <p>
        <label>Password</label>
        <input type="password" name="pwd" onChange={fnChange} value={data.pwd} />
      </p>

      <p>
        <label>Gender</label>
        <input
          type="radio"
          name="gender"
          value="male"
          onChange={fnChange}
          checked={data.gender === "male"}
        />  Male
        <input
          type="radio"
          name="gender"
          value="female"
          onChange={fnChange}
          checked={data.gender === "female"}
        />
        Female
      </p>

      <p>
        <label>Hobbies</label>

        <input
          type="checkbox"
          name="hobbies"
          value="Cricket"
          onChange={fnChange}
          checked={data.hobbies.includes("Cricket")}
        /> Cricket

        <input
          type="checkbox"
          name="hobbies"
          value="Reading"
          onChange={fnChange}
          checked={data.hobbies.includes("Reading")}
        /> Reading

        <input
          type="checkbox"
          name="hobbies"
          value="Cooking"
          onChange={fnChange}
          checked={data.hobbies.includes("Cooking")}
        /> Cooking
      </p>

      <p>
        <label>Country</label>
        <select name="country" onChange={fnChange} value={data.country}>
          <option value="select">Select</option>
          <option value="ind"  >Ind</option>
          <option value="pak">Pak</option>
          <option value="aus">Aus</option>
        </select>
      </p>

      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
