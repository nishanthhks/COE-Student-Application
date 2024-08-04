import React, { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";

const Login = () => {
  const [activeTab, setActiveTab] = useState("Student");
  const [formData, setFormData] = useState({
    usn: "",
    email: "",
    password: "",
  });

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setFormData({ usn: "", email: "", password: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Connect to the backend
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);
        // Handle successful login, e.g., redirect or store user data
      } else {
        console.error("Login failed:", response.statusText);
        // Handle failed login
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
      // Handle network or other errors
    }
  };

  const renderInputFields = () => {
    if (activeTab === "Student") {
      return (
        <>
          <InputField
            label="USN"
            type="text"
            name="usn"
            value={formData.usn}
            onChange={handleChange}
          />
          <InputField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </>
      );
    } else {
      return (
        <>
          <InputField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <InputField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </>
      );
    }
  };

  return (
    <>
      <NavBar title={`${activeTab} Login`} login={true} />
      <div className="min-h-full flex justify-center bg mt-20 px-4">
        <div className="w-full max-w-xl mx-auto border  border-gray-300 rounded-lg p-4">
          <h1 className="text-2xl font-bold text-center mb-4">{`${activeTab} Login`}</h1>
          <div className="flex lg:flex-nowrap md:flex-nowrap sm:flex-wrap flex-wrap gap-1 border-b border-gray-200 mb-4 p-3">
            <div className="flex w-full justify-between">
              {["Student", "Admission Incharge"].map((tab) => (
                <button
                  key={tab}
                  className={`flex-1 py-1 px-4 mx-1 ${
                    activeTab === tab
                      ? `text-white bg-${getTabColor(tab)}`
                      : "text-gray-600 bg-white"
                  } rounded-lg focus:outline-none`}
                  onClick={() => handleTabClick(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex w-full justify-between">
              {["CIE Office", "Principal"].map((tab) => (
                <button
                  key={tab}
                  className={`flex-1 py-1 px-4 mx-1 ${
                    activeTab === tab
                      ? `text-white bg-${getTabColor(tab)}`
                      : "text-gray-600 bg-white"
                  } rounded-lg focus:outline-none`}
                  onClick={() => handleTabClick(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="border border-gray-300 p-4 rounded"
          >
            {renderInputFields()}
            <div className="flex flex-col justify-between items-center mt-4">
              <a
                href="#"
                className="text-sm text-blue-500 hover:underline mb-4"
              >
                Forgot Password?
              </a>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

const InputField = ({ label, type, name, value, onChange }) => (
  <div className="mb-4">
    <label className="block text-gray-700">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border rounded-lg focus:outline-none"
      required
    />
  </div>
);

const getTabColor = (tab) => {
  switch (tab) {
    case "Student":
      return "blue-500";
    case "Admission Incharge":
      return "green-500";
    case "CIE Office":
      return "yellow-500";
    case "Principal":
      return "red-500";
    default:
      return "gray-500";
  }
};

export default Login;
