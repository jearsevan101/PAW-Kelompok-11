import React, { useState } from 'react';

const ReusableForm = ({ label, type, placeholder, isLongText, name, options, setValue, value }) => {
  // const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="mb-4">
      <label className="block text-black text-sm font-semibold mb-2">{label}</label>
      {type === 'select' ? (
        <select
          className="w-full rounded-lg bg-[#F6F7F9] focus:outline-none transition duration-300 p-4"
          name={name}
          value={value}
          onChange={handleChange}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : isLongText ? (
        <textarea
          className="w-full rounded-lg bg-[#F6F7F9] focus:outline-none transition duration-300 p-4"
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          rows="4"
        />
      ) : (
        <input
          className="w-full rounded-lg bg-[#F6F7F9] focus:outline-none transition duration-300 p-4"
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
      )}
    </div>
  );
};

export default ReusableForm;
