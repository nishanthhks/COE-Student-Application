import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { AiOutlinePlus } from "react-icons/ai";

const FileUpload = ({ id, name, value, onChange }) => {
  const [fileName, setFileName] = useState(value ? value.name : "");
  const [filePreview, setFilePreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file ? file.name : "");
    setFilePreview(file ? URL.createObjectURL(file) : null);
    onChange(e);
  };

  return (
    <div className="relative w-64 h-64 border border-gray-300 rounded flex items-center justify-center text-gray-600">
      <input
        type="file"
        id={id}
        name={name}
        onChange={handleFileChange}
        className="absolute inset-0 opacity-0 cursor-pointer"
        accept=".pdf"
      />
      {filePreview ? (
        <iframe
          src={filePreview}
          title={fileName}
          className="w-full h-full"
          style={{ border: "none" }}
        />
      ) : (
        <div className="flex flex-col items-center justify-center text-center">
          <AiOutlinePlus className="text-4xl" />
          <p className="text-gray-500 mt-2">Upload PDF</p>
        </div>
      )}
    </div>
  );
};

export default function StudentForm() {
  const [formData, setFormData] = useState({
    name: "",
    usn: "",
    semester: "",
    section: "",
    aadharNumber: "",
    address: "",
    tenthMarks: null,
    twelfthMarks: null,
  });

  const [sections, setSections] = useState([]);

  const semesterSections = {
    1: ["A", "B", "C", "D"],
    2: ["A", "B", "C", "D"],
    3: ["A", "B", "C", "D", "E", "F"],
    4: ["A", "B", "C", "D", "E", "F"],
    5: ["A", "B", "C", "D", "E", "F"],
    6: ["A", "B", "C", "D", "E", "F"],
    7: ["A", "B", "C", "D", "E", "F"],
    8: ["A", "B", "C", "D", "E", "F"],
  };

  useEffect(() => {
    if (formData.semester) {
      setSections(semesterSections[formData.semester] || []);
    }
  }, [formData.semester]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate USN
    if (!formData.usn.startsWith("1BM")) {
      alert('USN must start with "1BM"');
      return;
    }

    // Validate Aadhar number
    if (!/^\d+$/.test(formData.aadharNumber)) {
      alert("Aadhar Number must contain only numbers");
      return;
    }

    // Validate file uploads
    if (formData.tenthMarks && formData.tenthMarks.type !== "application/pdf") {
      alert("10th Marks Card must be a PDF file");
      return;
    }
    if (formData.twelfthMarks && formData.twelfthMarks.type !== "application/pdf") {
      alert("12th Marks Card must be a PDF file");
      return;
    }

    console.log(formData);
    // Handle form submission logic, e.g., send data to backend
  };

  return (
    <>
      <NavBar />
      <div className=" sm:flex-row sm:items-center sm:justify-center p-8 md:px-20 lg:px-32">
        <h2 className="text-2xl font-bold mb-4">Student Information Form</h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 bg">
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="usn">
                University Seat Number (USN)
              </label>
              <input
                type="text"
                id="usn"
                name="usn"
                value={formData.usn}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="semester">
                Semester
              </label>
              <select
                id="semester"
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required>
                <option value="">Select Semester</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                  <option key={sem} value={sem}>{`${sem} ${
                    sem === 1 ? "st" : sem === 2 ? "nd" : "th"
                  } Semester`}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="section">
                Section
              </label>
              <select
                id="section"
                name="section"
                value={formData.section}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required>
                <option value="">Select Section</option>
                {sections.map((section) => (
                  <option key={section} value={section}>
                    {section}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="aadharNumber">
                Aadhar Number
              </label>
              <input
                type="text"
                id="aadharNumber"
                name="aadharNumber"
                value={formData.aadharNumber}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="address">
                Address
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                rows="4"
                required
              />
            </div>
          </div>
          <div className="space-y-4 m-auto flex-row justify-center items-center">
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="tenthMarks">
                10th Marks Card
              </label>
              <FileUpload
                id="tenthMarks"
                name="tenthMarks"
                value={formData.tenthMarks}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="twelfthMarks">
                12th Marks Card
              </label>
              <FileUpload
                id="twelfthMarks"
                name="twelfthMarks"
                value={formData.twelfthMarks}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-span-1 md:col-span-2  flex t justify-center ">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              style={{ width: "200px" }}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
