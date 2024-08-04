import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

// FileUpload component
export const FileUpload = ({ id, name, value, onChange, error }) => {
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
