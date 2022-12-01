import { forwardRef } from 'react';

function InputFileComponent({ label, support, error, ...rest }, ref) {
  return (
    <div className="block w-full">
      <span className="block font-medium text-white text-base mb-2">
        {label}
      </span>
      <div
        className={`bg-blue-dark-2 p-6 rounded-lg ${
          error ? 'ring-1 ring-red-500' : ''
        }`}
      >
        <input
          {...rest}
          ref={ref}
          type="file"
          className="text-sm text-blue-light
          file:mr-4 file:px-6 file:py-[0.625rem]
          file:rounded-full file:border file:border-blue-light md:hover:file:bg-blue-dark-3 file:cursor-pointer
          file:text-sm file:leading-[1.375rem] file:font-medium file:text-white file:bg-blue-dark-1"
        />
      </div>
      {support && (
        <span className="block text-sm font-light text-blue-light mt-2">
          {support}
        </span>
      )}
      {error && (
        <span className="block text-sm font-medium text-red-500 mt-2">
          {error}
        </span>
      )}
    </div>
  );
}

export const InputFile = forwardRef(InputFileComponent);
