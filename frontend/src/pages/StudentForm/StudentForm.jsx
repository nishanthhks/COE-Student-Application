import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";

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
    email: "",
    tenthMarks: null,
    twelfthMarks: null,
  });

  const [sections, setSections] = useState([]);
  const [errors, setErrors] = useState({});

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

  const validateForm = () => {
    const newErrors = {};
    if (!formData.usn.startsWith("1BM")) {
      newErrors.usn = 'USN must start with "1BM"';
    }
    if (!/^\d+$/.test(formData.aadharNumber)) {
      newErrors.aadharNumber = "Aadhar Number must contain only numbers";
    }
    if (formData.tenthMarks && formData.tenthMarks.type !== "application/pdf") {
      newErrors.tenthMarks = "10th Marks Card must be a PDF file";
    }
    if (formData.twelfthMarks && formData.twelfthMarks.type !== "application/pdf") {
      newErrors.twelfthMarks = "12th Marks Card must be a PDF file";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const response = await axios.post("http://localhost:5000/api/student", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      // Handle successful form submission logic, e.g., show a success message
    } catch (error) {
      console.error("Error submitting form", error);
      // Handle form submission error, e.g., show an error message
    }
  };

  return (
    <>
      <NavBar />
      <div className="sm:flex-row sm:items-center sm:justify-center p-8 md:px-20 lg:px-32">
        <h2 className="text-2xl font-bold mb-4">Student Information Form</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg">
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
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
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
              {errors.usn && <p className="text-red-500 text-sm mt-1">{errors.usn}</p>}
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
                required
              >
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
                required
              >
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
              {errors.aadharNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.aadharNumber}</p>
              )}
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
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
          </div>
          <div className="space-y-4">
            <FileUpload
              id="tenthMarks"
              name="tenthMarks"
              value={formData.tenthMarks}
              onChange={handleChange}
            />
            {errors.tenthMarks && (
              <p className="text-red-500 text-sm mt-1">{errors.tenthMarks}</p>
            )}
            <FileUpload
              id="twelfthMarks"
              name="twelfthMarks"
              value={formData.twelfthMarks}
              onChange={handleChange}
            />
            {errors.twelfthMarks && (
              <p className="text-red-500 text-sm mt-1">{errors.twelfthMarks}</p>
            )}
          </div>
          <div className="col-span-1 md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600 transition duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
