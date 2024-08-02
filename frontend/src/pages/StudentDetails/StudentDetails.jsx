import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import NavBar from "../../components/NavBar/NavBar";
import dummyPDF from "/dummy.pdf"; // Import a dummy PDF for display

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
                  <td className="py-2 px-4 border-b">{student.aadharNumber}</td>
                  <td className="py-2 px-4 border-b">{student.address}</td>
                  <td className="py-2 px-4 border-b">{student.email}</td>
                  <td className="py-2 px-4 border-b">
                    <a
                      href={student.tenthMarks}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white bg-red-500 rounded p-1 px-3 hover:bg-red-600 ">
                      View
                    </a>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <a
                      href={student.twelfthMarks}
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
                No students found
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

  const dummyData = [
    {
      name: "nishanth",
      usn: "1BM19CS001",
      semester: "6",
      section: "A",
      branch: "CSE",
      aadharNumber: "123456789012",
      address: "kanakapura",
      email: "nishanth@example.com",
      tenthMarks: dummyPDF,
      twelfthMarks: dummyPDF,
    },
    {
      name: "navneeth",
      usn: "1BM19CS002",
      semester: "6",
      section: "B",
      branch: "ECE",
      aadharNumber: "987654321098",
      address: "blr",
      email: "navneeth@example.com",
      tenthMarks: dummyPDF,
      twelfthMarks: dummyPDF,
    },
    {
      name: "nithin",
      usn: "1BM19CS003",
      semester: "5",
      section: "A",
      branch: "ME",
      aadharNumber: "456123789012",
      address: "blr",
      email: "nithin@example.com",
      tenthMarks: dummyPDF,
      twelfthMarks: dummyPDF,
    },
    {
      name: "random1",
      usn: "1BM19CS004",
      semester: "5",
      section: "B",
      branch: "EEE",
      aadharNumber: "321654987098",
      address: "kkp",
      email: "random1@example.com",
      tenthMarks: dummyPDF,
      twelfthMarks: dummyPDF,
    },
    {
      name: "random1",
      usn: "1BM19CS005",
      semester: "4",
      section: "A",
      branch: "CIV",
      aadharNumber: "789456123012",
      address: "kkp",
      email: "random1@example.com",
      tenthMarks: dummyPDF,
      twelfthMarks: dummyPDF,
    },
  ];

  // Handle changes to search parameters
  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({
      ...searchParams,
      [name]: value,
    });
  };

  // Filter data based on search parameters
  const handleSearch = () => {
    const { semester, section, branch, usn } = searchParams;
    let filtered = dummyData;

    if (semester) {
      filtered = filtered.filter((student) => student.semester === semester);
    }
    if (section) {
      filtered = filtered.filter((student) => student.section === section);
    }
    if (branch) {
      filtered = filtered.filter((student) => student.branch === branch);
    }
    if (usn) {
      filtered = filtered.filter((student) => student.usn === usn);
    }

    setFilteredData(filtered);
  };

  return (
    <>
      <NavBar title="Student Details" />
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">Student Details</h1>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <Dropdown
            label="Semester"
            name="semester"
            options={["4", "5", "6"]}
            value={searchParams.semester}
            onChange={handleSearchChange}
          />
          <Dropdown
            label="Section"
            name="section"
            options={["A", "B"]}
            value={searchParams.section}
            onChange={handleSearchChange}
          />
          <Dropdown
            label="Branch"
            name="branch"
            options={["CSE", "ECE", "ME", "EEE", "CIV"]}
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
