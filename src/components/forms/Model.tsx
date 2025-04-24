"use client";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";

type FieldType = {
  type: "text" | "select" | "date";
  name: string;
  label: string;
  placeholder?: string;
  value?: string;
  options?: { label: string; value: string }[];
  helperText?: string;
};

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  fields: FieldType[];
  submitText?: string;
  onSubmit: (formData: Record<string, string>) => void;
};

export default function Model({
  isOpen,
  onClose,
  title = "Form",
  fields,
  submitText = "Submit",
  onSubmit,
}: ModalProps) {
  const [formData, setFormData] = React.useState<Record<string, string>>({});

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center text-center px-4">
          <DialogPanel className="w-full max-w-lg transform overflow-hidden rounded-md bg-white p-6 text-left shadow-xl transition-all">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">{title}</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="space-y-4"
            >
              {fields.map((field) => (
                <div key={field.name} className="flex flex-col">
                  <label className="mb-1 text-gray-800">{field.label}</label>
                  {field.type === "text" && (
                    <input
                      type="text"
                      placeholder={field.placeholder}
                      value={formData[field.name] || ""}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      className="px-4 py-2 rounded-md border border-gray-300 text-gray-700"
                    />
                  )}
                  {field.type === "select" && field.options && (
                    <select
                      value={formData[field.name] || ""}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      className="px-4 py-2 rounded-md border border-gray-300 text-gray-700"
                    >
                      <option value="">Select</option>
                      {field.options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  )}
                  {field.helperText && (
                    <p className="text-sm text-gray-500 mt-1">
                      {field.helperText}
                    </p>
                  )}
                </div>
              ))}

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="submit"
                  className="bg-red-600 text-white px-4 py-2 rounded-md cursor-pointer"
                >
                  {submitText}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-gray-600 cursor-pointer px-4"
                >
                  Cancel
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
