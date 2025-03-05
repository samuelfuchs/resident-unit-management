import React from "react";

interface SelectFieldProps {
  id: string;
  name: string;
  label: string;
  value: string | string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  disabled?: boolean;
  isMulti?: boolean;
  required?: boolean;
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
  isMulti = false,
  required = false,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="mt-2">
        <select
          id={id}
          name={name}
          value={isMulti ? (value as string[]) : (value as string)}
          onChange={onChange}
          disabled={disabled}
          multiple={isMulti}
          required={required}
          className={`block w-full rounded-md bg-white dark:bg-gray-700 py-1.5 pl-3 pr-8 text-base text-gray-900 dark:text-gray-200 outline outline-1 -outline-offset-1 outline-gray-300 dark:outline-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 dark:focus:outline-indigo-400 sm:text-sm ${
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