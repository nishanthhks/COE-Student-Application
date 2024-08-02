import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios"; // Ensure axios is imported

// FileUpload component for handling file uploads
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
    <div className="relative  lg:w-52 lg:h-52 md:w-40  md:h-40 sm:w-64 sm:h-64 border border-gray-300 rounded flex items-center justify-center text-gray-600">
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

// TextInput component for handling text inputs
const TextInput = ({
  id,
  name,
  value,
  onChange,
  label,
  error,
  type = "text",
}) => (
  <div>
    <label className="block text-gray-700 mb-2" htmlFor={id}>
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full p-2 border border-gray-300 rounded ${
        error ? "border-red-500" : ""
      }`}
      required
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

// SelectInput component for handling select inputs
const SelectInput = ({ id, name, value, onChange, label, options, error }) => (
  <div>
    <label className="block text-gray-700 mb-2" htmlFor={id}>
      {label}
    </label>
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full p-2 border border-gray-300 rounded ${
        error ? "border-red-500" : ""
      }`}
      required>
      <option value="">Select {label}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default function StudentForm() {
  const [formData, setFormData] = useState({
    name: "",
    usn: "",
    semester: "",
    section: "",
    branch: "",
    aadharNumber: "",
    address: "",
    email: "",
    tenthMarks: null,
    twelfthMarks: null,
  });

  const [sections, setSections] = useState([]);
  const [errors, setErrors] = useState({});

  const semesterSections = {
    P: ["A", "B", "C", "D"],
    C: ["A", "B", "C", "D"],
    3: ["A", "B", "C", "D", "E", "F"],
    4: ["A", "B", "C", "D", "E", "F"],
    5: ["A", "B", "C", "D", "E", "F"],
    6: ["A", "B", "C", "D", "E", "F"],
    7: ["A", "B", "C", "D", "E", "F"],
    8: ["A", "B", "C", "D", "E", "F"],
  };

  const branches = ["cse", "ise", "ai/ml"];

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

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.usn.startsWith("1BM")) {
      newErrors.usn = 'USN must start with "1BM"';
    }

    if (!/^\d{12}$/.test(formData.aadharNumber)) {
      newErrors.aadharNumber = "Aadhar Number must be 12 digits";
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (formData.tenthMarks && formData.tenthMarks.type !== "application/pdf") {
      newErrors.tenthMarks = "10th Marks Card must be a PDF file";
    }

    if (
      formData.twelfthMarks &&
      formData.twelfthMarks.type !== "application/pdf"
    ) {
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
      const response = await axios.post(
        "http://localhost:5000/api/student",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

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
      <div className="sm:flex-row sm:items-center sm:justify-center px-8 py-4 md:px-8 lg:px-20">
        <h2 className="text-2xl font-bold mb-4">Student Information Form</h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Column */}
          <div className="space-y-4 flex flex-col justify-between">
            <TextInput
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              label="Name"
              error={errors.name}
            />
            <TextInput
              id="usn"
              name="usn"
              value={formData.usn}
              onChange={handleChange}
              label="University Seat Number (USN)"
              error={errors.usn}
            />
            <TextInput
              id="aadharNumber"
              name="aadharNumber"
              value={formData.aadharNumber}
              onChange={handleChange}
              label="Aadhar Number"
              error={errors.aadharNumber}
            />
            <TextInput
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              label="Email"
              error={errors.email}
            />
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

          {/* Right Column */}
          <div className="space-y-4 flex-col">
            <SelectInput
              id="semester"
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              label="Semester"
              options={["P", "C", 3, 4, 5, 6, 7, 8].map(
                (sem) =>
                  `${sem} ${
                    sem === "P" || sem === "C" ? "cycle" : "th Semester"
                  }`
              )}
              error={errors.semester}
            />
            <SelectInput
              id="section"
              name="section"
              value={formData.section}
              onChange={handleChange}
              label="Section"
              options={sections}
              error={errors.section}
            />
            <SelectInput
              id="branch"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              label="Branch"
              options={branches}
              error={errors.branch}
            />
            <div className="flex flex-row xs:flex-col justify-around items-center gap-4">
              <div>
                <label
                  className="block text-gray-700 mb-2"
                  htmlFor="tenthMarks">
                  10th Marks Card
                </label>
                <FileUpload
                  id="tenthMarks"
                  name="tenthMarks"
                  value={formData.tenthMarks}
                  onChange={handleChange}
                />
                {errors.tenthMarks && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.tenthMarks}
                  </p>
                )}
              </div>
              <div>
                <label
                  className="block text-gray-700 mb-2"
                  htmlFor="twelfthMarks">
                  12th Marks Card
                </label>
                <FileUpload
                  id="twelfthMarks"
                  name="twelfthMarks"
                  value={formData.twelfthMarks}
                  onChange={handleChange}
                />
                {errors.twelfthMarks && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.twelfthMarks}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 flex justify-center">
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
