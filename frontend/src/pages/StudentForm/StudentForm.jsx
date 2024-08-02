import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { AiOutlinePlus } from "react-icons/ai";

const FileUpload = ({ id, name, value, onChange, error }) => {
  const [fileName, setFileName] = useState(value ? value.name : "");
  const [filePreview, setFilePreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file ? file.name : "");
    setFilePreview(file ? URL.createObjectURL(file) : null);
    onChange(e); // Notify parent about file change
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
      {error && <p className="text-red-500 absolute bottom-2">{error}</p>}
    </div>
  );
};

export default function StudentForm() {
  const [formData, setFormData] = useState({
    name: "",
    usn: "",
    semester: "",
    section: "",
    cycle: "",
    aadharNumber: "",
    email: "",
    address: "",
    tenthMarks: null,
    twelfthMarks: null,
    branch: "",
  });

  const [sections, setSections] = useState([]);
  const [errors, setErrors] = useState({});

  const semesterSections = {
    1: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
    2: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
    3: ["A", "B", "C", "D", "E", "F"],
    4: ["A", "B", "C", "D", "E", "F"],
    5: ["A", "B", "C", "D", "E", "F"],
    6: ["A", "B", "C", "D", "E", "F"],
    7: ["A", "B", "C", "D", "E", "F"],
    8: ["A", "B", "C", "D", "E", "F"],
  };

  useEffect(() => {
    if (formData.semester) {
      const sectionsOptions = semesterSections[formData.semester];
      if (sectionsOptions) {
        setSections(Array.isArray(sectionsOptions) ? sectionsOptions : Object.values(sectionsOptions));
      } else {
        setSections([]);
      }
    }
  }, [formData.semester]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.usn.startsWith("1BM")) {
      newErrors.usn = 'USN must start with "1BM"';
    }

    if (!/^\d+$/.test(formData.aadharNumber)) {
      newErrors.aadharNumber = "Aadhar Number must contain only numbers";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (formData.tenthMarks && formData.tenthMarks.type !== "application/pdf") {
      newErrors.tenthMarks = "10th Marks Card must be a PDF file";
    }
    if (formData.twelfthMarks && formData.twelfthMarks.type !== "application/pdf") {
      newErrors.twelfthMarks = "12th Marks Card must be a PDF file";
    }

    if (formData.semester <= 2 && !formData.cycle) {
      newErrors.cycle = "Cycle must be selected for Semester 1 or 2";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return; // Prevent form submission if validation fails
    }

    // Process form data here, e.g., submit to a server or save locally
  };

  const branchOptions = {
    "CS": "Computer Science",
    "IT": "Information Technology",
    "EC": "Electronics and Communication",
    // Add other branches as needed
  };

  return (
    <>
      <NavBar />
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Student Registration</h1>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full p-2 border border-gray-300 rounded ${errors.name ? 'border-red-500' : ''}`}
                required
              />
              {errors.name && <p className="text-red-500">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="usn">USN</label>
              <input
                type="text"
                id="usn"
                name="usn"
                value={formData.usn}
                onChange={handleChange}
                className={`w-full p-2 border border-gray-300 rounded ${errors.usn ? 'border-red-500' : ''}`}
                required
              />
              {errors.usn && <p className="text-red-500">{errors.usn}</p>}
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="semester">Semester</label>
              <select
                id="semester"
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                className={`w-full p-2 border border-gray-300 rounded ${errors.semester ? 'border-red-500' : ''}`}
                required
              >
                <option value="">Select Semester</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
              </select>
              {errors.semester && <p className="text-red-500">{errors.semester}</p>}
            </div>
            {formData.semester <= 2 && (
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="cycle">Cycle</label>
                <select
                  id="cycle"
                  name="cycle"
                  value={formData.cycle}
                  onChange={handleChange}
                  className={`w-full p-2 border border-gray-300 rounded ${errors.cycle ? 'border-red-500' : ''}`}
                >
                  <option value="">Select Cycle</option>
                  <option value="P">Physics</option>
                  <option value="C">Chemistry </option>
                </select>
                {errors.cycle && <p className="text-red-500">{errors.cycle}</p>}
              </div>
            )}
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="section">Section</label>
              <select
                id="section"
                name="section"
                value={formData.section}
                onChange={handleChange}
                className={`w-full p-2 border border-gray-300 rounded ${errors.section ? 'border-red-500' : ''}`}
                required
              >
                <option value="">Select Section</option>
                {Array.isArray(sections) && sections.length > 0 && sections.map((section) => (
                  <option key={section} value={section}>{section}</option>
                ))}
              </select>
              {errors.section && <p className="text-red-500">{errors.section}</p>}
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="aadharNumber">Aadhar Number</label>
              <input
                type="text"
                id="aadharNumber"
                name="aadharNumber"
                value={formData.aadharNumber}
                onChange={handleChange}
                className={`w-full p-2 border border-gray-300 rounded ${errors.aadharNumber ? 'border-red-500' : ''}`}
                required
              />
              {errors.aadharNumber && <p className="text-red-500">{errors.aadharNumber}</p>}
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-2 border border-gray-300 rounded ${errors.email ? 'border-red-500' : ''}`}
                required
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={`w-full p-2 border border-gray-300 rounded ${errors.address ? 'border-red-500' : ''}`}
                required
              />
              {errors.address && <p className="text-red-500">{errors.address}</p>}
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="branch">Branch</label>
              <select
                id="branch"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                className={`w-full p-2 border border-gray-300 rounded ${errors.branch ? 'border-red-500' : ''}`}
                required
              >
                <option value="">Select Branch</option>
                {Object.keys(branchOptions).map((key) => (
                  <option key={key} value={key}>{branchOptions[key]}</option>
                ))}
              </select>
              {errors.branch && <p className="text-red-500">{errors.branch}</p>}
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="tenthMarks">10th Marks Card</label>
              <FileUpload
                id="tenthMarks"
                name="tenthMarks"
                value={formData.tenthMarks}
                onChange={handleChange}
                error={errors.tenthMarks}
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="twelfthMarks">12th Marks Card</label>
              <FileUpload
                id="twelfthMarks"
                name="twelfthMarks"
                value={formData.twelfthMarks}
                onChange={handleChange}
                error={errors.twelfthMarks}
              />
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
