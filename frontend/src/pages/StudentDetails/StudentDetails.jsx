import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";

const branchOptions = {
  "CSE": "Computer Science and Engineering",
  "ISE": "Information Science and Engineering",
  "ECE": "Electronics and Communication Engineering",
  "AI&DS": "Artificial Intelligence and Data Science",
  "ME": "Mechanical Engineering",
  "ASE": "Aerospace Engineering",
  "EEE": "Electrical and Electronics Engineering",
  "ETE": "Electronics and Telecommunication Engineering",
  "EIE": "Electronics and Instrumentation",
  "CVE": "Civil Engineering",
  "CSE-IoT": "Computer Science and Engineering - Internet of Things and Cyber Security",
  "AI&ML": "Artificial Intelligence and Machine Learning",
  "MD": "Medical Electronics",
  "IEM": "Industrial Engineering and Management",
  "CE": "Chemical Engineering",
  "BT": "Bio Technology",
};

const Dropdown = ({ label, name, options, value, onChange }) => (
  <div>
    <label className="block text-gray-700 mb-2 sm:mb-1">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="sm:p-1 p-2 border border-gray-300 rounded w-full md:w-auto"
    >
      <option value="">Select {label}</option>
      {Object.keys(options).map((option, index) => (
        <option key={index} value={option}>
          {options[option]}
        </option>
      ))}
    </select>
  </div>
);

function StudentTable({ filteredData }) {
  return (
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
                  index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                } hover:bg-gray-200`}
              >
                <td className="py-2 px-4 border-b">{student.name}</td>
                <td className="py-2 px-4 border-b">{student.usn}</td>
                <td className="py-2 px-4 border-b">{student.semester}</td>
                <td className="py-2 px-4 border-b">{student.section}</td>
                <td className="py-2 px-4 border-b">
                  {branchOptions[student.branch]}
                </td>
                <td className="py-2 px-4 border-b">{student.aadhar_number}</td>
                <td className="py-2 px-4 border-b">{student.address}</td>
                <td className="py-2 px-4 border-b">{student.email}</td>
                <td className="py-2 px-4 border-b">
                  <a
                    href={`http://localhost:5000/pdf/tenth/${student.usn}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white bg-red-500 rounded p-1 px-3 hover:bg-red-600"
                  >
                    View
                  </a>
                </td>
                <td className="py-2 px-4 border-b">
                  <a
                    href={`http://localhost:5000/pdf/twelfth/${student.usn}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white bg-red-500 rounded p-1 px-3 hover:bg-red-600"
                  >
                    View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody className="w-64 m-auto flex flex-row justify-center">
            <p className="text-gray-500 mx-auto text-center">No students found</p>
          </tbody>
        )}
      </table>
    </div>
  );
}

const StudentDetails = () => {
  const [searchParams, setSearchParams] = useState({
    semester: "",
    section: "",
    branch: "",
    usn: "",
  });
  const [filteredData, setFilteredData] = useState([]);
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/students")
      .then((response) => response.json())
      .then((data) => {
        setAllData(data);
        setFilteredData(data);
      })
      .catch((error) => console.error("Error fetching student data:", error));
  }, []);

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({
      ...searchParams,
      [name]: value,
    });
  };

  const handleSearch = () => {
    const { semester, section, branch, usn } = searchParams;
    let queryString = new URLSearchParams();

    if (semester) queryString.append("semester", semester);
    if (section) queryString.append("section", section);
    if (branch) queryString.append("branch", branch);
    if (usn) queryString.append("usn", usn);

    fetch(`http://localhost:5000/students/search?${queryString.toString()}`)
      .then((response) => response.json())
      .then((data) => setFilteredData(data))
      .catch((error) => console.error("Error fetching search results:", error));
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
            options={{ "1": "Semester 1", "2": "Semester 2", "3": "Semester 3", "4": "Semester 4", "5": "Semester 5", "6": "Semester 6" }}
            value={searchParams.semester}
            onChange={handleSearchChange}
          />
          <Dropdown
            label="Section"
            name="section"
            options={{ "A": "Section A", "B": "Section B", "C": "Section C", "D": "Section D", "E": "Section E", "F": "Section F" }}
            value={searchParams.section}
            onChange={handleSearchChange}
          />
          <Dropdown
            label="Branch"
            name="branch"
            options={branchOptions}
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
              className="sm:p-1 p-2 border border-gray-300 rounded w-full md:w-auto"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={handleSearch}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
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
