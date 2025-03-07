"use client";

import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl";
}

const FormModal: React.FC<FormModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "md",
}) => {
  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div
          className="fixed inset-0 bg-black opacity-30 dark:opacity-50"
          onClick={onClose}
        />
        <div
          className={`relative ${maxWidthClasses[maxWidth]} w-full rounded-lg bg-white dark:bg-gray-900 shadow-xl`}
        >
          <div className="flex items-center justify-between border-b dark:border-gray-700 p-4">
            <h2 className="text-xl font-semibold dark:text-gray-200">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <XMarkIcon className="h-6 w-6 dark:text-gray-300" />
            </button>
          </div>
          <div className="p-6 dark:text-gray-300">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default FormModal;
