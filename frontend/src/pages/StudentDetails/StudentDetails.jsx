import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../../components/NavBar/NavBar";
import { Dropdown } from "../../components/StudentDetailsComponents/Dropdown";
import { StudentTable } from "../../components/StudentDetailsComponents/StudentTable";

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
      <NavBar title={"Student Details"} />
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
