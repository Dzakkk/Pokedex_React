import React, { useState } from "react";

const Modal = ({ isOpen, onClose, onSave }) => {
  const [aliasInputVisible, setAliasInputVisible] = useState(false);
  const [alias, setAlias] = useState("");

  if (!isOpen) return null;

  const handleSave = () => {
    const finalAlias = alias.trim() ? alias : null;
    onSave(finalAlias);
    onClose();
  };

  return (
    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Capture Pokémon
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={onClose}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5 space-y-4">
            {!aliasInputVisible ? (
              <div>
                <p>Do you want to give this Pokémon an alias?</p>
                <div className="flex justify-end mt-4">
                  <button
                    className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
                    onClick={() => setAliasInputVisible(true)}
                  >
                    Yes
                  </button>
                  <button
                    className="ml-2 text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5"
                    onClick={handleSave}
                  >
                    No
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <input
                  type="text"
                  placeholder="Enter alias"
                  value={alias}
                  onChange={(e) => setAlias(e.target.value)}
                  className="p-2 border rounded text-sm w-full"
                />
                <div className="flex justify-end mt-4">
                  <button
                    className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
