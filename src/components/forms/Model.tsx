import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/16/solid";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  form: React.ReactNode;
};

export default function Model({
  isOpen,
  onClose,
  title = "Form",
  form,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <DialogBackdrop transition className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
       />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center text-center px-4">
          <DialogPanel transition className="w-full max-w-lg transform overflow-hidden rounded-md bg-white p-6 text-left shadow-xl transition-all">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">{title}</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Render the passed form here */}
            <div>{form}</div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}