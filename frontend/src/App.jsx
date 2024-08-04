import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import StudentForm from "./pages/StudentForm/StudentForm";
import StudentDetails from "./pages/StudentDetails/StudentDetails";
import Login from "./pages/Login/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student-form" element={<StudentForm />} />
        <Route path="/student-details" element={<StudentDetails />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;