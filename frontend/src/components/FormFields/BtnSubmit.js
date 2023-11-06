import React from "react";
import {ImSpinner3} from "react-icons/im"
export default function BtnSubmit({
  loading,
  children,
  onClick = null,
  className = "",
}) {
  return (
    <div className="text-right">
      <button
        disabled={loading}
        onClick={onClick}
        type="submit"
        className={
          className +
          " inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        }
      >
        { loading ? <span className="animate-spin"><ImSpinner3 size={24}/></span>:
        children
        }
      </button>
    </div>
  );
}
