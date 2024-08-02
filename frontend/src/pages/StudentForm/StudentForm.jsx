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
    1: ["A", "B", "C", "D"],
    2: ["A", "B", "C", "D"],
    3: ["A", "B", "C", "D", "E", "F"],
    4: ["A", "B", "C", "D", "E", "F"],
    5: ["A", "B", "C", "D", "E", "F"],
    6: ["A", "B", "C", "D", "E", "F"],
    7: ["A", "B", "C", "D", "E", "F"],
    8: ["A", "B", "C", "D", "E", "F"],
  };

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

  useEffect(() => {
    if (formData.semester) {
      setSections(semesterSections[formData.semester] || []);
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

    const data = new FormData();
    data.append("name", formData.name);
    data.append("usn", formData.usn);
    data.append("semester", formData.semester);
    data.append("section", formData.section);
    data.append("aadharNumber", formData.aadharNumber);
    data.append("email", formData.email);
    data.append("address", formData.address);
    data.append("branch", formData.branch);
    if (formData.tenthMarks) data.append("tenthMarks", formData.tenthMarks);
    if (formData.twelfthMarks) data.append("twelfthMarks", formData.twelfthMarks);

    try {
      await fetch("http://localhost:4000/submit", {
        method: "POST",
        body: data,
      });
      alert("Data submitted successfully");
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Error submitting data");
    }
  };

  return (
    <>
      <NavBar />
      <div className="sm:flex-row sm:items-center sm:justify-center p-8 md:px-20 lg:px-32">
        <h2 className="text-2xl font-bold mb-4">Student Information Form</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded shadow-lg">
          <div className="md:col-span-2 space-y-4">
            {/* Form fields for Name, USN, Semester, Section, Aadhar Number, Email, Address, Branch */}
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
              <label className="block text-gray-700 mb-2" htmlFor="usn">University Seat Number (USN)</label>
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
                {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                  <option key={sem} value={sem}>
                    {sem} {sem === 1 || sem === 2 ? 'st' : sem === 3 || sem === 4 ? 'rd' : 'th'} Semester
                  </option>
                ))}
              </select>
              {errors.semester && <p className="text-red-500">{errors.semester}</p>}
            </div>
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
                {sections.map((section) => (
                  <option key={section} value={section}>
                    {section}
                  </option>
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
              <textarea
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
                {Object.entries(branchOptions).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
              {errors.branch && <p className="text-red-500">{errors.branch}</p>}
            </div>
          </div>
          <div className="flex flex-col items-end space-y-4">
            <div className="w-full">
              <label className="block text-gray-700 mb-2" htmlFor="tenthMarks">10th Marks Card (PDF)</label>
              <FileUpload
                id="tenthMarks"
                name="tenthMarks"
                value={formData.tenthMarks}
                onChange={handleChange}
                error={errors.tenthMarks}
              />
            </div>
            <div className="w-full">
              <label className="block text-gray-700 mb-2" htmlFor="twelfthMarks">12th Marks Card (PDF)</label>
              <FileUpload
                id="twelfthMarks"
                name="twelfthMarks"
                value={formData.twelfthMarks}
                onChange={handleChange}
                error={errors.twelfthMarks}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 col-span-3"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
