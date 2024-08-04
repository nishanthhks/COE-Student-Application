import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import NavBar from "../../components/NavBar/NavBar";

// TextInput component
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
    <label className="block text-gray-700 mb-1" htmlFor={id}>
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

// SelectInput component
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
      {options.map(([optionValue, optionLabel]) => (
        <option key={optionValue} value={optionValue}>
          {optionLabel}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

// FileUpload component
const FileUpload = ({ id, name, value, onChange, error }) => {
  const [fileName, setFileName] = useState(value ? value.name : "");
  const [filePreview, setFilePreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file ? file.name : "");
    setFilePreview(file ? URL.createObjectURL(file) : null);
    onChange(e);
  };

  return (
    <div>
      <div className="relative lg:w-52 lg:h-52 md:w-40 md:h-40 sm:w-64 sm:h-64 border border-gray-300 rounded flex items-center justify-center text-gray-600">
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
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

// ConfirmationPopup component
const ConfirmationPopup = ({ onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Confirm Submission</h2>
      <p>Are you sure all the details are correct?</p>
      <div className="mt-4 flex justify-end">
        <button
          onClick={onCancel}
          className="mr-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Submit
        </button>
      </div>
    </div>
  </div>
);

// StudentForm component
export default function StudentForm() {
  const [formData, setFormData] = useState({
    name: "",
    usn: "",
    semester: "",
    section: "",
    aadharNumber: "",
    email: "",
    address: "",
    branch: "",
    fatherName: "",
    fatherPhoneNumber: "",
    fatherOccupation: "",
    motherName: "",
    motherPhoneNumber: "",
    motherOccupation: "",
    tenthMarks: null,
    twelfthMarks: null,
  });

  const [errors, setErrors] = useState({});
  const [sections, setSections] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);

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
    CSE: "Computer Science and Engineering",
    ISE: "Information Science and Engineering",
    ECE: "Electronics and Communication Engineering",
    "AI&DS": "Artificial Intelligence and Data Science",
    ME: "Mechanical Engineering",
    ASE: "Aerospace Engineering",
    EEE: "Electrical and Electronics Engineering",
    ETE: "Electronics and Telecommunication Engineering",
    EIE: "Electronics and Instrumentation",
    CVE: "Civil Engineering",
    "CSE-IoT":
      "Computer Science and Engineering - Internet of Things and Cyber Security",
    "AI&ML": "Artificial Intelligence and Machine Learning",
    MD: "Medical Electronics",
    IEM: "Industrial Engineering and Management",
    CE: "Chemical Engineering",
    BT: "Bio Technology",
    "CSE-DS": "Computer Science and Engineering - Data Science",
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

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name";
    }

    if (!/^\d{12}$/.test(formData.aadharNumber)) {
      newErrors.aadharNumber = "Please enter a 12 digit number";
    }

    if (!/^[a-zA-Z0-9._%+-]+@bmsce\.ac\.in$/.test(formData.email)) {
      newErrors.email =
        "Please enter a valid email (YOUR_USERNAME@bmsce.ac.in)";
    }

    if (!formData.fatherName.trim()) {
      newErrors.fatherName = "Please Enter Father Name";
    }

    if (!formData.motherName.trim()) {
      newErrors.motherName = "Please Enter Mother Name";
    }

    if (!formData.fatherOccupation.trim()) {
      newErrors.fatherOccupation = "Please Enter occupation";
    }

    if (!formData.motherOccupation.trim()) {
      newErrors.motherOccupation = "Please Enter occupation";
    }

    if (!/^\d{10}$/.test(formData.fatherPhoneNumber)) {
      newErrors.fatherPhoneNumber = "Please Enter a 10 digit phone number";
    }

    if (!/^\d{10}$/.test(formData.motherPhoneNumber)) {
      newErrors.motherPhoneNumber = "Please Enter a 10 digit phone number";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Please enter address";
    }

    if (!/^1BM/i.test(formData.usn)) {
      newErrors.usn = "Please Enter a valid USN";
    }

    if (!formData.semester) {
      newErrors.semester = "Please select a semester";
    }

    if (!formData.section) {
      newErrors.section = "Please select a section";
    }

    if (!formData.branch) {
      newErrors.branch = "Please select a branch";
    }

    if (!formData.tenthMarks) {
      newErrors.tenthMarks = "Please upload 10th Marks Card";
    } else if (formData.tenthMarks.type !== "application/pdf") {
      newErrors.tenthMarks = "Please upload a PDF file";
    }

    if (!formData.twelfthMarks) {
      newErrors.twelfthMarks = "Please upload 12th Marks Card";
    } else if (formData.twelfthMarks.type !== "application/pdf") {
      newErrors.twelfthMarks = "Please upload a PDF file";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setShowConfirmation(true);
    }
  };

  const confirmSubmit = async () => {
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "usn") {
        data.append(key, formData[key].toLowerCase());
      } else {
        data.append(key, formData[key]);
      }
    });

    try {
      await fetch("http://localhost:4000/submit", {
        method: "POST",
        body: data,
      });
      alert("Data submitted successfully");
      setFormData({
        name: "",
        usn: "",
        semester: "",
        section: "",
        aadharNumber: "",
        email: "",
        address: "",
        branch: "",
        fatherName: "",
        fatherPhoneNumber: "",
        fatherOccupation: "",
        motherName: "",
        motherPhoneNumber: "",
        motherOccupation: "",
        tenthMarks: null,
        twelfthMarks: null,
      });
      setErrors({});
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Error submitting data");
    }
    setShowConfirmation(false);
  };

  return (
    <>
      <NavBar title={StudentForm} />
      <div className="sm:flex-row sm:items-center sm:justify-center px-8 py-4 md:px-8 lg:px-32">
        <h2 className="text-2xl font-bold mb-4">Student Information Form</h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              value={formData.email}
              onChange={handleChange}
              label="Email"
              type="email"
              error={errors.email}
            />
            <TextInput
              id="fatherName"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
              label="Father Name"
              error={errors.fatherName}
            />
            <TextInput
              id="fatherPhoneNumber"
              name="fatherPhoneNumber"
              value={formData.fatherPhoneNumber}
              onChange={handleChange}
              label="Father Phone Number"
              error={errors.fatherPhoneNumber}
            />
            <TextInput
              id="fatherOccupation"
              name="fatherOccupation"
              value={formData.fatherOccupation}
              onChange={handleChange}
              label="Father Occupation"
              error={errors.fatherOccupation}
            />
            <TextInput
              id="motherName"
              name="motherName"
              value={formData.motherName}
              onChange={handleChange}
              label="Mother Name"
              error={errors.motherName}
            />
            <TextInput
              id="motherPhoneNumber"
              name="motherPhoneNumber"
              value={formData.motherPhoneNumber}
              onChange={handleChange}
              label="Mother Phone Number"
              error={errors.motherPhoneNumber}
            />
            <TextInput
              id="motherOccupation"
              name="motherOccupation"
              value={formData.motherOccupation}
              onChange={handleChange}
              label="Mother Occupation"
              error={errors.motherOccupation}
            />
          </div>
          <div className="space-y-4 flex-col">
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="address">
                Address
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={`w-full p-2 border border-gray-300 rounded ${
                  errors.address ? "border-red-500" : ""
                }`}
                rows="5"
                required
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>
            <TextInput
              id="usn"
              name="usn"
              value={formData.usn}
              onChange={handleChange}
              label="University Seat Number (USN)"
              error={errors.usn}
            />
            <SelectInput
              id="semester"
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              label="Semester"
              options={[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => [
                sem,
                `${sem}${sem === 1 ? "st" : sem === 2 ? "nd" : "th"} Semester`,
              ])}
              error={errors.semester}
            />
            <SelectInput
              id="section"
              name="section"
              value={formData.section}
              onChange={handleChange}
              label="Section"
              options={sections.map((section) => [section, section])}
              error={errors.section}
            />
            <SelectInput
              id="branch"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              label="Branch"
              options={Object.entries(branchOptions)}
              error={errors.branch}
            />
            {/* <div */}
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
                  error={errors.tenthMarks}
                />
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
                  error={errors.twelfthMarks}
                />
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
        {showConfirmation && (
          <ConfirmationPopup
            onConfirm={confirmSubmit}
            onCancel={() => setShowConfirmation(false)}
          />
        )}
      </div>
    </>
  );
}
