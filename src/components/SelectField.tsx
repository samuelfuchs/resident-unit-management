import React from "react";

interface SelectFieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  disabled?: boolean;
}

const SelectField: React.FC<SelectFieldProps> = ({
  id,
  name,
  label,
  value,
  onChange,
  options,
  placeholder,
  disabled = false,
}) => {
  return (
    <div className="sm:col-span-3">
      <label htmlFor={id} className="block text-sm font-medium text-gray-900">
        {label}
      </label>
      <div className="mt-2">
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`block w-full rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm ${
            disabled ? "bg-gray-100 text-gray-500" : ""
          }`}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectField;
