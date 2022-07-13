export function DropdownItem({ children, ...rest }) {
  return (
    <span
      {...rest}
      className="block font-light text-blue-light rounded-full cursor-pointer select-none px-4 text-base leading-[2.75rem] md:hover:text-white md:hover:bg-blue-dark-2 whitespace-nowrap"
    >
      {children}
    </span>
  );
}
