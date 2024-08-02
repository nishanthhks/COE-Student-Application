import React, { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import StudentForm from "../StudentForm/StudentForm";
import StudentDetails from "../StudentDetails/StudentDetails";
import Demo from "../../test/demo";
import Login from "../Login/Login";

export default function Home() {
  return (
    <>
      <StudentDetails />
    </>
  );
}
