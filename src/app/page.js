"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import RegisterForm from "./components/RegisterForm";
import StudentForms from "./components/StudentForms"

export default function Home() {
  const [users, setUsers] = useState([]);

  const fnGetStudent = async () => {
    try {
      const res = await axios.get(
        "https://student-server-three.vercel.app/std/std-get-reg"
      );
      setUsers(res.data);
    } catch {
      setUsers([]);
    }
  };

  useEffect(() => {
    fnGetStudent();
  }, []);

  return (
    <main>
      <RegisterForm fnGetStudent={fnGetStudent} />
      <StudentForms users={users} />
    </main>
  );
}
