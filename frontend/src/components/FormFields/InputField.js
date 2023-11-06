import React from "react";
import { Controller } from "react-hook-form";

export default function InputField({
  error = {},
  control,
  label = "",
  placeholder = "",
  name,
  id,
  type = "",
  disable = false,
}) {

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="">
          <label
            htmlFor={id}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
          <div className="">
            <input
              type={type ? type : "text"}
              id={id}
              disabled={disable}
              name={name}
              className="border-[1px] shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md p-2"
              placeholder={placeholder}
              {...field}
            />
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
