import React from "react";
import { Controller } from "react-hook-form";

export default function OptionFiled({
  label,
  id,
  name,
  control,
  options = [],
  error = {},
}) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={"123"}
      render={({ field }) => (
        <div className="">
          <label
            htmlFor={id}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
          <div className="">
            <select
              id={id}
              name={name}
              className="capitalize border-[1px] shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md p-2"
              {...field}
            >
              <option value="" disabled hidden></option>

              {options.map((option) => {
                return (
                  <option className="capitalize " key={option._id} value={option._id}>
                    {option.title}
                  </option>
                );
              })}
            </select>
            {error && (
              <div className="mt-1 font-semibold text-xs text-red-500">
                {error.message}
              </div>
            )}
          </div>
        </div>
      )}
    />
  );
}
