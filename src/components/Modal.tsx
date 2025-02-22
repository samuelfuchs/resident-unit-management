"use client";

import React, { useEffect, useRef } from "react";

interface ModalProps {
  type: "warning" | "success" | "failure";
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  type,
  title,
  description,
  isOpen,
  onClose,
  onConfirm,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full"
      >
        <h2
          className={`text-xl font-bold ${
            type === "success"
              ? "text-green-600"
              : type === "warning"
              ? "text-yellow-600"
              : "text-red-600"
          }`}
        >
          {title}
        </h2>
        <p className="text-gray-700 mt-4">{description}</p>
        <div className="mt-6 flex justify-end space-x-4">
          {type === "warning" && (
            <>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (onConfirm) {
                    onConfirm();
                  }
                  onClose();
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Confirm
              </button>
            </>
          )}
          {type === "success" && (
            <button
              onClick={onClose}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Close
            </button>
          )}
          {type === "failure" && (
            <button
              onClick={() => {
                if (onConfirm) {
                  onConfirm();
                }
                onClose();
              }}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
