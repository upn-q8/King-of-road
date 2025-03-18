import { Dialog, Transition, TransitionChild,DialogPanel } from "@headlessui/react";
import { Fragment, ReactNode } from "react";

export default function Modal({ open, children, close, className }) {
  return (
    <>
      <Transition  appear show={open} as={Fragment}>
        <Dialog
        
          as="div"
          style={{ zIndex: 10000 }}
          className="relative z-50"
          onClose={close}
        >
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25 dark:bg-white/20 z-50" />
          </TransitionChild>

          <div
            className="fixed inset-0 overflow-y-auto "
            style={{ zIndex: 100000000 }}
          >
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel
                  
                  className={`w-full  transform overflow-hidden rounded-2xl  p-6  align-middle shadow-xl transition-all bg-gray-50 ${className}`}
                >
                  {children}
                </DialogPanel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
