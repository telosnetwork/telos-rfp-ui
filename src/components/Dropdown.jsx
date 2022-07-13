import { useState } from 'react';
import { FiMoreVertical, FiX } from 'react-icons/fi';

export function Dropdown({ onClose, children }) {
  const [dropdown, setDropdown] = useState(false);

  function handleClose() {
    setDropdown(false);
  }

  return (
    <>
      <div className="relative">
        <button
          type="button"
          className={`btn btn--tertiary btn--square ${
            dropdown ? 'relative z-30' : ''
          }`}
          onClick={() => setDropdown(!dropdown)}
        >
          {dropdown ? <FiX size={24} /> : <FiMoreVertical size={24} />}
        </button>
        <div
          className={`absolute z-30 top-11 right-0 w-auto min-w-[10rem] p-2 rounded-lg bg-blue-dark-1 border border-blue-dark-2 ${
            dropdown ? 'flex flex-col' : 'hidden'
          }`}
        >
          {children}
        </div>
      </div>
      {dropdown && (
        <div
          className="fixed w-screen h-screen z-20"
          onClick={() => setDropdown(!dropdown)}
        />
      )}
    </>
  );
}
