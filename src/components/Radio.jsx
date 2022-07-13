import { forwardRef } from 'react';

const Radio = (
  {
    label,
    support,
    error,
    mask,
    onChange,
    onBlur,
    name,
    options = [],
    ...rest
  },
  ref
) => {
  return (
    <>
      <span className="block font-medium text-white text-sm">{label}</span>
      {support && (
        <span className="block text-sm font-light text-blue-light">
          {support}
        </span>
      )}
      {error && (
        <>
          <span className="block text-sm font-medium text-red-500">
            {error}
          </span>
        </>
      )}
      {options.map(({ value, label }) => (
        <label
          key={label}
          className="group flex flex-row flex-nowrap py-[.625rem] first-of-type:mt-2 md:hover:bg-blue-dark-2 transition-all rounded-lg cursor-pointer"
        >
          <input
            {...rest}
            name={name}
            ref={ref}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            type="radio"
            className="appearance-none peer"
          />
          <span
            className="flex flex-row items-center relative transition-all before:transition-all after:transition-all md:pr-2
              peer-checked:before:border-blue peer-checked:after:bg-blue
              md:group-hover:before:border-blue md:group-hover:before:ml-[.625rem] md:group-hover:after:left-[.875rem] md:group-hover:before:pr-0
              before:flex-none before:content-[''] before:w-5 before:h-5 before:rounded-full
              before:m-[.125rem] before:mr-[.625rem] before:border before:border-white
              after:absolute after:left-[0.375rem] after:top-1/2 after:-mt-[0.375rem]
              after:content-[''] after:w-3 after:h-3 after:rounded-full
            "
          >
            {label}
          </span>
        </label>
      ))}
    </>
  );
};

export default forwardRef(Radio);
