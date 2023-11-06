import React from "react";
import { Controller } from "react-hook-form";

export default function RadioField({
  control,
  error,
  options = [],
  name = "",
  label="",
  id = "",
}) {
  return (
    <Controller
    control={control}
    name={name}
    render={({ field }) => (
    <ul className="w-full text-sm   bg-white   ">
      <label
            htmlFor={id}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
      {options.map((item) => {
        return (
          <li key={item.value} className="w-full border-b border-gray-200 rounded-t-lg ">
            <div className="flex items-center pl-3 space-x-2">
              <input
                name={name}
                id="list-radio-license"
                type="radio"
                {...field}
                value={item.value}
                checked={field.value === item.value}
                className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
              />
              {item.image && (
                <div className="w-12 h-12 p-2">
                  <img src={item.image} alt="" />
                </div>
              )}
              <label
                htmlFor={name}
                className="w-full py-3 ml-2 text-lg font-medium  text-gray-900 "
              >
                {item.title}
              </label>
            </div>
          </li>
        );
      })}
      {error && (
        <div className="mt-1 font-semibold text-xs text-red-500">
          {error.message}
        </div>
      )}
    </ul>
    )}
    />

  );
}
