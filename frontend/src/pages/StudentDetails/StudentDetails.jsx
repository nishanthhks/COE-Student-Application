import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import dummyPDF from "/dummy.pdf"; // import a dummy pdf for display

const StudentDetails = () => {
  const [searchParams, setSearchParams] = useState({
    semester: "",
    section: "",
    usn: "",
  });
  const [filteredData, setFilteredData] = useState([]);

  const dummyData = [
    {
      name: "John Doe",
      usn: "1BM19CS001",
      semester: "6",
      section: "A",
      aadharNumber: "123456789012",
      address: "123 Main St nnnnnnnnnnnnnnnnnnn jdfhgafjdagfjgfadygfaifgadiufgbauyfbgabuybgfadyubgfaduyfgadufga ygfadyufjgaduyfga",
      email: "johndoe@example.com",
      tenthMarks: dummyPDF,
      twelfthMarks: dummyPDF,
    },
    {
      name: "Jane Smith",
      usn: "1BM19CS002",
      semester: "6",
      section: "B",
      aadharNumber: "987654321098",
      address: "456 Elm St",
      email: "janesmith@example.com",
      tenthMarks: dummyPDF,
      twelfthMarks: dummyPDF,
    },
    {
      name: "Alice Johnson",
      usn: "1BM19CS003",
      semester: "5",
      section: "A",
      aadharNumber: "456123789012",
      address: "789 Oak St",
      email: "alicejohnson@example.com",
      tenthMarks: dummyPDF,
      twelfthMarks: dummyPDF,
    },
    {
      name: "Bob Brown",
      usn: "1BM19CS004",
      semester: "5",
      section: "B",
      aadharNumber: "321654987098",
      address: "101 Pine St",
      email: "bobbrown@example.com",
      tenthMarks: dummyPDF,
      twelfthMarks: dummyPDF,
    },
    {
      name: "Charlie Davis",
      usn: "1BM19CS005",
      semester: "4",
      section: "A",
      aadharNumber: "789456123012",
      address: "202 Birch St",
      email: "charliedavis@example.com",
      tenthMarks: dummyPDF,
      twelfthMarks: dummyPDF,
    },
  ];

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({
      ...searchParams,
      [name]: value,
    });
  };

  const handleSearch = () => {
    const { semester, section, usn } = searchParams;
    let filtered = dummyData;

    if (semester) {
      filtered = filtered.filter((student) => student.semester === semester);
    }
    if (section) {
      filtered = filtered.filter((student) => student.section === section);
    }
    if (usn) {
      filtered = filtered.filter((student) => student.usn === usn);
    }

    setFilteredData(filtered);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Student Details</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div>
          <label className="block text-gray-700 mb-2">Semester</label>
          <input
            type="text"
            name="semester"
            value={searchParams.semester}
            onChange={handleSearchChange}
            className="p-2 border border-gray-300 rounded w-full md:w-auto"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Section</label>
          <input
            type="text"
            name="section"
            value={searchParams.section}
            onChange={handleSearchChange}
            className="p-2 border border-gray-300 rounded w-full md:w-auto"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">USN</label>
          <input
            type="text"
            name="usn"
            value={searchParams.usn}
            onChange={handleSearchChange}
            className="p-2 border border-gray-300 rounded w-full md:w-auto"
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
      {filteredData.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">USN</th>
                <th className="py-2 px-4 border-b">Semester</th>
                <th className="py-2 px-4 border-b">Section</th>
                <th className="py-2 px-4 border-b">Aadhar Number</th>
                <th className="py-2 px-4 border-b">Address</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">10th Marks</th>
                <th className="py-2 px-4 border-b">12th Marks</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((student, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{student.name}</td>
                  <td className="py-2 px-4 border-b">{student.usn}</td>
                  <td className="py-2 px-4 border-b">{student.semester}</td>
                  <td className="py-2 px-4 border-b">{student.section}</td>
                  <td className="py-2 px-4 border-b">{student.aadharNumber}</td>
                  <td className="py-2 px-4 border-b">{student.address}</td>
                  <td className="py-2 px-4 border-b">{student.email}</td>
                  <td className="py-2 px-4 border-b">
                    <a
                      href={student.tenthMarks}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500">
                      View
                    </a>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <a
                      href={student.twelfthMarks}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500">
                      View
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No students found</p>
      )}
    </div>
  );
};

export default StudentDetails;
