// SelectInput component
export const SelectInput = ({ id, name, value, onChange, label, options, error }) => (
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