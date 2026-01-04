import Image from "next/image";
import styles from "./page.module.css";
import Register from "./register/page";
import Student from "./student/page";

export default function Home() {
  return (
    <div className=''>
      <main>
        <Register/>
        <Student/>
      </main>
    </div> 
  );
}
