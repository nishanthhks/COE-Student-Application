// TextInput component
export const TextInput = ({
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
