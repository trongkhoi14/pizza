import React from "react";
import { Controller } from "react-hook-form";

export default function TextareaField({
  name,
  id,
  label,
  placeholder,
  control,
  error = {},
}) {
  return (
    <Controller
      control={control}
      name={name}
      id={id}
      render={({ field }) => {
        return (
          <div>
            <label
              htmlFor={id}
              className="block text-sm font-medium text-gray-700"
            >
              {label}
            </label>
            <div className="mt-1">
              <textarea
                id={id}
                rows="3"
                className="border-[1px] p-1 resize-none shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder={placeholder}
                {...field}
              ></textarea>
              {error && (
                <div className="mt-1 font-semibold text-xs text-red-500">
                  {error.message}
                </div>
              )}
            </div>
          </div>
        );
      }}
    />
  );
}
