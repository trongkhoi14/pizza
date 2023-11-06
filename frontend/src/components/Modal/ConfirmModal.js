import React from "react";
import ModalContainer from "./ModalContainer";
import { AiOutlineWarning } from "react-icons/ai";

export default function ConfirmModal({
  visible = false,
  onClose = null,
  title = "",
  content = "",
  handleConfirm = null,
  confirmText = "",
}) {
  return (
    <ModalContainer ignoreContainer={true} visible={visible} onClose={onClose}>
      <div className="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative">
        <div className="md:flex items-center">
          <div className="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
            <AiOutlineWarning size={24} />
          </div>
          <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
            <p className="font-bold">{title}</p>
            <p className="text-sm text-gray-400 mt-1 font-medium">{content}</p>
          </div>
        </div>
        <div className="text-center md:text-right mt-4 md:flex md:justify-end">
          <button
            onClick={handleConfirm}
            className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
          >
            {confirmText}
          </button>
          <button
            onClick={onClose}
            className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4
          md:mt-0 md:order-1"
          >
            Huỷ
          </button>
        </div>
      </div>
    </ModalContainer>
  );
}
