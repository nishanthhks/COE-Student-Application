import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlinePlus } from "react-icons/ai";
import NavBar from "../../components/NavBar/NavBar";

// Predefined options
const SEMESTER_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8];
const SECTION_OPTIONS = ["A", "B", "C", "D", "E", "F"];
const BRANCH_OPTIONS = [
  "CSE",
  "ISE",
  "ASE",
  "ME",
  "MD",
  "IEM",
  "EEE",
  "ECE",
  "EIE",
  "ETE",
  "CE",
  "CVE",
  "AI&ML",
  "AI&DS",
  "CSE-DS",
  "BT",
  "CSE-IoT",
];

// Dropdown component to be reused for semester, section, and branch
const Dropdown = ({ label, name, options, value, onChange }) => (
  <div>
    <label className="block text-gray-700 mb-2 sm:mb-1">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="sm:p-1 p-2 border border-gray-300 rounded w-full md:w-auto">
      <option value="">Select {label}</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

// Component to render student data
function StudentTable({ filteredData }) {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">USN</th>
              <th className="py-2 px-4 border-b">Semester</th>
              <th className="py-2 px-4 border-b">Section</th>
              <th className="py-2 px-4 border-b">Branch</th>
              <th className="py-2 px-4 border-b">Aadhar Number</th>
              <th className="py-2 px-4 border-b">Address</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Father's Name</th>
              <th className="py-2 px-4 border-b">Father's Occupation</th>
              <th className="py-2 px-4 border-b">Father's Phone Number</th>
              <th className="py-2 px-4 border-b">Mother's Name</th>
              <th className="py-2 px-4 border-b">Mother's Occupation</th>
              <th className="py-2 px-4 border-b">Mother's Phone Number</th>
              <th className="py-2 px-4 border-b">10th Marks</th>
              <th className="py-2 px-4 border-b">12th Marks</th>
            </tr>
          </thead>
          {filteredData.length > 0 ? (
            <tbody>
              {filteredData.map((student, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-gray-200`}>
                  <td className="py-2 px-4 border-b">{student.name}</td>
                  <td className="py-2 px-4 border-b">{student.usn}</td>
                  <td className="py-2 px-4 border-b">{student.semester}</td>
                  <td className="py-2 px-4 border-b">{student.section}</td>
                  <td className="py-2 px-4 border-b">{student.branch}</td>
                  <td className="py-2 px-4 border-b">
                    {student.aadhar_number}
                  </td>
                  <td className="py-2 px-4 border-b">{student.address}</td>
                  <td className="py-2 px-4 border-b">{student.email}</td>
                  <td className="py-2 px-4 border-b">{student.fathers_name}</td>
                  <td className="py-2 px-4 border-b">
                    {student.fathers_occupation}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {student.fathers_phone_number}
                  </td>
                  <td className="py-2 px-4 border-b">{student.mothers_name}</td>
                  <td className="py-2 px-4 border-b">
                    {student.mothers_occupation}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {student.mothers_phone_number}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <a
                      href={`http://localhost:4000/pdf/${student.id}/tenth`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white bg-red-500 rounded p-1 px-3 hover:bg-red-600 ">
                      View
                    </a>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <a
                      href={`http://localhost:4000/pdf/${student.id}/twelfth`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white bg-red-500 rounded p-1 px-3 hover:bg-red-600">
                      View
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody className="w-64 m-auto flex flex-row justify-center">
              <p className="text-gray-500 mx-auto text-center ">
                <center>No students found</center>
              </p>
            </tbody>
          )}
        </table>
      </div>
    </>
  );
}

// Main component to manage state and search functionality
const StudentDetails = () => {
  const [searchParams, setSearchParams] = useState({
    semester: "",
    section: "",
    branch: "",
    usn: "",
  });
  const [filteredData, setFilteredData] = useState([]);

  // Fetch student data from the server
  const handleSearch = async () => {
    try {
      const res = await axios.get("http://localhost:4000/students", {
        params: searchParams,
      });
      setFilteredData(res.data);
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  // Handle changes to search parameters
  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({
      ...searchParams,
      [name]: value,
    });
  };

  return (
    <>
      <NavBar title={StudentDetails} />
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">Student Details</h1>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <Dropdown
            label="Semester"
            name="semester"
            options={SEMESTER_OPTIONS}
            value={searchParams.semester}
            onChange={handleSearchChange}
          />
          <Dropdown
            label="Section"
            name="section"
            options={SECTION_OPTIONS}
            value={searchParams.section}
            onChange={handleSearchChange}
          />
          <Dropdown
            label="Branch"
            name="branch"
            options={BRANCH_OPTIONS}
            value={searchParams.branch}
            onChange={handleSearchChange}
          />
          <div>
            <label className="block text-gray-700 sm:mb-1 mb-2">USN</label>
            <input
              type="text"
              name="usn"
              value={searchParams.usn}
              onChange={handleSearchChange}
              className=" sm:p-1 p-2 border border-gray-300 rounded w-full md:w-auto"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={handleSearch}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
              Search
            </button>
          </div>
        </div>
        <StudentTable filteredData={filteredData} />
      </div>
    </>
  );
};

export default StudentDetails;
