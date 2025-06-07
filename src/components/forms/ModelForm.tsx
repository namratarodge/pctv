"use client";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  submitText?: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
};

export default function ModelForm({
  isOpen,
  onClose,
  title = "Form",
  submitText = "Submit",
  onSubmit,
  children,
}: ModalProps) {
  const [formData, setFormData] = React.useState<Record<string, string>>({});

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleSubmit = () => {
  //   onSubmit(formData);
  // };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
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
              onSubmit={onSubmit}
              className="space-y-4"
            >
              {children}

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
