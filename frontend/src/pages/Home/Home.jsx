import React, { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import StudentForm from "../StudentForm/StudentForm";
import StudentDetails from "../StudentDetails/StudentDetails";

export default function Home() {
  return (
    <>
      {/* <NavBar /> */}
      <StudentForm />
    </>
  );
}