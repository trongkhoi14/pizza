import React from 'react'

export default function BtnCancel({children,onClick=null}) {
  return (
    <div className="px-2 py-2 text-right ">
    <button
    onClick={onClick}
      type="button"
      className="text-sm font-semibold leading-6 text-gray-800"
    >
      {children}
    </button>
  </div>
  )
}
