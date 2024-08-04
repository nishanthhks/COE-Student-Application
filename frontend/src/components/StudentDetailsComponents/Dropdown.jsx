// Dropdown component to be reused for semester, section, and branch
export const Dropdown = ({ label, name, options, value, onChange }) => (
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
